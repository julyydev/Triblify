import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Client } from '@googlemaps/google-maps-services-js';

dotenv.config();
const client = new Client();

export const getCoordinate = async (req: Request, res: Response) => {
    const { address } = req.query;

    client
        .geocode({
            params: {
                address: address as string,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json({
                coordinate: {
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng,
                },
            });
        });
};

export const getPlaceId = async (req: Request, res: Response) => {
    const { address } = req.query;

    client
        .geocode({
            params: {
                address: address as string,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json({
                place_id: response.data.results[0].place_id,
            });
        });
};

export const getPlacesWithDetail = async (req: Request, res: Response) => {
    const { place_id } = req.params;

    client
        .placeDetails({
            params: {
                place_id: place_id as string,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json(response.data);
        });
};

/**
 * 사용자로부터 장소 키워드를 입력받아 나온 장소들 중 하나를 고르게 할 때
 */
export const getPlacesByQuery = async (req: Request, res: Response) => {
    const { query } = req.query;

    client
        .textSearch({
            params: {
                query: query as string,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json(response.data);
        });
};
