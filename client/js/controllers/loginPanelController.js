(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginPanelController', function() {
        var vm = this;

        vm.loginPanelUser = (user) => {
        	vm.loginSubmit({submissionDetails: user})
        }
    });
})(window.angular);