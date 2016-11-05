/**
 * Author: Falko Behr <hello@falkonien.de>
 *
 * Created: 2016-11-03
 */

/* eslint-env jasmine */
/* global inject, module */

describe('weather-forecast.service.js', () => {
    let WeatherForecastFactory;
    let WeatherForecastService;

    beforeEach(() => {
        module('Weather');
        module('Weather.Forecast');

        inject((_WeatherForecastFactory_, _WeatherForecastService_) => {
            WeatherForecastFactory = _WeatherForecastFactory_;
            WeatherForecastService = _WeatherForecastService_;
        });
    });

    describe('WeatherForecastService', () => {
        it('should be defined', () => {
            expect(WeatherForecastService).toEqual(jasmine.any(Object));
        });

        describe('method "getDailyWeatherForecast"', () => {
            it('should be defined', () => {
                expect(WeatherForecastService.getDailyWeatherForecast).toEqual(jasmine.any(Function));
            });

            it('should call "WeatherForecastFactory.weather.get()" with correct parameters', () => {
                spyOn(WeatherForecastFactory.weather, 'get').and.callThrough();

                const fakeCoordinates = 'foo,bar';

                WeatherForecastService.getDailyWeatherForecast(fakeCoordinates);
                expect(WeatherForecastFactory.weather.get).toHaveBeenCalledWith({
                    coordinates: 'foo,bar'
                });
            });

            it('should call "WeatherForecastFactory.weather.get()" with correct parameters', () => {
                spyOn(WeatherForecastFactory.weather, 'get').and.callThrough();

                WeatherForecastService.getDailyWeatherForecast();
                expect(WeatherForecastFactory.weather.get).toHaveBeenCalledWith({
                    coordinates: '51.0712095,13.7485919'
                });
            });
        });
    });
});
