import UserModel, { User } from "../models/user.model";

const createUser = (input: Partial<User>) => {
  return UserModel.create(input);
}


const userService = { createUser }

export default userService;