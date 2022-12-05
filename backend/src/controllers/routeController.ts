import { Request, Response } from 'express';
import {
    Client,
    DistanceMatrixResponseData,
    LatLng,
    TravelMode,
} from '@googlemaps/google-maps-services-js';
import { Coordinate } from '../\btypes/coordinate';

const client = new Client();

// 장소 배열을 받아서 경로를 생성하는
export const makeRoute = async (req: Request, res: Response) => {
    const {
        mode,
        coordinate: { start, wayPoints, end },
    } = req.body;

    client
        .directions({
            params: {
                origin: start,
                waypoints: wayPoints,
                destination: end,
                mode: mode,
                key: process.env.GOOGLE_API_KEY as string,
            },
        })
        .then(response => {
            return res.json(response.data);
        });
};

// const start: LatLng = {
//     lat: 35.7648331,
//     lng: 140.3860192,
// }; // 나리타 공항

// const wayPoints: LatLng[] = [
//     {
//         lat: 35.9071163,
//         lng: 139.4824443,
//     }, // 가와고에역
//     {
//         lat: 35.9168352,
//         lng: 139.6296859,
//     }, // 히카와 신사
//     {
//         lat: 35.7295028,
//         lng: 139.7109001,
//     }, // 이케부쿠로역
//     {
//         lat: 35.6761919,
//         lng: 139.6503106,
//     }, // 도쿄 타워
// ];

// const end: LatLng = {
//     lat: 35.62651880000001,
//     lng: 139.7233535,
// }; // 고탄다 호텔

// const names = [
//     '나리타 공항',
//     '가와고에역',
//     '히카와 신사',
//     '이케부쿠로역',
//     '도쿄 타워',
//     '고탄다 호텔',
// ];

interface Spot {
    name: string;
    coordinate: Coordinate;
}

interface MakeRouteMatrixDto {
    start: Spot;
    wayPoints: Spot[];
    end: Spot;
}

export const makeRouteMatrix = async ({
    start,
    wayPoints,
    end,
}: MakeRouteMatrixDto) => {
    return await client.distancematrix({
        params: {
            key: process.env.GOOGLE_API_KEY as string,
            origins: [
                start.coordinate,
                ...wayPoints.map(item => item.coordinate),
            ],
            destinations: [
                ...wayPoints.map(item => item.coordinate),
                end.coordinate,
            ],
        },
    });
    // .then(response => {
    //     return response;
    // });
};

// 0 3 4 2 1 5
export const testRoute = async (req: Request, res: Response) => {
    const { start, wayPoints, end }: MakeRouteMatrixDto = req.body;
    await makeRouteMatrix({ start, wayPoints, end }).then(response => {
        let indexArray: number[] = [];

        response.data.rows.map((row, startIndex) => {
            console.log(startIndex);
            row.elements.map((element, endIndex) => {
                console.log(`${endIndex + 1}: ${element.duration.value}`);
            });
        });

        const result = permutation([1, 2, 3, 4]);
        console.log(result);

        let tempIndex = 0;
        while (indexArray.length < wayPoints.length) {
            let minElementIndex = 0;
            let minElemetTime = Number.POSITIVE_INFINITY;

            response.data.rows[tempIndex].elements.map((element, endInex) => {
                if (
                    indexArray.indexOf(endInex + 1) == -1 &&
                    element.duration.value < minElemetTime
                ) {
                    if (
                        indexArray.length < wayPoints.length &&
                        endInex == wayPoints.length
                    ) {
                    } else {
                        minElementIndex = endInex + 1;
                        minElemetTime = element.duration.value;
                    }
                }
            });
            indexArray.push(minElementIndex);
            tempIndex = minElementIndex;
        }

        let minTime = 0;
        tempIndex = 0;
        for (let i = 0; i < wayPoints.length; i++) {
            minTime +=
                response.data.rows[tempIndex].elements[indexArray[i] - 1]
                    .duration.value;

            tempIndex = indexArray[i];
        }
        minTime +=
            response.data.rows[tempIndex].elements[wayPoints.length].duration
                .value;
        console.log(indexArray);

        const routeNames = [];
        routeNames.push(start.name);
        indexArray.map(item => routeNames.push(wayPoints[item - 1].name));
        routeNames.push(end.name);

        const wayPointsCoordinates: Coordinate[] = [];
        indexArray.map(item =>
            wayPointsCoordinates.push(wayPoints[item - 1].coordinate),
        );

        return res.json({
            route: routeNames,
            coordinates: {
                start: start.coordinate,
                wayPoints: wayPointsCoordinates,
                end: end.coordinate,
            },
            total_time: minTime,
        });
    });
};

const permutation = (wayPoints: number[]) => {
    const length: number = wayPoints.length;
    let result: number[][] = [wayPoints.slice()];
    let c: number[] = new Array(length).fill(0);
    let i = 1,
        k,
        p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = wayPoints[i];
            wayPoints[i] = wayPoints[k];
            wayPoints[k] = p;
            ++c[i];
            i = 1;
            result.push(wayPoints.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }

    return result;
};
