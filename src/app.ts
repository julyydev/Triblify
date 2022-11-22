import express, { Request, Response, NextFunction } from 'express';
import placeRouter from './routers/placeRouter';

const app = express();

app.use('/route', placeRouter);

app.listen('8000', () => {
    console.log(`✅ Server listenting on http://localhost:8000 🚀`);
});
