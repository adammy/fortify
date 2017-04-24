module.exports = function (grunt) {

	'use strict';

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			files: ['dist']
		},

		uglify: {
			dist: {
				src: 'src/fortify.js',
				dest: 'dist/fortify.min.js'
			}
		},

		sass: {
			options: {
				sourcemap: 'none',
				noCache: true,
				style: 'compressed'
			},
			dist: {
				files: {
					'dist/fortify.min.css': 'src/fortify.scss'
				}
			}
		},

	});

	grunt.registerTask('default', ['clean', 'uglify', 'sass']);

};
