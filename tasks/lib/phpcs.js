/*
 * grunt-phpunit
 * https://github.com/SaschaGalley/grunt-phpcs
 *
 * Copyright (c) 2013 Sascha Galley
 * http://xash.at
 * Licensed under the MIT license.
 */
'use strict';

// External libs.
var path = require('path');
var exec = require('child_process').exec;

exports.init = function(grunt) {

    var exports  = {},
        defaults = {
            // Default options
            bin: 'phpcs',
            extensions: false,
            ignore: false,
            severity: false,
            warningSeverity: false,
            errorSeverity: false,
            standard: false,
            verbose: false,
            reportFile: false,
            report: 'full',
            maxBuffer: 200*1024,
            ignoreExitCode: false
        },
        cmd    = null,
        done   = null,
        config = {};

    /**
     * Builds phpunit command
     *
     * @return string
     */
    var buildCommand = function(dir) {

        var cmd = path.normalize(config.bin);

        if (grunt.option('extensions') || config.extensions) {
            // A comma separated list of file extensions to check
            cmd += ' --extensions=' + config.extensions;
        }

        if (grunt.option('ignore') || config.ignore) {
            // A comma separated list of patterns to ignore files and directories.
            cmd += ' --ignore=' + config.ignore;
        }

        if (grunt.option('severity') || config.severity) {
            // The minimum severity required to display an error or warning
            cmd += ' --severity=' + config.severity;
        }

        if (grunt.option('warningSeverity') || config.warningSeverity) {
            // The minimum severity required to display a warning
            cmd += ' --warning-severity=' + config.warningSeverity;
        }

        if (grunt.option('errorSverity') || config.errorSeverity) {
            // The minimum severity required to display an error
            cmd += ' --error-severity=' + config.errorSeverity;
        }

        if (grunt.option('standard') || config.standard) {
            // Define the code sniffer standard.
            cmd += ' --standard=' + config.standard;
        }

        if (grunt.option('report-file') || config.reportFile) {
            // Define the file to write the report to.
            cmd += ' --report-file=' + config.reportFile;
        }

        if (grunt.option('report') || config.report) {
            // Define the style of the report.
            cmd += ' --report=' + config.report;
        }

        if (grunt.option('verbose') || config.verbose === true) {
            // Output more verbose information.
            cmd += ' -v';
        }
        return cmd;
    };

    /**
     * Setup task before running it
     *
     * @param Object runner
     */
    exports.setup = function(runner) {

        var dir = path.normalize(runner.data.dir);
        config  = runner.options(defaults);
        cmd     = buildCommand(dir) + ' ' + dir;

        grunt.log.writeln('Starting phpcs (target: ' + runner.target.cyan + ') in ' + dir.cyan);
        grunt.verbose.writeln('Exec: ' + cmd);

        done    = runner.async();
    };

    /**
     * Runs phpunit command with options
     *
     */
    exports.run = function() {
        var cmdOptions = {
            maxBuffer: config.maxBuffer
        };

        exec(cmd, cmdOptions, function(err, stdout, stderr) {

            if (stdout) {
                grunt.log.write(stdout);
            }

            if (err) {
                if (! config.ignoreExitCode) {
                    grunt.fatal(err);
                }
            }
            done();
        });
    };

    return exports;
};
