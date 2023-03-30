import { addDefaultValues } from "./service/modelServices/defaultValuseService";
import { DBConnectionManager } from "./manager/dbConnectionManager";
import { createServer } from "./service/serverService/serverService";
import { initUser, User } from "./models/UserModel";
import { Group, initGroups } from "./models/GroupModel";
import { handleGroupUserRouts } from "./routers/routsGroupUser";
import logger from "./utils/logger";

export const createSqlServer = async () => {
  const connection: DBConnectionManager = DBConnectionManager.getInstance();

  const sequelize = connection.sequelize;
  const server = createServer();

  connection.connect();

  initUser(sequelize);
  User.sync({ force: false });

  initGroups(sequelize);
  Group.sync({ force: false });

  await addDefaultValues();

  handleGroupUserRouts(server);

  logger.log("info", "[APP]: started");
};
