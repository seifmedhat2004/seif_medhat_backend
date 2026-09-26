const asyncHandler = require("express-async-handler");
const {
  addProfileService,
  updateProfileService,
  getProfileService,
} = require("../../services/admin/profileService");

exports.addProfileController = asyncHandler(async (req, res) => {
  const result = await addProfileService(req.body);
  res.status(200).json(result);
});

exports.updateProfileController = asyncHandler(async (req, res) => {
  const result = await updateProfileService(req.params.profileID, req.body);
  res.status(200).json(result);
});

exports.getProfileController = asyncHandler(async (req, res) => {
  const result = await getProfileService();
  res.status(200).json(result);
});
