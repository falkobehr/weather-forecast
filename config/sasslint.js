'use strict';

module.exports = {
    options: {
        formatter: 'stylish',
        configFile: '.sass-lint.yml'
    },
    target: ['<%= path.styles %>/**/*.scss']
};
