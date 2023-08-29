import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.vancouvertrails.com/trails/');

export async function getTrailLinks() {
    try {
        const response = await axios.get(url);
        const $ = await cheerio.load(response.data);

        const trails = $(".traillist").find(".trail-listing").map(function () {
            return ($(this).find("a").attr("href").trim())}).toArray();

        for (let i = 0; i < trails.length; i++) {
            trails[i] = 'https://corsproxy.io/?https://www.vancouvertrails.com/' + trails[i];
        }

        return trails;
    } catch (err) {
        console.log(err);
    }
};

