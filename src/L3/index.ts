import { Singleton } from "./service/Singleton";
import { handleRouts } from "./routers/routs";
import { createServer } from "./service/serverService";
import { initUser, User } from "./models/UserModel";
import { Model } from "sequelize";

export const createSqlServer = async () => {
  const connection: Singleton = Singleton.getInstance();
  console.log(':::>>>>>>> ', connection)

  const server = createServer();

  connection.connect();

  initUser(connection.sequelize)

  await connection.createTable(User as typeof Model);
  handleRouts(server);
};
