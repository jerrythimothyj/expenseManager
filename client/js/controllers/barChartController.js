(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('barChartController',function() {

      let noOfBarCharts = 3;
      let barChartStart = (ictr) => {
          if(angular.copy(d3.select(".barChartNo" + ictr).select("svg")[0][0]) != null)
            d3.select(".barChartNo" + ictr).select("svg").remove();

          //Margin conventions
          var margin = {top: 10, right: 50, bottom: 20, left: 50};

          // var widther = window.outerWidth;
          var widther = $('.col-lg-4').width();

          var width = widther - margin.left - margin.right,
              height = 250 - margin.top - margin.bottom;

          //Appends the svg to the chart-container div
          var svg = d3.select(".barChartNo" + ictr).append("svg")
            .attr("width", widther)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          //Creates the xScale 
          var xScale = d3.scale.linear()
            .range([0,width]);

          //Creates the yScale
          var y0 = d3.scale.ordinal()
            .rangeBands([height, 0], 0.2)
            .domain(["2016", "2015", "2014", "2013", "2012"]);

          //Defines the y axis styles
          var yAxis = d3.svg.axis()
            .scale(y0)
            .orient("left");

          //Defines the y axis styles
          var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .tickFormat(function(d) {return d; })
            .tickSize(height)
            .ticks(numTicks(width)); 

          //Loads the data
          d3.csv("./client/template/template.csv", ready);

          function ready(err, data) {

            //FORMAT data
            data.forEach(function(d) {
              d.amount = +d.amount;
            });


            //Sets the max for the xScale
            var maxX = d3.max(data, function(d) { return d.amount; });

            //Defines the xScale max
            xScale.domain([0, maxX ]);

            //Appends the y axis
            var yAxisGroup = svg.append("g")
              .attr("class", "y axis")
              .call(yAxis);

            //Appends the x axis    
            var xAxisGroup = svg.append("g")
              .attr("class", "x axis")
              .call(xAxis); 

            //Binds the data to the bars      
            var categoryGroup = svg.selectAll(".g-category-group")
              .data(data)
              .enter()
              .append("g")
              .attr("class", "g-category-group")
              .attr("transform", function(d) {
                return "translate(0," + y0(d.time) + ")";
              });

            //Appends first bar   
            var bars = categoryGroup.append("rect")
              .attr("width", function(d) { return xScale(d.amount); })
              .attr("height", y0.rangeBand()/1.5 )
              .attr("class", "g-num")
              .attr("transform", "translate(0,4)");
            
            //Binds data to labels
            var labelGroup = svg.selectAll("g-num")
              .data(data)
              .enter()
              .append("g")
              .attr("class", "g-label-group")
              .attr("transform", function(d) {
                return "translate(0," + y0(d.time) + ")";
              });

            //Appends labels   
            var barLabels = labelGroup.append("text") 
              .text(function(d) {return  d.amount;})
              .attr("x", function(d) { return xScale(d.amount)/2; })
              .attr("y", y0.rangeBand()/1.7 )
              .attr("class", "g-labels");
          }

      }

      let resized = () => {
        for(let ictr = 1; ictr <= noOfBarCharts; ictr++)
          barChartStart(ictr);  
      }

      //RESPONSIVENESS
      d3.select(window).on("resize", resized);

      //Determines number of ticks base on width
      function numTicks(widther) {
        if (widther <= 400) {
          return 4
          //console.log("return 4")
        }
        else {
          return 10
          //console.log("return 5")
        }
      }

      for(let ictr = 1; ictr <= noOfBarCharts; ictr++)
        barChartStart(ictr);
    });
})(window.angular);