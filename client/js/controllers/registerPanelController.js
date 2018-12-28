export default class registerPanelController {
  constructor($scope) {
    this.$scope = $scope;
  }

  registerUser(user) {
    this.registrationSubmit({ submissionDetails: user });
  }

  $onInit() {
    this.$scope.$watch("rpc.returnObj", newValue => {
      if (newValue && newValue.validAll == 1) {
        this.user = {
          email: "",
          pwd: "",
          confPwd: ""
        };
      }
    });
  }
}
angular
  .module("moneyManager")
  .controller("registerPanelController", registerPanelController)
  .component("registerPanel", {
    templateUrl: "./client/views/components/registerPanel.html",
    bindings: {
      returnObj: "=",
      registrationSubmit: "&"
    },
    controller: registerPanelController,
    controllerAs: "rpc"
  });
