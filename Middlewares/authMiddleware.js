const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const errors = require("../Trash/errors");
// PROTECT Middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.admin = decoded;

      next();
    } catch (err) {
      errors.unAuthorizedError("Not authorized, token failed", "TOKEN_FAILED");
    }
  }
  if (!token) {
    errors.unAuthorizedError("Not authorized, no token", "NO_TOKEN");
  }
});

module.exports = protect ;
