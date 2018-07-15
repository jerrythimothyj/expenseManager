(function(angular) {
  'use strict';
angular.module('moneyManager')
  .component('calendar', {
    templateUrl: './client/views/components/calendar.html',
    controller: 'calendarCtrl',
    controllerAs: 'cc',
    bindings: {
      eventSources: '='
    }
  });
})(window.angular);