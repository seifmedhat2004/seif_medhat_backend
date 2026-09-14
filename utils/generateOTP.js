const crypto = require("crypto");

const generateOTP = () => {
  const otp = crypto.randomInt(100000, 1000000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
  return { otp, expiresAt };
};
module.exports = generateOTP;
