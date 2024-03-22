import Mail from 'nodemailer/lib/mailer'
import { logger, prisma, sleep, smtp } from '../../utils'
import { EmailStatus, Statuses } from '../schedule-emails/dtos'

const emailSender = async () => {

  /**
   * - implementar logica para renderizar emails e assuntos a partir de variaveis
   * - verificar a possilibidade de colocar um email que receba respposta diferente do original (reply-to)
   * {
	"token": "ff5a9ee2-d1f7-42e3-b5a2-acc1dfffca0a",
  "idMassa": "999999iamaral-2023-09-01-1643044",
  "priority": 1,
  "interval": 1,
  "emailMsg": "<!DOCTYPE html><html><body><p>Bem vindo {{name}} seu novo Id é {{id}}</p></body></html>",
  "emailSubject": "Olá {name} seu boleto vence dia {dueDate}",
  "emails": [
		{
      "email": "albovieira@gmail.com",
      "attachment": "c:\\sss.pdf",
      "variables": {
        "name": "Albo",
        "id": "999999"
      }
    },
    {
      "email": "lecio@gmail.com",
      "variables": {
        "name": "Lecio",
        "id": "888"
      }
    }
	],
  "SMTP": {
    "nome": "Ildebrando Amaral",
    "email": "iamaral@abc.com",
    "user": "iamaral@abc.com",
    "pwd": "avcadd123@2",
    "smtp": "stmp.abc.com",
    "port": 465,
    "encryption": "SSL",
    "auth": "normal",
    "emailReply": "iamaral2@abc.com"
  }
}
   * 
   */

  logger.info('Starting sender')

  const schedules = await prisma.ms_smtp.findMany({
    where: {
      status: Statuses.PENDING,
    },
    include: {
      ms_email: true,
    },
    orderBy: [
      { priority: "asc" }, // Sort by priority in ascending order
      { id: "asc" } // Sort by creation date in ascending order
    ],
  })

  if (schedules.length === 0) {
    logger.info('No emails to send')
    return
  }

  logger.info(`Found ${schedules.length} schedules to dispatch`)

  for (const schedule of schedules) {
    const emails = schedule.ms_email;

    const totals = await sendEmails(schedule, emails)

    const allSent = totals[EmailStatus.SENT] === emails.length;
    const allError = totals[EmailStatus.ERROR] === emails.length;
    const someWithErrors = !allError && totals[EmailStatus.ERROR] > 0;

    await prisma.ms_smtp.update({
      where: {
        id: schedule.id
      },
      data: {
        status: allSent ? Statuses.SENT : someWithErrors ? Statuses.SENT_WITH_ERRORS : Statuses.ERROR,
      }
    })
  }
}


const sendEmails = async (schedule: any, emails: any) => {
  const totals = {
    [EmailStatus.SENT]: 0,
    [EmailStatus.ERROR]: 0,
  }

  for (const emailRef of emails) {
    try {
      const variables = emailRef.variables ? JSON.parse(emailRef.variables) : {}

      const [subject, msg] = [
        schedule.email_subject,
        schedule.email_msg
      ].map((text:any) => {
        return text.replaceAll("\\{", "{").replaceAll("\\}", "}").replace(/{{(.*?)}}/g, (match:any, key:any) => {
          return variables[key.trim()] || match;
        })
      })

      const mailOptions = {
        from: schedule.smtp_email,
        to: emailRef.email,
        subject: subject,
        html: msg,
        attachments: [],
      } as Mail.Options
  
      const task = new Promise((resolve, reject) => {
        smtp.mailer(
          schedule.smtp_host,
          schedule.smtp_port,
          // schedule.smtp_encryption === 'SSL',
          false,
          schedule.smtp_user,
          schedule.smtp_pwd,
        ).sendMail(mailOptions, async (error, info) => {
          if (error) {
            logger.error(`Error sending email ${emailRef.email} for ${schedule.id}: ${error.message}`)
            reject(error)
          } else {
            logger.info(`Schedule ${schedule.id} sent: ${info.response}`)
            resolve(info)
          }
        })
      })
  
      await task
  
      await prisma.ms_email.update({
        where: {
          id: emailRef.id
        },
        data: {
          status: EmailStatus.SENT
        }
      })
      totals[EmailStatus.SENT]++
  
      if(schedule.interval) {
        await sleep(schedule.interval)
      }
    } catch (error:any) {
      console.log('ERROR:', error)
      await prisma.ms_email.update({
        where: {
          id: emailRef.id
        },
        data: {
          status: EmailStatus.ERROR,
          error_message: error.message
        }
      })
      totals[EmailStatus.ERROR]++
    }
  }

  return totals;
}

export default emailSender