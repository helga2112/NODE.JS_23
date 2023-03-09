import express from "express";

export const createServer = () => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  let PORT = 8080;

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  return server;
};
