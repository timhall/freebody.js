module.exports = function (grunt) {
    
    // Project configuration
    grunt.initConfig({
        meta: {
            banner: 
                '// Freebody.js - Free-body mechanics / physics engine in javascript\n' +
                '// (c) Tim Hall - https://github.com/timhall/freebody.js - License: MIT\n' +
                '\n'
        },

        lint: {
            files: ['src/*.js']
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            core: {
                src: 'freebody.js',
                dest: 'freebody.min.js'
            }
        },

        preprocess: {
            freebody_build: {
                files: {
                    'freebody.js': 'src/build/freebody.js'
                }
            }
        },

        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            build: {
                src: ['freebody.js'],
                dest: 'freebody.js'
            }
        },

        jasmine: {
            options: {
                specs: 'specs/**/*.spec.js'
            },
            freebody: {
                src: [
                    'src/build/freebody.js',
                    'src/utils.js',
                    'src/Vector.js',
                    'src/Body.js',
                    'src/gravity.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jasmine:freebody']);
    // Default task.
    grunt.registerTask('default', ['jasmine:freebody', 'preprocess', 'concat', 'uglify']);
};