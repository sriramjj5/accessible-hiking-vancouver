// the meta tags on each alltrails website have lat/lon info

import axios from 'axios';
import cheerio from 'cheerio';
import { getTrailLinks } from './get-trail-links';

export async function getTrailCoordinates() {
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

            console.log(latitudeMatch[1]);
            console.log(longitudeMatch[1]);
            console.log(nameMatch[1].replace(/&#039;/g, "'"));

        } catch (err) {
            console.log(err);
        }
    }
    
};

