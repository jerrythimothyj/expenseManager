export default class calendarCtrl {
  constructor($timeout, uiCalendarConfig) {
    const vm = this;
    vm.uiConfig = {
      calendar: {
        header: {
          left: "prev,next today",
          center: "title",
          right: ""
        },
        contentHeight: "auto",
        defaultView: "month"
      }
    };

    $timeout(function() {
      uiCalendarConfig.calendars.myCalendar.fullCalendar("removeEvents");
      uiCalendarConfig.calendars.myCalendar.fullCalendar(
        "addEventSource",
        vm.eventSources
      );
      uiCalendarConfig.calendars.myCalendar.fullCalendar("rerenderEvents");
    });
  }
}

angular
  .module("moneyManager")
  .controller("calendarCtrl", calendarCtrl)
  .component("calendar", {
    templateUrl: "./client/views/components/calendar.html",
    controller: calendarCtrl,
    controllerAs: "cc",
    bindings: {
      eventSources: "="
    }
  });
