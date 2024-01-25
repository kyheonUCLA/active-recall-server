import express from 'express';

import twilioRouter from './api/twilio.routes';
import openaiRouter from './api/openai.routes';
import testRouter from './api/test.routes';

const rootRouter = express.Router();

rootRouter.use('/api/twilio', twilioRouter);
rootRouter.use('/api/test', testRouter);
rootRouter.use('/api/openai', openaiRouter);

export default rootRouter