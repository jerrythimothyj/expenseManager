(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginPanelController', function($scope) {

    	console.log($scope.returnObj);


        $scope.loginPanelUser = (user) => {
        	$scope.loginSubmit({submissionDetails: user})
        }
    });
})(window.angular);