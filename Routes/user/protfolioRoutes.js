const express = require("express");
const router = express.Router();
const{getPortfolioController} = require("../../controllers/user/portfolioConttroller")

router.get("/portfolio",getPortfolioController)

module.exports = router;
