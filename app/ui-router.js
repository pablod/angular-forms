'use strict';

/**
 * ui-router mappings
 */
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/',
      views: {
        'content': {
          templateUrl: 'templates/form.html'
        }
      }
    });
  $urlRouterProvider.otherwise('/');
});