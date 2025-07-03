const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(403).send("pil gaya");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).send("fir pela gaya");
  }
};

module.exports = auth;
