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
    <p class="mt-4"><a :href="'https://tny.ie/api/gdpr/'+uid">Download GDPR data</a></p>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import {users, tokens} from "@/api/api"

export default Vue.extend({
  name: "Account",
  data() {
    return {
      // placeholder data
      uid: " ",
      userdata: [] as any[],
    };
  },
  async mounted() {
    this.uid = tokens.GetUID()
    const user =  await users.GetUser(this.uid)
    
    this.userdata = []

    Object.entries(user).forEach(([key, value]) => { 
      this.setData(key, value)
    })
    // for (const key, let value of Object.entries(user)) {
    //   if (typeof(value == Date)) {
    //     value = value.toISOString()
    //   }
    //   this.userdata.push({name: key, value: value})
    // }
    // console.log(this.userdata)

  },
  methods: {
    setData (key: string, value: any) {
      if (key == "created_at" || key == "updated_at" ) {
        value = value.toLocaleDateString()
      }
      this.userdata.push({name: key, value: value})
    }
  }
});
</script>
