import express from "express";
import { DBConnectionManager } from "../../manager/dbConnectionManager";
import { errorHandler } from "../../middlewhare/errorHandler";
import { AUTH_ROUTE, GROUP_ROUTE, USER_ROUTE } from "../../routers";
import logger from "../../utils/logger";
import { tockenCheck } from "../../middlewhare/tokenCheck";

export const createServer = () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  
  server.use("/login", AUTH_ROUTE);
  server.use(tockenCheck);

  server.use("/users", USER_ROUTE);
  server.use("/group", GROUP_ROUTE);
  server.use(errorHandler);

  let PORT = 8080;

  process.on('uncaughtException', function (err) {
    logger.log("error", `[process]: UNCAUGHT EXCEPTION`);
    logger.log("error", `[Inside 'uncaughtException' event]: ${ err.stack || err.message}`);
  });

  server.on("close", () => {
    DBConnectionManager.getInstance().disconnect();
  });

  server.listen(PORT, () => {
    logger.log("info", `[server]: Server is listening on port ${PORT}`);
  });

  return server;
};
