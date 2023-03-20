import { getGroup } from "./service/modelServices/groupService";
import { addUserToGroup } from "./service/modelServices/groupUserService";
import { addDefaultValues } from "./service/modelServices/defaultValuseService";
import { handleUsersRouts } from "./routers/routsUsers";
import { DBConnectionManager } from "./manager/dbConnectionManager";
import { createServer } from "./service/serverService/serverService";
import { initUser, User } from "./models/UserModel";
import { Group, initGroups } from "./models/GroupModel";
import { Express } from "express-serve-static-core";
import { handleGroupsRouts } from "./routers/routsGroups";
import { Sequelize } from "sequelize";
import { defineGroupUser } from "./models/GroupUserModel";
import { createUser } from "./service/modelServices/userService";
import { handleGroupUserRouts } from "./routers/routsGroupUser";

export const createSqlServer = async () => {
  const connection: DBConnectionManager = DBConnectionManager.getInstance();

  const sequelize = connection.sequelize;
  const server = createServer();

  connection.connect();

  initUser(sequelize);
  User.sync({ force: false });

  initGroups(sequelize);
  Group.sync({ force: false });

  addDefaultValues();

  handleUsersRouts(server);
  handleGroupsRouts(server);

  const GroupUser = defineGroupUser(sequelize);

  User.belongsToMany(Group, {
    through: GroupUser,
  });
  Group.belongsToMany(User, {
    through: GroupUser,
  });

  User.hasMany(Group);
  Group.belongsTo(User);

  GroupUser.sync({ force: false });
  /* 
  const [user, created] = await createUser({
    id: 3,
    login: "testUser",
    email: "test@test.com",
    password: "W123",
    age: 23,
    isDeleted: false,
  });

  user.addGroup({id: 3, name: 'Name', permission: ['DELETE']} as Group) */

  handleGroupUserRouts(server);
  connection.sequelize.sync({ alter: false });

  // TODO: add DB disconect
  /* 
  server.on('close', () => {
    console.log('disconnect')
  }) */
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
};
