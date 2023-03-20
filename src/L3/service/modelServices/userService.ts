import { UserInterface } from "../../models/UserModel";
import { User } from "../../models/UserModel";
import { Op } from "sequelize";

export const recieveUser = async (id: string) => {
  return await User.findOne({ where: { id: id } });
};

export const autosuggestUser = async (login: string, max: number) => {
  return await User.findAll({
    where: { login: { [Op.like]: "%" + login + "%" } },
  });
};

export const updateUser = async (user: UserInterface, id: string) => {
  return await User.update(
    {
      login: user.login,
      email: user.email,
      age: user.age,
      password: user.password,
    },
    { where: { id: id } }
  );
};

export const createUser = async (data: UserInterface) => {
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

export const deleteUser = async (id: number) => {
  return await User.update(
    {
      isDeleted: true,
    },
    { where: { id: id } }
  );
};

export const getAllUsers = async () => {
  return await User.findAll();
};
