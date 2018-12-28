export default class forgotPasswordPanelController {
  constructor($scope) {
    this.$scope = $scope;
  }

  forgotPassword(user) {
    this.forgotSubmit({ submissionDetails: user });
    this.$scope.$watch("fppc.returnObj", newValue => {
      if (newValue && newValue.validAll == 1) {
        this.user = {
          email: ""
        };
      }
    });
  }
}

angular
  .module("moneyManager")
  .controller("forgotPasswordPanelController", forgotPasswordPanelController)
  .component("forgotPasswordPanel", {
    templateUrl: "./client/views/components/forgotPasswordPanel.html",
    bindings: {
      returnObj: "=",
      forgotSubmit: "&"
    },
    controller: forgotPasswordPanelController,
    controllerAs: "fppc"
  });
