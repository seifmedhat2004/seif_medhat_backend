const express = require("express");
const router = express.Router();
const {
  getAllMessagesController,
  getOneMessageController,
} = require("../../controllers/admin/messageController");

const protect = require("../../Middlewares/authMiddleware");

router.get("/messages", protect, getAllMessagesController);
router.get("/messages/:messageID", protect, getOneMessageController);

module.exports = router;
