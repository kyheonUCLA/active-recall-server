import express from "express"

import { sendSMS } from "../../controllers/twilio.controller";
import { validateTwilioRequest } from "../../middleware/validation";

const twilioRouter = express.Router();

twilioRouter.post('/', validateTwilioRequest, sendSMS);



export default twilioRouter;