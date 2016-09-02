<!DOCTYPE html>
<html lang="en">
<head>
  <title>Money Manager</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min.js"></script>
  <script src="//d3js.org/d3.v3.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.9.1/fullcalendar.min.js"></script>
<!--  <link href='//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.9.1/fullcalendar.print.css ' rel='stylesheet' type='text/css'>-->
  <link href='//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.9.1/fullcalendar.min.css' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,600,200italic,600italic&subset=latin,vietnamese' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="./client/css/skeleton.css">
  <link rel="stylesheet" href="./client/css/text.css">
  <link rel="stylesheet" href="./client/css/colors.css">
  <link rel="icon" type="image/x-icon" href="./client/images/favicon.ico">
  <base href="/moneymanager/">
</head>
<body data-ng-app="moneyManager">
    
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
  
<div class="container-fluid">
  <div ui-view></div>
</div>

<script src="./client/js/modules/moneyManager.js"></script>
<script src="./client/js/controllers/register.js"></script>
<script src="./client/js/controllers/expenses.js"></script>
<script src="./client/js/controllers/bubbleChart.js"></script>
<script src="./client/js/controllers/calendar.js"></script>
<script src="./client/js/directives/bubbleChart.js"></script>
<script src="./client/js/directives/invoices.js"></script>
<script src="./client/js/directives/calendar.js"></script>
<script src="./client/js/services/register.js"></script>
<script src="./client/js/services/expenses.js"></script>

<script>
	$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
</script>

</body>
</html>
