import { userLogIn } from "./../service/modelServices/authorizeServise";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { DBConnectionManager } from "../manager/dbConnectionManager";

dotenv.config();
const manager = DBConnectionManager.getInstance();

export const tockenCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken: string = req.headers["x-access-token"] as string;
  const secret = process.env.JWT_SECRET || "secret_word";
  if (!userToken) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(userToken, secret);
    console.log("DECODED token", decoded);
    manager.checkToken(decoded as string);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
