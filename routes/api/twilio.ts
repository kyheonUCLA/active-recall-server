import express from "express"

import { sendSMS } from "../../controllers/twilio.controller";

const twilioRouter = express.Router();

twilioRouter.get('/', sendSMS);



export default twilioRouter;