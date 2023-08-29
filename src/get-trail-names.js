import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.vancouvertrails.com/trails/');

export async function getTrailNames() {
    try {
        const response = await axios.get(url);
        const $ = await cheerio.load(response.data);

        const trails = $(".traillist").find(".trail-listing").map(function () {
            return ($(this).find("a").find("div").find("span").text().trim())}).toArray();

        return trails;
    } catch (err) {
        console.log(err);
    }
};

