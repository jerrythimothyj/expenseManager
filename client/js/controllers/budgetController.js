(function(angular) {
  "use strict";
  angular
    .module("moneyManager")
    .controller("budgetController", function(
      $scope,
      $state,
      expenseFields,
      budgetData,
      budgetService
    ) {
      var vm = this;
      vm.noDay = true;
      vm.dateChosen = false;

      vm.expenseFields = _.sortBy(expenseFields.data, "type");

      let d = new Date();
      vm.budgetDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: 1
      };

      vm.budgetRecords = budgetData.data;
      vm.emptyRecord = {
        expenseType: 0,
        comments: "",
        amount: 0
      };
      vm.budgetRecords.push(angular.copy(vm.emptyRecord));

      vm.budgetSavedRes = {};

      vm.getBudgetRecords = budgetDate => {
        budgetService.getBudget(budgetDate).then(response => {
          vm.getBudgetValidation = {};

          if (response.data.validAll == 0) {
            vm.getBudgetValidation = response.data;
          } else {
            vm.budgetRecords = response.data;
            vm.budgetRecords.push(angular.copy(vm.emptyRecord));

            vm.dateChosen = true;
            vm.budgetSavedRes = {};
          }
        });
      };

      vm.saveBudget = budgetRecords => {
        let budRecords = angular.copy(budgetRecords);
        budRecords.pop();

        let budgetData = {
          date: vm.budgetDate.year.id + "/" + vm.budgetDate.month.id + "/" + 1,
          budget: budRecords
        };

        budgetService.saveBudget(budgetData).then(response => {
          vm.budgetSavedRes = response.data;

          if (response.data.saveInd == 1) {
            vm.dateChosen = false;
          }
        });
      };

      vm.getLastMonthRecords = budgetDate => {
        let dateObj =
          budgetDate.year.id +
          "/" +
          budgetDate.month.id +
          "/" +
          budgetDate.day.id;
        vm.getBudgetRecords(budgetService.getLastMonthBudgetDate(dateObj));
      };

      vm.isEqual = (o1, o2) => {
        return angular.equals(o1, o2);
      };
    });
})(window.angular);
