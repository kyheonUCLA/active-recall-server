import express from 'express';

import twilioRouter from './api/twilio.routes';
import openaiRouter from './api/openai.routes';
import testRouter from './api/test.routes';
import userRouter from './api/user.routes';

const router = express.Router();

router.use('/api/twilio', twilioRouter);
router.use('/api/test', testRouter);
router.use('/api/openai', openaiRouter);
router.use('/api/users', userRouter);

export default router