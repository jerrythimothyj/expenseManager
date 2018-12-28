export default class bubbleChartController {
  constructor() {}

  $onChanges() {
    const vm = this;

    if (vm.bubbleData) {
      d3.select(".bubbleChart" + vm.bubbleNo)
        .select("svg")
        .remove();

      let ictr = 0;
      let obj = [];
      obj[0] = {
        name: "bubble0",
        children: [
          {
            name: "No Expenses",
            size: 0.1
          }
        ]
      };

      if (vm.bubbleData) {
        _.map(vm.bubbleData.expenses, (num, key) => {
          obj[ictr] = {
            name: "bubble" + ictr++,
            children: [
              {
                name: key,
                size: num
              }
            ]
          };
        });
      }

      let root = {
        name: "flare",
        children: obj
      };

      let diameter = 960,
        format = d3.format(",d"),
        color = d3.scale.category20();

      let bubble = d3.layout
        .pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);
      let svg = d3
        .select(".bubbleChart" + vm.bubbleNo)
        .append("svg")
        .attr("viewBox", "0 0 960 960")
        .attr("perserveAspectRatio", "xMinYMid")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

      if (obj.length > 0) {
        //d3.json("flare.json", function(error, root) {
        let node = svg
          .selectAll(".node")
          .data(
            bubble.nodes(classes(root)).filter(function(d) {
              return !d.children;
            })
          )
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node
          .append("title")
          // .text(function(d) { return d.className + ": " + format(d.value); });
          .text(function(d) {
            return d.className + ": " + d.value.toLocaleString();
          });

        node
          .append("circle")
          .attr("r", function(d) {
            return d.r;
          })
          .style("fill", function(d) {
            return d.value == 0.1
              ? "#ffffff"
              : "#" + vm.bubbleColors[d.className];
          });

        node
          .append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .text(function(d) {
            return d.value == 0.1 ? d.className.substring(0, d.r / 3) : "";
          });
        // .text(function(d) { return (d.value == 0.1)? d.className.substring(0, d.r / 3) : d.className.substring(0, d.r / 3) + ": " + format(d.value) });
        //});

        // Returns a flattened hierarchy containing all leaf nodes under the root.
        function classes(root) {
          let classes = [];

          function recurse(name, node) {
            if (node.children)
              node.children.forEach(function(child) {
                recurse(node.name, child);
              });
            else
              classes.push({
                packageName: name,
                className: node.name,
                value: node.size
              });
          }

          recurse(null, root);
          return { children: classes };
        }

        //d3.select(self.frameElement).style("height", diameter + "px");

        let chart = $(".bubble"),
          aspect = chart.width() / chart.height(),
          container = chart.parent();
        $(window)
          .on("resize", function() {
            let targetWidth = container.width();
            chart.attr("width", targetWidth);
            chart.attr("height", Math.round(targetWidth / aspect));
          })
          .trigger("resize");
      }
    }
  }
}

angular
  .module("moneyManager")
  .controller("bubbleChartController", bubbleChartController)
  .component("bubbleChart", {
    templateUrl: "./client/views/components/bubbleChart.html",
    bindings: {
      bubbleNo: "@",
      bubbleData: "<",
      bubbleColors: "="
    },
    controller: bubbleChartController
  });
