<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  data() {
    return {
      series: [],
      dates: [],
    };
  },
  methods: {
    getDateLabels(startDate, endDate) {
      const dates = []
      let currentDate = startDate
      const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date 
      }

      while (currentDate <= endDate) {
        dates.push(currentDate.toDateString())
        currentDate = addDays.call(currentDate, 1)
      }
      console.log({dates: dates})
      return dates
    },
    getDates(startDate, endDate) {
      try {
        console.log(startDate, endDate)
        const dates = [];
        let currentDate = startDate;
        const addDays = function (days) {
          const date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        // console.log(currentDate, endDate);
        while (currentDate <= endDate) {
          dates.push({ count: 0, date: currentDate });
          currentDate = addDays.call(currentDate, 1);
        }
        // console.log(dates);
        return dates;
      } catch (error) {
        // console.error("bruhe", error);
      }
    },
  },

  mounted() {
    this.$forceUpdate;

    const series = [];

    // let minDate = this.chartData[0].visits[0].date
    // let maxDate = this.chartData[0].visits[this.chartData[0].visits.length - 1].date
    // console.log(minDate, maxDate)
    // for (const line of this.chartData) {
    //   if (line.visits[0].date < minDate) {
    //     console.log(line.visits)
    //     minDate = line.visits[0].date
    //   }
    //   if (line.visits[line.visits.length -1] > maxDate) {
    //     maxDate = line.visits[line.visits.length -1].date
    //   }
    // }

    // console.log("test")

    // dates = this.getDates(minDate, maxDate)
    // console.log(dates)
    // for (let date of dates) {
    //   date = date.toLocaleDateString()
    // }
    let minDate, maxDate

    for (const line of this.chartData) {
      for (const visit of line.visits) {
        visit.date = new Date(visit.date);
        if (minDate === undefined || minDate > visit.date) {
          minDate = visit.date;
        }

        if (maxDate === undefined || maxDate < visit.date) {
          maxDate = visit.date;
          
          console.error("swapping date", maxDate)
        }
      }
    }

    this.dates = this.getDateLabels(minDate, maxDate)
    // console.log(this.dates)
    // let minDate;
    // let maxDate;
    // console.log(this.chartData.length);
    for (const line of this.chartData) {
      if (line.visits.length == 0) {
        continue;
      }

      // console.log({ series: this.series });
      // console.log({line: line.visits});
      // for (const visit of line.visits) {
      //   visit.date = new Date(visit.date);
      //   if (minDate === undefined || minDate > visit.date) {
      //     minDate = visit.date;
      //   }

      //   if (maxDate === undefined || maxDate < visit.date) {
      //     maxDate = visit.date;
      //   }
      // }

      line.visits.sort((a, b) => a.date - b.date);
      // console.log({bru: line[line.visits.length - 1].date})

    // console.log(this.dates[this.dates.length -1])
    //  console.log(new Date(this.dates[this.dates.length -1]))

      const data = this.getDates(
        new Date(this.dates[0]),
        new Date(this.dates[this.dates.length - 1])
      );

      console.log(data)

      console.log({ data: data });
      for (const date of data) {
        date.date.setHours(0, 0, 0, 0);
      }

      for (const date of line.visits) {
        date.date.setHours(0, 0, 0, 0);
      }

      for (const visit of line.visits) {
        for (let k = line.visits.indexOf(visit); k < data.length; k++) {
          if (data[k].date.getTime() == visit.date.getTime()) {
            data[k].count = visit.count;
          } else {
            console.log("miss")
          }
        }
      }
      // console.log("asdf")
      for (let i = 1; i < data.length; i++) {
        data[i].count += data[i - 1].count;
      }

      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.totals = data.map((item) => item.count);
      this.series.push({
        label: line.name,
        borderColor: color,
        backgroundColor: color + "08",
        data: data.map((item) => item.count),
      });
    }

    // this.dates.map((item) => item.toLocaleDateString() )
    // this.dates.forEach(element => element.toDateString())
    console.log(this.dates)
    // this.dates = this.getDates(minDate, maxDate);
    // this.dates.map((x) => (x = x.toLocaleDateString()));

    this.renderChart(
      {
        labels: this.dates,
        // datasets: [
        //   {
        //     label: this.label,
        //     data: totals,
        //     // color: 'rgba(255, 255, 255, 255)',
        //     backgroundColor: "#00968888",
        //     borderColor: "#009688"
        //   },
        // ],
        datasets: this.series,
      },
      this.options
    );
  },
};
</script>
