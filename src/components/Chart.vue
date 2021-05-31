<template>
  <!-- <D3LineChart>

  </D3LineChart> -->
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
// import { links, visits } from "@/api/api";

// import {D3LineChart} from "vue-d3-charts"

// // import VueApexCharts from "vue-apexcharts";
// // Vue.use(VueApexCharts);

// // Vue.component("apexchart", VueApexCharts);
export default Vue.extend({
  name: "Chart",
})
//   components: {D3LineChart},
//   data() {
//     return {
//       chartConfig: {
//         key: "Link Traffic",
//       },
//       chart_data: [
        
//       ],
//       links: [] as links.Link[],
//       link_visits: [] as Array<visits.VisitPerDay[]>,
//       options: {
//         stroke: {
//           width: 3,
//         },
//         annotations: {
//           label: {
//             style: {
//               background: "#121212",
//             },
//           },
//         },
//         markers: {
//           size: 2,
//           shape: "circle",
//           strokeWidth: 2,
//           radius: 2,
//         },
//         chart: {
//           id: "vuechart-example",
//         },
//         xaxis: {
//           categories: [] as Date[],
//           labels: {
//             show: true,
//             style: {
//               colors: ["#afafaf"],
//             },
//           },
//         },
//         colors: [
//           "#63b598",
//           "#ce7d78",
//           "#ea9e70",
//           "#a48a9e",
//           "#c6e1e8",
//           "#648177",
//         ],
//         grid: {
//           borderColor: "#2a2a2a",
//         },
//       },
//       series: [] as any,
//     };
//   },
//   methods: {
//     getDates() {
//       const output = [];
//       const curr_date = new Date();
//       for (let i = 0; i < 30; i++) {
//         const date = new Date();
//         date.setDate(curr_date.getDate() - 30 + i);
//         output.push(date);
//       }
//       this.options.xaxis.categories = output;
//     },
//     async getLinks() {
//       this.links = await links.FetchOwnLinks();
//     },
//     async getLinkVisits() {
//       for (const link of this.links) {
//         this.link_visits.push(await visits.FetchLinkVisits(link.id));
//       }
//     },
//     getSeriesData() {
//       for (let i = 0; i < this.link_visits.length; i++) {
//         this.series.push({
//           name: this.links[i].slug,
//           data: new Array<number>(30).fill(0),
//         });
//         for (let j = 0; j < this.link_visits[i].length; j++) {
//           console.log(
//             "DATE: ",
//             new Date(this.link_visits[i][j].date).toISOString()
//           );
//           const offset =
//             new Date().getDate() -
//             new Date(this.link_visits[i][j].date).getDate();
//           console.log("offset: ", offset);
//           this.series[i][this.series[j].length - 1 - offset] = this.link_visits[
//             i
//           ][j].count;
//           console.log(
//             "ADDED DATA : ",
//             this.series[i][this.series[j].length - 1 - offset]
//           );
//           console.log(
//             "POSTITION : ",
//             this.link_visits.indexOf(
//               this.series[i][this.series[j].length - 1 - offset]
//             )
//           );
//         }
//         console.log("current series: ", this.series[i]);
//       }
//       console.log(this.series);
//       console.log(this.options.xaxis.categories);
//     },
//   },
//   async created() {
//     this.getDates();
//     await this.getLinks();
//     await this.getLinkVisits();
//     await this.getSeriesData();
//     console.log("dates: ", this.options.xaxis.categories);
//     console.log("links: ", this.links);
//     console.log("link visits: ", this.link_visits);
//     console.log("data: ", this.series);
//   },
//   mounted() {
//     // this.getLinks()
//     // this.getLinkVisits()
//     // console.log("links: ", this.links)
//     // console.log("link visits: ", this.link_visits)
//   },
// });
</script>