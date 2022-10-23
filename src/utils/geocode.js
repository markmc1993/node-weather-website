const request = require('postman-request')

//function geocode taking location sent from app.js
const geocode = (address, callback) => {
    // access mapbox api using location sent from app.js and access key stored in json file
    const url = ('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFya21jMTk5MyIsImEiOiJjbDVpaTI4ZDMwNWVvM2pteDZ0cHgyZnE4In0.nKBRzqZIfR-VTTRiv3o8Qw&limit=1')

    //request function storing object conatining url and setting json as true
    //error if there is an error and body from response object to reduce the amount of code to write
    request({ url, json: true}, (error, { body }) => {
        //callback if error such as no connection to url
        if (error){
            callback('Unable to connect to location services')

        //callback if no error but location provided is nonsense
        } else if(!body.features.length){
            callback('Unable to find location. Try another search', undefined)

        //if no error and a proper location was provided callback object with the following features
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode