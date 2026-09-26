const Profile = require("../../models/profileModel");
const errors = require("../../Trash/errors");
const { profileValidate } = require("../../utils/validators/profileValidate");

// add profile
exports.addProfileService = async (profileData) => {
  const {
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
  } = profileData;

  profileValidate(
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
  );
  const profile = await Profile.create({
    singletonKey: "main",
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
  });
  return {
    success: true,
    message: "profile created successfully",
    profile,
  };
};

// update profile
exports.updateProfileService = async (profileID, updateData) => {
  const { timelineMilestone, ...profileUpdates } = updateData;

  // Update normal profile fields
  let profile = await Profile.findByIdAndUpdate(
    profileID,
    { $set: profileUpdates },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!profile) {
    errors.notFoundError("Profile not found", "PROFILE_NOT_FOUND");
  }

  // Update one timeline milestone
  if (timelineMilestone) {
    const { id, ...milestoneUpdates } = timelineMilestone;

    const updateFields = {};

    for (const [key, value] of Object.entries(milestoneUpdates)) {
      updateFields[`timelineMilestones.$.${key}`] = value;
    }

    profile = await Profile.findOneAndUpdate(
      {
        _id: profileID,
        "timelineMilestones._id": id,
      },
      {
        $set: updateFields,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!profile) {
      errors.notFoundError(
        "Timeline milestone not found",
        "MILESTONE_NOT_FOUND",
      );
    }
  }
  return {
    success: true,
    message: "Profile updated successfully",
    profile,
  };
};

//get  profile
exports.getProfileService = async () => {
  const profile = await Profile.findOne();
  if (!profile) {
    errors.notFoundError("No profiles here", "PROFILE_NOT_FOUND");
  }
  return {
    success: true,
    message: "profile fetched succfully",
    profile,
  };
};
