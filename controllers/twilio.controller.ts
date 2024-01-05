import twilio from "twilio";
import { Request, Response } from "express";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} = process.env

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async (req: Request, res: Response) => {
  try {
    const result = await twilioClient.messages.create({
      body: req.body.message,
      from: TWILIO_PHONE_NUMBER,
      to: req.body.phone,
    });
    res.json(result);
  } catch (error) {
    res.status(500).send("Error with sendSMS");
  }
}

export { sendSMS }