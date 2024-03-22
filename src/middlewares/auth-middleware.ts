/* eslint-disable consistent-return */
// import { idSchema } from '@src/middlewares/default-schemas/param-id';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {prisma} from '../utils'

import { NotAuthorizedError } from '../exceptions';

const authMiddleware = async (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
       const { token } = req.body;
       if (!token) {
          return next(new NotAuthorizedError());
       }
       const user = await prisma.ms_user.findUnique({
          where: {
            token
          }
       });
       (req as any).user = {
        id: user?.id,
        user: user?.user,
        nivel: user?.nivel,
        token: user?.token,
       }
      return  next();
    }

    const token = authorization?.split(' ')[1];
    const user = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET!);
    (req as any).user = user;

    if (!user) {
      return next(new NotAuthorizedError());
    }
  } catch (error: any) {
    return next(new NotAuthorizedError(error.message));
  }

  next();
};

export default authMiddleware;
