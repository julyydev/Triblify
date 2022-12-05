import { Coordinate } from './coordinate';

export interface Place {
    business_state?: string;
    formatted_address?: string;
    geometry?: Coordinate;
    name?: string;
    opening_hours?: {
        open_now?: boolean;
    };
    place_id?: string;
    types?: string[];
}
