const mongoose = require("mongoose");
require("dotenv").config();
const userSchema = mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
  },
});
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
mongoose.connect(process.env.DB_URI);

module.exports = {
  User,
  Account,
};
