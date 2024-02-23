import express from "express"
import testController from "../../controllers/test.controller";
const testRouter = express.Router();

testRouter.get('/', testController.getTest);
testRouter.post('/', testController.createTest);
testRouter.delete('/', testController.deleteTest);
testRouter.put('/', testController.updateTest);


export default testRouter;