import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const getCoordinate = async (req: Request, res: Response) => {
    const { address } = req.query;
    console.log(process.env.GOOGLE_API_KEY);

    const response = await axios.post(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            address +
            '&key=' +
            process.env.GOOGLE_API_KEY,
    );

    console.log(response.data);

    return res.json({
        coordinate: {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng,
        },
    });
};

export const getPlaceId = async (req: Request, res: Response) => {
    const { address } = req.query;

    const response = await axios.post(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            address +
            '&key=' +
            process.env.GOOGLE_API_KEY,
    );

    return res.json({
        place_id: response.data.results[0].place_id,
    });
};

export const getPlacesWithDetail = async (req: Request, res: Response) => {
    const { place_id } = req.params;

    const response = await axios.post(
        'https://maps.googleapis.com/maps/api/place/details/json?place_id=' +
            place_id +
            '&key=' +
            process.env.GOOGLE_API_KEY,
    );

    return res.json(response.data);
};
