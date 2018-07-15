(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('budgetRecordsController', function($scope) {

        var vm = this;

        let calculateTodays = () => {
            vm.todays = {};
            vm.todays.total = 0;
            _.map(vm.budgetRecords, (num) => {
                if(num.expenseType) {
                    vm.todays.total += isNaN(parseFloat(num.amount))? 0 : parseFloat(num.amount);
                }
            });
        }

        calculateTodays();

        vm.deleteRow = (index) => {
        	vm.budgetRecords.splice(index, 1);
            vm.budgetSavedRes.invalidExpenseType = [];
            vm.budgetSavedRes.invalidComments = [];
            vm.budgetSavedRes.invalidAmount = [];

            if(vm.budgetSavedRes) {
                vm.budgetSavedRes.validAll = 1;
            }

            calculateTodays();
        };

        vm.addNewRow = (index) => {
            if(vm.budgetSavedRes) {
                vm.budgetSavedRes.saveInd = 0;
            }
        	if(vm.budgetRecords[vm.budgetRecords.length - 1].expenseType != 0 || 
                vm.budgetRecords[vm.budgetRecords.length - 1].comments != '' || 
                vm.budgetRecords[vm.budgetRecords.length - 1].amount != 0) {
                vm.emptyRecord = {
                    expenseType: 0,
                    comments: '',
                    amount: 0
                }
        		vm.budgetRecords.push(angular.copy(vm.emptyRecord));
        	}

        	if(vm.budgetRecords.length > 0 && !vm.budgetRecords[index]) {
        		vm.deleteRow(index);
        	}

            calculateTodays();
        };

        vm.saveRecords = (budgetRecords) => {
            vm.saveBudget({budgetRecords:budgetRecords});
        };

        $scope.$watch('brc.getBudgetValidation', (newValue) => {
            if(newValue && newValue.validAll !== 0)
                vm.dateChosen = true;
        });

        $scope.$watch('brc.budgetRecords', (newValue) => {
            calculateTodays();
        });
    });
})(window.angular);