import { authorize } from "../../data-access/login";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

dotenv.config()

export const userLogIn = async (login: string, password: string) => {
  try {
    const selectedUser = await authorize(login, password);
    if (selectedUser === null) {
      throw Error(`[AUTH]: login error: user not found`);
    }

    const secret = process.env.JWT_SECRET || 'secret_word';
    console.log(">>>> SECRET", secret);
    const token = jwt.sign({ login, password }, secret, {
      expiresIn: "2h",
    });
    return token
  } catch (error) {
    throw Error(`[AUTH]: login error: ${error}`);
  }
};
