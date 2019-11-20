//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')
const forecast = (lattitude, longitude, callBack) => {
    const url = 'https://api.darksky.net/forecast/622c1bf3935b7d2632e1f7edff8c9876/'+lattitude+','+longitude+'?units=si'
    
    request({url, json: true},(error,{body}) =>{
            if(error){
                callBack('Unable to connect to penis', undefined)//don't actually have to put undefined here, just highlighting the fact that if the first argument comes back it is an error. Generally first is error, second is value
            }
            else if(body.error){
                callBack('cant find this penis, check your lat and long', undefined)
            }
            else{
                const data = 'todays weather is '+ body.daily.data[0].summary + ' It is currently '+body.currently.temperature+' degrees outside, there is a '+body.currently.precipProbability+'% chance of rain.'+'\n Tommorow\'s weather will be '+body.daily.data[1].summary+'\n Overall you can expect '+body.daily.summary
                callBack(undefined, data)
            }        
        })
}



module.exports = forecast



  