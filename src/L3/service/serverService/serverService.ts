import { Sequelize } from 'sequelize';
import express from "express";

export const createServer = (DB: Sequelize) => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  let PORT = 8080;

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  
  /* server.on('close', function () {
    DB.close()
    console.log(`Server connection closed`);
  }) */

  return server;
};
