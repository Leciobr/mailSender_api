import * as Joi from 'joi';

const scheduleEmailPayloadValidator = Joi.object({
  token: Joi.string(),
  idMassa: Joi.string().required(),
  priority: Joi.number().required(),
  interval: Joi.number(),
  emailMsg: Joi.string().required(),
  emailSubject: Joi.string().required(),
  emailAttachment: Joi.string().empty('').allow(null),
  emails: Joi.array().items(
    Joi.object({
      email: Joi.string().email().required(),
      attachment: Joi.string().empty('').allow(null),
      variables: Joi.object().allow(null),
    }),
  ).required(),
  SMTP: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    user: Joi.string().required(),
    pwd: Joi.string().required(),
    smtp: Joi.string().required(),
    port: Joi.number().required(),
    encryption: Joi.string().required(),
    auth: Joi.string().required(),
    emailReply: Joi.string().email().required(),
  }).required(),
});



export {
  scheduleEmailPayloadValidator,
};
