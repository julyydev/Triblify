import { Request, Response } from 'express';
import {
    Client,
    LatLng,
    TravelMode,
} from '@googlemaps/google-maps-services-js';

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
 *
 * return type:    { business_status, formatted_address, geometry,
 *                  icon, icon_background_color, icon_mask_base_uri,
 *                  name, opening_hours, photos, place_id, plus_code,
 *                  price_level, rating, reference, types, user_ratings_total }
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

export const getNearbyPlaces = async (req: Request, res: Response) => {
    const coordinate = req.body.coordinate;
    const place_type = req.body.place_type;
    const travel_mode = req.body.travel_mode;

    let radius = 2000;
    if (travel_mode === TravelMode.driving) radius = 20000;
    if (travel_mode === TravelMode.bicycling) radius = 5000;
    if (travel_mode === TravelMode.transit) radius = 10000;
    if (travel_mode === TravelMode.walking) radius = 2000;

    client
        .placesNearby({
            params: {
                location: {
                    lat: coordinate.lat,
                    lng: coordinate.lng,
                } as LatLng,
                radius: radius,
                type: place_type,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json(response.data);
        });
};
