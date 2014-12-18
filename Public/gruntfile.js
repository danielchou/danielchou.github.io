module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                mangle: {
                    except: ['jQuery', 'Backbone']
                }
            },
            my_target: {
                files: {
                    "dest/aa.js": [
                        "js/vendor/jquery/jquery.js",
                        "js/vendor/semantic-ui/semantic.js",
                        "js/views/m1.js"
                    ]
                }
            }
        },
        cssmin: {
            combine: {
                options:{
                    banner:"/* My minified css file!! By Daniel.Chou */"
                },
                files: {
                    "css/dest/m.css":["css/main.css"]
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify',"cssmin"]);

};