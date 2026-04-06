const { createClient } = require("redis");
const config = require("./env");

let redisClient = null;

const connectRedis = async () => {
  if (!config.REDIS_URL) {
    console.log("ℹ️ Redis disabled (REDIS_URL not set)");
    return null;
  }

  redisClient = createClient({
    url: config.REDIS_URL
  });

  redisClient.on("error", (err) => {
    console.error("Redis error:", err.message);
  });

  await redisClient.connect();
  console.log("✅ Redis connected successfully");

  return redisClient;
};

const getRedisClient = () => redisClient;

module.exports = {
  connectRedis,
  getRedisClient
};