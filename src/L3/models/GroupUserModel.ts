import { DataTypes, Sequelize } from "sequelize";
import { Group } from "./GroupModel";
import { User } from "./UserModel";
export const defineGroupUser = (sequelize: Sequelize) => {
  return sequelize.define("GroupUser", {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    GroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
        key: "id",
      },
    },
  });
};
