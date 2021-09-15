<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="my-16">{{ this.slug }}</h1>
  <line-chart v-if="!loading" :chartData="data" :options="options" :label="label"></line-chart>
  <div style="
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin: 4em 0;
  ">

  <radar-chart v-if="!loading" :chartData="data" :options="radaroptions" label="Weekly Breakdown"></radar-chart>
  <!-- <radar-chart v-if="!loading" :chartData="data" :options="radaroptions" label="Weekly Breakdown"></radar-chart> -->
  </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as api from '../api/api'

import LineChart from "../components/LineChart.vue";
import RadarChart from "../components/RadarChart.vue"

export default Vue.extend({
  name: "Graph",
  components: { LineChart, RadarChart },
  data() {
    return {
      loading: true,
      id: "",
      slug: "",
      data: [] as any[],
      radaroptions: {
        scale: {
          ticks: {
            display: false
          },

          angleLines: {
            color: 'white'
          },
          gridLines: {
            color: 'white'
          }
        },
        scales: {
          r: [{
            ticks: {
              display: false
            }
          }]
        },
        // tooltips: {
        //   callbacks: {
        //     title: (tooltipItem, data) => {
        //       console.log(typeof(tooltipItem))
        //       console.log(typeof(data))
        //       data.labels[tooltipItem[0].index]
        //     }
        //   }
        // }
      },
      options: {
        decimation: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: 'white',
            },
            gridLines: {
              color: '#fff6'
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontColor: 'white',
            },
            gridLines: {
              color: '#fff2'
            }
          }]
        },
        responsive: true,
        tension: 0,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'white',
            backgroundColor: 'white',
            fontSize: 18
          }
        }
      },
      label: "Total Visits"
    }
  },
  async mounted() {

    this.id = this.$route.params.id
    this.slug = (await api.links.FetchLink(this.id)).slug
    this.data = await api.visits.FetchLinkVisits(this.id)
    console.log(this.options)
    this.loading = false
  }
});
</script>