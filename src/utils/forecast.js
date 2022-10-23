const request = require('postman-request')

//function forecast taking lat and long from app.js
const forecast = (lat, long, callback) => {
    //// access weatherstack api using lat and long sent from app.js and access key stored in json file
    const url = ('http://api.weatherstack.com/current?access_key=509eae51758fdd0812fd2d8f6a1b66c6&query='+ lat + ',' + long + '&units=m')
    
    //request function storing object conatining url and setting json as true
    //error if there is an error and body from response object to reduce the amount of code to write
    request({ url, json: true }, (error, { body }) => {
        //callback if error such as no connection to url
        if(error){
            callback('Unable to connect to weather services')

        //callback if no error but lat and long provided are nonsense
        } else if(body.error){
            callback('Unable to find location. Try another search', undefined)

        //if no error and a proper location was provided callback string
        } else{
            callback(undefined, (body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degreees out. It feels like ' + body.current.feelslike  + ' degrees out.'))
        }
    })
}

module.exports = forecast