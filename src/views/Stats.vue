<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="mt-16">Tny<span style="color: #009688">IE</span> Stats</h1>

    <line-chart style="max-height: 50%" v-if="!loading" :chartData="series" :options="this.options"></line-chart>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import LineChart from "../components/MultiLine.vue";

import * as api from "@/api/api";

export default Vue.extend({
  name: "Stats",
  components: { LineChart },
  data() {
    return {
      links: [] as api.links.Link[],
      series: [] as Array<{ name: string; visits: api.visits.VisitPerDay[]; }>,
      loading: true,
      options: {
        decimation: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white",
              },
              gridLines: {
                color: "#fff6",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white",
              },
              gridLines: {
                color: "#fff2",
              },
            },
          ],
        },
      },
    };
  },
  async mounted() {
    await this.fetchLinks();
    await this.fetchVisits();
  },
  methods: {
    async fetchLinks() {
      this.links = await api.links.FetchOwnLinks();
    },
    async fetchVisits() {
      for (const link of this.links) {
        // this.series.push(await api.visits.FetchLinkVisits(link.id));
        this.series.push({name: link.slug, visits: await api.visits.FetchLinkVisits(link.id)})
      }

      this.loading = false;
    },
  },
});
</script>
