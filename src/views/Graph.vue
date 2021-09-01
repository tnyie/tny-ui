<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="my-16">{{ this.slug }}</h1>
  <line-chart v-if="!loading" :chartData="data" :options="options" :label="label"></line-chart>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as api from '../api/api'

import LineChart from "../components/LineChart.vue";

export default Vue.extend({
  name: "Graph",
  components: { LineChart },
  data() {
    return {
      loading: true,
      id: "",
      slug: "",
      data: [] as any[],
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      label: "Visits"
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