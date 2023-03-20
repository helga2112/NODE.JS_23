import { Group, GroupInterface, Permission } from "../../models/GroupModel";
import { User } from "../../models/UserModel";

export const getGroup = async (id: string) => {
  return await User.findOne({ where: { id: id } });
};

export const updateGroup = async (
  id: number,
  name: string,
  premission: Permission[]
) => {
  return await Group.upsert({
    id: Number(id),
    name: name,
    permission: premission,
  });
};

export const createGroup = async (data: GroupInterface) => {
  const { name, permission } = data;
  return await Group.findOrCreate({
    where: { name },
    defaults: {
      name: name,
      permission: permission,
    },
  });
};

export const deleteGroup = async (id: number) => {
  return await Group.destroy({ where: { id: id } });
};

export const getAllGroups = async () => {
  return await Group.findAll();
};
