import * as Joi from '@hapi/joi';

export const jwtValidationSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
  })