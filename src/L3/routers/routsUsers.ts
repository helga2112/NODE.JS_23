import {
  autosuggestUser,
  createUser,
  deleteUser,
  updateUser,
} from "../service/modelServices/userService";
import { getAllUsers, getUser } from "../service/modelServices/userService";
import { UserInterface } from "../models/UserModel";
import express from "express";
import logger from "../utils/logger";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    logger.log("info", `[Users]: All Users: ${users}`);
    return res.send(users);
  } catch (error) {
    next({ message: `Users error: ${error}` });
  }
});

//  USERS AUTOSUGGESTS
router.get("/autosuggest", async (req, res, next) => {
  const { login, max } = req.body;
  try {
    const selectedUsers = await autosuggestUser(login, max);
    if (selectedUsers.length === 0) {
      return next({ message: `Autosuggest User Error: not found` });
    }
    res.send(selectedUsers);
  } catch (error) {
    next({ message: `Autosuggest User Error: ${error}` });
  }
});

//  GET USER BY ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (!user) {
      return next({ message: `Get User Error: not found` });
    }
    res.send(user);
  } catch (error) {
    next({ message: `Get User Error: ${error}` });
  }
});

// DELETE USER BY ID
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted: [affectedCount: number] = await deleteUser(Number(id));
    if (deleted[0] === 0) {
      return next({ message: `Delete user error: ${id} not deleted` });
    }
    res.send(`User ${id} deleted`);
  } catch (error) {
    next({ message: `Delete user error: ${error}` });
  }
});

//  UPDATE USER
router.put("/:id", async (req, res, next) => {
  const data: UserInterface = req.body;
  const { id } = req.params;

  try {
    const updatedId = await updateUser(data, id);
    if (updatedId === null) {
      return next({ message: `Update Error: user ${id} not found` });
    }
    res.send(`updated: ${id}`);
  } catch (error) {
    next({ message: `Update Error: ${error}` });
  }
});

//  CREATE NEW USER
router.post("/", async (req, res, next) => {
  const data: UserInterface = req.body;
  try {
    const user = await createUser(data);
    if (user === null) {
      return next({ message: "User was not created" });
    }

    res.send(user);
  } catch (error) {
    next({ message: "User was not created" });
  }
});

export default router;
