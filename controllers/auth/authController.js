const asynchandler = require("express-async-handler")
const {loginAdminService} = require("../../services/auth/authService")

exports.loginAdminController =asynchandler(async(req , res)=>{
    const result = await loginAdminService(req.body)
    res.status(200).json(result)
})