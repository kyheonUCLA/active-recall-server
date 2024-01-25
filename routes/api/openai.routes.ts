import express from "express";

import openaiController from "../../controllers/openai.controller";
import { validateOpenaiRequest } from "../../middleware/validation";

const openaiRouter = express.Router();

openaiRouter.post('/', validateOpenaiRequest, openaiController.getCompletion);
export default openaiRouter;
