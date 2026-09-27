const errors = require("../../Trash/errors");

exports.projectValidate = (
  title,
  subtitle,
  projectCategory,
  description,
  longOverview,
  technologies,
  year,
  keyConcepts,
  systemProcess,
) => {
  if (
    !title ||
    !subtitle ||
    !projectCategory ||
    !description ||
    !longOverview ||
    !technologies ||
    !year ||
    !keyConcepts ||
    !systemProcess
  ) {
    errors.badRequestError(
      "Please fill all required project credentials",
      "PROJECT_CREDENTIALS_REQUIRED",
    );
  }
};