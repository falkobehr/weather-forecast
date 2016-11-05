/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

angular.module('Weather.Forecast')
    .directive('weatherForecast', WeatherForecastDirective);

/**
 * Directive for Angular HTML attribute.
 * e.g. <weather-forecast />
 */
function WeatherForecastDirective () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'weather-forecast/weather-forecast.html',
        controller: 'WeatherForecastController'
    };
}
