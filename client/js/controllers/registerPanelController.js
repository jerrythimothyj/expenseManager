(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerPanelController', function($scope) {
    	console.log($scope.returnObj);

        $scope.registerUser = (user) => {
        	
        	$scope.registrationSubmit({submissionDetails: user})
        }
    });
})(window.angular);