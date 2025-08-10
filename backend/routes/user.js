const express = require("express");
const jwt = require("jsonwebtoken");
const { userSchema, updateUserSchema } = require("../zodSchema/userSchema");
const { User, Account } = require("../db");
const auth = require("../auth");
const userRouter = express.Router();
const mongoose = require("mongoose");

const createUser = async (userData) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newUser = new User({
      ...userData,
    });
    const userCreated = await newUser.save({ session });
    const userAccount = new Account({
      userId: userCreated._id,
      balance: 0,
    });
    const account = await userAccount.save({ session });
    await session.commitTransaction();
    if (userCreated) {
      const token = jwt.sign(
        {
          userId: userCreated._id,
        },
        process.env.JWT_SECRET
      );
      // console.log(token + "ahaha");
      return {
        auth: `Bearer ${token}`,
        id: userCreated._id,
      };
    }
  } catch (error) {
    await session.abortTransaction();
    // console.log(error);
    return false;
  } finally {
    session.endSession();
  }
};
userRouter.post("/addUser", async (req, res) => {
  const validUser = userSchema.safeParse(req.body);
  if (!validUser.success) return res.status(400).send("Sahi se daal");
  const userExist = await User.findOne({
    username: req.body.username,
  });
  if (userExist) return res.status(409).send("username taken");

  if (validUser.success) {
    const userData = req.body;
    const data = await createUser(userData);
    console.log(data.auth);
    if (data.auth)
      return res.status(200).json({
        token: data.auth,
        id: data.id,
        username: userData.username,
        name: {
          first: userData.firstName,
          last: userData.lastName,
        },
      });
    else res.status(500).send("Couldnt create user");
  }
});

userRouter.post("/getUser", async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({
    username,
    password,
  });
  if (userExist) {
    const token = jwt.sign(
      {
        userId: userExist._id,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token: `Bearer ${token}`,
      username: userExist.username,
      name: {
        first: userExist.firstName,
        last: userExist.lastName,
      },
      id: userExist._id,
    });
  } else res.status(404).send(`User not found`);
});

userRouter.put("/updateUser", auth, async (req, res) => {
  try {
    // console.log(req.userId);
    const validReq = updateUserSchema.safeParse(req.body);
    if (!validReq.success) return res.status(403).send("Invalid Inputs");
    const updated = await User.findOneAndUpdate(
      { _id: req.userId }, // Correct query object
      { $set: req.body }, // Use $set to only update provided fields
      { new: true } // Optional: return the updated document
    );
    console.log(updated);
    if (updated) {
      res.status(200).json({
        message: "Updated successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

userRouter.get("/", auth, async (req, res) => {
  const name = req.query.filter;
  const findUser = await User.find({
    $or: [
      {
        firstName: {
          $regex: name,
        },
      },
      {
        lastName: {
          $regex: name,
        },
      },
    ],
  });
  const list = findUser.map((user) => {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    };
  });
  if (findUser) res.status(200).send(list);
  else res.status(404).send("User not found");
});

module.exports = userRouter;
