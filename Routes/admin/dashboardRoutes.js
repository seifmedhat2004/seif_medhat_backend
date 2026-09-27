const express = require("express");
const router = express.Router();
const protect = require("../../Middlewares/authMiddleware");
const {
  getDashboardController,
} = require("../../controllers/admin/dashboardController");

router.get("/dashboard", protect, getDashboardController);
module.exports = router;
