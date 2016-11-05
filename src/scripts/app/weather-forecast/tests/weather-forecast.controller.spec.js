/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

/* eslint-env jasmine */
/* global inject, module */

describe('weather-forecast.controller.js', () => {
    let $controller;
    let $rootScope;
    let $scope;
    let $timeout;
    let WeatherForecastService;

    beforeEach(() => {
        module('Weather');
        module('Weather.Forecast');

        inject((_$controller_, _$rootScope_, _$timeout_, _WeatherForecastService_) => {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            WeatherForecastService = _WeatherForecastService_;
        });
    });

    const initController = (controller) => {
        $scope = $rootScope.$new();
        $controller(controller, {$scope: $scope});
    };

    describe('WeatherForecastController', () => {
        it('should be defined', () => {
            initController('WeatherForecastController');
            expect(WeatherForecastController).toEqual(jasmine.any(Function)); // eslint-disable-line no-undef
            expect($scope.showWeatherForecast).toBe(false);
            expect($scope.showRequestError).toBe(false);
            expect($scope.submitHandler).toEqual(jasmine.any(Function));
        });

        it('', () => {
            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();

            initController('WeatherForecastController');
            $scope.submitHandler('foo, bar');

            expect(WeatherForecastService.getDailyWeatherForecast).toHaveBeenCalledWith('foo,bar');
        });

        it('', () => {
            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();

            initController('WeatherForecastController');
            $scope.submitHandler(' ');

            expect(WeatherForecastService.getDailyWeatherForecast).toHaveBeenCalledWith(undefined);
        });

        it('', () => {
            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();

            initController('WeatherForecastController');
            $scope.submitHandler({
                geometry: {
                    location: {
                        lat () {
                            return 'foo';
                        },
                        lng () {
                            return 'bar';
                        }
                    }
                }
            });

            expect(WeatherForecastService.getDailyWeatherForecast).toHaveBeenCalledWith('foo,bar');
        });

        it('', () => {
            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callFake(() => {
                return {
                    then (callback) {
                        callback({
                            status: 'error'
                        });
                    }
                };
            });

            initController('WeatherForecastController');

            spyOn($scope, 'showWeatherIcons').and.callThrough();

            expect($scope.showRequestError).toBe(false);
            expect($scope.showWeatherForecast).toBe(false);

            $scope.submitHandler();

            expect($scope.showRequestError).toBe(true);
            expect($scope.showWeatherForecast).toBe(false);
            expect($scope.showWeatherIcons).not.toHaveBeenCalled();
        });

        it('', () => {
            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callFake(() => {
                return {
                    then (callback) {
                        callback({
                            status: 'success',
                            weatherForecastCurrently: 'foo',
                            weatherForecast: 'bar'
                        });
                    }
                };
            });

            initController('WeatherForecastController');
            $scope.submitHandler();

            expect($scope.weatherForecastCurrently).toBe('foo');
            expect($scope.weatherForecastDaily).toBe('bar');
        });

        it('', () => {
            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callFake(() => {
                return {
                    then (callback) {
                        callback({
                            status: 'success',
                            weatherForecastCurrently: 'foo',
                            weatherForecast: 'bar'
                        });
                    }
                };
            });

            initController('WeatherForecastController');

            spyOn($scope, 'showWeatherIcons').and.callThrough();

            $scope.submitHandler();
            $timeout.flush();

            expect($scope.showWeatherIcons).toHaveBeenCalledWith('foo', 'bar');
        });
    });
});
