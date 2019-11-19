import request from 'request';

export const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoianVuZ2hvMTEwOSIsImEiOiJjazM0cHNyeHUxMGdqM2xtbTRrZ3pibmswIn0.gCCxyZynz433ySA_OxEu9w`;
  request({ url, json: true }, (error, response={}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else{
        callback(undefined,{
            longitude:response.body.features[0].center[0],
            latitude:response.body.features[0].center[1],
            location:response.body.features[0].place_name
        })
    }
  });
};