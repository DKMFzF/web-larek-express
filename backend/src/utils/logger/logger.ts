import { createLogger, format, transports } from 'winston';
const { combine, colorize, timestamp, simple } = format;

const pathLogs = `./logs`;

export const jsonFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
);

export const consoleFormat = combine(
  colorize(),
  simple(),
);

export const logger = createLogger({
  level: 'info',
  format: jsonFormat,
  transports: [
    new transports.File({ filename: `${pathLogs}/error.log`, level: 'error' }),
    new transports.File({ filename: `${pathLogs}/combined.log` }),
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ 
    level: 'debug',
    format: consoleFormat
  }));
}
