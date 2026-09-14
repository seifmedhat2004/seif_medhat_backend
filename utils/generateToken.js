const jwt = require("jsonwebtoken");

// generate token
const generateToken = (email) =>
  jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_DATE,
  });

module.exports = generateToken;
