const dotenv = require("dotenv");

dotenv.config();

const required = (key, fallback = undefined) => {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === null || value === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: required("PORT"),
  DB: {
    HOST: required("DB_HOST"),
    PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    NAME: required("DB_NAME"),
    USER: required("DB_USER"),
    PASS: required("DB_PASS")
  },
  JWT: {
    SECRET: required("JWT_SECRET"),
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d"
  },
  REDIS_URL: process.env.REDIS_URL || null
};

module.exports = config;