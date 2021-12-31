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
      const dates = [];
      let currentDate = startDate;
      const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      while (currentDate <= endDate) {
        dates.push(currentDate.toDateString());
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    },
    getDates(startDate, endDate) {
      try {
        const dates = [];
        let currentDate = startDate;
        const addDays = function (days) {
          const date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
        while (currentDate <= endDate) {
          dates.push({ count: 0, date: currentDate });
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.$forceUpdate;

    const series = [];
    let minDate, maxDate;

    for (const line of this.chartData) {
      for (const visit of line.visits) {
        visit.date = new Date(visit.date);
        if (minDate === undefined || minDate > visit.date) {
          minDate = visit.date;
        }

        if (maxDate === undefined || maxDate < visit.date) {
          maxDate = visit.date;

          console.error("swapping date", maxDate);
        }
      }
    }

    this.dates = this.getDateLabels(minDate, maxDate);
    for (const line of this.chartData) {
      if (line.visits.length == 0) {
        continue;
      }

      line.visits.sort((a, b) => a.date - b.date);

      const data = this.getDates(
        new Date(this.dates[0]),
        new Date(this.dates[this.dates.length - 1])
      );

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
          }
        }
      }
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

    this.renderChart(
      {
        labels: this.dates,
        datasets: this.series,
      },
      this.options
    );
  },
};
</script>
