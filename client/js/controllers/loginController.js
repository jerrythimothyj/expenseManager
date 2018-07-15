(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginController', function($state, landingService) {

		var vm = this;
        vm.loginSubmit = (user) => {
        	landingService.login(user).then((response) => {
        			vm.returnObj = response.data;
        			if (vm.returnObj.existingUser == 1) {
						
        				$state.go ('dashboard');
        			}
        		});
        }
    });
})(window.angular);