const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VkaXB0IiwiYSI6ImNsMm9mY245NjFnMngza25xZzAzdWMzY24ifQ.CpZzqP0aLYWHGLrfw0KxzA&limit=1'

    request({ url: url, json: true }, (error, response) => {

        const { features } = response.body

        if (error) {
            callback('Unable to connect to GeoLocation services', undefined)
        } else if (!features[0]) {
            callback('Location not found. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode
