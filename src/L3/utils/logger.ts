import winston, { Logger, format } from "winston";

const logger: Logger = winston.createLogger({
  level: "debug",
  format: format.combine(format.splat(), format.simple(),  winston.format.colorize({ all: true }),),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
  exitOnError: false,
});

logger.transports[0].on('finish',  ()=> {
  logger.close();
});


export default logger;
