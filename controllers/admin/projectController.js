const asyncHandler = require("express-async-handler");
const {
  addProjectService,
  getAllProjectService,
  getProjectDetailsService,
  deleteProjectService,
  updateProjectService,
} = require("../../services/admin/projectsService");

exports.addProjectController = asyncHandler(async (req, res) => {
  const result = await addProjectService(req.body, req.files);
  return res.status(201).json(result);
});

exports.getAllProjectsController = asyncHandler(async (req, res) => {
  const result = await getAllProjectService();
  res.status(200).json(result);
});

exports.getProjectDetailsController = asyncHandler(async (req, res) => {
  const result = await getProjectDetailsService(req.params.projectID);
  res.status(200).json(result);
});

exports.deleteProjectController = asyncHandler(async (req, res) => {
  const result = await deleteProjectService(req.params.projectID);
  res.status(200).json(result);
});

exports.updateProjectController = asyncHandler(async (req, res) => {
  const result = await updateProjectService(
    req.params.projectID,
    req.body,
    req.files,
  );

  return res.status(200).json(result);
});
