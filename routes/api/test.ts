import express from "express"
import { getTest, createTest, deleteTest, updateTest } from "../../controllers/test.controller";

const testRouter = express.Router();

testRouter.get('/', getTest);
testRouter.post('/', createTest);
testRouter.delete('/', deleteTest);
testRouter.put('/', updateTest);


export default testRouter;