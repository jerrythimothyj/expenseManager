(function(angular) {
  "use strict";
  angular.module("moneyManager").component("forgotPasswordPanel", {
    templateUrl: "./client/views/components/forgotPasswordPanel.html",
    bindings: {
      returnObj: "=",
      forgotSubmit: "&"
    },
    controller: "forgotPasswordPanelController",
    controllerAs: "fppc"
  });
})(window.angular);
