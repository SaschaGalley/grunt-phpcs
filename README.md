# grunt-phpcs

> Grunt plugin for running PHP Code Sniffer.

_This plugin is developed for Grunt `0.4.0` and is not tested for backward compatibility with Grunt `0.3.x`._

##Getting Started
1. Install this grunt plugin with the following command:

	```shell
	npm install grunt-phpcs --save-dev
	```


2. [Install PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer#installation) (preferably with [composer](https://github.com/composer/composer))
3. Add this to your project's `Gruntfile.js` gruntfile:

	```js
	grunt.loadNpmTasks('grunt-phpcs');
	```


##PHP Code Sniffer task
_Run this task with the `grunt phpcs` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._

[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


###Usage Example

```js
phpcs: {
	application: {
		dir: ['application/classes/*.php', application/lib/**/*.php]
	},
	options: {
		bin: 'vendor/bin/phpcs',
		standard: 'Zend'
	}
}
```

###Target Properties
####dir
Type: `Array`

Globbing pattern where phpcs should search for files.

###Options
####bin
Type: `String`  Default: `'phpcs'`

####ignoreExitCode
Type: `Boolean` Default: `false`

####maxBuffer
Type: `Number` Default: `200*1024`

Set the buffer size.

####verbose
Type: `Boolean` Default: `false`

Output more verbose information. This option can also be set by running the task with `--verbose`.

####extensions
Type: `String` Default: `false`

A comma separated list of file extensions to check. This option can also be set by running the task with `--extensions=<extensions>`.

####ignore
Type: `String` Default: `false`

A comma separated list of patterns to ignore files and directories. This option can also be set by running the task with `--ignore=<ignore>`.

####severity
Type: `Integer` Default: `false`

The minimum severity required to display an error or warning. This option can also be set by running the task with `--severity=<severity>`.

####warningSeverity
Type: `Integer` Default: `false`

The minimum severity required to display a warning. This option can also be set by running the task with `--warningSeverity=<severity>`.

####errorSeverity
Type: `Integer` Default: `false`

The minimum severity required to display an error. This option can also be set by running the task with `--errorSeverity=<severity>`.

####standard
Type: `String`  Default: `false`
Define the standard to use. This option can also be set by running the task with `--standard=<standard>`.

####report
Type: `String` Default: `false`

Report types and options

####reportFile
Type: `String` Default: `false`

Log report to the file. This option can also be set by running the task with `--report-file`.
