'use strict';

module.exports = {
    options: {
        module: 'Weather.Templates',
        rename: function (moduleName) {
            var templateName = moduleName.split('app/')[1].replace('templates/', '');

            return templateName;
        }
    },
    app: {
        src: ['<%= path.scripts %>/app/**/templates/*.html'],
        dest: '<%= path.tmp %>/html2js/templates.js'
    }
};
