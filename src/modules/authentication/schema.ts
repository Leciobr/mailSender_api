import * as Joi from 'joi';

const authSchema = Joi.object({
  password: Joi.string().required(),
  user: Joi.string()
    .required(),
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const addUserPayloadValidator = Joi.object({
  user: Joi.string().required(),
  nivel: Joi.string().required(),
  password: Joi.string().required(),
});

export {
  authSchema,
  refreshTokenSchema,
  addUserPayloadValidator,
};
