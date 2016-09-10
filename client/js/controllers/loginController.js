(function(angular) {
  'use strict';
  console.log("Function Working!");
angular.module('moneyManager')
    .controller('loginController', function($scope) {
        $scope.loginSubmit = (user) => {
            // loginService.loginNewUser(user)
            console.log(user);
        }
    });
})(window.angular);