(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('chosenDateController', function($rootScope, $scope) {
       
        $scope.expenseYears = [];
        let expenseYearLimit = 10;
        let currentDate = new Date();
        for (let ictr = $scope.noDay? currentDate.getFullYear() + 1 : currentDate.getFullYear(); ictr > (currentDate.getFullYear() - expenseYearLimit); ictr--)	 {
        	$scope.expenseYears.push({
        		id: ictr, 
        		name: ictr
        	});
 		}

 		$scope.expenseDate.year = {
 			id: $scope.expenseDate.year,
 			name: $scope.expenseDate.year
 		}

 		$scope.expenseMonths = [];
 		$scope.monthsName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 		let expenseMonthsLimit = $scope.monthsName.length;
 		
 		for (let ictr = 1; ictr < expenseMonthsLimit; ictr++) {
 			$scope.expenseMonths.push({
 				id : ictr,
 				name : $scope.monthsName[ictr]
 			});
 		}

 		$scope.expenseDate.month = {
 			id: $scope.expenseDate.month,
 			name: $scope.monthsName[$scope.expenseDate.month]
 		}

		$scope.expenseDays = [];
        let expenseDayLimit = 31;
        for (let ictr = 1; ictr <= expenseDayLimit; ictr++)	 {
        	$scope.expenseDays.push({
        		id: ictr, 
        		name: ictr
        	});
 		}

 		$scope.expenseDate.day = {
 			id: $scope.expenseDate.day,
 			name: $scope.expenseDate.day
 		}

        $scope.getRecords = (expenseDate) => {
            let dateObj = expenseDate.year.id + '/' + expenseDate.month.id  + '/' + expenseDate.day.id;
            $scope.getExpenseRecords({expenseDate: dateObj});
            $scope.chosenDate = dateObj;
        };

        $scope.disableRecords = () => {
            if(!$scope.isDashboard) {
                $scope.dateChosen = false;
                if($scope.chosenDate == $scope.expenseDate.year.id + '/' + $scope.expenseDate.month.id  + '/' + $scope.expenseDate.day.id)
                    $scope.dateChosen = true;
            }
        }

    });
})(window.angular);