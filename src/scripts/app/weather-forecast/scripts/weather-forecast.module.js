/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

angular.module('Weather.Forecast', ['ngResource', 'google.places', 'Weather.Templates'])
    .constant('DEFAULT_COORDINATES', '51.0712095,13.7485919')
    .constant('DEFAULT_WEATHER_ICON_COLOR', '#49a4d8')
    .constant('SECRET_KEY', '77f0b2e0324d25b46f60774c5f387b0b')
    .filter('inCelsius', inCelsius)
    .filter('dayFromDate', dayFromDate);

/**
 * Format temperature from F to C/C to F.
 */
function inCelsius () {
    return (temperature) => {
        const value = parseInt(temperature, 10);
        const convertedValue = `${Math.round((value - 32) * 5.0 / 9.0)}°C`;

        return convertedValue;
    };
}

/**
 * Format day of the week.
 */
function dayFromDate () {
    return (timestamp) => {
        const date = new Date(timestamp * 1000);
        const weekdays = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        const weekday = weekdays[date.getDay()];

        return `${weekday}`;
    };
}
