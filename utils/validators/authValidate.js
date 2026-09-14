const error = require("../../Trash/errors")

const validateCredentials = (userName, password, email) => {
  if (!userName || !password || !email) {
    error.badRequestError(
      "Please provide all required fields",
      "MISSING_FIELDS",
    );
  }
};
exports.validateCredentials = validateCredentials;
