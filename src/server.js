const app = require("./app.js");
const { sequelize, connectDB } = require("./config/db.js");
const { connectRedis } = require("./config/redis.js");
const User = require("./models/user.model");
const Record = require("./models/record.model");

// Associations
User.hasMany(Record, { foreignKey: "userId" });
Record.belongsTo(User, { foreignKey: "userId" });

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await connectRedis();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
};

start();