'use strict';

module.exports = {
    tmp: [
        '<%= path.tmp %>'
    ],
    test: [
        '<%= path.tmp %>',
        '<%= path.coverage %>'
    ],
    prod: [
        '<%= path.tmp %>',
        '<%= path.prod %>/**/*'
    ],
    dev: [
        '<%= path.tmp %>',
        '<%= path.dev %>/**/*'
    ]
};
