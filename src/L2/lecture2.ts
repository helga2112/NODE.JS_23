import { User } from "./model";
import bodyParser from "body-parser";
import express from "express";

const createServer = () => {
  const app = express();

  let users: User[] = [];

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.json({ message: "Server is running", users });
  });

  app.get("/:id", (req, res) => {
    const { id } = req.params;
    const found = users.some((user) => user.id === parseInt(id));
    if (found) {
      res.json(users.filter((user) => user.id === parseInt(id)));
    } else {
      res.status(400).send(`Something broke! No user with id: ${id}`);
    }
  });

  app.delete("/:id", (req, res) => {
    const { id } = req.params;
    const found = users.some((user) => user.id === parseInt(id));
    if (found) {
      res.json(users = users.filter((user) => user.id != parseInt(id)));
    } else {
      res.status(400).send(`Something broke! No user with id: ${id}`);
    }
  });

  app.post("/:id", (req, res) => {
    const data: User = req.body;
    console.log(req.body);
    const found = users.some((user) => user.id === data.id);
    console.log("found", found);
    if (found) {
      users = [...users, data];
      res.status(200).send(users);
    } else {
      res.status(400).send(`Something broke! No user with id: ${data.id}`);
    }
  });

  app.post("/", (req, res) => {
    const data: User = req.body;
    console.log(req.body);
    const found = users.some((user) => user.id === data.id);
    if (found) {
      res.status(400).send(`Something broke! No user with id: ${data.id}`);
    } else {
      users.push(data as User);
      res.status(200).send(users);
    }
  });

  let PORT = 8080;

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
export default createServer;
