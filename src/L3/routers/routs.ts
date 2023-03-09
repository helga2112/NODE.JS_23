import { Express } from "express-serve-static-core";
import { getAllUsers } from "../service/requestsService";

export const handleRouts = (server: Express) => {


  server.get("/", (req, res) => {
    const users = getAllUsers()

  /*   const records = User.findAll({where: {}})
    //res.json({ users });
    res.json(records); */
    res.send(users)
  });

  server.get("/autosuggest", (req, res) => {
   /*  const { login, max } = req.body;
    const selectedUsers = getAutoSuggestUsers(users, login, max);
    if (selectedUsers.length > 0) {
      res.json(selectedUsers);
    } else {
      res
        .status(400)
        .send(
          `Something went wrong! No users with following login chars: ${login}`
        );
    } */
  });

  server.get("/:id", (req, res) => {
   /*  const { id } = req.params;
    const found = users.some((user: User) => user.id === parseInt(id));
    if (found) {
      res.json(users.filter((user) => user.id === parseInt(id)));
    } else {
      res.status(400).send(`Something broke! No user with id: ${id}`);
    } */
  });

  server.delete("/:id", (req, res) => {
   /*  const { id } = req.params;
    const found = users.some((user) => user.id === parseInt(id));
    if (found) {
      res.json((users = users.filter((user) => user.id != parseInt(id))));
    } else {
      res.status(400).send(`Something broke! No user with id: ${id}`);
    } */
  });

  server.post("/:id", (req, res) => {
   /*  const data: User = req.body;
    console.log(req.body);
    const found = users.some((user) => user.id === data.id);
    console.log("found", found);
    if (found) {
      users = [...users, data];
      res.status(200).send(users);
    } else {
      res.status(400).send(`Something broke! No user with id: ${data.id}`);
    } */
  });

  server.post("/", (req, res) => {
    /* const data: User = req.body;
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
    } */
  });

};
