export default class chosenDateController {
  constructor($scope) {
    var vm = this;
    vm.$onChanges = function() {
      vm.expenseYears = [];
      let expenseYearLimit = 10;
      let currentDate = new Date();
      for (
        let ictr = vm.noDay
          ? currentDate.getFullYear() + 1
          : currentDate.getFullYear();
        ictr > currentDate.getFullYear() - expenseYearLimit;
        ictr--
      ) {
        vm.expenseYears.push({
          id: ictr,
          name: ictr
        });
      }

      vm.expenseMonths = [];
      vm.monthsName = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let expenseMonthsLimit = vm.monthsName.length;

      for (let ictr = 1; ictr < expenseMonthsLimit; ictr++) {
        vm.expenseMonths.push({
          id: ictr,
          name: vm.monthsName[ictr]
        });
      }

      vm.expenseDays = [];
      let expenseDayLimit = 31;
      for (let ictr = 1; ictr <= expenseDayLimit; ictr++) {
        vm.expenseDays.push({
          id: ictr,
          name: ictr
        });
      }
    };

    $scope.$watch("cdc.expenseDate", (n, o) => {
      vm.expenseDate.year = {
        id: vm.expenseDate.year,
        name: vm.expenseDate.year
      };

      vm.expenseDate.month = {
        id: vm.expenseDate.month,
        name: vm.monthsName[vm.expenseDate.month]
      };

      vm.expenseDate.day = {
        id: vm.expenseDate.day,
        name: vm.expenseDate.day
      };
    });

    vm.getRecords = expenseDate => {
      let dateObj =
        expenseDate.year.id +
        "/" +
        expenseDate.month.id +
        "/" +
        expenseDate.day.id;
      vm.getExpenseRecords({ expenseDate: dateObj });
      vm.chosenDate = dateObj;
    };

    vm.disableRecords = () => {
      if (!vm.isDashboard) {
        vm.dateChosen = false;
        if (
          vm.chosenDate ==
          vm.expenseDate.year.id +
            "/" +
            vm.expenseDate.month.id +
            "/" +
            vm.expenseDate.day.id
        )
          vm.dateChosen = true;
      }
    };

    vm.setDateObj = () => {
      let dateObj =
        vm.expenseDate.year.id +
        "/" +
        vm.expenseDate.month.id +
        "/" +
        vm.expenseDate.day.id;
      vm.setDate({ dateObj: dateObj });
    };
  }
}

angular
  .module("moneyManager")
  .controller("chosenDateController", chosenDateController)
  .component("chosenDate", {
    templateUrl: "./client/views/components/chosenDate.html",
    bindings: {
      dateChosen: "=",
      expenseDate: "=",
      getExpenseValidation: "=",
      getExpenseRecords: "&",
      setDate: "&",
      isDashboard: "@",
      noDay: "<",
      noMonth: "<"
    },
    controller: chosenDateController,
    controllerAs: "cdc"
  });
