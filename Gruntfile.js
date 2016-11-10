'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var options = {
        pkg: grunt.file.readJSON('package.json'),
        config: {
            src: 'config/*.js'
        },
        path: {
            build: 'build',
            coverage: 'coverage',
            prod: 'prod',
            src: 'src',
            dev: 'dev',
            styles: 'src/styles',
            scripts: 'src/scripts',
            tmp: '.tmp'
        },
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> - ' +
                'Copyright <%= pkg.author %>, <%= pkg.url %> */\n'
    },
    configs = require('load-grunt-configs')(grunt, options);

    grunt.initConfig(configs);

    grunt.registerTask('d', 'Deploy.', function (env) {

        // Default: prod targets
        var tasks = [
            'clean:prod',
            'copy:prod',
            'babel:app',
            'html2js:app',
            'concat:prod',
            'uglify:prod',
            'sass:prod',
            'autoprefixer:prod',
            'cssmin:prod',
            'replace:prod',
            'htmlmin:prod'
        ];

        if (env === 'dev') {

            // Dev targets
            tasks = [
                'clean:dev',
                'copy:dev',
                'babel:app',
                'html2js:app',
                'concat:dev',
                'concat:external',
                'copy:externalToDev',
                'sass:dev',
                'autoprefixer:dev',
                'replace:dev'
            ];
        }

        tasks.push('clean:tmp');

        grunt.task.run(tasks);
    });

    grunt.registerTask('w', 'Watch SASS and/or JavaScript tasks.', function (type) {
        var tasks = [
            'clean:dev',
            'copy:dev'
        ];

        switch (type) {
            case 'scripts':
                tasks.push(
                    'sass:dev',
                    'autoprefixer:dev',
                    'watch:scripts'
                );
                break;

            case 'styles':
                tasks.push(
                    'babel:app',
                    'html2js:app',
                    'concat:dev',
                    'concat:external',
                    'copy:externalToDev',
                    'watch:styles'
                );
                break;

            default:
                tasks.push(
                    'sass:dev',
                    'autoprefixer:dev',
                    'babel:app',
                    'html2js:app',
                    'concat:dev',
                    'concat:external',
                    'copy:externalToDev',
                    'watch'
                );
                break;
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask('t', 'Run JavaScript Karma tests.', function () {
        var tasks = [
            'clean:test',
            'babel:app',
            'html2js:app',
            'concat:external',
            'karma:local',
            'clean:tmp'
        ];

        grunt.task.run(tasks);
    });

    grunt.registerTask('v', 'Lint SASS and JavaScript.', function () {
        var tasks = [
            'sasslint',
            'eslint',
            'clean:tmp'
        ];

        grunt.task.run(tasks);
    });
};
