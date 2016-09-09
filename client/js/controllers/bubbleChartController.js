(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('bubbleChartCtrl', ['$scope', ($scope) => {
        var root = {
             "name": "flare",
             "children": [
                {
                 "name": "bubble0",
                 "size": [
                  {"name": "BetweennessCentrality", "size": 3534}
                 ]
                },
                 {
                 "name": "bubble1",
                 "children": [
                  {"name": "BetweennessCentrality", "size": 3534}
                 ]
                },
                 {
                 "name": "bubble2",
                 "children": [
                  {"name": "BetweennessCentrality", "size": 3534}
                 ]
                },
                 {
                 "name": "bubble3",
                 "children": [
                  {"name": "BetweennessCentrality", "size": 3534}
                 ]
                },
                 {
                 "name": "bubble4",
                 "children": [
                  {"name": "BetweennessCentrality", "size": 3534}
                 ]
                },
            ]};


            var diameter = 960,
                format = d3.format(",d"),
                color = d3.scale.category20c();

            var bubble = d3.layout.pack()
                .sort(null)
                .size([diameter, diameter])
                .padding(1.5);

            var svg = d3.select(".bubbleChart"+$scope.bubbleNo).append("svg")
                .attr("viewBox","0 0 960 960")
                .attr("perserveAspectRatio","xMinYMid")
                .attr("width", diameter)
                .attr("height", diameter)
                .attr("class", "bubble");

            //d3.json("flare.json", function(error, root) {
              var node = svg.selectAll(".node")
                  .data(bubble.nodes(classes(root))
                  .filter((d) => { return !d.children; }))
                .enter().append("g")
                  .attr("class", "node")
                  .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });

              node.append("title")
                  .text((d) => { return d.className + ": " + format(d.value); });

              node.append("circle")
                  .attr("r", (d) => { return d.r; })
                  .style("fill", (d) => { return color(d.packageName); });

              node.append("text")
                  .attr("dy", ".3em")
                  .style("text-anchor", "middle")
                  .text((d) => { return d.className.substring(0, d.r / 3); });
            //});

            // Returns a flattened hierarchy containing all leaf nodes under the root.
            function classes(root) {
              var classes = [];

              function recurse(name, node) {
                if (node.children) node.children.forEach((child) => { recurse(node.name, child); });
                else classes.push({packageName: name, className: node.name, value: node.size});
              }

              recurse(null, root);
              return {children: classes};
            }

            //d3.select(self.frameElement).style("height", diameter + "px");

            var chart = $(".bubble"),
                aspect = chart.width() / chart.height(),
                container = chart.parent();
            $(window).on("resize", () => {
                var targetWidth = container.width();
                chart.attr("width", targetWidth);
                chart.attr("height", Math.round(targetWidth / aspect));
            }).trigger("resize");
    }]);
})(window.angular);