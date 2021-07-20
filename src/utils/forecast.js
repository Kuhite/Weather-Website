const request = require('request')

const forecast = (x , y , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=33af148a7a5997f680141ce037e3f430&query='+ x + ',' + y + '&units=f'

    request({ url, json: true }, (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service!',undefined)
            } else if (body.error) {
                callback('Unable to find location',undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out.")
            }
        })

}

module.exports = forecast