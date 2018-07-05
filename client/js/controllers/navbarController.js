(function(angular) {
  'use strict';
angular.module('moneyManager')

    .controller('navbarController', function($state, landingService) {

        var vm = this;
        vm.logout = () => {
        	landingService.logout()
        		.then((response) => {
        			vm.returnObj = response.data;

                    if (vm.returnObj.logoutInd == 1) {
                        $state.go ('login');
                    }
        		});
        }
    });
})(window.angular);