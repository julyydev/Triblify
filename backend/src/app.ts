import express from 'express';
import placeRouter from './routers/placeRouter';
import routeRouter from './routers/routeRouter';

const app = express();

app.use('/place', placeRouter);
app.use('/route', routeRouter);

app.listen('8000', () => {
    console.log(`✅ Server listenting on http://localhost:8000 🚀`);
});
