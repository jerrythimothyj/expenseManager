<nav class="navbar navbar-inverse navbar-fixed-top navbar-custom">
    <div class="container-fluid">
      <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Money Manager</a>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
            <li class="active"><a ui-sref="dashboard">Dashboard</a></li>
            <li><a ui-sref="expenses">Expenses</a></li>
            <li><a ui-sref="calendar">Calendar</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li><a ui-sref="profile"><span class="glyphicon glyphicon-bell"></span></a></li>
            <li><a ui-sref="profile"><span class="glyphicon glyphicon-user"></span> Guest</a></li>
        </ul>
      </div>
    </div>
  </nav>