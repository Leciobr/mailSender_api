import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const frmt = printf(({ level, message, timestamp: time }) => {
  return `${time} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(format.colorize(), timestamp(), frmt),
  transports: [new transports.Console({ level: 'info' })],
});

export default logger;
