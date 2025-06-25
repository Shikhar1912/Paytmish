const express = require("express");
const { User } = require("./db");
const { userSchema } = require("./zodSchema/userSchema");
const app = express();
app.use(express.json());
app.post("/user", async (req, res) => {
  //   const user = req.body;

  const validUser = userSchema.safeParse(req.body);
  if (validUser.success) {
    const newUser = new User({
      ...req.body,
      balance: 0,
    });
    const userCreated = await newUser.save();
    if (userCreated) res.status(200).send(userCreated);
    else res.status(500).send("server chud gaye guru");
  } else {
    res.send(validUser);
  }
});

app.get("/user", async (req, res) => {
  const userExist = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (userExist) res.status(200).send(userExist);
  else res.status(404).send(`User not found`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port 3000`);
});
