const asyncHandler = require("express-async-handler");
const {
  getProjectDetailsService,
  getAllProjectService,
} = require("../../services/user/projectsService");

exports.getAllProjectsController = asyncHandler(async (req, res) => {
  const result = await getAllProjectService();
  res.status(200).json(result);
});

exports.getProjectDetailsController = asyncHandler(async (req, res) => {
  const result = await getProjectDetailsService(req.params.projectID);
  res.status(200).json(result);
});
