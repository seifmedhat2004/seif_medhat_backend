const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode || 500;

  let message = err.message || "Server Error";

  // CastError (Invalid Mongo ObjectId)
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Hide unexpected internal errors in production
  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    success: false,

    message:
      isProduction && statusCode === 500 ? "Something went wrong" : message,

    code: err.customCode || err.code || err.name || "INTERNAL_ERROR",

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;
