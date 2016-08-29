/* jshint node:true */
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			grunt: {
				src: ['Gruntfile.js']
			},
			tests: {
				src: [
					'tests/**/*.js'
				],
				options: grunt.file.readJSON('tests/.jshintrc')
			},
			core: {
				src: [
					'js/*.js'
				]
			}
		},
		uglify: {
			js: {
				options: {
					sourceMap: true
				},
				files: {
					'build/js/wp-api.min.js': [
						'js/app.js',
						'js/utils.js',
						'js/models.js',
						'js/collections.js',
						'js/load.js'
					]
				}
			}
		},
		concat: {
			js: {
				src: [
					'js/app.js',
					'js/utils.js',
					'js/models.js',
					'js/collections.js',
					'js/load.js'
				],
				dest: 'build/js/wp-api.js'
			}
		},
		qunit: {
			all: {
				options: {
					urls: ['http://localhost:80/wp-content/plugins/client-js/tests/tests.html']
				}
			}
		},
		watch: {
			files: [
				'js/*.js'
			],
			tasks: ['jshint', 'jscs', 'uglify:js', 'concat:js']
		},
		jscs: {
			src: 'js/*.js',
			options: {
				config: '.jscsrc',
				verbose: true,
				preset: 'wordpress'
			}
		},
		umd: {
			all: {
				options: {
					src: './build/js/wp-api.js',
					objectToExport: 'wp', // optional, internal object that will be exported
					amdModuleId: 'wp-api',
					deps: { // optional, `default` is used as a fallback for rest!
						'default': ['Backbone'],
						amd: ['foo', {'backbone': 'Backbone'}],
						cjs: ['backbone']
					}
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-umd');
	grunt.registerTask('lint', ['jshint', 'jscs']);
	grunt.registerTask('build', ['concat:js', 'umd:all', 'uglify:js']);
	grunt.registerTask('test', ['qunit:all']);
	grunt.registerTask('default', ['lint', 'build', 'test']);
};
