const request = require('request');

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiY2FjaW5ra25pZ2h0IiwiYSI6ImNrMjF3MXdvazFvNHMzZG10MmZjamkxOG4ifQ.kUJSeGVlxJh25ImMwkhlKg&limit=1`

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;