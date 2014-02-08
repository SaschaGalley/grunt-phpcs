/*
 * grunt-phpunit
 * https://github.com/SaschaGalley/grunt-phpunit
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
            standard: false,
            verbose: false,
            reportFile: false,
            report: 'full',
            maxBuffer: 200*1024,
            ignoreExitCode: false
        },
        cliOptions = {
            errorSeverity: grunt.option('error-severity'),
            extensions: grunt.option('extensions'),
            ignore: grunt.option('ignore'),
            report: grunt.option('report'),
            reportFile: grunt.option('report-file'),
            severity: grunt.option('severity'),
            standard: grunt.option('standard'),
            warningSeverity: grunt.option('warning-severity'),
            verbose: grunt.option('verbose')
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

        if (config.errorSeverity !== undefined) {
            // The minimum severity required to display an error or warning
            cmd += ' --error-severity=' + config.errorSeverity;
        }

        if (config.extensions) {
            // A comma separated list of file extensions to check
            cmd += ' --extensions=' + config.extensions;
        }

        if (config.ignore) {
            // A comma separated list of patterns to ignore files and directories.
            cmd += ' --ignore=' + config.ignore;
        }

        if (config.severity !== undefined) {
            // The minimum severity required to display an error or warning
            cmd += ' --severity=' + config.severity;
        }

        if (config.warningSeverity !== undefined) {
            // The minimum severity required to display an error or warning
            cmd += ' --warning-severity=' + config.warningSeverity;
        }

        if (config.standard) {
            // Define the code sniffer standard.
            cmd += ' --standard=' + config.standard;
        }

        if (config.reportFile) {
            // Define the file to write the report to.
            cmd += ' --report-file=' + config.reportFile;
        }

        if (config.report) {
            // Define the style of the report.
            cmd += ' --report=' + config.report;
        }

        if (config.verbose === true) {
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

        var dir = runner.data.dir,
            attr;
        config  = runner.options(defaults);

        for (attr in cliOptions) {
            if (cliOptions[attr] !== undefined) {
                config[attr] = cliOptions[attr];
            }
        }

        cmd     = buildCommand(dir) + ' ' + grunt.file.expand(dir).join(' ');

        grunt.log.writeln('Starting phpcs (target: ' + runner.target.cyan + ') in ' + dir.join(' ').cyan);
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
