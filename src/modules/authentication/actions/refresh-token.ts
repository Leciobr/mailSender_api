// import * as jwt from 'jsonwebtoken';

// import { NotAuthorizedError } from '../../../exceptions';
// import { prisma } from '../../../utils';
// import { generateTokens } from '../helpers/generate-tokens';

// const refreshToken = async (body: any) => {
//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   const { refreshToken } = body;

//   const data = (await jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET!
//   )) as any;

//   const user = await prisma.users.findUnique({
//     where: {
//       id: data.id,
//     },
//     select: {
//       id: true,
//       name: true,
//       surname: true,
//       email: true,
//       refreshToken: true,
//       roles: {
//         select: {
//           type: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       },
//       topics: {
//         select: {
//           topic: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//       },
//       specialities: {
//         select: {
//           speciality: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   if (!user) {
//     throw new NotAuthorizedError('User Invalid');
//   }
//   if (user?.refreshToken !== refreshToken) {
//     throw new NotAuthorizedError('Invalid refresh token');
//   }

//   const tokens = await generateTokens(user, user?.email!);
//   await prisma.users.update({
//     where: {
//       id: user?.id,
//     },
//     data: {
//       lastAccess: new Date(),
//       refreshToken: tokens.refreshToken,
//     },
//   });

//   return tokens;
// };

// export default refreshToken;
