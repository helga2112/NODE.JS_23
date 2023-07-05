import { authorize } from "../login";
import { User } from "../../models/UserModel";
import { Op } from "sequelize";

jest.mock("../../models/UserModel");

describe("login", () => {
  it("user can login with correct creds", async () => {
    const mockUser = { id: 1, login: "testuser", password: "testpassword" };

    const findOneMock = jest.fn().mockResolvedValue(mockUser);
    User.findOne = findOneMock;

    const login = "testuser";
    const password = "testpassword";

    const result = await authorize(login, password);
    expect(findOneMock).toBeCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({
        where: { login, [Op.and]: [{ password }] },
      });
    expect(result).toEqual(mockUser);
  });
});
