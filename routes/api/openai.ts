import express from "express";

import { getCompletion } from "../../controllers/openai.controller";

const openaiRouter = express.Router();

openaiRouter.get('/', getCompletion);



export default openaiRouter;