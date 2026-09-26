const express = require("express");
const router = express.Router();
const protect = require("../../Middlewares/authMiddleware");
const {
  addProfileController,
  updateProfileController,
  getProfileController,
} = require("../../controllers/admin/profileController");

router.post("/addProfile", protect, addProfileController);
router.patch("/update-profile/:profileID", protect, updateProfileController);
router.get("/profile", protect, getProfileController);

module.exports = router;
