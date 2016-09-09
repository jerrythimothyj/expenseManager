(function(angular) {
  'use strict';
angular.module('moneyManager')
    .service('registerService', ($http, $state) => {
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