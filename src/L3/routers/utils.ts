import { UserInterface } from "../models/UserModel";

export const getAutoSuggestUsers = (
  users: UserInterface[],
  loginSubstring: string,
  limit: number
) => {
  const filteredUsers = users.filter((user, index) => {
    return user.login.includes(loginSubstring) && index < limit;
  });
  return filteredUsers;
};

