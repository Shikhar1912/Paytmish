const mongoose = require("mongoose");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  balance: Number,
});

const User = mongoose.model("User", userSchema);

mongoose.connect(process.env.DB_URI);

module.exports = {
  User,
};
