<template style="width: 100%">
  <v-container
    dark
    class="white--text mb-12"
    style="width: 100vw; text-align: center"
  >
    <h1 class="mt-16 mb-16">Graphs</h1>
    <v-sparkline
      v-if="graph.loaded"
      :value="graph.data"
      :fill="graph.fill"
      line-width="1.5"
      auto-draw-duration="500"
      padding="5"
      :type="$vuetify.breakpoint.smAndDown ? 'bar':'bar'"
      auto-draw
    >
      <template :v-show="$break" v-slot:label="item" style="color: white">
        {{ item.value }}
      </template>
    </v-sparkline>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";

import { links, visits } from "@/api/api";
// Vue.component("chart", Chart);

export default Vue.extend({
  // components: { Chart },
  name: "Graph",
  data() {
    return {
      graph: {
        loaded: true,
        fill: false,
        data: [] as Array<number>,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      
      const visit = await visits.FetchLinkVisits(this.$route.params.id);
      this.graph.data = visit.map((visit) => visit.count).reverse();
    },
  },
});
</script>
