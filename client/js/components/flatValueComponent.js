(function(angular) {
  "use strict";
  angular.module("moneyManager").component("flatValue", {
    templateUrl: "./client/views/components/flatValue.html",
    bindings: {
      flatClass: "@",
      titleText: "@",
      flatData: "=",
      flatDataEarnings: "="
    }
  });
})(window.angular);
