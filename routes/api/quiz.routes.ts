import express from "express";

import quizController from "../../controllers/quiz.controller";


const quizRouter = express.Router();

quizRouter.post('/', quizController.createQuiz)

export default quizRouter