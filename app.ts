import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import rootRouter from './routes/root';

const app = express();

// middle ware for cross-origin-resource-sharing
app.use(cors());

// middleware to allow us to get form data
app.use(express.urlencoded({ extended: false }));

// middleware to allow us to get json data
app.use(express.json());


app.use('/', rootRouter)

export default app;