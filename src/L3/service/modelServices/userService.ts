import {
  getUserDb,
  autosuggestUserDb,
  updateUserDb,
  createUserDb,
  deleteUserDb,
  getAllUsersDb,
  createInitialUsersDb,
} from "../../data-access/user-db";
import { UserInterface } from "../../models/UserModel";

export const getUser = (id: string) => {
  return getUserDb(id);
};

export const autosuggestUser = async (login: string, max: number) => {
  return autosuggestUserDb(login, max);
};

export const updateUser = async (user: UserInterface, id: string) => {
  return updateUserDb(user, id);
};

export const createUser = async (data: UserInterface) => {
  return createUserDb(data);
};

export const deleteUser = async (id: number) => {
  return deleteUserDb(id);
};

export const getAllUsers = async () => {
  return getAllUsersDb();
};

export const createInitialValues = async () => {
  return createInitialUsersDb();
};
