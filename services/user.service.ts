import UserModel, { User } from "../models/user.model";

const createUser = (input: Partial<User>) => {
  return UserModel.create(input);
}

const findUserById = (id: string) => {
  return UserModel.findById(id);
}



export default { createUser, findUserById };