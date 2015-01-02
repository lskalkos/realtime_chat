module.exports = function(grunt) {

  grunt.initConfig({

    nodemon: {
      dev: {
        script: 'server.js'
      }
    }, 

    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'prod/libs/js'
        },
        files: {
          'jquery/jquery.js': 'jquery/dist/jquery.min.js',
          'angular/angular.js': 'angular/angular.min.js',
          'bootstrap/bootstrap.js': 'bootstrap/dist/js/bootstrap.min.js'
        }
      },
      css: {
        options: {
          destPrefix: 'prod/libs/css'
        },
        files: {
          'bootstrap/bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css'
        }
      }
    }

  });

  
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-bowercopy');

  grunt.registerTask('start', ['nodemon']);
  grunt.registerTask('bower', ['bowercopy']);

};