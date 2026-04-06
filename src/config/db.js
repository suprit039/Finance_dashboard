const { Sequelize } = require("sequelize");
const config = require("./env");

const sequelize = new Sequelize(
  config.DB.NAME,
  config.DB.USER,
  config.DB.PASS,
  {
    host: config.DB.HOST,
    port: config.DB.PORT,
    dialect: "postgres",
    logging: config.NODE_ENV === "development" ? false : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB
};