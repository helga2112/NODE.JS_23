import { User } from "./model";
import express from "express";
import { getAutoSuggestUsers } from "./utils";
import { createValidator } from "express-joi-validation";
import { schema } from "./ValidationSchema";

const createServer = () => {
  const app = express();

  let users: User[] = [];

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  const validator = createValidator({});

  const querySchema = schema;

  app.get("/", (req, res) => {
    res.json({ users });
  });

  app.get("/autosuggest", (req, res) => {
    const { login, max } = req.body;
    const selectedUsers = getAutoSuggestUsers(users, login, max);
    if (selectedUsers.length > 0) {
      res.json(selectedUsers);
    } else {
      res
        .status(400)
        .send(
          `Something went wrong! No users with following login chars: ${login}`
        );
    }
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
      res.json((users = users.filter((user) => user.id != parseInt(id))));
    } else {
      res.status(400).send(`Something broke! No user with id: ${id}`);
    }
  });

  app.put("/:id", (req, res) => {
    console.log('POST');
    const { id } = req.params;
    const data: User = req.body;
    console.log(data);
    const found = users.some((user) => user.id === Number(id));
    console.log("found", found);
    if (found) {
      users = [...users, data];
      res.status(200).send(users);
    } else {
      res.status(400).send(`Something broke! No user with id: ${data.id}`);
    }
  });

  app.post("/", validator.body(querySchema), (req, res) => {
    const data: User = req.body;
    const found = users.some(
      (user) => user.login === data.login && user.password === data.password
    );
    if (found) {
      res
        .status(400)
        .send(`Something went wrong! User already exist: ${data.login}`);
    } else {
      const newUser: User = { ...data, id: users.length, isDeleted: false };
      console.log(newUser);
      users.push(newUser);
      res.status(200).send(users);
    }
  });

  let PORT = 8080;

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
export default createServer;
