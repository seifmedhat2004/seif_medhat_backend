const express= require("express")
const router = express.Router();
const {loginAdminController}= require("../../controllers/auth/authController")
const {protect}= require("../../Middlewares/authMiddleware")


router.post("/login",loginAdminController);

module.exports = router;