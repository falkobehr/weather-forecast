/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

angular.module('Weather.Forecast')
    .factory('WeatherForecastFactory', WeatherForecastFactory);

WeatherForecastFactory.$inject = ['SECRET_KEY', '$resource'];

/**
 * Factory for Dark Sky API requests.
 */
function WeatherForecastFactory (SECRET_KEY, $resource) {
    return {
        weather: $resource(`https://api.darksky.net/forecast/${SECRET_KEY}/:coordinates`, {}, {
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
