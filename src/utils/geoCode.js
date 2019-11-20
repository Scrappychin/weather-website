const request = require('request')
const geoCode = (address, callBack) => {
    const placeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2NyYXBweWNoaW4iLCJhIjoiY2sya3lxOWZvMDFraDNtbjI3MjJ0NzQ1eSJ9.x8A138sIi4Wl2R2deSoaww&limit=1'
    request({url: placeUrl, json: true},(error,{body}) =>{ //here it used to be a field called 'response' and then we were doing response.body to get the body, but destructured it to get rid of the response object altogether
            if(error){
                callBack('Unable to connect to penis', undefined)//don't actually have to put undefined here, just highlighting the fact that if the first argument comes back it is an error. Generally first is error, second is value
            }
            else if(body.features.length===0){
                callBack('cant find this search term, please use some other penis', undefined)
            }
            else{
                callBack(undefined, {
                    lattitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }        
        })
}

module.exports = geoCode