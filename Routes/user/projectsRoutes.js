const express = require("express");
const router = express.Router();
const {
  getAllProjectsController,
  getProjectDetailsController,
} = require("../../controllers/user/projectsController");

router.get("/projects", getAllProjectsController);
router.get("/projects/:projectID", getProjectDetailsController);
module.exports = router;
