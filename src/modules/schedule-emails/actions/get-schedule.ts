import { Prisma } from '@prisma/client'
import { prisma } from '../../../utils'

const getSchedules = async (filters: any) => { 
  const { idMassa, status } = filters;

  if(!filters.startDate) {
    filters.startDate = new Date();
  }
  if(!filters.endDate) {
    filters.endDate = new Date();
  }

  const where = {
    // created_at: {
    //   gte: filters.startDate,
    //   lte: filters.endDate,
    // },
  } as Prisma.ms_smtpWhereInput;

  if(idMassa) {
    where.id_massa = idMassa;
  }
  if(status) {
    where.status = status;
  }
  
  const schedules = await prisma.ms_smtp.findMany({
    where,
    select: {
      id: true, 
      id_massa: true,
      status: true,
      priority: true,
      email_subject: true,
      ms_email: {
        select: {
          email: true,          
        }
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return schedules;
}

export default getSchedules;