const errors = require("../../Trash/errors");

exports.categoryValidation = (name, icon, accentColor) => {
  if (!name || !icon || !accentColor) {
    errors.badRequestError(
      "Please fill up the category credintals",
      "CREDINTALS_IS_REQUIRED",
    );
  }
};
