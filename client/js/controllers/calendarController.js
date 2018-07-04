(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('calendarCtrl', function($scope, $timeout, uiCalendarConfig) {
        $scope.uiConfig = {
          calendar:{
            header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            contentHeight: 'auto',
            defaultView: 'month'
          }
        };


        $timeout(function() {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
            uiCalendarConfig.calendars.myCalendar.fullCalendar('addEventSource', $scope.eventSources);
            uiCalendarConfig.calendars.myCalendar.fullCalendar('rerenderEvents');
        });
    });
})(window.angular);