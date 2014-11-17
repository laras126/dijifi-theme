module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
          options: {
            jshintrc: '.jshintrc'
          },
          all: [
            'Gruntfile.js',
            'assets/js/*.js'
          ]
        },

        concat: {   
            dist: {
                src: [
                    'assets/js/libs/*.js',
                    'assets/js/*.js',
                    'assets/js/_*.js'
                ],
                dest: 'assets/js/build/scripts.js',
            }
        },

        uglify: {
            build: {
                src: 'assets/js/build/scripts.js',
                dest: 'assets/js/build/scripts.min.js'
            }
        },

        sass: {
          dist: {
            options: {
              style: 'expanded',
              compass: true,
              // Source maps are available, but require Sass 3.3.0 to be installed
              // https://github.com/gruntassets/js/grunt-contrib-sass#sourcemap
              sourcemap: false,
              require: 'breakpoint-slicer'
            },
            files: {
                'assets/css/main.css': 'assets/scss/main.scss'
            }
          }
        },

        svgstore: {
            options: {
                prefix : 'shape-', // This will prefix each <g> ID
            },
            default: {
                files: {
                    'views/partials/svg-defs.svg': ['assets/img/svgs/*.svg'],
                }
            }
        },

        watch: {
            scripts: {
                files: ['assets/js/*.js', 'assets/**/*.scss'],
                tasks: ['concat', 'uglify', 'sass'],
                options: {
                    spawn: false,
                },
            },

            sass: {
                files: ['assets/css/*.scss', 'assets/css/*/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },

            livereload: {
		        // Browser live reloading
		        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
		        options: {
		          livereload: true
		        },
		        files: [
                    'assets/css/main.css',
                    'assets/js/build/scripts.js',
                    'templates/*/*.html',
                    '*.twig'
		        ]
		    },

        // svgstore: {
        //     files: [
        //       'assets/img/svgs/*.svg'
        //     ]
        //   }
      }
        
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify' );
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    // Register tasks
    grunt.registerTask('default', [
        'sass',
        'concat',
        'uglify',
        'jshint'
      ]);

};