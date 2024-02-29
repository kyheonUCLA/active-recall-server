import { Request, Response } from "express"
import { storageContextFromDefaults, VectorStoreIndex, OpenAI, TextNode } from "llamaindex"
import { SimpleHTMLReader } from "../utils/SimpleHtmlReader";
import astraService from "../services/astra.service";
import { sendSMS } from "./twilio.controller";


const createQuiz = async (req: Request, res: Response) => {
  
  const reader = new SimpleHTMLReader()
  const documents = await reader.loadData(req.body.urls)

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

  const retriever = index.asRetriever({ similarityTopK: 2 })
  const retrieverRes = await retriever.retrieve(req.body.query)
  
  const contextStr = retrieverRes.map((item) => (item.node as TextNode).text ).join(' ')
  const promptTemplate = `Create a single multiple choice question with 4 possible answers
  emphasizing the following context: {contextStr}. Create the question in the form: 
  Question: "Question here"
  a)  b) c) d)
  Answer: "Answer here"
  \n`

  const queryEngine = index.asQueryEngine();
  const queryEngineRes = await queryEngine.query({ 
    query: promptTemplate.replace("{contextStr}", contextStr)
  });

  res.status(200).json({"quiz": queryEngineRes.response});
}




export default { createQuiz }

// https://stackblitz.com/github/run-llama/LlamaIndexTS/tree/main/examples?file=astradb%2Fload.ts
// https://github.com/run-llama/LlamaIndexTS