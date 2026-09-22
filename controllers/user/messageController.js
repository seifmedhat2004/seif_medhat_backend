const asynchandler = require("express-async-handler");
const { sendMessageService } = require("../../services/user/messageService");

exports.sendMessageController = asynchandler(async (req, res) => {
  result = await sendMessageService(req.body);

  res.status(200).json(result);
});
