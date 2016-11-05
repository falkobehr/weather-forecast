'use strict';

var externalFiles = [
    '<%= path.scripts %>/external/angularjs/angular-1.3.20.min.js',
    '<%= path.scripts %>/external/angularjs/angular-resource.js',
    '<%= path.scripts %>/external/angularjs/autocomplete.min.js',
    '<%= path.scripts %>/external/angularjs/angular-mocks.js',
    '<%= path.scripts %>/external/skycons.js',
];

var appFiles = [
    '<%= path.tmp %>/html2js/templates.js',
    '<%= path.tmp %>/scripts/app.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.module.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.controller.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.factory.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.service.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.directive.js'
];

var allFiles = [
    '<%= path.scripts %>/external/angularjs/angular-1.3.20.min.js',
    '<%= path.scripts %>/external/angularjs/angular-resource.js',
    '<%= path.scripts %>/external/angularjs/autocomplete.min.js',
    '<%= path.scripts %>/external/angularjs/angular-mocks.js',
    '<%= path.scripts %>/external/skycons.js',
    '<%= path.tmp %>/html2js/templates.js',
    '<%= path.tmp %>/scripts/app.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.module.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.controller.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.factory.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.service.js',
    '<%= path.tmp %>/scripts/weather-forecast/scripts/weather-forecast.directive.js'
];

module.exports = {
    external: {
        options: {
            banner: '<%= banner %>',
            stripBanners: true
        },
        src: externalFiles,
        dest: '<%= path.tmp %>/external.js',
    },
    prod: {
        options: {
            banner: '<%= banner %>',
            stripBanners: true
        },
        src: allFiles,
        dest: '<%= path.prod %>/scripts.min.js',
    },
    dev: {
        options: {
            banner: '<%= banner %>',
            stripBanners: true,
            sourceMap: true
        },
        src: appFiles,
        dest: '<%= path.dev %>/app.js',
    }
};