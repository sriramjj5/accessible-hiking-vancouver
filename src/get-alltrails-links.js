import {getTrailNames} from "./get-trail-names.js"

export function getAlltrailsLinks() {
    getTrailNames().then(
        (value) => {
            getAlltrailsLinksHelper(value);
        }, 
        (error) => {
            console.log(error);
    });
}

const getAlltrailsLinksHelper = (trails) => {
    return trails.map(function(trail) {
        return "https://www.alltrails.com/trail/canada/british-columbia/" + trail.replace(/[^\w\s]/g, "").replace(/\s/g, "");
    })
}