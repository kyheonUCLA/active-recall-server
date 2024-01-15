import express from "express";

import { getCompletion } from "../../controllers/openai.controller";
import { validateOpenaiRequest } from "../../middleware/validation";

const openaiRouter = express.Router();

openaiRouter.post('/', validateOpenaiRequest, getCompletion);

export default openaiRouter;
