module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    require: 'susy',
                    style: 'compressed'
                },
                files: {
                    'css/style.css' : 'scss/style.scss',
                    'css/ie.css' : 'scss/ie.scss'
                }
            }
        },
        postcss: {
            options: {
                // or
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'css' // ...to the specified directory
                },

                processors: [
                    // require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({browsers: 'last 2 versions'}) // add vendor prefixes
                    // require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'css/style.css'
            }
        },
        watch: {
            css: {
                files: ['scss/*.scss', 'scss/*/*.scss', 'scss/*/*/*.scss'],
                tasks: ['sass', 'postcss']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('server',['connect']);
    grunt.registerTask('default',['sass', 'postcss']);
}