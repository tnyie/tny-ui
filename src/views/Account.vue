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
    <p class="mt-4"><a :href="'https://tny.ie/api/gdpr/'+userdata[0].value">Download GDPR data</a></p>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Account",
  data() {
    return {
      // placeholder data
      userdata: [
        {
          name: "User ID",
          value: "c7a013ef-125b-4362-9ad2-cb33c941367f"
        },
        {
          name: "Username",
          value: "thomas",
        },
        {
          name: "Email",
          value: "thomas007g@gmail.com",
        },
        {
          name: "Created At",
          value: new Date(1606027176686).toDateString()
        },
        {
          name: "Updated At",
          value: new Date(1616027176686).toDateString(),
        },
      ],
    };
  },
});
</script>
