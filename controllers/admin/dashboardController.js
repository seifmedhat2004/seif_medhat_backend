const {
  getDashboardService,
} = require("../../services/admin/dashboardService");
const asyncHandler = require("express-async-handler");

exports.getDashboardController = asyncHandler(async (req, res, next) => {
  const result = await getDashboardService();

  return res.status(200).json(result);
});
