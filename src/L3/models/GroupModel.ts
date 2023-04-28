import { DataTypes, Model, Sequelize } from "sequelize";

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'

export type GroupInterface = {
    id?: number,
    name: string,
    permission: Array<Permission>
}

export class Group extends Model<GroupInterface> {}

export const initGroups = (connection: Sequelize) => {
    Group.init(
    {
      id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          is: ["[a-z]", "i"],
          min: 3,
          max: 30,
        },
      },
      permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          is: ["^[a-zA-Z0-9]", "i"],
          min: 8,
          max: 30,
        },
      },
    },
    {
      // Other model options go here
      sequelize: connection, // We need to pass the connection instance
      modelName: 'Group' // We need to choose the model name
    }
  );
}

