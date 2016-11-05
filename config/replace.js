'use strict';

module.exports = {
    prod: {
        src: ['<%= path.prod %>/index.html'],
        dest: ['<%= path.prod %>/index.html'],
        replacements: [{
            from: 'app.js',
            to: 'scripts.min.js'
        }, {
            from: 'styles.css',
            to: 'styles.min.css'
        },{
            from: /<script[^>]*exclude><\/script>/gi,
            to: ''
        }]
    },
    dev: {
        src: ['<%= path.dev %>/index.html'],
        dest: ['<%= path.dev %>/index.html'],
        replacements: [{
            from: ' exclude',
            to: ''
        }]
    }
};
