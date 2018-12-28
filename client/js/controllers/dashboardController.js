export default class dashboardController {
  constructor($scope, dashboardData, dashboardService) {
    this.$scope = $scope;
    this.dashboardData = dashboardData;
    this.dashboardService = dashboardService;

    const d = new Date();
    this.expenseDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }

  resetDashboard(dashboardData) {
    this.budgetExceed = dashboardData.data.budgetExceed;

    this.bubbleColors = dashboardData.data.bubbleColors;

    this.dailyBubble = dashboardData.data.daily;
    this.dailyBubbleEarnings = dashboardData.data.dailyEarnings;
    this.dailyBar = [];
    if (this.dailyBubble) {
      _.map(this.dailyBubble.comparisons, (num, key) => {
        this.dailyBar.push({
          time: key,
          amount: num
        });
      });
    }
    this.dailyBar.reverse();

    this.monthlyBubble = dashboardData.data.monthly;
    this.monthlyBubbleEarnings = dashboardData.data.monthlyEarnings;
    this.monthlyBar = [];
    this.monthsName = [
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
    if (this.monthlyBubble) {
      _.map(this.monthlyBubble.comparisons, (num, key) => {
        this.monthlyBar.push({
          time: this.monthsName[key],
          amount: num
        });
      });
    }
    this.monthlyBar.reverse();

    this.yearlyBubble = dashboardData.data.yearly;
    this.yearlyBubbleEarnings = dashboardData.data.yearlyEarnings;
    this.yearlyBar = [];
    if (this.yearlyBubble) {
      _.map(this.yearlyBubble.comparisons, (num, key) => {
        this.yearlyBar.push({
          time: key,
          amount: num
        });
      });
    }
    this.yearlyBar.reverse();

    this.barData = {
      daily: this.dailyBar,
      monthly: this.monthlyBar,
      yearly: this.yearlyBar
    };

    this.barColorClass = {
      daily: "bar-danger",
      monthly: "bar-success",
      yearly: "bar-info"
    };

    this.calendarExpenses = dashboardData.data.calendarExpenses;

    if (dashboardData.data.validAll === 0) {
      this.getExpenseValidation = dashboardData.data;
    }
  }

  getExpenseRecords(expenseDate) {
    this.dashboardService.getDashboard(expenseDate).then(response => {
      this.resetDashboard(response);
    });
  }

  $onInit() {
    this.resetDashboard(this.dashboardData);
  }
}

angular
  .module("moneyManager")
  .controller("dashboardController", dashboardController);
