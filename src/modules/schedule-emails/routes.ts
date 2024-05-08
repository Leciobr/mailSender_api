import express from 'express'

import createSchedule from './actions/create-schedule'
import getSchedules from './actions/get-schedule'
import deleteSchedule from './actions/delete-schedule';
import { authMiddleware, validateBodySchema } from '../../middlewares'
import { scheduleEmailPayloadValidator } from './schema'
import getScheduleEmails from './actions/get-schedule-emails'

const scheduleRoutes = express.Router()

scheduleRoutes.post(
  '/',
  authMiddleware,
  validateBodySchema(scheduleEmailPayloadValidator), 
  async (req, res, next) => {
  try {
    let { body } = req;

    body = {
      ...body,
      loggedUser: (req as any).user,
    };

    const schedule = await createSchedule(body);
    res.json(schedule);
  } catch (error) {
    next(error);
  }
})

scheduleRoutes.get(
  '/',
  authMiddleware,
  async (req, res, next) => {
    try {
      let { query } = req;  
      query = {
        ...query,
        loggedUser: (req as any).user,
      };
  
      const scheduleList = await getSchedules(query);
      res.json(scheduleList);
    } catch (error) {
      next(error);
    }
  });

  scheduleRoutes.get(
    '/:id/emails',
    authMiddleware,
    async (req, res, next) => {
      try {
        const scheduleEmails = await getScheduleEmails(Number(req.params.id));
        res.json(scheduleEmails);
      } catch (error) {
        next(error);
      }
    });

scheduleRoutes.delete(
  '/:id',
  authMiddleware,
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);    
      await deleteSchedule({
        id,
        loggedUser: (req as any).user,
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);



export default scheduleRoutes


