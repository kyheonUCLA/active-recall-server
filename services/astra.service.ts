import axios from "axios";
import { AstraDBVectorStore } from "llamaindex"

const { ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_KEYSPACE } = process.env;

const deleteAllDocuments = async (collectionName: string) => {
  try {
       const url = `${ASTRA_DB_ENDPOINT}/api/json/v1/${ASTRA_DB_KEYSPACE}/${collectionName}`;
       const headers = {
           'Token': ASTRA_DB_APPLICATION_TOKEN,
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       };
       const data = {
           "deleteMany": {
           }
       };
 
       const response = await fetch(url, {
           method: 'POST',
           headers: headers as any,
           body: JSON.stringify(data)
       });
 
       if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
       }
 
       const responseData = await response.json();
 
       console.log('Response:', responseData); // Log the entire response for troubleshooting
 
       if (responseData.status.deletedCount === -1) {
           console.log('All documents deleted successfully.');
       } else {
           console.error('Failed to delete all documents.');
       }
  } catch (error) {
       console.error('Error deleting documents:', error);
  }
}

const connectToVectorStore = () => {
  const vectorStore = new AstraDBVectorStore({
    token: ASTRA_DB_APPLICATION_TOKEN,
    api_endpoint: ASTRA_DB_ENDPOINT} as any
  )
  return vectorStore;
}


 
export default { deleteAllDocuments, connectToVectorStore };
 