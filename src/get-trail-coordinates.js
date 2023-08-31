// the meta tags on each alltrails website have lat/lon info

import axios from 'axios';
import cheerio from 'cheerio';
import { getTrailLinks } from './get-trail-links';

export async function getTrailCoordinates() {
    let trails = [];
    const trailLinks = await getTrailLinks();
    for (const trailLink of trailLinks) {
        try {
            const response = await axios.get(trailLink);
            const $ = await cheerio.load(response.data);

            const scriptContent = $("script[type='application/ld+json']").text();

            const latitudePattern = /"latitude":\s*"(.*?)"/;
            const longitudePattern = /"longitude":\s*"(.*?)"/;
            const namePattern = /"name"\s*:\s*"(.*?)"/;

            const latitudeMatch = scriptContent.match(latitudePattern);
            const longitudeMatch = scriptContent.match(longitudePattern);
            const nameMatch = scriptContent.match(namePattern);

            const lat = latitudeMatch[1];
            const lon = longitudeMatch[1];
            const name = nameMatch[1].replace(/&#039;/g, "'");

            const trail = {name, lat, lon};

            trails.push(trail);

        } catch (err) {
            console.log(err);
        }
    }
    return trails;
};

