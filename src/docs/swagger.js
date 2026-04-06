const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Finance Dashboard API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
    },
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Login user",
      },
    },
    "/records": {
      get: {
        summary: "Get all records",
      },
    },
  },
};

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwagger;