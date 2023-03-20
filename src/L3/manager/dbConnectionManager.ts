import { DB_URI } from "../service/serverService/constants";
import { Sequelize } from "sequelize";

export class DBConnectionManager {
  private static instance: DBConnectionManager;
  private _sequelize: Sequelize = new Sequelize(DB_URI);

  private constructor() {}

  public static getInstance(): DBConnectionManager {
    if (!DBConnectionManager.instance) {
      DBConnectionManager.instance = new DBConnectionManager();
    }

    return DBConnectionManager.instance;
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

/*   public createUsersTable = async (model: typeof Model) => {
    await User.sync({ force: true });
    console.log("The table for the User model dwas just (re)created!");
  };

  public createGroupTable = async (model: typeof Model) => {
    await Group.sync({ force: true });
    console.log("The table for the User model dwas just (re)created!");
  }; */

  public get sequelize() {
    return this._sequelize;
  }
}
