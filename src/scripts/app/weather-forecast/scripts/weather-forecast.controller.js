/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

angular.module('Weather.Forecast')
    .controller('WeatherForecastController', WeatherForecastController);

WeatherForecastController.$inject = ['DEFAULT_COORDINATES', 'DEFAULT_WEATHER_ICON_COLOR', '$scope', '$timeout', 'WeatherForecastService'];

/**
 * Controller Weather Forecast App.
 */
function WeatherForecastController (DEFAULT_COORDINATES, DEFAULT_WEATHER_ICON_COLOR, $scope, $timeout, WeatherForecastService) {
    const REQUEST_STATE_ERROR = 'error';
    const WEATHER_NOW_SELECTOR = 'weather-now';

    $scope.weatherNowSelector = WEATHER_NOW_SELECTOR;
    $scope.defaultCoordinates = DEFAULT_COORDINATES;
    $scope.showWeatherForecast = false;
    $scope.showRequestError = false;

    $scope.submitHandler = submitHandler;

    // Public method just for unit tests and coverage
    $scope.showWeatherIcons = showWeatherIcons;

    /**
     * Handle form submit.
     *
     * @param {String|Object} place
     */
    function submitHandler (place) {
        let coordinates;

        if (typeof(place) === 'object') {
            coordinates = `${place.geometry.location.lat()},${place.geometry.location.lng()}`;
        }

        if (typeof(place) === 'string') {
            coordinates = place.replace(' ', '');

            if (coordinates === '') {
                coordinates = undefined;
            }
        }

        WeatherForecastService.getDailyWeatherForecast(coordinates).then((response) => {
            if (response.status === REQUEST_STATE_ERROR) {
                $scope.showRequestError = true;
                $scope.showWeatherForecast = false;

                return;
            }

            $scope.showRequestError = false;
            $scope.showWeatherForecast = true;
            $scope.weatherForecastCurrently = response.weatherForecastCurrently;
            $scope.weatherForecastDaily = response.weatherForecast;

            $timeout(() => {
                $scope.showWeatherIcons($scope.weatherForecastCurrently, $scope.weatherForecastDaily);
            });
        });
    }

    /**
     * Show weather forcast icons.
     *
     * param {Object} weatherForecastCurrently
     * param {Object} weatherForecastDaily
     */
    function showWeatherIcons (weatherForecastCurrently, weatherForecastDaily) {
        const skycons = new Skycons({
            'color': DEFAULT_WEATHER_ICON_COLOR
        });

        skycons.add(WEATHER_NOW_SELECTOR, weatherForecastCurrently.icon);

        angular.forEach(weatherForecastDaily, (forecastForTheDay) => {
            skycons.add(`${forecastForTheDay.time}`, forecastForTheDay.icon);
        });

        skycons.play();
    }
}
