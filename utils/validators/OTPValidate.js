const error = require("../../Trash/errors");

const ValidateOTP = (email, otp) => {
  if (!email || !otp) {
    error.badRequestError("The OTP Is Required", "OTP Required");
  }
};

exports.ValidateOTP = ValidateOTP;
