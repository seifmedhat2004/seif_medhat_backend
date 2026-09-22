const Message = require("../../models/messageModel");
const errors = require("../../Trash/errors");

/**Get all  messages for admin
 * @method Get
 * @ROLE Admin
 * @type Private
 */

exports.getAllMessagesService = async () => {
  const messages = await Message.find().select("name email message");
  if (!messages.length) {
    errors.notFoundError("no messages found", "NO_MESSAGES_FOUND");
  }
  return {
    success: true,
    messages,
  };
};
/**Get one message for admin
 * @method Get
 * @ROLE Admin
 * @type Private
 */
exports.getOneMessageService = async (messageID) => {
  const message = await Message.findById(messageID).select(
    "name email message isRead",
  );
  if (!message) {
    errors.notFoundError("no messages found", "NO_MESSAGES_FOUND");
  }
  message.isRead = true;
  await message.save();
  return {
    success: true,
    message,
  };
};
