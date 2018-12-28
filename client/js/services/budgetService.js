export default class budgetService {
  constructor($http) {
    this.getBudget = obj => {
      return $http({
        method: "POST",
        url: "./server/api.php?api=getBudget",
        data: {
          date: obj
        }
      });
    };

    this.saveBudget = obj => {
      return $http({
        method: "POST",
        url: "./server/api.php?api=saveBudget",
        data: obj
      });
    };

    this.getLastMonthBudgetDate = dateObj => {
      return moment(dateObj)
        .subtract(1, "months")
        .format("YYYY/MM/DD");
    };
  }
}
angular.module("moneyManager").service("budgetService", budgetService);
