const Joi = require("@hapi/joi");

const newSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),

  cnpj: Joi.string().min(3).max(60).required(),

  corporatName: Joi.string().min(3).max(60).required()
});


const editSchema = Joi.object({
  name: Joi.string().min(3).max(60),

  cnpj: Joi.string().min(3).max(60),

  corporatName: Joi.string().min(3).max(60)
});

module.exports = {newSchema, editSchema}