const errors = require("../../Trash/errors");
exports.skillsValidate = (
  name,
  category,
  levelDescription,
  description,
  level,
) => {
  if (!name || !category || !levelDescription || !description || !level) {
    errors.badRequestError("skills if required", "SKILLS_FIELDS_IS_REQUIRED");
  }
};


