(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('dashboardController', function($scope, dashboardData, dashboardService) {
        var vm = this;
        let d = new Date();
        vm.expenseDate = {
            year: d.getFullYear(),
            month: (d.getMonth() + 1),
            day: d.getDate()
        }

        let resetDashboard = (dashboardData) => {
            vm.budgetExceed = dashboardData.data.budgetExceed;
            
            vm.bubbleColors = dashboardData.data.bubbleColors;

            vm.dailyBubble = dashboardData.data.daily;
            vm.dailyBubbleEarnings = dashboardData.data.dailyEarnings;
            vm.dailyBar = [];
            if (vm.dailyBubble) {
                _.map(vm.dailyBubble.comparisons, (num, key) => {
                    vm.dailyBar.push({
                        time: key,
                        amount: num
                    });
                });
            }
            vm.dailyBar.reverse();

            vm.monthlyBubble = dashboardData.data.monthly;
            vm.monthlyBubbleEarnings = dashboardData.data.monthlyEarnings;
            vm.monthlyBar = [];
            vm.monthsName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            if (vm.monthlyBubble) {
                _.map(vm.monthlyBubble.comparisons, (num, key) => {
                    vm.monthlyBar.push({
                        time: vm.monthsName[key],
                        amount: num
                    });
                });
            }
            vm.monthlyBar.reverse();

            vm.yearlyBubble = dashboardData.data.yearly;
            vm.yearlyBubbleEarnings = dashboardData.data.yearlyEarnings;
            vm.yearlyBar = [];
            if (vm.yearlyBubble) {
                _.map(vm.yearlyBubble.comparisons, (num, key) => {
                    vm.yearlyBar.push({
                        time: key,
                        amount: num
                    });
                });
            }
            vm.yearlyBar.reverse();

            vm.barData = {
                daily: vm.dailyBar,
                monthly: vm.monthlyBar,
                yearly: vm.yearlyBar            
            }

            vm.barColorClass = {
                daily: 'bar-danger',
                monthly: 'bar-success',
                yearly: 'bar-info'            
            }

            // vm.invoices = dashboardData.data.invoices;
            // _.map(vm.invoices, (num, key) => {
            //     num.date = new Date(num.date);
            // });

            vm.calendarExpenses = dashboardData.data.calendarExpenses;

            if(dashboardData.data.validAll === 0) {
                vm.getExpenseValidation = dashboardData.data;
            }
        }

        resetDashboard(dashboardData);

        vm.getExpenseRecords = (expenseDate) => {
            dashboardService.getDashboard(expenseDate).then((response) => {
                resetDashboard(response);
            });
        };
    });
})(window.angular);