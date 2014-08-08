'use strict';

angular.module('apsa-dashboard').config(['$translateProvider', function($translate) {
  $translate.translations('es', {
    required: 'requeridoooo',
    email: 'email gil!',
    min: 'puto'
  });
  $translate.preferredLanguage('es');
}]);