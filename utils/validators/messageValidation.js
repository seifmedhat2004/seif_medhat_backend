const errors = require("../../Trash/errors");

exports.messageValidation = (name,email,message) => {
  if (! name  || !email || !message) {
    errors.badRequestError(
      "The credintals is required",
      "THE_CREDINTALS_IS_REQUIRED",
    );
  }
};
