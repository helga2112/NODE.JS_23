import { DB_URI } from "../service/serverService/constants";
import { Sequelize } from "sequelize";
import logger from "../utils/logger";

export class DBConnectionManager {
  private static instance: DBConnectionManager;
  private _sequelize: Sequelize = new Sequelize(DB_URI);

  private _currentUserLogin: string = "";

  private constructor() {}

  public static getInstance(): DBConnectionManager {
    if (!DBConnectionManager.instance) {
      DBConnectionManager.instance = new DBConnectionManager();
    }

    return DBConnectionManager.instance;
  }

  public connect = async () => {
    logger.log("info", "[DB]: connect");
    try {
      await this._sequelize.authenticate();
      logger.log("info", "[DB]: connected ..");
      return this._sequelize;
    } catch (e) {
      logger.log("error", `[DB]: connection error ${e}`);
    }
  };

  public get sequelize() {
    return this._sequelize;
  }

  public disconnect = async () => {
    await this.sequelize.close();
  };

  public set currentUserLogin(login: string) {
    this._currentUserLogin = login;
  }

  public get currentUserLogin() {
    return this._currentUserLogin;
  }

  public checkToken(login: string) {
    return login === this.currentUserLogin;
  }
}
