const asyncHandler = require("express-async-handler");
const {
  addSkillService,
  getAllSkillsService,
  updateSkillService,
  deleteSkillService,
} = require("../../services/admin/skillsService");

exports.addSkillController = asyncHandler(async (req, res) => {
  const result = await addSkillService(req.body);
  res.status(200).json(result);
});

exports.getAllSkillController = asyncHandler(async (req, res) => {
  const result = await getAllSkillsService();
  res.status(200).json(result);
});

exports.updateSkillController = asyncHandler(async (req, res) => {
  const result = await updateSkillService(req.params.skillID, req.body);
  res.status(200).json(result);
});

exports.deleteSkillController = asyncHandler(async (req, res) => {
  const result = await deleteSkillService(req.params.skillID);
  res.status(200).json(result);
});
