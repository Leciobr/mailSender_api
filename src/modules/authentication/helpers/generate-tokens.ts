import * as jwt from 'jsonwebtoken';
import ms from 'ms';

const generateTokens = async (user: any) => {
  const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN!;
  const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN!;
  const accessToken = await jwt.sign(
    {
      id: user?.id,
      user: user?.user,
      nivel: user?.nivel,
      token: user?.token,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: accessTokenExpiresIn }
  );

  const refreshToken = await jwt.sign(
    {
      id: user?.id,
      user: user?.user,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: refreshTokenExpiresIn }
  );

  return {
    accessToken: `Bearer ${accessToken}`,
    refreshToken,
    expiresIn: ms(accessTokenExpiresIn) / 1000,
    createdAt: new Date(),
  };
};

export { generateTokens };
