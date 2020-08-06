const Joi = require("@hapi/joi");

const newSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),

  lastname: Joi.string().min(3).max(60).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password")
});


const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})


const editSchema = Joi.object({
  name: Joi.string().min(3).max(60),

  lastname: Joi.string().min(3).max(60),

  username: Joi.string().min(3).max(60),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});


module.exports = {newSchema, loginSchema, editSchema }
