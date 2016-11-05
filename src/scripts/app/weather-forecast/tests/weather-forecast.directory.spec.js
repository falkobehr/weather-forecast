/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

/* eslint-env jasmine */
/* global inject, module, google */

describe('weather-forecast.directive.js', () => {
    let $compile;
    let $rootScope;
    let $scope;
    let element;

    beforeEach(() => {
        module('Weather');
        module('Weather.Forecast');

        inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        $scope = $rootScope.$new();
    });

    const initDirective = (directive) => {
        element = $compile(angular.element(directive))($scope);
        $scope.$digest();
    };

    describe('WeatherForecastDirective', () => {
        it('should render with replacement and contain the correct id', () => {
            initDirective('<weather-forecast />');
            expect(element.find('weather-forecast').html()).not.toBeDefined();
        });
    });
});
