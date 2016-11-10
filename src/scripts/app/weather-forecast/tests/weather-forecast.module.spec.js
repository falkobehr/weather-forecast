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
