<div class="vertical-center"
     data-ng-controller="registerController">
    <div class="container">
        <div class="landing-panel horizontal-center">
             <span class="title-text">New User Registration</span>
             <form novalidate>
              <div class="form-group">
                <label for="email">Email address:</label>
            <input type="text" 
                       class="form-control" 
                       data-ng-model="user.email">
              </div>
              <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" 
                       class="form-control" 
                       data-ng-model="user.pwd">
              </div>
              <div class="form-group">
                <label for="pwd">Confirm Password:</label>
                <input type="password" 
                       class="form-control" 
                       data-ng-model="user.confPwd">
              </div>
              <button type="submit" 
                      class="btn btn-default"
                      data-ng-click="registerUser(user)">
                  Register
              </button>
              <a ui-sref="forgotPassword">Forgot Password?</a>
              <a ui-sref="login">Existing User?</a>
            </form>
        </div>
    </div>
</div>