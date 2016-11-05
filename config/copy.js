'use strict';

module.exports = {
    prod: {
        cwd: '<%= path.src %>/',
        dest: '<%= path.prod %>/',
        expand: true,
        filter: 'isFile',
        src: [
            'index.html'
        ]
    },
    dev: {
        cwd: '<%= path.src %>/',
        dest: '<%= path.dev %>/',
        expand: true,
        filter: 'isFile',
        src: [
            'index.html'
        ]
    },
    externalToDev: {
        cwd: '<%= path.tmp %>/',
        dest: '<%= path.dev %>/',
        expand: true,
        filter: 'isFile',
        src: [
            'external.js'
        ]
    }
};
