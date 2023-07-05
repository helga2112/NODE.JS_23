import  jwt from "jsonwebtoken";
import { User } from "../../models/UserModel";
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
  sign: jest.fn().mockReturnValue({ foo: 'bar' }), // overwrite verify
}));

import { userLogIn } from "./authorizeServise";

jest.mock("../../data-access/login");
jest.mock("../../models/UserModel");
/* jest.mock("jsonwebtoken", () =>{
  sign: jest.fn(() =>'1234567') 
}); */


describe("authoriseService", () => {
  describe("userLogIn", () => {
    it("should authorize user", async () => {
      const mockUser = { login: "testuser", password: "testpassword" };

      const authorizeMock = jest.fn().mockResolvedValue(mockUser);
      User.findOne = authorizeMock;

      const tokenMockString = "1234567";
      //const signMock = jest.spyOn(jwt, "sign");
      // jest.spyOn(jwt, "sign").mockImplementationOnce(() => "123123123");

      /*   const token = jwt.sign(
        { login: "testuser", password: "testpassword" },
        "secret",
        {
          expiresIn: "2h",
        }
      );
 */
  /*     console.log('>> jwt', jwt) */

     /*   jest.spyOn(jwt, 'sign'); */
      /* sign.mockImplementation(() => () => ('TOKEN')); */

    /*   console.log('>> sign', sign) */

      const secret = process.env.JWT_SECRET || "secret_word";

      const token = await userLogIn("testuser", "testpassword");

      expect(authorizeMock).toBeCalledTimes(1);
      expect(token).toBe(tokenMockString);
      /*  expect(user).toEqual(mockUser); */
     /*  expect(sign).toHaveBeenCalledWith(mockUser, secret, {
        expiresIn: "2h",
      }); */
    });
  });
});
