(function(angular) {
    "use strict";
    angular.module("moneyManager").component("groupBarChart", {
      templateUrl: "./client/views/components/groupBarChart.html",
      bindings: {
        groupBarChartData: "<",
      },
      controller: "groupBarChartController",
      controllerAs: "gbcc"
    });
  })(window.angular);
  