const { getRedisClient } = require("../config/redis");

const cache = (ttlInSeconds = 300) => {
  return async (req, res, next) => {
    const redisClient = getRedisClient();

    // If Redis is not connected (e.g., REDIS_URL not set), skip caching
    if (!redisClient || !redisClient.isReady) {
      return next();
    }

    try {
      // Create a unique key using user ID and the requested URL
      const key = `cache:${req.user?.id || "public"}:${req.originalUrl}`;

      const cachedData = await redisClient.get(key);
      if (cachedData) {
        console.log(`⚡ Serving from cache: ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      // Override res.json to intercept the response and store it in cache
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        // Cache the response if it's successful (e.g. success: true, or 2xx status)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          redisClient.setEx(key, ttlInSeconds, JSON.stringify(body))
            .catch(err => console.error("Redis setEx error:", err));
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error("Cache middleware error:", error);
      next(); // Fail silently to allow normal processing if cache errors out
    }
  };
};

module.exports = cache;
