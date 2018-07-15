(function(angular) {
  "use strict";
  angular.module("moneyManager").component("bubbleLegend", {
    templateUrl: "./client/views/components/bubbleLegend.html",
    bindings: {
      bubbleNo: "@",
      bubbleData: "<",
      bubbleColors: "=",
      hideLegend: "<"
    }
  });
})(window.angular);
