'use strict';

module.exports = {
    prod: {
        options: {
            sourceMap: false,
            sourceMapInlineSources: false
        },
        files: {
            '<%= path.prod %>/styles.min.css': '<%= path.prod %>/styles.min.css'
        }
    }
};
