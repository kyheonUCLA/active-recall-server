// https logic layer ("manager")
import OpenAI from "openai";
import { Request, Response } from "express"
import reviewProblemService from "../services/reviewProblem.service"

const { OPENAI_API_KEY } = process.env;
const openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });

const instructions = 
`You are a teacher who wants to create challenging questions to 
help your students learn new material. Your students will send you 
information about what they recently read, and your job is to create 
a multiple-choice question on the relevant information from what 
they sent you.
You format your questions as follows:
Q: (question)
S: (solution)
`

const saveInput = async (req: Request, res: Response) => {
  try {
    const result = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: req.body.prompt}]
    });

    // Parse OpenAI response and return JSON object with question, choices, and solution
    function parseResponse(response: string) {
      const lines = response.split('\n');

      let question = '';
      let choices: Record<string, string> = {};
      let solution: Record<string, string> = {};
  
      for (const line of lines) {
        if (line) {
          if (line.startsWith('Q:')) {
            question = line.substring(3).trim();
        } else if (/^[A-D]\)/i.test(line)) {
            const choice = line.trim();
            const [key, value] = choice.split(')');
            choices[key.trim().toUpperCase()] = value.trim();
        } else if (line.startsWith('S:')) {
            const sol = line.substring(3).trim();
            const [key, value] = sol.split(')');
            solution[key.trim().toUpperCase()] = value.trim();
          }
        }
      }
  
      return {
          question: question,
          choices: choices,
          solution: solution,
      };
    }
    
  const content = result.choices[0].message.content;

  if (content !== null) {
    const parsedResponse = res.json(parseResponse(content));

  } else {
    res.status(500).send("Content is null");
  }

  } catch (error) {
    console.error(error);
    res.status(500).send("Error with saveInput");
  }
}

export { saveInput }
