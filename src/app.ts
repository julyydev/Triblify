import express, { Request, Response, NextFunction } from 'express';
import testRouter from './routers/testRouters';

const app = express();

app.use('/test', testRouter);

app.listen('8000', () => {
    console.log(`✅ Server listenting on http://localhost:8000 🚀`);
});
