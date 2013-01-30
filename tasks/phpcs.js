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
			verbose: false
		});
		
		// Normalize dir and cmd.
		var dir = path.normalize(this.data.dir);
		var cmd = path.normalize(options.bin);
		
		if (grunt.option('debug') || options.debug === true) {
			// Display debbuging information during test execution.
			cmd += ' --debug';
		}
		
		if (grunt.option('verbose') || options.verbose === true) {
			// Output more verbose information.
			cmd += ' -v';
		}
		
		// Set working directory.
		cmd += ' ' + dir;
		
		grunt.log.writeln('Starting phpunit (target: ' + this.target.cyan + ') in ' + dir.cyan);
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