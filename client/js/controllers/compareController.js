export default class compareController {
  constructor($scope, $stateParams, compareData, compareService) {
    var vm = this;
    vm.kind = $stateParams.kind;
    vm.noMonth = $stateParams.kind == "yearly" ? true : false;
    vm.noDay =
      $stateParams.kind == "yearly" || $stateParams.kind == "monthly"
        ? true
        : false;

    let { dddate1, dddate2, dddate3 } = compareService.getInitialDateObjects(
      $stateParams.kind
    );
    vm.date1 = dddate1;
    vm.date2 = dddate2;
    vm.date3 = dddate3;

    let { date1, date2, date3 } = compareService.getInitialDates(
      $stateParams.kind
    );

    let resetComparison = compareData => {
      vm.bubbleColors = compareData.data.bubbleColors;

      vm.date3Bubble = [];
      vm.date2Bubble = [];
      vm.date1Bubble = [];

      if (compareData.data.date3) {
        vm.date3Bubble = compareService.calculateSpendings(
          compareData.data.date3.spendings,
          compareData.data.date3.earnings
        );
        vm.date3BubbleEarnings = compareData.data.date3.earnings;
      }

      if (compareData.data.date2) {
        vm.date2Bubble = compareService.calculateSpendings(
          compareData.data.date2.spendings,
          compareData.data.date2.earnings
        );
        vm.date2BubbleEarnings = compareData.data.date2.earnings;
      }

      if (compareData.data.date1) {
        vm.date1Bubble = compareService.calculateSpendings(
          compareData.data.date1.spendings,
          compareData.data.date1.earnings
        );
        vm.date1BubbleEarnings = compareData.data.date1.earnings;
      }

      vm.groupBarChartData = compareService.prepareGroupChartData(
        vm.kind,
        date1,
        date2,
        date3,
        compareData.data.groupChartData,
        compareData.data.groupChartEarningsData
      );

      if (compareData.data.validAll === 0) {
        vm.getExpenseValidation = compareData.data;
      }
    };

    resetComparison(compareData);

    let setDates = (dat1, dat2, dat3) => {
      date1 = dat1;
      date2 = dat2;
      date3 = dat3;

      let { ddate1, ddate2, ddate3 } = compareService.setCustomDateObjects(
        $stateParams.kind,
        date1,
        date2,
        date3
      );

      vm.date1 = ddate1;
      vm.date2 = ddate2;
      vm.date3 = ddate3;
    };

    let getExpenseRecords = () => {
      compareService
        .getComparison($stateParams.kind, date1, date2, date3)
        .then(response => {
          resetComparison(response);
        });
    };

    vm.getComparison3 = expenseDate => {
      setDates(date1, date2, expenseDate);
      getExpenseRecords();
    };

    vm.getComparison2 = expenseDate => {
      setDates(date1, expenseDate, date3);
      getExpenseRecords();
    };

    vm.getComparison1 = expenseDate => {
      setDates(expenseDate, date2, date3);
      getExpenseRecords();
    };

    vm.setDate3 = expenseDate => {
      setDates(date1, date2, expenseDate);
    };

    vm.setDate2 = expenseDate => {
      setDates(date1, expenseDate, date3);
    };

    vm.setDate1 = expenseDate => {
      setDates(expenseDate, date2, date3);
    };
  }
}

angular
  .module("moneyManager")
  .controller("compareController", compareController);
