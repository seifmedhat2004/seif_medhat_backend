const asyncHandler = require("express-async-handler");
const { getPortfolioService } = require("../../services/user/portfolioService");

exports.getPortfolioController = asyncHandler(async (req, res) => {
  const result = await getPortfolioService();
  res.status(200).json(result);
});
