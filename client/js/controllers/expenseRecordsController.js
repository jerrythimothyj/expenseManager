(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expenseRecordsController', function($scope) {

        $scope.deleteRow = (index) => {
        	$scope.expensesRecords.splice(index, 1);
        };

        $scope.addNewRow = (index) => {
        	if($scope.expensesRecords[$scope.expensesRecords.length - 1] != null) {
        		$scope.expensesRecords.push(null);
        	}

        	if($scope.expensesRecords.length > 0 && !$scope.expensesRecords[index]) {
        		$scope.deleteRow(index);
        	}
        }
    });
})(window.angular);