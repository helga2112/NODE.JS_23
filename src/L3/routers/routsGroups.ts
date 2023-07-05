import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  updateGroup,
} from "../service/modelServices/groupService";
import { GroupInterface } from "../models/GroupModel";
import express from "express";
import logger from "../utils/logger";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const groups = await getAllGroups();  // limit like in pagination 
    logger.log("info", `[Groups]: groups recieved`);
    res.send(groups);
  } catch (error) {
    next({ message: `Groups error: ${error}` });
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const group = await getGroup(id);
    if (!group) {
      return next({ message: `Group error: no group found` });
    }
    res.send(group);
  } catch (error) {
    next({ message: `Group error: ${error}` });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, permission } = req.body;

  try {
    const updatedId = await updateGroup(Number(id), name, permission);
    if (updatedId === null) {
     return next({ message: `Group error: no group found` });
    }
    res.send(`Group updated: ${updatedId}`);
  } catch (error) {
    next({ message: `Group error: ${error}` });
  }
});

//  CREATE GROUP
router.post("/", async (req, res, next) => {
  const { name, permission } = req.query;

  try {
    // TODO: add validation
    const group = await createGroup({
      name: name,
      permission: permission,
    } as GroupInterface);
    if (group === null) {
      return next({ message: `Group error: no group created` });
    }
    res.send(group);
  } catch (error) {
    next({ message: `Group error: ${error}` });
  }
});

// DELETE GROUP
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // TODO: add validation
    const deletedAmount = await deleteGroup(Number(id));
    if (deletedAmount === 0) {
      return next({ message: `Group error: group was not deleted ${id}` });
    }
    res.send(`Group ${id} was deleted`);
  } catch (error) {
    next({ message: `Group error:  ${error}` });
  }
});

export default router;
