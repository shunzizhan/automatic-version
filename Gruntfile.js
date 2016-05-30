/*
 * automatic-version-increment
 * https://github.com/noahxinhao/automatic-version-increment
 *
 * Copyright (c) 2014 lxh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },

        // Configuration to be run (and then tested).
        automatic: {
            js: {
                options: {basicSrc: ["tmp/js/"]},
                assetUrl: ['*.js'],
                version:"1.0.3",
                files: {
                    'tmp': ['tmp/index.html'],
                },
            },
            css: {
                options: {basicSrc: ["tmp/css/"]},
                assetUrl: ['*.css'],
                version:"1.0.3",
                files: {
                    'tmp': ['tmp/index.html'],
                },
            },
        },

         // 导出项目时用到的copy任务(复制文件和文件夹)
        copy: {
          dist: {
            files: [{
              expand: true,
              dot: true,
              cwd: 'demo',
              src: [
                '**/*',
                '!less/**'
              ],
              dest: 'tmp'
            }]
          }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },
        rev: {
          // default_options: {
          //   src: ['tmp/default.txt']
          // },
          // custom_options: {
          //   options: {
          //     algorithm: 'sha1',
          //     length: 4
          //   },
          //   src: ['tmp/custom.txt']
          // },
          international_options: {
            options: {
              encoding: 'utf8'
            },
            src: ['tmp/**/*.js','tmp/**/*.css']
          },
        },
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-rev-master');
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    //grunt.registerTask('test', ['clean', 'cache', 'nodeunit']);

    // By default, lint and run all tests.
    // grunt.registerTask('default', ['automatic']);
    grunt.registerTask('default', ['clean', 'copy','automatic']);

};
