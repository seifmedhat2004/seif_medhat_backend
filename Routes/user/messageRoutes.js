const express = require("express");
const router = express.Router();
const {
  sendMessageController,
} = require("../../controllers/user/messageController");


router.post("/message",sendMessageController)

module.exports = router;
