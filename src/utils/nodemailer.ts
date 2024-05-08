import nodemailer from 'nodemailer';

const mailer = (
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string
) => {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
};

export {
  mailer
}