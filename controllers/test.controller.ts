import { Request, Response } from "express"

// these are called routehandlers
const getTest = async (req: Request, res: Response) => {
  const testData = {
    id: 1,
    body: "this is the body",
    message: 'This is a test message from the backend!',
  };
  res.json(testData)
}


const createTest = (req: Request, res: Response) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
  })
}


const updateTest = (req: Request, res: Response) => {
  res.json({
    "firstname": req.body.firstname,
    "lastname": req.body.lastname,
  })
}


const deleteTest = (req: Request, res: Response) => {
  res.json({"id": req.body.id})
}

export {getTest, createTest, deleteTest, updateTest}
