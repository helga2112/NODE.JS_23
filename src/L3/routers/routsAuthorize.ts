import express from "express";
import { userLogIn } from "../service/modelServices/authorizeServise";
import { DBConnectionManager } from "../manager/dbConnectionManager";

const router = express.Router();

const manager = DBConnectionManager.getInstance();

//  USERS AUTOSUGGESTS
router.get("/", async (req, res, next) => {
  const { login, password } = req.body;
  try {
    const  token = await userLogIn(login, password);
    manager.currentUserLogin = login;
    res.send({ token });
  } catch (error) {
    next({ message: error });
  }
});
export default router;
