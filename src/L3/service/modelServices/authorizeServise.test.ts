import { User } from "../../models/UserModel";
import { userLogIn } from "./authorizeServise";
import jwt, { sign } from "jsonwebtoken";

jest.mock("../../models/UserModel");
jest.mock("jsonwebtoken", () =>{
  sign: jest.fn().mockReturnValue('1234567')
});

describe("authoriseService", () => {
  describe("userLogIn", () => {
    it("should authorize user", async () => {
      const mockUser = { login: "testuser", password: "testpassword" };

      const authorizeMock = jest.fn().mockResolvedValue(mockUser);
      User.findOne = authorizeMock;

      const tokenMockString = "1234567";
      //const signMock = jest.spyOn(jwt, "sign");
     /*  const signMock = jest.spyOn(jwt, "sign").mockReturnValue('123123123'); */

    /*   const token = jwt.sign(
        { login: "testuser", password: "testpassword" },
        "secret",
        {
          expiresIn: "2h",
        }
      );
 */
      const secret = process.env.JWT_SECRET || "secret_word";

      const token = await userLogIn("testuser", "testpassword");

      expect(authorizeMock).toBeCalledTimes(1);
      expect(token).toBe(tokenMockString);
     /*  expect(user).toEqual(mockUser); */
      /* expect(signMock).toHaveBeenCalledWith(mockUser, secret, {
        expiresIn: "2h",
      }); */
    });
  });
});
