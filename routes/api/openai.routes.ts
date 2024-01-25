import express from "express";

import { saveInput } from "../../controllers/openai.controller";
import { validateOpenaiRequest } from "../../middleware/validation";

const openaiRouter = express.Router();

openaiRouter.post('/', validateOpenaiRequest, saveInput);

export default openaiRouter;
