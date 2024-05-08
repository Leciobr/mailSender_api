import { NotAuthorizedError } from '../../../exceptions';
import { prisma, cryptoUtils } from '../../../utils';
import { generateTokens } from '../helpers/generate-tokens';

const auth = async (body: any) => {
  const { user, password } = body;
  const userInfo = await prisma.ms_user.findUnique({
    where: {
      user,
    },
    select: {
      id: true,
      password: true,
      salt: true,
      nivel: true,
      token: true,
      user: true,

    },
  });

  if (!userInfo) {
    throw new NotAuthorizedError('User Invalid');
  }

  const hashedPassword = userInfo?.password;
  if (cryptoUtils.check(userInfo?.salt!, password, hashedPassword!)) {
    const tokens = await generateTokens(userInfo);
    return tokens;
  }
  throw new NotAuthorizedError('User Invalid');
};

export default auth;
