import { Request, Response } from "express"
import { AstraDBVectorStore, storageContextFromDefaults, VectorStoreIndex } from "llamaindex"
import { SimpleHTMLReader } from "../utils/SimpleHtmlReader";
import astraService from "../services/astra.service";


const createQuiz = async (req: Request, res: Response) => {
  
  const reader = new SimpleHTMLReader()
  const documents = await reader.loadData(req.body.urls)


  const vs = astraService.connectToVectorStore()
  await astraService.deleteAllDocuments('test_collection_1')
  await vs.connect('test_collection_1');
  const ctx = await storageContextFromDefaults({ vectorStore: vs });
  const index = await VectorStoreIndex.fromDocuments(documents, { storageContext: ctx });
  
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    query: req.body.query,
  });

  

  // const retriever = index.asRetriever({ similarityTopK: 5 })
  // const response = await retriever.retrieve(req.body.query)


  res.status(200).json(response);
}




export default { createQuiz }

// https://stackblitz.com/github/run-llama/LlamaIndexTS/tree/main/examples?file=astradb%2Fload.ts
// https://github.com/run-llama/LlamaIndexTS