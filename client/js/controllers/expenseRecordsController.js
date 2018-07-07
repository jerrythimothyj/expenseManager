(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expenseRecordsController', function($rootScope, $scope) {

        var vm = this;
        
        let calculateTodays = () => {
            vm.todays = {};
            vm.todays.earnings = 0;
            vm.todays.spendings = 0;
            _.map(vm.expensesRecords, (num) => {
                if(num.expenseType) {
                    let amt = isNaN(parseFloat(num.amount))? 0 : parseFloat(num.amount);
                    amt = Math.round(amt*100)/100;
                    console.log(amt);
                    if(num.spendingsType == 1)
                        vm.todays.earnings += amt;
                    else if(num.spendingsType == 2)
                        vm.todays.spendings += amt;
                }
            });
        }

        calculateTodays();

        vm.deleteRow = (index) => {
        	vm.expensesRecords.splice(index, 1);
            vm.expensesSavedRes.invalidExpenseType = [];
            vm.expensesSavedRes.invalidComments = [];
            vm.expensesSavedRes.invalidSpendingType = [];
            vm.expensesSavedRes.invalidAmount = [];

            if(vm.expensesSavedRes) {
                vm.expensesSavedRes.validAll = 1;
            }

            calculateTodays();
        };

        vm.addNewRow = (index) => {
            if(vm.expensesSavedRes) {
                vm.expensesSavedRes.saveInd = 0;
            }
        	if(vm.expensesRecords[vm.expensesRecords.length - 1].expenseType != 0 || 
                vm.expensesRecords[vm.expensesRecords.length - 1].comments != '' || 
                vm.expensesRecords[vm.expensesRecords.length - 1].spendingsType != 0 || 
                vm.expensesRecords[vm.expensesRecords.length - 1].amount != 0) {
                vm.emptyRecord = {
                    expenseType: 0,
                    comments: '',
                    spendingsType: 0,
                    amount: 0
                }
        		vm.expensesRecords.push(angular.copy(vm.emptyRecord));
        	}

        	if(vm.expensesRecords.length > 0 && !vm.expensesRecords[index]) {
        		vm.deleteRow(index);
        	}

            calculateTodays();
        };

        vm.saveRecords = (expensesRecords) => {
            vm.saveExpenses({expensesRecords:expensesRecords});
        };

        $scope.$watch('getExpenseValidation', (newValue) => {
            if(newValue && newValue.validAll !== 0)
                vm.dateChosen = true;
        });

        $scope.$watch('expensesRecords', (newValue) => {
            calculateTodays();
        });
    });
})(window.angular);