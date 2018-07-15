(function(angular) {
  "use strict";
  angular.module("moneyManager").service("compareService", function($http) {
    this.getComparison = (kind, date1, date2, date3) => {
      return $http({
        method: "POST",
        url: "./server/api.php?api=getComparison",
        data: {
          kind: kind,
          date1: date1,
          date2: date2,
          date3: date3
        }
      });
    };

    this.getInitialDates = kind => {
      let d = new Date();
      let date1 = null,
        date2 = null,
        date3 = null;
      switch (kind) {
        case "yearly":
          date1 = d.getFullYear() + "/" + 1 + "/" + 1;
          date2 = d.getFullYear() - 1 + "/" + 1 + "/" + 1;
          date3 = d.getFullYear() - 2 + "/" + 1 + "/" + 1;
          break;

        case "monthly":
          date1 = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + 1;
          let dateMinusOneMonth = new Date(moment(date1).subtract(1, "months"));
          let dateMinusTwoMonth = new Date(moment(date1).subtract(2, "months"));
          date2 =
            dateMinusOneMonth.getFullYear() +
            "/" +
            (dateMinusOneMonth.getMonth() + 1) +
            "/" +
            1;
          date3 =
            dateMinusTwoMonth.getFullYear() +
            "/" +
            (dateMinusTwoMonth.getMonth() + 1) +
            "/" +
            1;
          break;

        case "daily":
        default:
          date1 =
            d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
          let dateMinusOneDay = new Date(moment(date1).subtract(1, "days"));
          let dateMinusTwoDay = new Date(moment(date1).subtract(2, "days"));
          date2 =
            dateMinusOneDay.getFullYear() +
            "/" +
            (dateMinusOneDay.getMonth() + 1) +
            "/" +
            dateMinusOneDay.getDate();
          date3 =
            dateMinusTwoDay.getFullYear() +
            "/" +
            (dateMinusTwoDay.getMonth() + 1) +
            "/" +
            dateMinusTwoDay.getDate();
          break;
      }
      return { date1, date2, date3 };
    };

    this.getInitialDateObjects = kind => {
      let d = new Date();
      let dddate1 = null,
        dddate2 = null,
        dddate3 = null,
        date1;

      switch (kind) {
        case "yearly":
          dddate1 = {
            year: d.getFullYear(),
            month: 1,
            day: 1
          };
          dddate2 = {
            year: d.getFullYear() - 1,
            month: 1,
            day: 1
          };
          dddate3 = {
            year: d.getFullYear() - 2,
            month: 1,
            day: 1
          };

          break;

        case "monthly":
          dddate1 = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: 1
          };
          date1 = dddate1.year + "/" + dddate1.month + "/" + dddate1.day;
          let dateMinusOneMonth = new Date(moment(date1).subtract(1, "months"));
          let dateMinusTwoMonth = new Date(moment(date1).subtract(2, "months"));
          dddate2 = {
            year: dateMinusOneMonth.getFullYear(),
            month: dateMinusOneMonth.getMonth() + 1,
            day: 1
          };
          dddate3 = {
            year: dateMinusTwoMonth.getFullYear(),
            month: dateMinusTwoMonth.getMonth() + 1,
            day: 1
          };
          break;

        case "daily":
        default:
          dddate1 = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          };
          date1 = dddate1.year + "/" + dddate1.month + "/" + dddate1.day;
          let dateMinusOneDay = new Date(moment(date1).subtract(1, "days"));
          let dateMinusTwoDay = new Date(moment(date1).subtract(2, "days"));
          dddate2 = {
            year: dateMinusOneDay.getFullYear(),
            month: dateMinusOneDay.getMonth() + 1,
            day: dateMinusOneDay.getDate()
          };
          dddate3 = {
            year: dateMinusTwoDay.getFullYear(),
            month: dateMinusTwoDay.getMonth() + 1,
            day: dateMinusTwoDay.getDate()
          };
          break;
      }

      return { dddate1, dddate2, dddate3 };
    };

    this.setCustomDateObjects = (kind, date1, date2, date3) => {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      let d3 = new Date(date3);
      let ddate1 = null,
        ddate2 = null,
        ddate3 = null;

      switch (kind) {
        case "yearly":
          ddate1 = {
            year: d1.getFullYear(),
            month: 1,
            day: 1
          };
          ddate2 = {
            year: d2.getFullYear(),
            month: 1,
            day: 1
          };
          ddate3 = {
            year: d3.getFullYear(),
            month: 1,
            day: 1
          };

          break;

        case "monthly":
          ddate1 = {
            year: d1.getFullYear(),
            month: d1.getMonth() + 1,
            day: 1
          };
          ddate2 = {
            year: d2.getFullYear(),
            month: d2.getMonth() + 1,
            day: 1
          };
          ddate3 = {
            year: d3.getFullYear(),
            month: d3.getMonth() + 1,
            day: 1
          };
          break;

        case "daily":
        default:
          ddate1 = {
            year: d1.getFullYear(),
            month: d1.getMonth() + 1,
            day: d1.getDate()
          };
          ddate2 = {
            year: d2.getFullYear(),
            month: d2.getMonth() + 1,
            day: d2.getDate()
          };
          ddate3 = {
            year: d3.getFullYear(),
            month: d3.getMonth() + 1,
            day: d3.getDate()
          };
          break;
      }

      return { ddate1, ddate2, ddate3 };
    };

    this.prepareGroupChartData = (kind, date1, date2, date3, data) => {
      let tmpLabels = _.uniq(_.pluck(data, "type"));
      let labels = [];
      let date1Arr = date1.split("/");
      let date2Arr = date2.split("/");
      let date3Arr = date3.split("/");

      let d1 = null;
      let d2 = null;
      let d3 = null;


      let filteredByType = null;
      let filterByD3 = null;
      let filterByD2 = null;
      let filterByD1 = null;


      switch (kind) {
        case "yearly":
          d1 = date1Arr[0];
          d2 = date2Arr[0];
          d3 = date3Arr[0];
          break;

        case "monthly":
          d1 = date1Arr[0] + "/" + date1Arr[1];
          d2 = date2Arr[0] + "/" + date2Arr[1];
          d3 = date3Arr[0] + "/" + date3Arr[1];
          break;

        case "daily":
        default:
          d1 = date1Arr[0] + "/" + date1Arr[1] + "/" + date1Arr[2];
          d2 = date2Arr[0] + "/" + date2Arr[1] + "/" + date2Arr[2];
          d3 = date3Arr[0] + "/" + date3Arr[1] + "/" + date3Arr[2];
          break;
      }

      let series = [
        {
          label: d3,
          values: []
        },
        {
          label: d2,
          values: []
        },
        {
          label: d1,
          values: []
        }
      ];

      _.map(tmpLabels, tmpLabel => {
        switch (kind) {
          case "yearly":
            filteredByType = _.filter(data, { type: tmpLabel });
            filterByD3 = _.filter(filteredByType, {
              date_yyyy: date3Arr[0]
            });
            if (filterByD3.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date3Arr[0]
              });
            filterByD2 = _.filter(filteredByType, {
              date_yyyy: date2Arr[0]
            });
            if (filterByD2.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date2Arr[0]
              });
            filterByD1 = _.filter(filteredByType, {
              date_yyyy: date1Arr[0]
            });
            if (filterByD1.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date1Arr[0]
              });
            filteredByType = _.without(
              filteredByType,
              _.findWhere(filteredByType, {
                date_yyyy: null
              })
            );

            if (
              _.filter(filteredByType, { date_yyyy: date3Arr[0] })[0].amount !=
                0 ||
              _.filter(filteredByType, { date_yyyy: date2Arr[0] })[0].amount !=
                0 ||
              _.filter(filteredByType, { date_yyyy: date1Arr[0] })[0].amount !=
                0
            ) {
              labels.push(tmpLabel);
              series[0].values.push(
                _.filter(filteredByType, { date_yyyy: date3Arr[0] })[0].amount
              );
              series[1].values.push(
                _.filter(filteredByType, { date_yyyy: date2Arr[0] })[0].amount
              );
              series[2].values.push(
                _.filter(filteredByType, { date_yyyy: date1Arr[0] })[0].amount
              );
            }
            break;

            case "monthly":
            filteredByType = _.filter(data, { type: tmpLabel });
            filterByD3 = _.filter(filteredByType, {
              date_yyyy: date3Arr[0],
              date_mm: date3Arr[1]
            });
            if (filterByD3.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date3Arr[0],
                date_mm: date3Arr[1]
              });
            filterByD2 = _.filter(filteredByType, {
              date_yyyy: date2Arr[0],
              date_mm: date2Arr[1]
            });
            if (filterByD2.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date2Arr[0],
                date_mm: date2Arr[1]
              });
            filterByD1 = _.filter(filteredByType, {
              date_yyyy: date1Arr[0],
              date_mm: date1Arr[1]
            });
            if (filterByD1.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date1Arr[0],
                date_mm: date1Arr[1]
              });
            filteredByType = _.without(
              filteredByType,
              _.findWhere(filteredByType, {
                date_yyyy: null,
                date_mm: null
              })
            );

            if (
              _.filter(filteredByType, { date_yyyy: date3Arr[0], date_mm: date3Arr[1] })[0].amount !=
                0 ||
              _.filter(filteredByType, { date_yyyy: date2Arr[0], date_mm: date2Arr[1] })[0].amount !=
                0 ||
              _.filter(filteredByType, { date_yyyy: date1Arr[0], date_mm: date1Arr[1] })[0].amount !=
                0
            ) {
              labels.push(tmpLabel);
              series[0].values.push(
                _.filter(filteredByType, { date_yyyy: date3Arr[0], date_mm: date3Arr[1] })[0].amount
              );
              series[1].values.push(
                _.filter(filteredByType, { date_yyyy: date2Arr[0], date_mm: date2Arr[1] })[0].amount
              );
              series[2].values.push(
                _.filter(filteredByType, { date_yyyy: date1Arr[0], date_mm: date1Arr[1] })[0].amount
              );
            }
            break;
        case "daily":
            filteredByType = _.filter(data, { type: tmpLabel });
            filterByD3 = _.filter(filteredByType, {
              date_yyyy: date3Arr[0],
              date_mm: date3Arr[1],
              date_dd: date3Arr[2],
            });
            if (filterByD3.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date3Arr[0],
                date_mm: date3Arr[1],
                date_dd: date3Arr[2],
              });
            filterByD2 = _.filter(filteredByType, {
              date_yyyy: date2Arr[0],
              date_mm: date2Arr[1],
              date_dd: date2Arr[2],
            });
            if (filterByD2.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date2Arr[0],
                date_mm: date2Arr[1],
                date_dd: date2Arr[2],
              });
            filterByD1 = _.filter(filteredByType, {
              date_yyyy: date1Arr[0],
              date_mm: date1Arr[1],
              date_dd: date1Arr[2],
            });
            if (filterByD1.length == 0)
              filteredByType.push({
                type: tmpLabel,
                amount: 0,
                date_yyyy: date1Arr[0],
                date_mm: date1Arr[1],
                date_dd: date1Arr[2]
              });
            filteredByType = _.without(
              filteredByType,
              _.findWhere(filteredByType, {
                date_yyyy: null,
                date_mm: null,
                date_dd: null
              })
            );

            if (
              _.filter(filteredByType, { date_yyyy: date3Arr[0], date_mm: date3Arr[1], date_dd: date3Arr[2] })[0].amount !=
                0 ||
              _.filter(filteredByType, { date_yyyy: date2Arr[0], date_mm: date2Arr[1], date_dd: date2Arr[2] })[0].amount !=
                0 ||
              _.filter(filteredByType, { date_yyyy: date1Arr[0], date_mm: date1Arr[1], date_dd: date1Arr[2] })[0].amount !=
                0
            ) {
              labels.push(tmpLabel);
              series[0].values.push(
                _.filter(filteredByType, { date_yyyy: date3Arr[0], date_mm: date3Arr[1], date_dd: date3Arr[2] })[0].amount
              );
              series[1].values.push(
                _.filter(filteredByType, { date_yyyy: date2Arr[0], date_mm: date2Arr[1], date_dd: date2Arr[2] })[0].amount
              );
              series[2].values.push(
                _.filter(filteredByType, { date_yyyy: date1Arr[0], date_mm: date1Arr[1], date_dd: date1Arr[2] })[0].amount
              );
            }
            break;
        }
      });

      return { labels, series };
    };
  });
})(window.angular);
