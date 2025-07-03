const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const { mongoose } = require("mongoose");
const { Account, User } = require("../db");
const accountRouter = express.Router();

const tranferFunds = async (senderId, recieverId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const sender = await Account.findOne({
      userId: senderId,
    });
    if (!sender || sender.balance - amount < 0) return false;
    await Account.findOneAndUpdate(
      { userId: senderId },
      { $inc: { balance: -amount } },
      { session }
    );
    await Account.findOneAndUpdate(
      { userId: recieverId },
      { $inc: { balance: +amount } },
      { session }
    );
    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    return false;
  } finally {
    session.endSession();
  }
};
accountRouter.put("/transaction", auth, async (req, res) => {
  const { senderId, recieverId, amount } = req.body;
  if (amount <= 0) return res.send("Invalid amount");
  const successfulTrans = await tranferFunds(senderId, recieverId, amount);
  if (successfulTrans) res.status(200).send("Transaction Successful");
  else res.status(500).send("Transaction Failed");
});
module.exports = accountRouter;
