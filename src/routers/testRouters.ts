import express, { Request, Response, NextFunction } from 'express';

const testRouter = express.Router();

testRouter.get('/hello', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello world!!');
});

export default testRouter;
