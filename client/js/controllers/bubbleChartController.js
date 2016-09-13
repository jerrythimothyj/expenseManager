(function(angular) {
  'use strict';
angular.module('moneyManager')
    .controller('bubbleChartCtrl', ['$scope', function($scope) {
        var root = {
             "name": "flare",
             "children": [
                {
                 "name": "bubble0",
                 "size": [
                  {"name": "food", "size": 1}
                 ]
                },
                 {
                 "name": "bubble1",
                 "children": [
                  {"name": "snacks", "size": 2}
                 ]
                },
                 {
                 "name": "bubble2",
                 "children": [
                  {"name": "clothing", "size": 3}
                 ]
                },
                 {
                 "name": "bubble3",
                 "children": [
                  {"name": "entertainment", "size": 4}
                 ]
                },
                 {
                 "name": "bubble4",
                 "children": [
                  {"name": "electricity", "size": 5}
                 ]
                },
                {
                 "name": "bubble5",
                 "children": [
                  {"name": "water", "size": 6}
                 ]
                },
                {
                 "name": "bubble6",
                 "children": [
                  {"name": "wage", "size": 7}
                 ]
                },
                {
                 "name": "bubble7",
                 "children": [
                  {"name": "travel", "size": 8}
                 ]
                },
                {
                 "name": "bubble8",
                 "children": [
                  {"name": "construction", "size": 9}
                 ]
                },
                {
                 "name": "bubble9",
                 "children": [
                  {"name": "others", "size": 10}
                 ]
                },
                {
                 "name": "bubble10",
                 "children": [
                  {"name": "groceries", "size": 11}
                 ]
                },
                {
                 "name": "bubble11",
                 "children": [
                  {"name": "phone", "size": 12}
                 ]
                },
                {
                 "name": "bubble12",
                 "children": [
                  {"name": "emi", "size": 13}
                 ]
                },
                {
                 "name": "bubble13",
                 "children": [
                  {"name": "debt", "size": 14}
                 ]
                },
                {
                 "name": "bubble14",
                 "children": [
                  {"name": "toys", "size": 15}
                 ]
                },
                {
                 "name": "bubble15",
                 "children": [
                  {"name": "furnitures", "size": 16}
                 ]
                },
                {
                 "name": "bubble16",
                 "children": [
                  {"name": "household", "size": 17}
                 ]
                },
                {
                 "name": "bubble17",
                 "children": [
                  {"name": "rent", "size": 18}
                 ]
                },
                {
                 "name": "bubble18",
                 "children": [
                  {"name": "donation", "size": 19}
                 ]
                },
                {
                 "name": "bubble19",
                 "children": [
                  {"name": "pets", "size": 20}
                 ]
                },
                {
                 "name": "bubble20",
                 "children": [
                  {"name": "tv", "size": 21}
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
                  .filter(function(d) { return !d.children; }))
                .enter().append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

              node.append("title")
                  .text(function(d) { return d.className + ": " + format(d.value); });

              node.append("circle")
                  .attr("r", function(d) { return d.r; })
                  .style("fill", function(d) { return color(d.packageName); });

              node.append("text")
                  .attr("dy", ".3em")
                  .style("text-anchor", "middle")
                  .text(function(d) { return d.className.substring(0, d.r / 3); });
            //});

            // Returns a flattened hierarchy containing all leaf nodes under the root.
            function classes(root) {
              var classes = [];

              function recurse(name, node) {
                if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
                else classes.push({packageName: name, className: node.name, value: node.size});
              }

              recurse(null, root);
              return {children: classes};
            }

            //d3.select(self.frameElement).style("height", diameter + "px");

            var chart = $(".bubble"),
                aspect = chart.width() / chart.height(),
                container = chart.parent();
            $(window).on("resize", function() {
                var targetWidth = container.width();
                chart.attr("width", targetWidth);
                chart.attr("height", Math.round(targetWidth / aspect));
            }).trigger("resize");
    }]);
})(window.angular);