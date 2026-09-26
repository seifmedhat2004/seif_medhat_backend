const express = require("express");
const router = express.Router();
const protect = require("../../Middlewares/authMiddleware");
const {
  addSkillController,
  getAllSkillController,
  updateSkillController,
  deleteSkillController,
} = require("../../controllers/admin/skillController");

router.post("/add-skill", protect, addSkillController);
router.get("/skills", protect, getAllSkillController);
router.patch("/update-skill/:skillID", protect, updateSkillController);
router.delete("/delete-skill/:skillID", protect, deleteSkillController);

module.exports = router;
