/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

/* eslint-env jasmine */
/* global inject, module, no-undef */

describe('weather-forecast.factory.js', () => {
    let WeatherForecastFactory;
    let WeatherForecastService;
    let $controller;
    let $httpBackend;
    let $rootScope;
    let $scope;

    beforeEach(() => {
        module('Weather');
        module('Weather.Forecast');

        inject((_$controller_, _$httpBackend_, _$rootScope_, _WeatherForecastFactory_, _WeatherForecastService_) => {
            WeatherForecastFactory = _WeatherForecastFactory_;
            WeatherForecastService = _WeatherForecastService_;
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        });
    });

    const initController = (controller) => {
        $scope = $rootScope.$new();
        $controller(controller, {$scope: $scope});
    };

    describe('WeatherForecastFactory', () => {
        it('should be defined', () => {
            expect(WeatherForecastFactory).toEqual(jasmine.any(Object));
        });

        describe('method "weather.get()"', () => {
            it('should be defined', () => {
                expect(WeatherForecastFactory.weather.get).toEqual(jasmine.any(Function));
            });

            it('should return "$promise" object', () => {
                expect(WeatherForecastFactory.weather.get().$promise).toEqual(jasmine.any(Object));
            });

            it('should have been called on submit request', () => {
                spyOn(WeatherForecastFactory.weather, 'get').and.callThrough();
                initController('WeatherForecastController');
                $scope.submitHandler();

                expect(WeatherForecastFactory.weather.get).toHaveBeenCalled();
            });
        });
    });

    describe('API request response handling', () => {
        const fakeResponse = {
            currently: 'foo',
            daily: {
                data: 'bar'
            }
        };
        const fakeRequestUrl = 'https://api.darksky.net/forecast/77f0b2e0324d25b46f60774c5f387b0b/51.0712095,13.7485919?exclude=minutely,hourly,alerts,flags&units=si';

        it('should set correct success state', () => {
            $httpBackend
                .when('GET', fakeRequestUrl)
                .respond(200, fakeResponse);

            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();
            spyOn(WeatherForecastFactory.weather, 'get').and.callThrough();

            initController('WeatherForecastController');

            $scope.submitHandler();

            $httpBackend.flush();

            expect(WeatherForecastService.getDailyWeatherForecast).toHaveBeenCalled();
            expect(WeatherForecastFactory.weather.get).toHaveBeenCalled();
            expect($scope.showRequestError).toBe(false);
            expect($scope.showWeatherForecast).toBe(true);
            expect($scope.weatherForecastCurrently).toBe('foo');
            expect($scope.weatherForecastDaily).toBe('bar');
        });

        it('should set correct error respone state', () => {
            $httpBackend
                .when('GET', fakeRequestUrl)
                .respond(400, fakeResponse);

            spyOn(WeatherForecastService, 'getDailyWeatherForecast').and.callThrough();
            spyOn(WeatherForecastFactory.weather, 'get').and.callThrough();

            initController('WeatherForecastController');

            $scope.submitHandler();

            $httpBackend.flush();

            expect($scope.showRequestError).toBe(true);
            expect($scope.showWeatherForecast).toBe(false);
        });
    });
});
