(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('expensesController', function($state, expenseFields, spendingFields, expensesData, expensesService) {
        
        var vm = this;
        vm.dateChosen = false;

        vm.expenseFields = _.sortBy(expenseFields.data, 'type');
        vm.spendingFields = _.sortBy(spendingFields.data, 'type');

        let d = new Date();
        vm.expenseDate = {
        	year: d.getFullYear(),
        	month: (d.getMonth() + 1),
        	day: d.getDate()
        }

        vm.expensesRecords = expensesData.data;
        vm.emptyRecord = {
            expenseType: 0,
            comments: '',
            spendingsType: 0,
            amount: 0
        }
        vm.expensesRecords.push(angular.copy(vm.emptyRecord));

        vm.getExpenseRecords = (expenseDate) => {
            expensesService.getExpenses(expenseDate).then((response) => {
                vm.getExpenseValidation = {};

                if(response.data.validAll == 0) {
                    vm.getExpenseValidation = response.data;
                }
                else {
                    vm.expensesRecords = response.data;
                    vm.expensesRecords.push(angular.copy(vm.emptyRecord));

                    vm.dateChosen = true;
                    vm.expensesSavedRes = {};
                }
            });
        }

        vm.saveExpenses = (expensesRecords) =>{
            let expRecords = angular.copy(expensesRecords);
            expRecords.pop();

            let expenseData = {
                date: vm.expenseDate.year.id + '/' + vm.expenseDate.month.id + '/' + vm.expenseDate.day.id,
                expenses: expRecords
            };

            expensesService.saveExpenses(expenseData).then((response) => {
                vm.expensesSavedRes = response.data;

                if(response.data.saveInd == 1) {
                    vm.dateChosen = false;
                }
            });

        }
    });
})(window.angular);