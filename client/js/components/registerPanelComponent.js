(function(angular) {
  "use strict";
  angular.module("moneyManager").component("registerPanel", {
    templateUrl: "./client/views/components/registerPanel.html",
    bindings: {
      returnObj: "=",
      registrationSubmit: "&"
    },
    controller: "registerPanelController",
    controllerAs: "rpc"
  });
})(window.angular);
