(function(angular) {
  "use strict";
  angular
    .module("moneyManager")
    .controller("registerPanelController", function($scope) {
      var vm = this;
      vm.registerUser = user => {
        vm.registrationSubmit({ submissionDetails: user });
      };

      $scope.$watch("rpc.returnObj", newValue => {
        if (newValue && newValue.validAll == 1) {
          vm.user = {
            email: "",
            pwd: "",
            confPwd: ""
          };
        }
      });
    });
})(window.angular);
