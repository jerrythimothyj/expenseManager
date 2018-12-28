export default class dashboardService {
  constructor($http) {
    this.getDashboard = obj => {
      return $http({
        method: "POST",
        url: "./server/api.php?api=getDashboard",
        data: {
          date: obj
        }
      });
    };
  }
}

angular.module("moneyManager").service("dashboardService", dashboardService);
