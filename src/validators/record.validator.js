const Joi = require("joi");

const createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),

  type: Joi.string().valid("INCOME", "EXPENSE").required(),

  category: Joi.string().min(2).max(50).required(),

  note: Joi.string().allow("", null),

  date: Joi.date().required(),
});

const updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),

  type: Joi.string().valid("INCOME", "EXPENSE"),

  category: Joi.string().min(2).max(50),

  note: Joi.string().allow("", null),

  date: Joi.date(),
});

const querySchema = Joi.object({
  page: Joi.number().min(1),

  limit: Joi.number().min(1).max(100),

  type: Joi.string().valid("INCOME", "EXPENSE"),

  category: Joi.string(),

  search: Joi.string(),

  sort: Joi.string(),
});

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  querySchema,
};