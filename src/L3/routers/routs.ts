import {
  autosuggestUser,
  createUser,
  deleteUser,
  updateUser,
} from "./../service/requestsService";
import { Express } from "express-serve-static-core";
import { getAllUsers, getUser } from "../service/requestsService";
import { UserInterface } from "../models/UserModel";

export const handleRouts = (server: Express) => {
  server.get("/", (req, res) => {
    getAllUsers()
      .then((users) => {
        console.log("All Users :", users);
        res.send(users);
      })
      .catch((error) => {
        console.log("Users error:", error);
        res.status(400).send(error);
      });
  });

  server.get("/autosuggest", (req, res) => {
    const { login, max } = req.body;
    autosuggestUser(login, max)
      .then((selectedUsers) => {
        console.log('autosuggest :', selectedUsers)
        if (selectedUsers.length === 0) {
          res.status(400).send("Not found");
        } else {
          console.log(selectedUsers);
          res.send(selectedUsers);
        }
      })
      .catch((error) => {
        res.status(400).send(`Something broke!Error: ${error}`);
      });
  });

  server.get("/:id", (req, res) => {
    const { id } = req.params;
    getUser(id)
      .then((user) => {
        if (user) {
          console.log('user :', user)
          res.send(user);
        } else {
          res.status(400).send(`Something broke! No user with id: ${id}`);
        }
      })
      .catch((error) => {
        res
          .status(400)
          .send(`Something broke! No user with id: ${id}`)
          .append(error);
      });
  });

  server.delete("/:id", (req, res) => {
    const { id } = req.params;
    deleteUser(Number(id))
      .then((result) => {
        console.log("Delete status", result);
        if (Number.isNaN(result)) {
          res.status(400).send(`Not deleted!: ${id}`);
        } else {
          console.log("Deleted :", id);
          res.send(`User ${id} deleted`);
        }
      })
      .catch((error) => {
        res.status(400).send(`Something broke!Error: ${error}`);
      });
  });

  server.put("/:id", (req, res) => {
    const data: UserInterface = req.body;
    const { id } = req.params;
     updateUser(data, id)
      .then((updatedId) => {
        if (updatedId === null) {
          res.status(400).send("Not updated!");
        } else {
          console.log('updated :', updatedId)
          res.send('updated: ', updatedId);
        }
      })
      .catch((error) => {
        res.status(400).send(`Something broke!Error: ${error}`);
      }); 
  });

  server.post("/", (req, res) => {
    const data: UserInterface = req.body;
    createUser(data)
      .then((user) => {
        if (user === null) {
          console.log('user not created :')
          res.status(400).send("Not created!");
        } else {
          console.log('created :', user);
          res.send(user);
        }
      })
      .catch((error) => {
        res.status(400).send(`Something broke!Error: ${error}`);
      });
  });
};
