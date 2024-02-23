import express from "express"
import validateResource from "../../middleware/validateResource";
import { createUserSchema } from "../../schema/user.schema";
import userController from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.post('/', validateResource(createUserSchema), userController.createUserHandler);



export default userRouter;