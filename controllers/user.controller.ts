import { Request, Response } from "express"
import { CreateUserInput } from "../schema/user.schema"
import userService from "../services/user.service";

// these are called routehandlers
const createUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const body = req.body;
  try {
    const user = await userService.createUser(body);
    return res.status(200).send("User successfully created");
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists')
    }
    return res.status(500).send(e);
  }
}


const userController = { createUserHandler }

export default userController
