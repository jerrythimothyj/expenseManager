(function(angular) {
  "use strict";
  angular.module("moneyManager").component("expenseRecords", {
    templateUrl: "./client/views/components/expenseRecords.html",
    bindings: {
      dateChosen: "=",
      getExpenseValidation: "=",
      expenseFields: "=",
      spendingFields: "=",
      expensesRecords: "=",
      saveExpenses: "&",
      expensesSavedRes: "="
    },
    controller: "expenseRecordsController",
    controllerAs: "erc"
  });
})(window.angular);
