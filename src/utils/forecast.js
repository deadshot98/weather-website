const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=fcdc30bb51d49148645cad1962011e3f&query=' + longitude + ',' + latitude
    //using object short hand for url...i.e using just url instead of url: url
    request({ url, json: true }, (error, { body }) => {

        // const { error: Rerror, current } = response.body // object destructuring shorthand

        if (error) {
            callback('Unable to connect to Weather services', undefined)
        } else if (body.error) {
            callback('Unable to find Location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Is is currently ' + body.current.temperature + ' degrees out. Though it feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast