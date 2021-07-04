<template class="mt-16 white--text" style="margin: auto;">
  <v-container dark class="white--text" style="text-align: center">
    <h1 class="mt-16">Your user data</h1>
    <v-simple-table dark class="pa-4 mt-12" style="max-width: 1000px; margin: auto;">
      <template v-slot:default>
        <tbody>
          <tr v-for="item in userdata" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    
    <v-btn
      color="primary"
      class="mt-8"
      v-show="!this.displayGDPR"
      @click="requestData"
    >Request GDPR data</v-btn>
    <v-card dark v-show="this.displayGDPR" class="mt-8 pa-2">
      <pre v-text="this.gdprdata" style="textAlign: left"></pre>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import {users, tokens, gdpr} from "@/api/api"

export default Vue.extend({
  name: "Account",
  data() {
    return {
      // placeholder data
      uid: " ",
      userdata: [] as any[],
      gdprdata: "",
      displayGDPR: false,
    };
  },
  async mounted() {
    this.uid = tokens.GetUID()
    const user =  await users.GetUser(this.uid)
    
    this.userdata = []

    Object.entries(user).forEach(([key, value]) => { 
      this.setData(key, value)
    })
  },
  methods: {
    async requestData() {
      const data = await gdpr.RequestData()
      this.gdprdata = JSON.stringify(await data, null, 2)
      this.displayGDPR = true
    },
    setData (key: string, value: any) {
      if (key == "created_at" || key == "updated_at" ) {
        value = value.toLocaleDateString()
      }
      this.userdata.push({name: key, value: value})
    }
  }
});
</script>
