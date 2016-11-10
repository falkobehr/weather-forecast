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
        });

        it('should be initilized with correct values', () => {
            initController('WeatherForecastController');
            expect($scope.showWeatherForecast).toBe(false);
            expect($scope.showRequestError).toBe(false);
        });

        describe('method "submitHandler()"', () => {
            it('should be defined', () => {
                initController('WeatherForecastController');
                expect($scope.submitHandler).toEqual(jasmine.any(Function));
            });

            it('should call "WeatherForecastService.getDailyWeatherForecast" with correct coordinates from string input', () => {
                spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();

                initController('WeatherForecastController');
                $scope.submitHandler('foo, bar');

                expect(WeatherForecastService.getDailyWeatherForecast).toHaveBeenCalledWith('foo,bar');
            });

            it('should call "WeatherForecastService.getDailyWeatherForecast" with "undefined"', () => {
                spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();

                initController('WeatherForecastController');
                $scope.submitHandler(' ');

                expect(WeatherForecastService.getDailyWeatherForecast).toHaveBeenCalledWith(undefined);
            });

            it('should call "WeatherForecastService.getDailyWeatherForecast" with correct coordinates from location object', () => {
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

            const fakeSuccessCallback = {
                status: 'success',
                weatherForecastCurrently: 'foo',
                weatherForecast: 'bar'
            };

            it('should set correct weather data', () => {
                spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callFake(() => {
                    return {
                        then (callback) {
                            callback(fakeSuccessCallback);
                        }
                    };
                });

                initController('WeatherForecastController');
                $scope.submitHandler();

                expect($scope.weatherForecastCurrently).toBe('foo');
                expect($scope.weatherForecastDaily).toBe('bar');
            });

            it('should call "showWeatherIcons" with correct parameters', () => {
                spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callFake(() => {
                    return {
                        then (callback) {
                            callback(fakeSuccessCallback);
                        }
                    };
                });

                initController('WeatherForecastController');

                spyOn($scope, 'showWeatherIcons').and.callThrough();

                $scope.submitHandler();
                $timeout.flush();

                expect($scope.showWeatherIcons).toHaveBeenCalledWith('foo', 'bar');
            });

            const fakeErrorCallback = {
                status: 'error'
            };

            it('should set correct variables on error', () => {
                spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callFake(() => {
                    return {
                        then (callback) {
                            callback(fakeErrorCallback);
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
        });
    });
});
