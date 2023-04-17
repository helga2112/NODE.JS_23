import { Op } from "sequelize";
import { User } from "../models/UserModel";

export const authorize = async (login: string, password: string) => {
   return await User.findOne({ where: { login, [Op.and]: [{ password }] } });
};
