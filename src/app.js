const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const recordRoutes = require("./routes/record.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const setupSwagger = require("./docs/swagger");

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/health", (req, res) => res.status(200).send("OK"));

module.exports = app;