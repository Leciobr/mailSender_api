require('dotenv').config()
import 'reflect-metadata'

import {logger} from '../utils'
import emailSender from '../modules/sender/email-sender'

// (async () => {
//   try {
//     logger.info('Starting email sender job');
//     await emailSender()
//     logger.info('Email sender job finished');
//   } catch (error:any) {
//     logger.error(`Error running email sender job: ${error.message}`)
//   }
// })();

const email_sender_job = async() => {
  try {
    logger.info('Starting email sender job');
    await emailSender()
    logger.info('Email sender job finished');
  } catch (error:any) {
    logger.error(`Error running email sender job: ${error.message}`)
  }
};

export default email_sender_job

