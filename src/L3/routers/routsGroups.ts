import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  updateGroup,
} from "../service/modelServices/groupService";
import { Express } from "express-serve-static-core";
import { GroupInterface } from "../models/GroupModel";
import { removeUserFromGroup } from "../service/modelServices/groupUserService";

export const handleGroupsRouts = (server: Express) => {
  server.get("/groups", (req, res) => {
    getAllGroups()
      .then((groups) => {
        console.log("All Groups:", groups);
        res.send(groups);
      })
      .catch((error) => {
        console.log("Groups error:", error);
        res.status(400).send(error);
      });
  });

  server.get("/group:id", (req, res) => {
    const { id } = req.params;
       getGroup(id)
      .then((group) => {
        if (group) {
          console.log('group :', group)
          res.send(group);
        } else {
          res.status(400).send(`Something broke! No group with id: ${id}`);
        }
      })
      .catch((error) => {
        res
          .status(400)
          .send(`Something broke! No group with id: ${id}`)
          .append(error);
      });
  });


  server.put("/group/:id", (req, res) => {
    const { id } = req.params;
    const { name, permission } = req.body;
    updateGroup(Number(id), name, permission)
      .then((updatedId) => {
        if (updatedId === null) {
          res.status(400).send("Not updated!");
        } else {
          console.log("updated :", updatedId);
          res.send(`updated: ${updatedId}`);
        }
      })
      .catch((error) => {
        res.status(400).send(`Something broke!Error: ${error}`);
      });
  });

  server.post("/group", (req, res) => {
    const { name, permission } = req.query;
    // TODO: add validation
    createGroup({ name: name, permission: permission } as GroupInterface)
      .then((group) => {
        if (group === null) {
          console.log("group not created :");
          res.status(400).send("Not created!");
        } else {
          console.log("created :", group);
          res.send(group);
        }
      })
      .catch((error) => {
        res.status(400).send(`Something broke!Error: ${error}`);
      });
  });
};
