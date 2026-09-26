const errors = require("../../Trash/errors");
exports.profileValidate = (
  singletonKey,
  displayName,
  title,
  eyebrow,
  aboutTagLine,
  aboutBio,
  contactHeading,
  contactSubheading,
  githubUrl,
  linkedinUrl,
  email,
  timelineMilestones,
) => {
  if (
    !singletonKey ||
    !displayName ||
    !title ||
    !eyebrow ||
    !aboutTagLine ||
    !aboutBio ||
    !contactHeading ||
    !contactSubheading ||
    !githubUrl ||
    !linkedinUrl ||
    !email ||
    !timelineMilestones
  ) {
    errors.badRequestError(
      "please fill the credintail",
      "CREDINTAIL_IS_REQUIRED",
    );
  }
};
