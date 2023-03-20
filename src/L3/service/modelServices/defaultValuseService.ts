import { User } from "../../models/UserModel";
import { Group } from "../../models/GroupModel";

const addDefaultGroups = async () => {
  await Group.create({
    name: "Group1",
    permission: ["READ", "WRITE", "SHARE", "DELETE", "UPLOAD_FILES"],
  });
};

const addDefaultUsers = async () => {
  await User.create({
    login: "testLognin",
    password: "testPass",
    email: "test@test.com",
    age: 20,
    isDeleted: false,
  });
};

export const addDefaultValues = async () => {
  await addDefaultGroups();
  await addDefaultUsers();
};
