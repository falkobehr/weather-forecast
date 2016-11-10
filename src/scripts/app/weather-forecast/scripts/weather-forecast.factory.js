/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

angular.module('Weather.Forecast')
    .factory('WeatherForecastFactory', WeatherForecastFactory);

WeatherForecastFactory.$inject = ['DARK_SKY_API_SECRET_KEY', 'WEATHER_UNITS', '$resource'];

/**
 * Factory for Dark Sky API requests.
 */
function WeatherForecastFactory (DARK_SKY_API_SECRET_KEY, WEATHER_UNITS, $resource) {
    return {
        weather: $resource(`https://api.darksky.net/forecast/${DARK_SKY_API_SECRET_KEY}/:coordinates?exclude=minutely,hourly,alerts,flags&units=${WEATHER_UNITS}`, {}, {
            get: {
                method: 'GET',
                params: {
                    coordinates: '@coordinates'
                },
                interceptor: {
                    response (response) {
                        const optimizedResponse = {
                            status: 'success',
                            weatherForecastCurrently: response.data.currently,
                            weatherForecast: response.data.daily.data
                        };

                        return optimizedResponse;
                    },
                    responseError (response) {
                        const optimizedResponse = {
                            status: 'error',
                            response
                        };

                        return optimizedResponse;
                    }
                }
            }
        })
    };
}
