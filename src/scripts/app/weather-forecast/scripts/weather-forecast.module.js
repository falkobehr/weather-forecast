/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

angular.module('Weather.Forecast', ['ngResource', 'google.places', 'Weather.Templates'])
    .constant('DEFAULT_COORDINATES', '51.0712095,13.7485919')
    .constant('WEATHER_ICON_COLOR', '#49a4d8')
    .constant('WEATHER_UNITS', 'si')
    .constant('DARK_SKY_API_SECRET_KEY', '77f0b2e0324d25b46f60774c5f387b0b')
    .filter('temperature', temperatureFilter)
    .filter('dayFromDate', dayFromDateFilter);

/**
 * Format temperatue.
 */
function temperatureFilter () {
    return (temperature, unit) => {
        let temperatureNew = parseInt(temperature, 10);

        if (unit === 'C') {
            temperatureNew += '°C';
        }

        if (unit === 'F') {
            temperatureNew += '°F';
        }

        return temperatureNew;
    };
}

/**
 * Format day of the week.
 */
function dayFromDateFilter () {
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
