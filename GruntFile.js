module.exports = function (grunt) {
    
    // Project configuration
    grunt.initConfig({
        meta: {
            banner: 
                '// Freebody.js - Free-body mechanics / physics engine in javascript\n' +
                '// (c) Tim Hall - https://github.com/timhall/freebody.js - License: MIT\n' +
                '\n'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['src/*.js', 'specs/*.spec.js'],
            built: ['freebody.js']
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
            build: {
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

        copy: {
            built: {
                files: [
                    {src:'freebody.js', dest:'pages/app/scripts/freebody.js'}
                ] 
            }
        },

        jasmine: {
            options: {
                specs: 'specs/**/*.spec.js',
                vendor: 'node_modules/lodash/lodash.js'
            },
            freebody: {
                src: ['freebody.js']
            }
        },

        watch: {
            all: {
                files: ['src/*.js', 'specs/*.spec.js', 'src/build/freebody.js', 'GruntFile.js'],
                tasks: ['test'],
                interupt: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint:src', 'jasmine:freebody', 'watch:all']);
    grunt.registerTask('build', ['preprocess', 'concat', 'jshint:built'])
    grunt.registerTask('default', ['test', 'build', 'uglify', 'copy']);
};
