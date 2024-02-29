import { Request, Response } from "express"
import { storageContextFromDefaults, VectorStoreIndex, OpenAI, TextNode } from "llamaindex"
import { SimpleHTMLReader } from "../utils/SimpleHtmlReader";
import astraService from "../services/astra.service";
import { sendSMS } from "./twilio.controller";


const createQuiz = async (req: Request, res: Response) => {
  
  const reader = new SimpleHTMLReader()
  const documents = await reader.loadData(req.body.urls)

  const instructions = 
  `You are a teacher who wants to create challenging questions to 
  help your students learn new material. Your students will send you 
  information about what they recently read, and your job is to create 
  a single multiple-choice question on the relevant information.
  You format your questions as follows:
  Q: (question)
  S: (solution)
  `

  const vs = astraService.connectToVectorStore()
  await astraService.deleteAllDocuments('test_collection_1')
  await vs.connect('test_collection_1');
  const context = await storageContextFromDefaults({ vectorStore: vs });
  const index = await VectorStoreIndex.fromDocuments(documents, { storageContext: context });
  
  /* Build knowledge graph (index) from websites sent by frontend.
  do a top k search in index using user highlighted text.
  use prompt template to build quiz based off of knowledge graph and emphasize top k 
  send output of the text thru parser then to user as a twilio text
  */

  const retriever = index.asRetriever({ similarityTopK: 5 })
  const retrieverRes = await retriever.retrieve(req.body.query)
  
  const contextStr = retrieverRes.map((item) => (item.node as TextNode).text ).join(' ')
  const promptTemplate = `Create a 5 multiple choice question with 4 possible answers
  emphasizing the following context: {contextStr}. Creat the question in the form: 
  Question:
  a) b) c) d)
  Answer: 
  \n`


  // const model = new OpenAI({ model: 'gpt-3.5-turbo' }) 
  const queryEngine = index.asQueryEngine();
  const queryEngineRes = await queryEngine.query({ 
    query: promptTemplate.replace("{context}", contextStr)
  });

  // const quizQuestion = response.toString()
  
  res.status(200).json({"quiz": queryEngineRes.response});
}




export default { createQuiz }

// https://stackblitz.com/github/run-llama/LlamaIndexTS/tree/main/examples?file=astradb%2Fload.ts
// https://github.com/run-llama/LlamaIndexTS