import request from "request";

export const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/fc2f4aa6976cb17de89c8cdbe8e2a6d1/${latitude},${longitude}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, 
        `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};
