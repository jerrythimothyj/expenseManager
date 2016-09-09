(function(angular) {
  'use strict';
angular.module('moneyManager')
  .directive('calendar', () => {
    return {
      restrict: 'E',
      templateUrl: './client/views/components/calendar.html',
      controller: 'calendarCtrl',
      controllerAs: 'cc'
    };
  });
})(window.angular);