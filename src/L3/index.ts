import { getGroup } from "./service/modelServices/groupService";
import { addUserToGroup } from "./service/modelServices/groupUserService";
import { addDefaultValues } from "./service/modelServices/defaultValuseService";
import { handleUsersRouts } from "./routers/routsUsers";
import { DBConnectionManager } from "./manager/dbConnectionManager";
import { createServer } from "./service/serverService/serverService";
import { initUser, User } from "./models/UserModel";
import { Model } from "sequelize";
import { createInitialValues } from "./service/userService";

export const createSqlServer = async () => {
  console.log('CREATE SERVER')
  const connection: Singleton = Singleton.getInstance();
  const DB = connection.sequelize

  const server = createServer(DB);

  connection.connect();

  initUser(DB)

  await connection.createTable(User as typeof Model);
  createInitialValues()

  handleRouts(server);
};
