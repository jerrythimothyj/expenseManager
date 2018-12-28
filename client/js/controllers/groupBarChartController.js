export default class groupBarChartController {
  constructor() {
    var vm = this;
    vm.colors = ["#9358ac", "#81c04d", "#ef553a"];

    vm.$onChanges = () => {
      if (angular.copy(d3.select(".groupBarChart").select("svg")[0][0] != null))
        d3.select(".groupBarChart")
          .select("svg")
          .remove();

      if (vm.groupBarChartData) {
        var data = {
          labels: vm.groupBarChartData.labels,
          series: vm.groupBarChartData.series
        };

        // Specify the chart area and dimensions
        var chart = d3
          .select(".groupBarChart")
          .append("svg")
          .attr("width", "100%");

        var margin = { top: 20, right: 20, bottom: 50, left: 100 };
        var widther = $(".groupBarChart").width();
        var width = widther - margin.left - margin.right;

        var chartWidth = width,
          barHeight = 20,
          groupHeight = barHeight * data.series.length,
          gapBetweenGroups = 10,
          spaceForLabels = 100,
          spaceForLegend = 150;

        // Zip the series data together (first values, second values, etc.)
        var zippedData = [];
        for (var i = 0; i < data.labels.length; i++) {
          for (var j = 0; j < data.series.length; j++) {
            zippedData.push(Number(data.series[j].values[i]));
          }
        }

        // Color scale
        var color = d3.scale.category20();
        var chartHeight =
          barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

        chart.attr("height", chartHeight);

        var x = d3.scale
          .linear()
          .domain([0, d3.max(zippedData)])
          .range([0, chartWidth]);

        var y = d3.scale.linear().range([chartHeight + gapBetweenGroups, 0]);

        var yAxis = d3.svg
          .axis()
          .scale(y)
          .tickFormat("")
          .tickSize(0)
          .orient("left");

        // Create bars
        var bar = chart
          .selectAll("g")
          .data(zippedData)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
            return (
              "translate(" +
              spaceForLabels +
              "," +
              (i * barHeight +
                gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) +
              ")"
            );
          });

        let setXWidth = (d, i, zippedData) => {
          let divider = null;
          // switch (Math.floor(i % vm.colors.length)) {
          //   case 0:
          //     divider = zippedData[i] + zippedData[i + 1] + zippedData[i + 2];
          //     break;
          //   case 1:
          //     divider = zippedData[i - 1] + zippedData[i] + zippedData[i + 1];
          //     break;
          //   case 2:
          //     divider = zippedData[i - 2] + zippedData[i - 1] + zippedData[i];
          //     break;
          // }
          switch (Math.floor(i % vm.colors.length)) {
            case 0:
              divider = Math.max(
                zippedData[i],
                zippedData[i + 1],
                zippedData[i + 2]
              );
              break;
            case 1:
              divider = Math.max(
                zippedData[i - 1],
                zippedData[i],
                zippedData[i + 1]
              );
              break;
            case 2:
              divider = Math.max(
                zippedData[i - 2],
                zippedData[i - 1],
                zippedData[i]
              );
              break;
          }

          if (zippedData[i] == 0) return chartWidth;
          return Math.floor((zippedData[i] / divider) * chartWidth);
        };

        // Create rectangles of the correct width
        bar
          .append("rect")
          .attr("fill", function(d, i) {
            if (d == 0) return "#d9d9d9";
            return vm.colors[i % data.series.length];
          })
          .attr("class", "bar")
          .attr("width", function(d, i) {
            return setXWidth(d, i, zippedData);
          })
          .attr("height", barHeight - 1);

        // Add text label in bar
        bar
          .append("text")
          .attr("x", function(d) {
            return 3;
          })
          .attr("y", barHeight / 2)
          .attr("fill", "red")
          .attr("dy", ".35em")
          .text(function(d) {
            return d.toLocaleString();
          });

        // Draw labels
        bar
          .append("text")
          .attr("class", "label")
          .attr("x", function(d) {
            return -10;
          })
          .attr("y", groupHeight / 2)
          .attr("dy", ".35em")
          .text(function(d, i) {
            if (i % data.series.length === 0)
              return data.labels[Math.floor(i / data.series.length)];
            else return "";
          });

        chart
          .append("g")
          .attr("class", "y axis")
          .attr(
            "transform",
            "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")"
          )
          .call(yAxis);
      }
    };

    $(window)
      .on("resize", function() {
        vm.$onChanges();
      })
      .trigger("resize");
  }
}
angular
  .module("moneyManager")
  .controller("groupBarChartController", groupBarChartController)
  .component("groupBarChart", {
    templateUrl: "./client/views/components/groupBarChart.html",
    bindings: {
      groupBarChartData: "<"
    },
    controller: "groupBarChartController",
    controllerAs: "gbcc"
  });
