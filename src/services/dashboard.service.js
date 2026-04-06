const Record = require("../models/record.model");
const { getCachedSummary, setCachedSummary } = require("../cache/dashboard.cache");
const { Op, fn, col } = require("sequelize");

const getCategoryWise = async () => {
  return await Record.findAll({
    attributes: [
      "category",
      [fn("SUM", col("amount")), "total"],
    ],
    group: ["category"],
  });
};

const getRecentTransactions = async () => {
  return await Record.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
};
const getDashboardSummary = async () => {
  const cached = await getCachedSummary();
  if (cached) return cached;

  const income = await Record.sum("amount", { where: { type: "INCOME" } });
  const expense = await Record.sum("amount", { where: { type: "EXPENSE" } });

  const result = {
    totalIncome: income || 0,
    totalExpense: expense || 0,
    netBalance: (income || 0) - (expense || 0),
  };

  await setCachedSummary(result);

  return result;
};
module.exports = {
  getDashboardSummary,
  getCategoryWise,
  getRecentTransactions,
};