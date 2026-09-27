const express = require("express");

const router = express.Router();
const upload = require("../../Middlewares/uploadMiddleware");
const protect = require("../../Middlewares/authMiddleware");

const {
  addProjectController,
  getAllProjectsController,
  getProjectDetailsController,
  deleteProjectController,
  updateProjectController,
} = require("../../controllers/admin/projectController");

router.post(
  "/add-project",
  protect,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  addProjectController,
);

router.get("/projects", protect, getAllProjectsController);
router.get("/projects/:projectID", protect, getProjectDetailsController);
router.delete("/project/:projectID", protect, deleteProjectController);
router.patch(
  "/project/:projectID",
  protect,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateProjectController,
);
module.exports = router;
