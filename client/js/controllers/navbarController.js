(function(angular) {
  'use strict';
angular.module('moneyManager')

    .controller('navbarController', function($state, $scope, landingService) {

        $scope.logout = () => {
        	landingService.logout()
        		.then((response) => {
        			$scope.returnObj = response.data;

                    if ($scope.returnObj.logoutInd == 1) {
                        $state.go ('login');
                    }
        		});
        }
    });
})(window.angular);