import { prisma } from '../../../utils'

const getScheduleEmails = async (scheduleId: any) => { 
  const emails = await prisma.ms_email.findMany({
    where: {
      ms_smtp_id: scheduleId,
    },
    include: {
      ms_smtp: true,
    }
  });
  return emails;
}

export default getScheduleEmails;