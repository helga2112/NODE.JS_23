import { Op } from "sequelize";
import { User } from "../../models/UserModel";


jest.mock("../models/UserModel");

describe("userService", () => {
  describe("getUser", () => {
    it("should return user", async () => {
      const mockUser = { id: 1, login: "testuser", password: "testpassword" };

      const findOneMock = jest.fn().mockResolvedValue(mockUser);
      User.findOne = findOneMock;

      const user = await getUser("1");

      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(user).toEqual(mockUser);
    });
  });

  describe("autosuggestUser", () => {
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

      const users = await autosuggestUser("test", 2);
      expect(findAll).toBeCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith({
        where: { login: { [Op.like]: "%" + "test" + "%" } },
      });
      expect(users).toEqual([mockUser1, mockUser2]);
    });
  });

  describe("updateUser", () => {
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

      const user = await updateUser(mockUser, "1");
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

  describe("createUser", () => {
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

      const newUser = await createUser(mockUser);

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

  describe("deleteUser", () => {
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

      const user = await deleteUser(1);
      expect(update).toBeCalledTimes(1);
      expect(update).toHaveBeenCalledWith(
        { isDeleted: true },
        { where: { id: 1 } }
      );
      expect(user).toEqual(mockDeletedUser);
    });
  });

  describe("getAllUsers", () => {
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

      const users = await getAllUsers();

      expect(findAllMock).toBeCalledTimes(1);

      expect(users).toEqual([mockUser1, mockUser2]);
    });
  });

  describe("createInitialValues", () => {
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

      const users = await createInitialValues();
      expect(create).toBeCalledTimes(2);
      expect(users).toEqual([mockUser1, mockUser2]);
    });
  });
});

function getUser(arg0: string) {
  throw new Error("Function not implemented.");
}

function autosuggestUser(arg0: string, arg1: number) {
  throw new Error("Function not implemented.");
}

function updateUser(mockUser: { login: string; email: string; age: number; password: string; isDeleted: boolean; }, arg1: string) {
  throw new Error("Function not implemented.");
}

function createUser(mockUser: { login: string; email: string; password: string; age: number; isDeleted: boolean; }) {
  throw new Error("Function not implemented.");
}

function deleteUser(arg0: number) {
  throw new Error("Function not implemented.");
}

function getAllUsers() {
  throw new Error("Function not implemented.");
}

function createInitialValues() {
  throw new Error("Function not implemented.");
}

