import { Group } from './../../models/GroupModel';
import { getGroup } from './groupService';
import { User } from "../../models/UserModel";

export const addUserToGroup = async (id:number, groupId: number) => {
   /* const user = await User.findByPk(id)
   const group = await Group.findOne({where: {id: groupId}})

    return GroupUser */
}

export const removeUserFromGroup = () => {};
