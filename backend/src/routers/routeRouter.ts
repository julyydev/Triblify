import express from 'express';
import {
    makeRoute,
    makeRouteMatrix,
    testRoute,
} from '../controllers/routeController';

const routeRouter = express.Router();

routeRouter.get('/', makeRoute);
routeRouter.get('/matrix', makeRouteMatrix);
routeRouter.get('/test', testRoute);

export default routeRouter;
