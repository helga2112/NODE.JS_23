import { User } from "./model";

export const getAutoSuggestUsers = (
  users: User[],
  loginSubstring: string,
  limit: number
) => {
  const filteredUsers = users.filter((user, index) => {
    return user.name.includes(loginSubstring) && index < limit;
  });
  return filteredUsers;
};
