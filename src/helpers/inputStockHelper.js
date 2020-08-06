const Joi = require("@hapi/joi");

const newSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),

  sku: Joi.number().required(),

  description: Joi.string().min(3).max(60).required(),

  category: Joi.string().min(3).max(60).required(),

  priceUnit: Joi.number().required(),

  amount: Joi.number().required(),

  forecastSale: Joi.number().required()

});


const editSchema = Joi.object({
  name: Joi.string().min(3).max(60),

  description: Joi.string().min(3).max(60),

  category: Joi.string().min(3).max(60),

  priceUnit: Joi.number(),

  amount: Joi.number(),

  forecastSale: Joi.number()

});



module.exports = {newSchema, editSchema}