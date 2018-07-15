(function(angular) {
  "use strict";
  angular.module("moneyManager").component("loginPanel", {
    templateUrl: "./client/views/components/loginPanel.html",
    bindings: {
      returnObj: "=",
      loginSubmit: "&"
    },
    controller: "loginPanelController",
    controllerAs: "lpc"
  });
})(window.angular);
