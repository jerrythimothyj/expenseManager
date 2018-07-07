(function(angular) {
  "use strict";
  angular
    .module("moneyManager")
    .controller("forgotPasswordController", function(landingService) {
      var vm = this;
      vm.forgotSubmit = user => {
        landingService.forgotPassword(user).then(response => {
          vm.returnObj = response.data;
        });
      };
    });
})(window.angular);
