import * as crypto from 'crypto';

const encrypt = (salt: string, password: string) =>
  crypto.createHmac('sha1', salt).update(password).digest('hex');

const check = (salt: string, password: string, hashedPassword: string) =>
  crypto.createHmac('sha1', salt).update(password).digest('hex') ===
  hashedPassword;

export { encrypt, check };
