(function(angular) {
  'use strict';
angular.module('expenseManager')
    .service('registerService', function($http, $state) {
        this.registerNewUser = (user) => {
            $http({
              method: 'POST',
              url: './server/api.php?api=newUserRegistration',
              data: {user: user}
            }).then((response) => {
                if(response.data.validUser)
                    $state.go('expenses');
              }, (response) => {
                
              });
        }
    });
})(window.angular);