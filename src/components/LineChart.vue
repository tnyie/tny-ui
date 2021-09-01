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
  methods: {
    getDates(startDate, endDate) {
      const dates = [];
      let currentDate = startDate;
      const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      console.log(currentDate, endDate.date)
      while (currentDate <= endDate.date) {
        dates.push({count: 0, date: currentDate});
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    },
  },

  mounted() {
    this.$forceUpdate;

    for (const visit of this.chartData) {
      visit.date = new Date(visit.date);
    }

    this.chartData.sort((a, b) => a.date - b.date);
    
    const data = this.getDates(this.chartData[0].date, this.chartData[this.chartData.length - 1])

    for (const date of data) {
        date.date.setHours(0, 0, 0, 0)
    }

    for (const date of this.chartData) {
        date.date.setHours(0, 0, 0, 0)
    }

    for (const visit of this.chartData) {
        for (let k=this.chartData.indexOf(visit); k<data.length; k++) {
            if (data[k].date.getTime() == visit.date.getTime()) {
                data[k].count = visit.count
            } else {
                console.log("miss")
            }
        }
    }
    
    const dates = data.map((item) => item.date.toLocaleDateString());
    const totals = data.map((item) => item.count);

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: totals,
            backgroundColor: "#009688",
          },
        ],
      },
      this.options
    );
  },
};
</script>
