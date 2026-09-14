const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const errors = require("../../Trash/errors");
const OtpModel = require("../../models/OtpModel");
const generateToken = require("../../utils/generateToken");
const { validateCredentials } = require("../../utils/validators/authValidate");
const generateOTP = require("../../utils/generateOTP");
const sendOTPEmail = require("../../utils/sendOTP");
const bcrypt = require("bcrypt");
// verify admin credentials
const isAdminCredentialsValid = (userName, email, password) => {
  if (
    userName !== process.env.ADMIN_USERNAME ||
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    errors.unAuthorizedError(
      "Invalid credentials, please check your username, email, and password",
      "INVALID_CREDENTIALS",
    );
  }
};

/**
 * login as an admin
 * @method Post
 * @route /api/v1/auth/login
 * @access private Admin Only
 * @credentials {userName, email, password} from Dotenv file
 */

exports.loginAdminService = async (credentials) => {
  const { userName, email, password } = credentials;
  validateCredentials(userName, password, email);

  isAdminCredentialsValid(userName, email, password);
  const { otp, expiresAt } = generateOTP();
  const hashedOTP = await bcrypt.hash(otp, Number(process.env.SALT));
  await OtpModel.create({
    email,
    otpHash: hashedOTP,
    expiresAt,
  });
  await sendOTPEmail(email, otp, userName);
  return {
    success: true,
    message: "Credintials verified.OTP sent to your email",
  };
};
