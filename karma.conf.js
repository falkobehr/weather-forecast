'use strict';

// Karma configuration
var angularVersion = '1.3.20';

module.exports = function (config) {
    config.set({

        // frameworks to use
        frameworks: ['jasmine'],
        files: [

            // test config
            './src/scripts/tests/config.js',

            // external libraries
            '.tmp/external.js',

            // app
            '.tmp/html2js/templates.js',
            '.tmp/scripts/app.js',
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.module.js',
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.controller.js',
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.factory.js',
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.service.js',
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.directive.js',

            // tests
            '.tmp/scripts/**/tests/**/*.spec.js'
        ],
        preprocessors: {

            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.module.js': ['coverage'],
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.controller.js': ['coverage'],
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.factory.js': ['coverage'],
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.service.js': ['coverage'],
            '.tmp/scripts/weather-forecast/scripts/weather-forecast.directive.js': ['coverage'],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['coverage', 'dots'],

        // coverage reporter
        coverageReporter: {
            reporters: [{
                type: 'text-summary'
            }, {
                type: 'html',
                subdir: 'report-html'
            }]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE, config.LOG_ERROR, config.LOG_WARN, config.LOG_INFO, config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 120000,

        // Be more patient with the browser:
        // https://github.com/karma-runner/karma/issues/598
        browserDisconnectTimeout: 180000,
        browserNoActivityTimeout: 180000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
