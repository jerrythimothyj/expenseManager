(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginController', function($state, $scope, landingService) {

        $scope.loginSubmit = (user) => {
        	landingService.login(user)
        		.then((response) => {
        			$scope.returnObj = response.data;

        			if ($scope.returnObj.existingUser == 1) {
        				$state.go ('dashboard');
        			}
        		});
        }
    });
})(window.angular);