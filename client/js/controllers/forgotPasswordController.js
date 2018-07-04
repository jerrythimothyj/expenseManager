(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('forgotPasswordController', function($scope, landingService) {
          
        $scope.forgotSubmit = (user) => {
        	landingService.forgotPassword(user).then((response) => {
            	$scope.returnObj = response.data;
            });
            				
        }
    });
})(window.angular);