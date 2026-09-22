const express= require("express")
const router = express.Router();
const {loginAdminController ,verifyOTPController }= require("../../controllers/auth/authController")


router.post("/login",loginAdminController);

router.post("/otpVerification",verifyOTPController)

module.exports = router;