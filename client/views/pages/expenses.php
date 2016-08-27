<div class="vertical-center input-page"
     data-ng-controller="registerController">
    <div class="container">
        <div class="landing-panel horizontal-center input-panel">
             <span class="title-text">Enter Expenses</span>
             <form novalidate>
              <div class="form-group">
                <input type="datetime-local" 
                       class="form-control" 
                       data-ng-model="expenses.date">
              </div>
              
                <div class="table-responsive">          
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Expense Type</th>
                            <th>Spending Type</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                                <select class="form-control"
                                        data-ng-model="expenses.expenseType">
                                    <option data-ng-repeat="expenseField in expenseFields"
                                            value="{{expenseField.sl}}">
                                        {{expenseField.type | uppercase}}
                                    </option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control"
                                        data-ng-model="expenses.spendingType">
                                    <option data-ng-repeat="spendingField in spendingFields"
                                            value="{{spendingField.sl}}">
                                        {{spendingField.type | uppercase}}
                                    </option>
                                </select>
                            </td>
                            <td>
                                <input type="number" 
                                       class="form-control" 
                                       data-ng-model="expenses.amount">
                            </td>
                            <td><span class="glyphicon glyphicon-trash alert-color"></span></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
                 
                 
              <button type="submit" 
                      class="btn btn-default btn-custom"
                      data-ng-click="saveExpenses(expenses)">
                  Submit
              </button>
            </form>
        </div>
    </div>
</div>