import { Express } from "express-serve-static-core";

export const handleGroupUserRouts = (server: Express) => {
  server.put("/addUserToDroup", async (req, res) => {
   res.send('AddUserToDroup not ready yet')
  });

  server.delete("/removeUserFromGoup:id", (req, res) => {
    res.send('Delete not ready yet')
  });
};
