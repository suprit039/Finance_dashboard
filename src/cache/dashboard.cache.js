const { getRedis } = require("../config/redis");

const CACHE_KEY = "dashboard_summary";

const getCachedSummary = async () => {
  const client = getRedis();
  if (!client) return null;

  const data = await client.get(CACHE_KEY);
  return data ? JSON.parse(data) : null;
};

const setCachedSummary = async (data) => {
  const client = getRedis();
  if (!client) return;

  await client.setEx(CACHE_KEY, 60, JSON.stringify(data)); // 60 sec cache
};

module.exports = {
  getCachedSummary,
  setCachedSummary,
};