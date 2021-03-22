<template style="width: 100%">
  <v-container
    dark
    class="white--text mb-12"
    style="width: 100%; text-align: center"
  >
    <h1 class="mt-16 mb-16">Graphs</h1>
    <template class="mt-16">
      <chart style="max-height: 80%"></chart>
    </template>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import Chart from "@/components/Chart.vue";

Vue.component("chart", Chart);

export default Vue.extend({
  components: { Chart },
  name: "Graph",
});
</script>