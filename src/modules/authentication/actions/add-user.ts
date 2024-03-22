import { v4 as uuid } from 'uuid';
import { prisma, cryptoUtils } from '../../../utils'
import { AddUserPayload } from '../../schedule-emails/dtos'

const addUser = async (payload: AddUserPayload) => {

  var user = await prisma.ms_user.findUnique({
    where: {
      user: payload.user,
    },
  })

  if (user)
    throw new Error('User already exist')

  const salt = new Date().getTime().toString();
  const encryptedPass = cryptoUtils.encrypt(salt, payload.password);

  var newUser = await prisma.ms_user.create({
    data: {
      user: payload.user,
      nivel: payload.nivel,
      token: uuid(),
      salt: salt,
      password: encryptedPass,
    }
  })

  return {
    user: newUser.user,
    nivel: newUser.nivel,
    token: newUser.token,
  }
}

export default addUser
