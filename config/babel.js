'use strict';

module.exports = {
    app: {
        options: {
            sourceMap: true,
            presets: ['es2015-script'],

            // angular has no sourceMap support, this helps a bit
            retainLines: false
        },
        files: [{
            expand: true,
            cwd: '<%= path.scripts %>/app/',
            src: ['**/*.js'],
            dest: '<%= path.tmp %>/scripts'
        }]
    }
};
