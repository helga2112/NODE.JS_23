import { User } from "../models/UserModel";

export const createUser = () => {};

export const getUser = () => {};

export const autosuggestUser = () => {};

export const updateUser = () => {};

export const deleteUser = () => {};

export const getAllUsers = () => {
  console.log('>>>>> getAllUsers')
  return User.findAll({where: {}})
};
