/*
 * grunt-phpcs
 * https://github.com/SaschaGalley/grunt-phpcs
 *
 * Copyright (c) 2013 Sascha Galley
 * http://xash.at
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    var path = require('path'),
        exec = require('child_process').exec;
    
    var command = {
            flags: {
                verbose: 'v',
                showSniffCodes: 's'
            },
            options: {
                errorSeverity: 'error-severity',
                extensions: 'extensions',
                ignore: 'ignore',
                report: 'report',
                reportFile: 'report-file',
                severity: 'severity',
                standard: 'standard',
                warningSeverity: 'warning-severity',
                tabWidth: 'tab-width'
            }
        },
        defaults = {
            bin: 'phpcs',
            report: 'full',
            maxBuffer: 200*1024
        },
        done = null;

    grunt.registerMultiTask('phpcs', 'Run PHP Code Sniffer', function() {
        var done = null,
        options = this.options(defaults),
        execute = path.normalize(options.bin),
        files = [].concat.apply([], this.files.map(function(mapping) { return mapping.src; })).sort();
    
        for (var flag in command.flags) {
            if (options[flag] === true) {
                execute += ' -' + command.flags[flag];
            }
        }
        
        for (var option in command.options) {
            if (options[option] !== undefined) {
                execute += ' --' + command.options[option] + '=' + options[option];
            }
        }
        
        files = files.filter(function(file, position) { return !position || file !== files[position - 1]; });
        
        execute += ' ' + '"' + files.join('" "') + '"';
    
        grunt.log.writeln('Checking ' + files.length + ' file' + (files.length === 1 ? '' : 's') + '...');
        grunt.verbose.writeln('Executing: ' + execute);
        
        done = this.async();
    
        exec(execute, {maxBuffer: options.maxBuffer}, function(err, stdout, stderr) {
            /* jshint -W030 */
            typeof config.callback === 'function' && config.callback.call(this, err, stdout, stderr, done);
            stdout && grunt.log.write(stdout);
            err && !options.ignoreExitCode && grunt.fatal(err);
            done();
        });
    });
};