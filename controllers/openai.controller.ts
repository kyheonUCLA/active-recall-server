import OpenAI from "openai";
import { Request, Response } from "express"

const { OPENAI_API_KEY } = process.env;
const openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });

const saveInput = async (req: Request, res: Response) => {
  try {
    const result = await openaiClient.chat.completions.create({
      messages: [{ role: "system", content: req.body.prompt }],
      model: "gpt-3.5-turbo",
    });

    // Store OpenAI questions, prompt, url, and web page

    // Return true if no errors
    res.json(result);
  } catch (error) {
    res.status(500).send("Error with getCompletion");
  }
}

export { saveInput }