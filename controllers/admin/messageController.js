const asyncHandler = require("express-async-handler");
const {
  getAllMessagesService,
  getOneMessageService,
} = require("../../services/admin/messageService");

exports.getAllMessagesController = asyncHandler(async (req, res) => {
  const result = await getAllMessagesService();
  res.status(200).json(result);
});

exports.getOneMessageController = asyncHandler(async (req, res) => {
  const messageID = req.params.messageID;

  const result = await getOneMessageService(messageID);

  res.status(200).json(result);
});
