import { prisma } from '../../../utils'
import { Statuses } from '../dtos'

const deleteSchedule = async (data:any) => { 
  const { id, loggedUser } = data;

  const isAdmin = loggedUser.nivel === 'admin';

  const schedule = isAdmin ? await prisma.ms_smtp.findFirst({
    where: {
      id: id,
    },
  }) : await prisma.ms_smtp.findFirst({
    where: {
      id: id,
      ms_user_id: loggedUser.id,
    },
  });

  if (!schedule) {
    throw new Error('Schedule not found');
  }

  if(schedule?.status == Statuses.SENT || schedule?.status == Statuses.ERROR) {
    throw new Error('You cannot delete a sent or error schedule');
  }
  
  await prisma.ms_email.deleteMany({
    where: {
      ms_smtp_id: id,
    },
  });
  await prisma.ms_smtp.delete({
    where: {
      id: id,
    },
  });
}

export default deleteSchedule;