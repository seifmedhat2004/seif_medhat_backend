const cloudinary = require("../../config/cloudinaryConn");
const Project = require("../../models/projectsModel");
const { projectValidate } = require("../../utils/validators/projectValidator");
const errors = require("../../Trash/errors");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/projects",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    stream.end(buffer);
  });
};

exports.addProjectService = async (projectData, files) => {
  const {
    title,
    subtitle,
    projectCategory,
    description,
    longOverview,
    technologies,
    year,
    githubUrl,
    liveDemoUrl,
    projectStatus,
    keyConcepts,
    systemProcess,
    isFeatured,
  } = projectData;

  projectValidate(
    title,
    subtitle,
    projectCategory,
    description,
    longOverview,
    technologies,
    year,
    keyConcepts,
    systemProcess,
  );

  // Main image is required
  if (!files?.mainImage?.[0]) {
    errors.badRequestError("Main image is required", "MAIN_IMAGE_IS_REQUIRED");
  }

  // Upload main image
  const mainImage = await uploadToCloudinary(files.mainImage[0].buffer);

  // Gallery is optional
  const galleryImages = files?.gallery?.length
    ? await Promise.all(
        files.gallery.map((file) => uploadToCloudinary(file.buffer)),
      )
    : [];

  const project = await Project.create({
    title,
    subtitle,
    projectCategory,
    description,
    longOverview,

    mainImage: {
      url: mainImage.secure_url,
      publicId: mainImage.public_id,
    },

    gallery: galleryImages.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    })),

    technologies,
    year,
    githubUrl,
    liveDemoUrl,
    projectStatus,
    keyConcepts,
    systemProcess,
    isFeatured,
  });

  return {
    success: true,
    message: "Project added successfully",
    project,
  };
};

//Get all projects
exports.getAllProjectService = async () => {
  const projects = await Project.find().select(
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

//Get one project
exports.getProjectDetailsService = async (projectID) => {
  const project = await Project.findById(projectID);
  if (!project) {
    errors.notFoundError("not found project", "NOT_FOUND_PROJECT");
  }
  return {
    success: true,
    message: "projct fetched successfully",
    project,
  };
};

//delete project
exports.deleteProjectService = async (projectID) => {
  const project = await Project.findByIdAndDelete(projectID);
  if (!project) {
    errors.notFoundError("project not found", "PROJECT_NOT_FOUND");
  }
  return {
    success: true,
    message: "project deleted successfully",
  };
};

exports.updateProjectService = async (projectID, projectData, files) => {
  const project = await Project.findById(projectID);

  if (!project) {
    errors.notFoundError("Project not found", "PROJECT_NOT_FOUND");
  }

  const {
    title,
    subtitle,
    projectCategory,
    description,
    longOverview,
    technologies,
    year,
    githubUrl,
    liveDemoUrl,
    projectStatus,
    keyConcepts,
    systemProcess,
    isFeatured,
  } = projectData;

  // Update text/data fields only if they were sent
  if (title !== undefined) project.title = title;
  if (subtitle !== undefined) project.subtitle = subtitle;
  if (projectCategory !== undefined) project.projectCategory = projectCategory;
  if (description !== undefined) project.description = description;
  if (longOverview !== undefined) project.longOverview = longOverview;
  if (technologies !== undefined) project.technologies = technologies;
  if (year !== undefined) project.year = year;
  if (githubUrl !== undefined) project.githubUrl = githubUrl;
  if (liveDemoUrl !== undefined) project.liveDemoUrl = liveDemoUrl;
  if (projectStatus !== undefined) project.projectStatus = projectStatus;
  if (keyConcepts !== undefined) project.keyConcepts = keyConcepts;
  if (systemProcess !== undefined) project.systemProcess = systemProcess;
  if (isFeatured !== undefined) project.isFeatured = isFeatured;

  // Replace main image
  if (files?.mainImage?.[0]) {
    const oldPublicId = project.mainImage.publicId;

    const newMainImage = await uploadToCloudinary(files.mainImage[0].buffer);

    project.mainImage = {
      url: newMainImage.secure_url,
      publicId: newMainImage.public_id,
    };

    // Delete old image from Cloudinary
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }
  }

  // Add new gallery images
  if (files?.gallery?.length) {
    const newGalleryImages = await Promise.all(
      files.gallery.map((file) => uploadToCloudinary(file.buffer)),
    );

    const galleryImages = newGalleryImages.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    }));

    project.gallery.push(...galleryImages);
  }

  await project.save();

  return {
    success: true,
    message: "Project updated successfully",
    project,
  };
};
