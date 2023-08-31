import { getTrailCoordinates } from "./get-trail-coordinates";

export async function getTrailJson() {
    const trails = await getTrailCoordinates();
    const trailJson = JSON.stringify(trails);
    console.log(trailJson);
};

