const request = require("request");
const forecast = (lat, long, callback)=>{
    
    const url = "https://api.darksky.net/forecast/75ab60abc799c6dcbf0a51410ff3ccd0/"+ lat +"," + long;
    request({url, json: true}, (error, response)=>{
        const {code} = response.body;
        const {temperature, precipProbability} = response.body.currently;
        const {temperatureHigh, temperatureLow} = response.body.daily.data[0]
        if (error){
            callback("Unable to connect to forecast services.", undefined);
        } else if (code === 400){
            callback("Unable to find location. Try another search!", undefined);
        }else{
            callback(undefined, {
                temp : "It is currently " + temperature + " degrees out with a high of " + temperatureHigh + " and a low of " + temperatureLow + ".",
                rain : "There is a " + precipProbability + "% chance of rain."
            })
        }
    });
}

module.exports = forecast;