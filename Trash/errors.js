exports.notFoundError = (message, code) => {
  const error = new Error(message);
  error.statusCode = 404;
  error.success = false;
  error.customCode = code;
  throw error;
};
exports.badRequestError = (message, code) => {
  const error = new Error(message);
  error.statusCode = 400;
  error.success = false;
  error.customCode = code;
  throw error;
};
exports.unAuthorizedError = (message, code) => {
  const error = new Error(message);
  error.statusCode = 401;
  error.success = false;
  error.customCode = code;
  throw error;
};
exports.PaymentRequiredError = (message, code) => {
  const error = new Error(message);
  error.statusCode = 402;
  error.success = false;
  error.customCode = code;
  throw error;
};

exports.RequestTimeoutError = (message, code) => {
  const error = new Error(message);
  error.statusCode = 408;
  error.success = false;
  error.customCode = code;
  throw error;
};

exports.forbiddenError = (message, code) => {
  const error = new Error(message);
  error.statusCode = 403;
  error.success = false;
  error.customCode = code;
  throw error;
};
