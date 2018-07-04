(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('loginPanelController', function($scope) {

        $scope.loginPanelUser = (user) => {
        	$scope.loginSubmit({submissionDetails: user})
        }
    });
})(window.angular);