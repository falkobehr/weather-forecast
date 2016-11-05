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

    describe('inCelsius', () => {
        let inCelsius;

        beforeEach(() => {
            inCelsius = $filter('inCelsius');
        });

        it('should be defined', () => {
            expect(inCelsius).toBeDefined();
        });

        it('should return correct temperature string', () => {
            const fakeFahrenheit = 50;

            expect(inCelsius(fakeFahrenheit)).toBe('10°C');
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
