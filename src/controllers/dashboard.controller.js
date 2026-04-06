const asyncHandler = require("../utils/asyncHandler");
const dashboardService = require("../services/dashboard.service");

exports.getSummary = asyncHandler(async (req, res) => {
  const summary = await dashboardService.getDashboardSummary();

  res.json({
    success: true,
    data: summary,
  });
});

exports.getCategoryWise = asyncHandler(async (req, res) => {
  const data = await dashboardService.getCategoryWise();

  res.json({
    success: true,
    data,
  });
});

exports.getRecent = asyncHandler(async (req, res) => {
  const data = await dashboardService.getRecentTransactions();

  res.json({
    success: true,
    data,
  });
});