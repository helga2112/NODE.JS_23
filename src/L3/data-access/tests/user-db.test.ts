import { Op } from "sequelize";
import { User } from "../../models/UserModel";
import {
  autosuggestUserDb,
  createInitialUsersDb,
  createUserDb,
  deleteUserDb,
  getAllUsersDb,
  getUserDb,
  updateUserDb,
} from "../user-db";

/* jest.mock("../../models/UserModel"); */

describe("user-db", () => {
  describe("getUserDb", () => {

    it("should not return user from DB", async () => {
      const test = await getUserDb("1000")
      expect(test).toEqual('no user found')
    });
    it("should return user from DB", async () => {
      const mockUser = { id: 1, login: "testuser", password: "testpassword" };

      const findOneMock = jest.fn().mockImplementationOnce(() => mockUser);
      User.findOne = findOneMock;

      const user = await getUserDb("1");

      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(user).toEqual(mockUser);
    });
  });

  describe("autosuggestUserDb", () => {
    it("should return users by part of name", async () => {
      const mockUser1 = {
        id: 1,
        login: "testuser1",
        password: "testpassword1",
      };
      const mockUser2 = {
        id: 2,
        login: "testuser2",
        password: "testpassword2",
      };
      const findAll = jest.fn().mockResolvedValue([mockUser1, mockUser2]);
      User.findAll = findAll;

      const users = await autosuggestUserDb("test");
      expect(findAll).toBeCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith({
        where: { login: { [Op.like]: "%" + "test" + "%" } },
      });
      expect(users).toEqual([mockUser1, mockUser2]);
    });
  });

  describe("updateUserDb", () => {
    it("should update user with new data by selected id", async () => {
      const mockUser = {
        login: "test",
        email: "test@email.com",
        age: 20,
        password: "password",
        isDeleted: false,
      };
      const update = jest.fn().mockResolvedValue(mockUser);
      User.update = update;

      const user = await updateUserDb(mockUser, "1");
      expect(update).toBeCalledTimes(1);
      expect(update).toHaveBeenCalledWith(
        {
          age: 20,
          email: "test@email.com",
          login: "test",
          password: "password",
        },
        { where: { id: "1" } }
      );
      expect(user).toEqual(mockUser);
    });
  });

  describe("createUserDb", () => {
    it("should create new user", async () => {
      const mockUser = {
        login: "testuser",
        email: "email@test.com",
        password: "testpassword",
        age: 20,
        isDeleted: false,
      };

      const findOrCreate = jest.fn().mockResolvedValue(mockUser);
      User.findOrCreate = findOrCreate;

      const newUser = await createUserDb(mockUser);

      expect(findOrCreate).toBeCalledTimes(1);
      expect(findOrCreate).toHaveBeenCalledWith({
        where: { email: "email@test.com" },
        defaults: {
          login: "testuser",
          email: "email@test.com",
          password: "testpassword",
          age: 20,
          isDeleted: false,
        },
      });
      expect(newUser).toEqual(mockUser);
    });
  });

  describe("deleteUserDb", () => {
    it("should soft delete user", async () => {
      const mockDeletedUser = {
        login: "test",
        email: "test@email.com",
        age: 20,
        password: "password",
        isDeleted: true,
      };
      const update = jest.fn().mockResolvedValue(mockDeletedUser);
      User.update = update;

      const user = await deleteUserDb(1);
      expect(update).toBeCalledTimes(1);
      expect(update).toHaveBeenCalledWith(
        { isDeleted: true },
        { where: { id: 1 } }
      );
      expect(user).toEqual(mockDeletedUser);
    });
  });

  describe("getAllUsersDb", () => {
    it("should return all users", async () => {
      const mockUser1 = {
        id: 1,
        login: "testuser1",
        password: "testpassword1",
      };
      const mockUser2 = {
        id: 2,
        login: "testuser2",
        password: "testpassword2",
      };
      const findAllMock = jest.fn().mockReturnValue([mockUser1, mockUser2]);
      User.findAll = findAllMock;

      const users = await getAllUsersDb();

      expect(findAllMock).toBeCalledTimes(1);

      expect(users).toEqual([mockUser1, mockUser2]);
    });
  });

  describe("createInitialUsersDb", () => {
    it("should create initial users, when app is just started", async () => {
      const mockUser1 = {
        login: "test",
        email: "test@email.com",
        age: 20,
        password: "password",
        isDeleted: true,
      };
      const mockUser2 = {
        login: "test",
        email: "test@email.com",
        age: 20,
        password: "password",
        isDeleted: true,
      };
      const create = jest.fn().mockResolvedValue(mockUser1);
      User.create = create;

      const users = await createInitialUsersDb();
      expect(create).toBeCalledTimes(2);
      expect(users).toEqual([mockUser1, mockUser2]);
    });
  });
});
