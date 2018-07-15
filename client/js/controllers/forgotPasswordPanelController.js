(function(angular) {
  "use strict";
  angular
    .module("moneyManager")
    .controller("forgotPasswordPanelController", function($scope) {
      var vm = this;
      vm.forgotPassword = user => {
        vm.forgotSubmit({ submissionDetails: user });
        $scope.$watch("fppc.returnObj", newValue => {
          if (newValue && newValue.validAll == 1) {
            vm.user = {
              email: ""
            };
          }
        });
      };
    });
})(window.angular);
