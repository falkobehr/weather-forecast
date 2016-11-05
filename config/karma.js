'use strict';

module.exports = {

    // separate code coverage from tests as coverage concatenates all
    // files and thus looses line number information for failing tests
    local: {
        configFile: 'karma.conf.js'
    }
};
