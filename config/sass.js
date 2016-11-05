'use strict';

module.exports = {
    prod: {
        options: {
            sourceMap: false,
            sourceMapContents: false,
            sourceMapEmbed: false
        },
        files: {
            '<%= path.prod %>/styles.min.css': '<%= path.styles %>/styles.scss'
        }
    },
    dev: {
        options: {
            sourceMap: true,
            sourceMapContents: true,
            sourceMapEmbed: true
        },
        files: {
            '<%= path.dev %>/styles.css': '<%= path.styles %>/styles.scss'
        }
    }
};
