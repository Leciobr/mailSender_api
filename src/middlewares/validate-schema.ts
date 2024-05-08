/* eslint-disable consistent-return */
// import { idSchema } from '@src/middlewares/default-schemas/param-id';
import * as express from 'express';
import * as Joi from 'joi';

const validateSchema = (data: any, schema: Joi.Schema) => {
  const validated = schema.validate(data);
  return validated;
};

const validateQueryParamsSchema = (schema: Joi.Schema) => {
  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    const { query } = req;
    const { error } = validateSchema(query, schema);

    if (error) {
      return next(error);
    }

    next();
  };
};

const validateBodySchema = (schema: Joi.Schema) => {
  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    const { body } = req;
    const { error } = validateSchema(body, schema);

    if (error) {
      return next(error);
    }

    next();
  };
};

export { validateBodySchema, validateQueryParamsSchema };
