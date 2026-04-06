const router = require("express").Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validator");

// Public routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;