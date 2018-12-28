export default class expensesController {
  constructor(expenseFields, spendingFields, expensesData, expensesService) {
    this.dateChosen = false;
    this.expenseFields = _.sortBy(expenseFields.data, "type");
    this.spendingFields = _.sortBy(spendingFields.data, "type");
    this.expenseData = expensesData;
    this.expensesService = expensesService;

    this.expensesRecords = expensesData.data;
    this.emptyRecord = {
      expenseType: 0,
      comments: "",
      spendingsType: 0,
      amount: 0
    };
    this.expensesRecords.push(angular.copy(this.emptyRecord));
  }

  getExpenseRecords(expenseDate) {
    this.expensesService.getExpenses(expenseDate).then(response => {
      this.getExpenseValidation = {};

      if (response.data.validAll == 0) {
        this.getExpenseValidation = response.data;
      } else {
        this.expensesRecords = response.data;
        this.expensesRecords.push(angular.copy(this.emptyRecord));

        this.dateChosen = true;
        this.expensesSavedRes = {};
      }
    });
  }

  saveExpenses(expensesRecords) {
    const expRecords = angular.copy(expensesRecords);
    expRecords.pop();

    const expenseData = {
      date:
        this.expenseDate.year.id +
        "/" +
        this.expenseDate.month.id +
        "/" +
        this.expenseDate.day.id,
      expenses: expRecords
    };

    this.expensesService.saveExpenses(expenseData).then(response => {
      this.expensesSavedRes = response.data;

      if (response.data.saveInd == 1) {
        this.dateChosen = false;
      }
    });
  }

  $onInit() {
    const d = new Date();
    this.expenseDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }
}

angular
  .module("moneyManager")
  .controller("expensesController", expensesController);
