//business logic layer ("worker")
import OpenAI from "openai";

const { OPENAI_API_KEY } = process.env;
const openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });

class OpenAIService {
  async getCompletion(prompt: string): Promise<any> {
    try {
        const result = await openaiClient.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        return result;
    } catch (error) {
        throw new Error("Error with getCompletion");
    } 
  }
}

export default OpenAIService;