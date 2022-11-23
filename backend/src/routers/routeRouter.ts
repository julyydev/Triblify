import express from 'express';
import { makeRoute } from '../controllers/routeController';

const routeRouter = express.Router();

routeRouter.get('/', makeRoute);

export default routeRouter;
