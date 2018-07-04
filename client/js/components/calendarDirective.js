(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('calendar', function() {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/calendar.html',
      controller: 'calendarCtrl',
      controllerAs: 'cc',
      scope: {
      	eventSources: '='
      }
    };
  });
})(window.angular);