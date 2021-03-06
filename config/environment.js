/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'rantly-ember',
    environment: environment,
    baseURL: '/',
    adapterURL: process.env.ADAPTER_URL,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
      'font-src': "'self' http://fonts.gstatic.com http://maxcdn.bootstrapcdn.com/",  // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' http://localhost:3000 http://peaceful-taiga-8592.herokuapp.com",
      'img-src': "'self' www.gravatar.com",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com http://css-spinners.com/css/spinner/spinner.css http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'"
    },


    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
