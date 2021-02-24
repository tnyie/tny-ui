<template style="width: 100%">
  <v-container
    dark
    class="white--text mb-12"
    style="width: 100%; text-align: center"
  >
    <h1 class="mt-16">Links</h1>
    <v-expansion-panels style="width: 100%" class="mt-12" grow dark multiple>
      <v-expansion-panel
        style="width: 100%"
        v-for="link in links"
        :key="link.text"
      >
        <v-expansion-panel-header>
          <v-spacer></v-spacer>
          {{ link.slug }}
          <v-spacer></v-spacer>
          <span class="grey--text">Visits: {{ value.length }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="width: 100%">
          <v-row>
            <v-col
              ><a v-bind:href="link.url">{{ link.url }}</a></v-col
            >
          </v-row>
          <v-sparkline
            auto-draw
            color="warning"
            :style="{
              width: $vuetify.breakpoint.mdAndDown ? '90%' : '60%',
              margin: 'auto'
            }"
            :value="value"
            line-width="1"
          >
          </v-sparkline>
          <small class="float-right"
            ><a class="grey--text" :href="'https://tny.ie/api/link/' + link.id"
              >Export Data</a></small>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Links",
  computed: {
    expandedPanels () {
      if (this.links.length < 3) {
        console.log("burh");
      }
      return true;
    }
  },
  data() {
    return {
      value: [200, 675, 410, 390, 310, 460, 250, 200, 675, 410, 390, 310, 460, 250, 200, 675, 410, 390, 310, 460, 250, 200, 675, 410, 390, 310, 460, 250],
      links: [
        {
          id: "9a560059-d64c-4b78-bb57-553db85d3aa1",
          title: "123456789012345678",
          url: "https://google.com/thing",
          slug: "/hashcode"
        },
        {
          id: "ee2f0dc3-3e05-4fe0-afe4-65bd24acb945",
          title: "Netsoc Hashcode",
          url: "https://netsoc.co/rk/thing",
          slug: "/netsoc-hash"
        }
      ]
    };
  }
});
</script>
