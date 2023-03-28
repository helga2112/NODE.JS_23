import Joi from "joi";

export const schema = Joi.object({
  login: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  age: Joi.number().integer().min(18).max(99),
}).with("username", "password");
