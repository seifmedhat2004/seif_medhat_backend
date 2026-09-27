const Projects = require("../../models/projectsModel");

//Get one project
exports.getProjectDetailsService = async (projectID) => {
  const project = await Projects.findById(projectID);
  if (!project) {
    errors.notFoundError("not found project", "NOT_FOUND_PROJECT");
  }
  return {
    success: true,
    message: "projct fetched successfully",
    project,
  };
};

//Get all projects
exports.getAllProjectService = async () => {
  const projects = await Projects.find().select(
    "title  subtitle projectCategory mainImage year projectStatus updatedAt",
  );
  if (!projects.length) {
    errors.notFoundError("no projects found", "NO_PROJECTS_FOUND");
  }
  return {
    success: true,
    message: "project fetched successfully",
    projects,
  };
};