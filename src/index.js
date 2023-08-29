const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.vancouvertrails.com/trails/');

axios.get(url)
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);

            const trails = $(".traillist").find(".trail-listing").map(function () {
                return ($(this).find("a").find("div").find("span").text().trim())}).toArray();

            console.log(trails);
        }
    }, (error) => console.log(error));
