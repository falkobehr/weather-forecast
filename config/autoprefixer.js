'use strict';

module.exports = {
    options: {
        browsers: [
            '> 1%',
            'last 2 versions',
            'ie 10'
        ],
        map: true
    },
    prod: {
        src: '<%= path.prod %>/styles.min.css',
        dest: '<%= path.prod %>/styles.min.css'
    },
    dev: {
        src: '<%= path.dev %>/styles.css',
        dest: '<%= path.dev %>/styles.css'
    }
};
