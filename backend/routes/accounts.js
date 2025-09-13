const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const { mongoose } = require("mongoose");
const { Account, User, Transaction } = require("../db");
const accountRouter = express.Router();

const tranferFunds = async (senderId, recieverId, amount) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const sender = await Account.findOne({
      userId: senderId,
    });
    if (!sender || sender.balance - amount < 0) return false;

    // Update sender balance
    await Account.findOneAndUpdate(
      { userId: senderId },
      { $inc: { balance: -amount } },
      { session }
    );

    // Update receiver balance
    await Account.findOneAndUpdate(
      { userId: recieverId },
      { $inc: { balance: +amount } },
      { session }
    );

    // Log the transaction
    const transaction = new Transaction({
      fromUserId: senderId,
      toUserId: recieverId,
      amount: amount,
      status: "completed",
    });
    await transaction.save({ session });

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
  else res.status(403).send("Transaction Failed");
});

accountRouter.get("/balance", auth, async (req, res) => {
  try {
    const user = await Account.findOne({
      userId: req.userId,
    });
    const userBalance = await user.balance;
    return res.status(200).json({
      balance: userBalance,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Couldn't access balance",
      err: err,
    });
  }
});

accountRouter.get("/transactions", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ fromUserId: req.userId }, { toUserId: req.userId }],
    })
      .populate("fromUserId", "firstName lastName username")
      .populate("toUserId", "firstName lastName username")
      .sort({ timestamp: -1 })
      .limit(20);

    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction._id,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      status: transaction.status,
      type:
        transaction.fromUserId._id.toString() === req.userId.toString()
          ? "sent"
          : "received",
      otherUser:
        transaction.fromUserId._id.toString() === req.userId.toString()
          ? transaction.toUserId
          : transaction.fromUserId,
    }));

    return res.status(200).json({
      transactions: formattedTransactions,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Couldn't fetch transactions",
      error: err.message,
    });
  }
});

module.exports = accountRouter;
