/*
 * grunt-phpunit
 * https://github.com/SaschaGalley/grunt-phpunit
 *
 * Copyright (c) 2013 Sascha Galley
 * http://xash.at
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    // Internal lib.
    var phpcs = require('./lib/phpcs').init(grunt);

    grunt.registerMultiTask('phpcs', 'Run phpunit', function() {
        phpcs.setup(this);
        phpcs.run();
    });
};