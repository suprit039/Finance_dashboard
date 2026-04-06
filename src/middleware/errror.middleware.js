const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.errors.map((e) => e.message),
    });
  }

  // Sequelize Unique Constraint
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value",
    });
  }

  // Default
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;