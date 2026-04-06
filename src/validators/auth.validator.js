const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9@#_$%^&+=]*$"))
    .messages({
      "string.pattern.base":
        "Password can contain letters, numbers and @#_$%^&+=",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};