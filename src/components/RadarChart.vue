<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
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

    const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

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


    for (let i=0; i<data.length; i++) {
        data[i].date = data[i].date.getDay()
    }

    const totals = [0, 0, 0, 0, 0, 0, 0]

    for (let i=0; i<7; i++) {
      for (let j=0; j<data.length; j++) {
        if (data[j].date == i) {
          totals[i] += data[j].count
        }
      }
    }
    

    this.renderChart(
      {
        labels: labels,
        datasets: [
          {
            label: this.label,
            data: totals,
            // color: 'rgba(255, 255, 255, 255)',
            backgroundColor: "#00968888",
            borderColor: "#009688"
          },
        ],
      },
      this.options
    );
  },
};
</script>
