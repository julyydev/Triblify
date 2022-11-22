import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const getCoordinate = async (req: Request, res: Response) => {
    const { address } = req.query;

    const response = await axios.post(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            address +
            '&key=' +
            process.env.GOOGLE_API_KEY,
    );

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

/**
 * 사용자로부터 장소 키워드를 입력받아 나온 장소들 중 하나를 고르게 할 때
 */
export const getPlacesByQuery = async (req: Request, res: Response) => {
    const { query } = req.query;

    const response = await axios.post(
        'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
            query +
            '&key=' +
            process.env.GOOGLE_API_KEY,
    );

    return res.json(response.data);
};
