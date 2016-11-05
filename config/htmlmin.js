'use strict';

module.exports = {
    prod: {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },
        files: {
            '<%= path.prod %>/index.html': '<%= path.prod %>/index.html'
        }
    }
};