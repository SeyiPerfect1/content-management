import * as Joi from '@hapi/joi';

export const mailerValidationSchema = Joi.object({
    AUTH_EMAIL: Joi.string().required(),
    AUTH_PASS: Joi.string().required(),
  })