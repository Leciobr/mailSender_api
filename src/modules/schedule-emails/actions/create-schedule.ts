import { BadRequestError } from '../../../exceptions'
import prisma from '../../../utils/prisma'
import { EmailStatus, ScheduleEmailPayload, Statuses } from '../dtos'

const createSchedule = async (payload: ScheduleEmailPayload) => {
  var user = await prisma.ms_user.findUnique({
    where: {
      id: payload.loggedUser.id,
    },
  })

  if (!user)
    throw new BadRequestError('User not found')

  var scheduleForIdAlreadyExist = await prisma.ms_smtp.findFirst({
    where: {
      id_massa: payload.idMassa,
    }
  })
  if(scheduleForIdAlreadyExist) {
    throw new BadRequestError('Schedule for this id already exist')
  }

  var smtpConfig = await prisma.ms_smtp.create({
    data: {
      ms_user_id: user.id,
      id_massa: payload.idMassa,
      status:  Statuses.PENDING,
      priority: payload.priority,
      interval: payload.interval,
      email_msg: payload.emailMsg,
      email_subject: payload.emailSubject,
      email_attach: payload.emailAttachment,
      smtp_auth: payload.SMTP.auth,
      smtp_encryption: payload.SMTP.encryption,
      smtp_email: payload.SMTP.email,
      smtp_email_reply: payload.SMTP.emailReply,
      smtp_name: payload.SMTP.nome,
      smtp_host: payload.SMTP.smtp,
      smtp_pwd: payload.SMTP.pwd,
      smtp_user: payload.SMTP.user,
      smtp_port: payload.SMTP.port,
      ms_email: {
        createMany: {
          data: payload.emails.map((data:any) => {
            return {
              email: data.email,
              attachment: data.attachment,
              status: EmailStatus.PENDING,
              variables: JSON.stringify(data.variables || {}),
            }
          })
        }
      }
    },
  })

  return {
    ...smtpConfig,
    emails: payload.emails,
  }
}

export default createSchedule
