import express from 'express';
import {
    getCoordinate,
    getNearbyPlaces,
    getPlaceId,
    getPlacesByQuery,
    getPlacesWithDetail,
} from '../controllers/placeController';

const placeRouter = express.Router();

placeRouter.get('/coordinate', getCoordinate);
placeRouter.get('/id', getPlaceId);
placeRouter.get('/detail/:place_id', getPlacesWithDetail);
placeRouter.get('/', getPlacesByQuery);
placeRouter.get('/nearby', getNearbyPlaces);

export default placeRouter;
