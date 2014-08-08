'use strict';

app.directive('validatable', ['$filter', '$compile', function($filter, $compile) {
  return {
    require: 'ngModel',
    restrict: 'A',
    compile: function(element) {
      return {
        pre: function(scope, element) {
          debugger;
          if(!element.is('div')) {
            var html = '<div>'+ $('<div>').append(element.removeAttr("validatable").clone()).html()+'<span ng-show="error">{{error}}</span></div>';
            return element.replaceWith($compile(angular.element(html))(scope));
          }
        },
        post: function(scope, element, attrs, ngModel) {
          scope.$watch('form.' + ngModel.$name + '.$error', function(v) {
          debugger;
            scope.error = $filter('translate')(_.select(_.keys(v), function(key) {
              return v[key];
            })[0]);
          }, true);
        }
      }
    }
    
  }
}]);