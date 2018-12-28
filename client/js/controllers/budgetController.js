export default class budgetController {
  constructor(expenseFields, budgetData, budgetService) {
    this.noDay = true;
    this.dateChosen = false;

    this.expenseFields = _.sortBy(expenseFields.data, "type");

    this.budgetRecords = budgetData.data;

    this.budgetRecords = budgetData.data;
    this.emptyRecord = {
      expenseType: 0,
      comments: "",
      amount: 0
    };
    this.budgetRecords.push(angular.copy(this.emptyRecord));

    this.budgetSavedRes = {};
  }

  getBudgetRecords(budgetDate) {
    this.budgetService.getBudget(budgetDate).then(response => {
      this.getBudgetValidation = {};

      if (response.data.validAll == 0) {
        this.getBudgetValidation = response.data;
      } else {
        this.budgetRecords = response.data;
        this.budgetRecords.push(angular.copy(this.emptyRecord));

        this.dateChosen = true;
        this.budgetSavedRes = {};
      }
    });
  }

  saveBudget(budgetRecords) {
    const budRecords = angular.copy(budgetRecords);
    budRecords.pop();

    const budgetData = {
      date: this.budgetDate.year.id + "/" + this.budgetDate.month.id + "/" + 1,
      budget: budRecords
    };

    this.budgetService.saveBudget(budgetData).then(response => {
      this.budgetSavedRes = response.data;

      if (response.data.saveInd == 1) {
        this.dateChosen = false;
      }
    });
  }

  getLastMonthRecords(budgetDate) {
    const dateObj =
      budgetDate.year.id + "/" + budgetDate.month.id + "/" + budgetDate.day.id;
    this.getBudgetRecords(this.budgetService.getLastMonthBudgetDate(dateObj));
  }

  isEqual(o1, o2) {
    return angular.equals(o1, o2);
  }

  $onInit() {
    const d = new Date();
    this.budgetDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: 1
    };
  }
}

angular.module("moneyManager").controller("budgetController", budgetController);
