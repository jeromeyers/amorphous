module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'], //see doc: http://pivotal.github.io/jasmine/
    files: [
      'test/matchers.js',
      'test/**/*Spec.js',
      'app/*.js'
    ],
    exclude: [
    ],
    reporters: ['progress'],// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: true,
    browsers: ['Chrome'], //Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
    captureTimeout: 60000,
    singleRun: false// if true, it capture browsers, run tests and exit
  });
};
