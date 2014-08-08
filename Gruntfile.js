'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({
    apsaviz: {
      app: 'app',
      spec: 'app/specs',
      dist: 'dist'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= apsaviz.app %>/scripts/{,*/}*.js',
        '<%= apsaviz.spec %>/{,*/}*.js',
        'Gruntfile.js'
      ]
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= apsaviz.dist %>'
          ]
        }]
      },
      server: '.tmp',
      html: '<%= apsaviz.app %>/templates/*.html'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    karma: {
      watch: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= apsaviz.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            '<%= apsaviz.spec %>',
            '<%= apsaviz.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= apsaviz.dist %>'
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: [
        '<%= apsaviz.app %>/index.html',
        '<%= apsaviz.app %>/templates/*.html'
      ],
      options: {
        dest: '<%= apsaviz.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= apsaviz.dist %>/{,*/}*.html'],
      css: ['<%= apsaviz.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= apsaviz.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= apsaviz.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= apsaviz.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= apsaviz.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= apsaviz.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '.tmp',
          src: ['*.html', 'templates/*.html'],
          dest: '<%= apsaviz.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= apsaviz.app %>',
          dest: '<%= apsaviz.dist %>',
          src: [
            '*.{ico,png,txt,html}',
            'scripts/vendor.js',
            'scripts/app.js',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '<%= apsaviz.app %>/assets/img',
          dest: '<%= apsaviz.dist %>/img',
          src: ['*']
        }, {
          expand: true,
          cwd: '<%= apsaviz.app %>/assets/fonts',
          dest: '<%= apsaviz.dist %>/fonts',
          src: ['*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= apsaviz.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['{.tmp,<%= apsaviz.app %>}/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['<%= apsaviz.spec %>/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= apsaviz.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      haml: {
        files: ['<%= apsaviz.app %>/templates/*.haml'],
        tasks: ['haml']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= apsaviz.app %>/{,*/}*.{html, haml}',
          '.tmp/styles/{,*/}*.css',
          '<%= apsaviz.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    haml: {
      partials: {
        files: {
          '.tmp/templates/form.html': '<%=apsaviz.app%>/templates/form.haml'
        }
      },
    }

  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'haml',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'haml',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'usemin',
    'clean:server',
    'clean:html'
  ]);
  
};
