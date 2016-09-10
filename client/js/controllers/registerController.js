(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerController', function($scope, registerService) {
        $scope.registerUser = (user) => {
        	console.log(user);
            registerService.registerNewUser(user)
        }
    });
})(window.angular);