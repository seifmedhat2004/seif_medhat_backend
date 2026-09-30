const errors = require("../../Trash/errors");

exports.certificateValidate = (title, organization, issueDate, skills ,description) => {
  if (!title || !organization || !issueDate || !skills||!description) {
    errors.badRequestError(
      "Credintails is required",
      "CREDINTAILS_IS_REQUIRED",
    );
  }
};
