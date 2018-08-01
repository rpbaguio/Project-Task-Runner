module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* Clean */
        clean: {
            scss: ['build/scss/css', '../../../assets/themes/default/css'],
            less: ['build/less/css', '../../../assets/themes/default/css'],
            stylus: ['build/stylus/css', '../../../assets/themes/default/css'],
            js: ['build/js', '../../../assets/themes/default/js']
        },

        /* SASS/SCSS Compile */
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto',
                    compass: true
                },
                files: {
                    'build/scss/css/<%= pkg.css_name %>.css': 'scss/style.scss'
                }
            }
        },

        /* LESS Compile */
        less: {
            dev: {
                options: {
                    paths: ['build/less/css']
                },
                files: {
                    'build/less/css/<%= pkg.css_name %>.css': 'less/style.less'
                }
            }
        },

        /* Stylus Compile */
        stylus: {
            dev: {
                options: {
                    paths: ['build/stylus/css']
                },
                files: {
                    'build/stylus/css/<%= pkg.css_name %>.css': 'stylus/style.styl'
                }
            }
        },

        /* CSS Lint */
        csslint: {
            options: {
                csslintrc: 'csslint/.csslintrc'
            },
            src: [
                'build/scss/css/<%= pkg.css_name %>.css',
                'build/less/css/<%= pkg.css_name %>.css',
                'build/stylus/css/<%= pkg.css_name %>.css'
            ]
        },

        /* CSS Comb */
        csscomb: {
            options: {
                config: 'csscomb/.csscomb.json'
            },
            scss: {
                expand: true,
                cwd: 'build/scss/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/scss/css/'
            },
            less: {
                expand: true,
                cwd: 'build/less/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/less/css/'
            },
            stylus: {
                expand: true,
                cwd: 'build/stylus/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/stylus/css/'
            }
        },

        /* Minify CSS */
        cssmin: {
            scss: {
                files: [{
                    expand: true,
                    cwd: 'build/scss/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/scss/css/',
                    ext: '.min.css'
                }]
            },
            less: {
                files: [{
                    expand: true,
                    cwd: 'build/less/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/less/css/',
                    ext: '.min.css'
                }]
            },
            stylus: {
                files: [{
                    expand: true,
                    cwd: 'build/stylus/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/stylus/css/',
                    ext: '.min.css'
                }]
            }
        },

        /* JS Uglify */
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'build/js/<%= pkg.js_name %>.min.js.map'
                },
                files: {
                    'build/js/<%= pkg.js_name %>.min.js': 'js/default.js'
                }
            }
        },

        /* Copy files from build to production folder */
        copy: {
            scss: {
                expand: true,
                cwd: 'build/scss/css',
                src: ['**'],
                dest: '../../../assets/themes/default/css'
            },
            less: {
                expand: true,
                cwd: 'build/less/css',
                src: ['**'],
                dest: '../../../assets/themes/default/css'
            },
            stylus: {
                expand: true,
                cwd: 'build/stylus/css',
                src: ['**'],
                dest: '../../../assets/themes/default/css'
            },
            js: {
                expand: true,
                cwd: 'build/js',
                src: ['**'],
                dest: '../../../assets/themes/default/js'
            }
        },

        /* Watch */
        watch: {
            scss: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'csslint', 'csscomb:scss', 'cssmin:scss', 'copy:scss']
            },
            less: {
                files: ['less/*.less'],
                tasks: ['less', 'csslint', 'csscomb:less', 'cssmin:less', 'copy:less']
            },
            stylus: {
                files: ['stylus/*.styl'],
                tasks: ['stylus', 'csslint', 'csscomb:stylus', 'cssmin:stylus', 'copy:stylus']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['uglify', 'copy:js']
            }
        },

        /* Notification */
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: '<%= pkg.description %>', // defaults to the css_name in package.json, or will use project directory's css_name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        }
    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    // Tasks execution time
    require('time-grunt')(grunt);

    // Watch tasks
    grunt.registerTask('watch-scss', ['watch:scss']);
    grunt.registerTask('watch-less', ['watch:less']);
    grunt.registerTask('watch-stylus', ['watch:stylus']);
    grunt.registerTask('watch-js', ['watch:js']);

    // Clean tasks
    grunt.registerTask('clean-scss', ['clean:scss']);
    grunt.registerTask('clean-less', ['clean:less']);
    grunt.registerTask('clean-stylus', ['clean:stylus']);
    grunt.registerTask('clean-js', ['clean:js']);

    // Compile tasks
    grunt.registerTask('compile-scss', ['sass', 'csslint', 'csscomb:scss', 'cssmin:scss', 'copy:scss', 'notify_hooks']);
    grunt.registerTask('compile-less', ['less', 'csslint', 'csscomb:less', 'cssmin:less', 'copy:less', 'notify_hooks']);
    grunt.registerTask('compile-stylus', ['stylus', 'csslint', 'csscomb:stylus', 'cssmin:stylus', 'copy:stylus', 'notify_hooks']);
    grunt.registerTask('compile-js', ['uglify', 'copy:js', 'notify_hooks']);

    // Full distribution task.
    grunt.registerTask('dist-scss', ['clean-scss', 'compile-scss']);
    grunt.registerTask('dist-less', ['clean-less', 'compile-less']);
    grunt.registerTask('dist-stylus', ['clean-stylus', 'compile-stylus']);
    grunt.registerTask('dist-js', ['clean-js', 'compile-js']);
};