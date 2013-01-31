/*
 * grunt-phpunit
 * https://github.com/SaschaGalley/grunt-phpunit
 *
 * Copyright (c) 2013 Sascha Galley
 * http://xash.at
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
	'use strict';

	var _ = grunt.util._;
	
	var path = require('path');
	var exec = require('child_process').exec;
	
	grunt.registerMultiTask( 'phpcs', 'Run phpunit', function() {
	
		var done = this.async();
		
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			// Default options
			bin: 'phpcs',
			debug: false,
			extensions: false,
			ignore: false,
			severity: false,
			standard: false,
			verbose: false
		});
		
		// Normalize dir and cmd.
		var dir = path.normalize(this.data.dir);
		var cmd = path.normalize(options.bin);
		
		if (grunt.option('debug') || options.debug === true) {
			// Display debbuging information during test execution.
			cmd += ' --debug';
		}
		
		if (grunt.option('extensions') || options.extensions) {
			// A comma separated list of file extensions to check
			cmd += ' --extensions=' + options.extensions;
		}
		
		if (grunt.option('ignore') || options.ignore) {
			// A comma separated list of patterns to ignore files and directories.
			cmd += ' --ignore=' + options.ignore;
		}
		
		if (grunt.option('severity') || options.severity) {
			// The minimum severity required to display an error or warning
			cmd += ' --severity=' + options.severity;
		}
		
		if (grunt.option('verbose') || options.standard) {
			// Define the code sniffer standard.
			cmd += ' --standard=' + options.standard;
		}
		
		if (grunt.option('verbose') || options.verbose === true) {
			// Output more verbose information.
			cmd += ' -v';
		}
		
		// Set working directory.
		cmd += ' ' + dir;
		
		grunt.log.writeln('Starting phpcs (target: ' + this.target.cyan + ') in ' + dir.cyan);
		grunt.verbose.writeln('Exec: ' + cmd);
		
		// Execute phpunit command.
		exec(cmd, function( err, stdout, stderr) {
			
			if (stdout) {
				grunt.log.write(stdout);
			}

			if (err) {
				grunt.fatal(err);
			}

			done();
			
		});
	});
};