(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginController', function($scope, landingService) {

        $scope.loginSubmit = (user) => {
        	landingService.login(user)
        		.then((response) => {
        			$scope.returnObj = response.data;
        		});
        }
    });
})(window.angular);