const Message = require("../../models/messageModel");
const errors = require("../../Trash/errors");
const {messageValidation} = require("../../utils/validators/messageValidation")

//post message for users

exports.sendMessageService = async (messageBody) => {
  const { name, email, message } = messageBody;
  messageValidation(name ,email , message )
  await Message.create({
    name,
    email,
    message
  })

  return({
    success:true,
    message:"Message sent succefully"
  })
};
