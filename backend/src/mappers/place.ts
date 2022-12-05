import { PlaceData } from '@googlemaps/google-maps-services-js';
import { Place } from '../\btypes/place';

export class PlaceMapper {
    private data: Place = {};

    constructor(origin: Partial<PlaceData>) {
        this.data.business_state = origin.business_status;
        this.data.formatted_address = origin.formatted_address;
        this.data.geometry = origin.geometry?.location;
        this.data.name = origin.name;
        this.data.opening_hours = origin.opening_hours;
        this.data.place_id = origin.place_id;
        this.data.types = origin.types;
    }

    getData = () => {
        return this.data;
    };
}
