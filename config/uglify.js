'use strict';

module.exports = {
    prod: {
        options: {
            beautify: false,
            compress: {},
            mangle: false,
            preserveComments: 'some',
            sourceMap: false,
            sourceMapIncludeSources: false
        },
        files: [{
            expand: true,
            cwd: '<%= path.prod %>',
            src: '*.js',
            dest: '<%= path.prod %>'
        }]
    }
};
