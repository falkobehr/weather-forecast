/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

/* eslint-env jasmine */
/* global inject, module */

describe('weather-forecast.module.js', () => {
    let $filter;

    beforeEach(() => {
        module('Weather');
        module('Weather.Forecast');

        inject((_$filter_) => {
            $filter = _$filter_;
        });
    });

    describe('temperature', () => {
        let temperature;

        beforeEach(() => {
            temperature = $filter('temperature');
        });

        it('should be defined', () => {
            expect(temperature).toBeDefined();
        });

        it('should return correct temperature in Celsius', () => {
            const fakeCelsius = 10;

            expect(temperature(fakeCelsius, 'C')).toBe('10°C');
        });

        it('should return correct temperature in Fahrenheit', () => {
            const fakeFahrenheit = 50;

            expect(temperature(fakeFahrenheit, 'F')).toBe('50°F');
        });
    });

    describe('dayFromDate', () => {
        let dayFromDate;

        beforeEach(() => {
            dayFromDate = $filter('dayFromDate');
        });

        it('should be defined', () => {
            expect(dayFromDate).toBeDefined();
        });

        it('should return correct weekday', () => {
            const fakeTimestamp = 1478194680;

            expect(dayFromDate(fakeTimestamp)).toBe('Friday');
        });
    });
});
