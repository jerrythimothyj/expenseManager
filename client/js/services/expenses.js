(function(angular) {
  'use strict';
angular.module('expenseManager')
    .service('expensesService', function($http) {
        this.expenseFields = () => {
            return $http({
              method: 'GET',
              url: './server/api.php?api=expenseFields'
            });
        }
        
        this.spendingFields = () => {
            return $http({
              method: 'GET',
              url: './server/api.php?api=spendingFields'
            });
        }
    });
})(window.angular);