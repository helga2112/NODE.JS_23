import { Op } from "sequelize";
import { User, UserInterface } from "../models/UserModel";

export const getUserDb = async (id: string) => {
  return await User.findOne({ where: { id: id } });
};

export const autosuggestUserDb = async (login: string, max: number) => {
  return await User.findAll({
    where: { login: { [Op.like]: "%" + login + "%" } },
  });
};

export const updateUserDb = async (user: UserInterface, id: string) => {
  return await User.update(
    {
      login: user.login,
      email: user.email,
      age: user.age,
      password: user.password,
    },
    { where: { id: 1 } }
  );
};

export const createUserDb = async (data: UserInterface) => {
  const { login, email, password, age, id } = data;
  return await User.findOrCreate({
    where: { email: email },
    defaults: {
      login: login,
      email: email,
      password: password,
      age: age,
      isDeleted: false,
    },
  });
};

export const deleteUserDb = async (id: number) => {
  return await User.update({ isDeleted: true }, { where: { id: id } });
};

export const getAllUsersDb = async () => {
  return await User.findAll();
};

export const createInitialUsersDb = async () => {
  try {
    const user1 = await User.create({
      login: "User1",
      password: "testPass1",
      email: "test1@test.com",
      age: 25,
      isDeleted: false,
    });
    const user2 = await User.create({
      login: "User2",
      password: "testPass2",
      email: "test2@test.com",
      age: 26,
      isDeleted: false,
    });
    console.log(`Users added: ${user1} ${user2}`);
  } catch (error) {
    console.log(`[Error] add initial users: ${error}`);
  }
};
import { Op } from "sequelize";
import { User, UserInterface } from "../models/UserModel";

export const getUserDb = async (id: string) => {
  return await User.findOne({ where: { id: id } });
};

export const autosuggestUserDb = async (login: string, max: number) => {
  return await User.findAll({
    where: { login: { [Op.like]: "%" + login + "%" } },
  });
};

export const updateUserDb = async (user: UserInterface, id: string) => {
  return await User.update(
    {
      login: user.login,
      email: user.email,
      age: user.age,
      password: user.password,
    },
    { where: { id: 1 } }
  );
};

export const createUserDb = async (data: UserInterface) => {
  const { login, email, password, age, id } = data;
  return await User.findOrCreate({
    where: { email: email },
    defaults: {
      login: login,
      email: email,
      password: password,
      age: age,
      isDeleted: false,
    },
  });
};

export const deleteUserDb = async (id: number) => {
  return await User.update({ isDeleted: true }, { where: { id: id } });
};

export const getAllUsersDb = async () => {
  return await User.findAll();
};

export const createInitialUsersDb = async () => {
  try {
    const user1 = await User.create({
      login: "User1",
      password: "testPass1",
      email: "test1@test.com",
      age: 25,
      isDeleted: false,
    });
    const user2 = await User.create({
      login: "User2",
      password: "testPass2",
      email: "test2@test.com",
      age: 26,
      isDeleted: false,
    });
    console.log(`Users added: ${user1} ${user2}`);
  } catch (error) {
    console.log(`[Error] add initial users: ${error}`);
  }
};