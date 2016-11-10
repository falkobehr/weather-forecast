'use strict';

module.exports = {
    styles: {
        files: [
            '<%= path.styles %>/**/*.scss'
        ],
        options: {
            spawn: false
        },
        tasks: [
            'sass:dev',
            'autoprefixer:dev'
        ]
    },
    scripts: {
        files: [
            '<%= path.scripts %>/**/*.html',
            '<%= path.scripts %>/**/*.js'
        ],
        options: {
            nospawn: true
        },
        tasks: [
            'babel:app',
            'html2js:app',
            'concat:dev'
        ]
    }
};
