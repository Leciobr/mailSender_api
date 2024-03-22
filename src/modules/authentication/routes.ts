import express from 'express';

import {
  auth,
  addUser,
} from './actions';
import {
  authSchema,
} from './schema';
import { apiKeyMiddleware, validateBodySchema, } from '../../middlewares'
import { addUserPayloadValidator } from './schema'

const authRoutes = express.Router();

authRoutes.post(
  '/sign-up',
  apiKeyMiddleware,
  validateBodySchema(addUserPayloadValidator), 
  async (req, res, next) => {
  try {
    let { body } = req;

    body = {
      ...body,
    };

    const user = await addUser(body);
    res.json(user);
  } catch (error) {
    next(error);
  }
})

authRoutes
  .post(
    '/',
    validateBodySchema(authSchema),
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const token = await auth(req.body);
        res.json(token);
      } catch (error) {
        next(error);
      }
    }
  )
 

export default authRoutes;
