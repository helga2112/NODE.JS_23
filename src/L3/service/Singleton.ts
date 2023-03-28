import { DB_URI } from "./constants";
import { Sequelize } from "sequelize";
import { Model } from "sequelize";
import { User } from "../models/UserModel";

export class Singleton {
  private static instance: Singleton;
  private _sequelize: Sequelize = new Sequelize(DB_URI);

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  public connect = async () => {
    console.log("connect");
    try {
      await this._sequelize.authenticate();
      console.log("Connected ...");
      return this._sequelize;
    } catch (e) {
      console.log("Connection Error", e);
    }
  };

  public createTable = async (model: typeof Model) => {
    await User.sync({ force: true });
    console.log("The table for the User model dwas just (re)created!");
  };

  public get sequelize() {
    console.log(">>>>>>>>>>>>>>>", this._sequelize);
    return this._sequelize;
  }
}
