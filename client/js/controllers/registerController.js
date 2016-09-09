(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('registerController', ['$scope', 'registerService', ($scope, registerService) => {
        $scope.registerUser = (user) => {
            registerService.registerNewUser(user)
        }
    }]);
})(window.angular);