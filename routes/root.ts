import express from 'express';

import twilioRouter from './api/twilio';
import openaiRouter from './api/openai';
import testRouter from './api/test';

const rootRouter = express.Router();

rootRouter.use('/api/twilio', twilioRouter);
rootRouter.use('/api/test', testRouter);
rootRouter.use('/api/openai', openaiRouter);

export default rootRouter