/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

const module = angular.module('Weather.Forecast');

class WeatherForecastService {
    constructor ($injector) {
        this.DEFAULT_COORDINATES = $injector.get('DEFAULT_COORDINATES');
        this.WeatherForecastFactory = $injector.get('WeatherForecastFactory');
    }

    /**
     * @param {String} coordinates
     *
     * @return {Promise}
     */
    getDailyWeatherForecast (coordinates = this.DEFAULT_COORDINATES) {
        return this.WeatherForecastFactory.weather.get({
            coordinates
        }).$promise;
    }
}

module.service('WeatherForecastService', ['$injector', WeatherForecastService]);
