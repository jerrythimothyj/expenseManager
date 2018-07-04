(function(angular) {
  'use strict';
angular.module('moneyManager')
    .service('budgetService', function($http) {
        this.getBudget = (obj) => {
            return $http({
              method: 'POST',
              url: './server/api.php?api=getBudget',
              data: {
                date: obj
              }
            });
        }

        this.saveBudget = (obj) => {
            return $http({
              method: 'POST',
              url: './server/api.php?api=saveBudget',
              data: obj
            });
        }
    });
})(window.angular);