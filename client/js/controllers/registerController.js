(function(angular) {
  "use strict";
  angular
    .module("moneyManager")
    .controller("registerController", function(landingService) {
      var vm = this;
      vm.registrationSubmit = user => {
        landingService.registration(user).then(response => {
          vm.returnObj = response.data;
        });
      };
    });
})(window.angular);
