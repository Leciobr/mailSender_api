/* eslint-disable consistent-return */
// import { idSchema } from '@src/middlewares/default-schemas/param-id';
import * as express from 'express';

import { NotAuthorizedError } from '../exceptions';

const apiKeyMiddleware = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  try {
    const apiKey = req.headers['x-api-key'];
    if (
      apiKey === process.env.APP_API_KEY!
    ) {
      return next();
    }

    return next(new NotAuthorizedError());
  } catch (error: any) {
    return next(new NotAuthorizedError(error.message));
  }
};

export default apiKeyMiddleware;
