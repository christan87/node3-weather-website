const request = require("request");

const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiY2hyaXN0YW5wcmljZTg3IiwiYSI6ImNrMjc2eHg2NzF6d3MzY24wMnk0Z2pra28ifQ.R1m7O3D3M5YtIRy5Uz9XmQ&limit=1";
    
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback("Unable to connect to location services!!", undefined)
        } else if (response.body.features.length === 0 ){
            callback("Unable to find location. Try another search!", undefined)
        } else{
            const {center, place_name:location} = response.body.features[0];
            callback(undefined, {
                lattitude: center[1],
                longitude: center[0],
                location
            })
        }

    });
}

module.exports = geocode;