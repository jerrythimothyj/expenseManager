(function(angular) {
  'use strict';
angular.module('moneyManager')

    .controller('navbarController', function($scope, landingService) {

        $scope.logout = () => {
        	landingService.logout()
        		.then((response) => {
        			console.log(response.data);
        			// $scope.returnObj = response.data;
        		});
        }
    });
})(window.angular);