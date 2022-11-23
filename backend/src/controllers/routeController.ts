import { Request, Response } from 'express';
import { Client, LatLng } from '@googlemaps/google-maps-services-js';

const client = new Client();

// 장소 배열을 받아서 경로를 생성하는
export const makeRoute = async (req: Request, res: Response) => {
    // const { places } = req.body.places;

    client
        .directions({
            params: {
                origin: { lat: 47.7510741, lng: -120.7401386 } as LatLng,
                destination: { lat: 31.9685988, lng: -99.9018131 } as LatLng,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json(response.data);
        });
};
