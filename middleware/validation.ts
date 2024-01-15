import { Request, Response, NextFunction } from "express";

const validateTwilioRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.phone) {
    return res.sendStatus(400).send("request did not contain 'phone' data field");
  }
  if (!req.body.message) {
    return res.sendStatus(400).send("request did not contain 'message' data field");
  }
  next();
}


const validateOpenaiRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.prompt) {
    return res.sendStatus(400).send("request did not contain 'prompt' data field");
  }
  next();
}

export {validateTwilioRequest, validateOpenaiRequest}