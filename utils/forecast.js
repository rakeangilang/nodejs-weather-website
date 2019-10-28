const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/0a9527492d9ffedb259093b357d31c4c/${latitude},${longitude}?units=si`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temperature = body.currently.temperature;
            const rainProb = body.currently.precipProbability;
            const dailySum = body.daily.data[0].summary;
            const forecast = `${dailySum} It is currently ${temperature} degrees out. There is a ${rainProb}% chance of rain.`;
            callback(undefined, forecast);
        }
    });
}

module.exports = forecast;