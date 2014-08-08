// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/chai/chai.js',
      'app/bower_components/ngFx/dist/ngFx.js',
      'app/bower_components/xdate/src/xdate.js',
      'app/carrousel/app/scripts/app.js',
      'app/carrousel/app/scripts/directives/carrousel_directive.js',
      'app/carrousel/app/scripts/directives/slide_directive.js',
      'app/carrousel/app/scripts/factories/slide_switcher_factory.js',
      'app/carrousel/app/bower_components/ngstorage/ngStorage.js',
      'app/bower_components/sinonjs/sinon.js',
      'app/bower_components/d3/d3.js',
      'app/bower_components/n3-line-chart/dist/line-chart.js',
      'app/*.js',
      'app/scripts/{,*/}*/*.js',
      'app/specs/{,*/}*spec.js',
      'app/carrousel/app/specs/{,*/}*spec.js',
      '.tmp/templates/*.html'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)

    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    //To see the coverage
    // reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir : 'test/coverage/',
      file : 'index.html'
    },

    preprocessors: {
      'app/scripts/*/*.js': 'coverage',
      'app/carrousel/app/scripts/*/*.js': 'coverage',
      '.tmp/templates/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'templates',
      stripPrefix: '.tmp/'
    }

  });
};
