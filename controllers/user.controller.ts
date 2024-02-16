import { Request, Response } from "express"
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema"
import userService from "../services/user.service";
import sendEmail from "../utils/mailer";

// these are called routehandlers
const createUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const body = req.body;
  console.log(body)
  try {
    const user = await userService.createUser(body);

    await sendEmail({
      from: 'kyheon12@g.ucla.edu',
      to: user.email,
      subject: 'Please verify your account',
      text: `Verification code: ${user.verificationCode}, Id: ${user._id}`
    })

    return res.status(200).send("User successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists')
    }
    return res.status(500).send(e);
  }
}

const verifyUserHandler = async (req: Request<VerifyUserInput>, res: Response) => {
  const params = req.params;
}

const forgotPasswordHandler = (req: Request<VerifyUserInput>, res: Response) => {

}


export default { createUserHandler, verifyUserHandler, forgotPasswordHandler }
