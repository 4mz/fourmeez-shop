'use strict';

var vendor = [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-material/angular-material.min.js'
];

var source = [
    'app/**/*.js'
];

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {

            dist: {
                files: [
                    {
                        src: ['style/app.sass'],
                        dest: '.',
                        expand: true,
                        ext: '.css'
                    }
                ]
            }

        },

        writefile: {

            options: {
                paths: {
                    vendor: vendor,
                    source: source
                }
            },

            target: {
                src: 'index.html.hbs',
                dest: 'index.html'
            },

            prod: {
                src: 'index-prod.html.hbs',
                dest: 'dist/index.html'
            }

        },

        watch: {

            sass: {
                files: '**/*.sass',
                tasks: ['sass']
            },

            source: {
                files: source,
                tasks: ['writefile']
            },

            vendor: {
                files: vendor,
                tasks: ['writefile']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'index.html',
                    'style/app.css',
                    'app/**/*.js',
                    'app/**/*.html'
                ]
            }

        },

        connect: {

            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },

            livereload: {
                options: {
                    open: true,
                    base: [
                        '.'
                    ]
                }
            }

        },

        clean: {
            dist: ['dist']
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/**/*.html',
                            'img/**/*'
                        ],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/style/app.min.css': ['style/app.css']
                }
            }
        },

        uglify: {
            target: {
                files: {
                    'dist/app.min.js': source
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            target: {
                src: vendor,
                dest: 'dist/vendor.min.js'
            }
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: '**/*'
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-writefile');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass', 'writefile', 'connect:livereload', 'watch']);
    grunt.registerTask('dist', ['sass', 'clean:dist', 'cssmin', 'uglify', 'concat', 'writefile:prod', 'copy:dist']);
    grunt.registerTask('deploy', ['dist', 'gh-pages']);

};