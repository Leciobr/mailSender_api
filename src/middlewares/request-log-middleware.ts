/* eslint-disable consistent-return */
// import { idSchema } from '@src/middlewares/default-schemas/param-id';
import * as express from 'express';

import { logger } from '../utils';

const requestLogMiddleware = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  const headers = { ...req.headers };
  delete headers.authorization;
  const requestInfo = {
    headers,
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    params: req.params,
    timestamp: new Date().toISOString(),
  };

  const logMessage = JSON.stringify(requestInfo);
  logger.info(logMessage);

  next();
};

export default requestLogMiddleware;
