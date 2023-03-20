import { Sequelize } from "sequelize";
import { DataTypes, Model } from "sequelize";

export interface UserInterface {
  id?: number;
  login: string;
  email:string;
  password: string
  age: number
  isDeleted: boolean
}

export class User extends Model<UserInterface> {}

export const initUser = (connection: Sequelize) => {
  User.init(
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
        validate: {
          is: ["[a-z]", "i"],
          min: 3,
          max: 30,
          allowNull: false,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          is: ["^[a-zA-Z0-9]", "i"],
          min: 8,
          max: 30,
          allowNull: false,
        },
      },
      email:{
        type: DataTypes.STRING,
        validate: {
          is: ['^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'],
        }
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          is: ["^(1[89]|[2-9][0-9])$", "i"],
        },
      },
      isDeleted: { type: DataTypes.BOOLEAN },
    },
    {
      // Other model options go here
      sequelize: connection, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    }
  );
}

