<template style="width: 100%">
  <v-container
    dark
    class="white--text mb-12"
    style="width: 100%; text-align: center"
  >
    <h1 class="mt-16 mb-16">Links</h1>
    <template class="mt-16">
      <v-card dark style="font-size: 2em" v-show="selected.length > 0">
        <v-card-title class="d-flex align-center">
          <v-dialog v-model="deleted.dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="checkSelected"
               :disabled="selected[0].slug == ''"
               icon class="mr-4"
               v-on="on"
               v-bind="attrs"
               >
                <v-icon dark class="ma-4"> mdi-delete </v-icon>
              </v-btn>
            </template>

             <v-card dark>
              <v-card-title class="error" style="text-align: center;">
                <span style="text-align: center;" class="headline">Delete {{ selected[0].slug }} link</span>
              </v-card-title>

              <v-card-text class="my-4">
                Are you sure you want to delete {{ selected[0].slug }}?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="deleted.dialog = false">
                  Cancel
                </v-btn>
                <v-btn class="error" text @click="deleteLink">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="edit.dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="checkSelected"
                :disabled="selected[0].slug == ''"
                icon
                class="mr-4"
                v-on="on"
                v-bind="attrs"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </template>

            <v-card dark>
              <v-card-title>
                <span class="headline">Edit {{ selected[0].slug }} link</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  :rules="urlRule"
                  v-model="selected[0].url"
                  label="URL"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="edit.dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          Active Links
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Filter"
            clearable
            single-line
            style="width: 10%"
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          class="pa-2"
          :aria-rowcount="this.$vuetify.breakpoint.smAndDown ? '5' : '10'"
          show-select
          single-select
          v-model="selected"
          :loading="links == null"
          :headers="table.headers"
          :items="links"
          :search="search"
          :no-data-text="'You have no active links'"
        >
        </v-data-table>
      </v-card> </template
  ></v-container>
</template>

<script lang="ts">
import Vue from "vue";

const URLValidator = new RegExp(
  "^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?|ftp):)?\\/\\/)" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broadcast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    // TLD identifier name, may end with dot
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
    "$",
  "i"
);

const XSSValiator = new RegExp("^javascript:.*$");

const getUID = () => {
  const token = localStorage.getItem("token");
  if (token != null) {
    const claims = JSON.parse(atob(token.split(".")[1]));
    console.log("claims: ", claims);
    if (claims != null) {
      return claims.UserID;
    }
  }
  return "";
};

export default Vue.extend({
  name: "Links",
  data() {
    return {
      edit: {
        index: 0,
        item: {},
        dialog: false,
      },
      deleted: {
        dialog: false,
      },
      selected: [{ id: "", slug: "", url: "" }],
      search: "",
      uid: "",
      links: [] as any[],
      table: {
        headers: [
          { text: "Slug", align: "start", filterable: true, value: "slug" },
          { text: "URL", filterable: true, value: "url" },
          { text: "Visits", value: "visits" },
          { text: "Created", filterable: true, value: "created_at" },
          { text: "Valid until", filterable: true, value: "lease" },
        ],
      },
    };
  },
  computed: {
    urlRule() {
      return [
        (v: string) => !!v || "URL required",
        (v: string) => {
          return !XSSValiator.test(v) || "Naughty Boi";
        },
        (v: string) => {
          return URLValidator.test(v) || "Invalid URL";
        },
      ];
    },
  },
  created() {
    const uid = getUID();
    fetch("https://tny.ie/api/links/user/" + uid, {
      headers: {
        "Content-Application": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        let link;
        for (link of res) {
          link.created_at = new Date(link.created_at * 1000).toDateString();
          link.lease = new Date(link.lease * 1000).toDateString();
        }
        this.links = res;
        return;
      });
    this.links = [];
  },
  methods: {
    checkSelected() {
      console.log(this.selected);
    },
    editItem(item: any) {
      this.edit.index = this.links.indexOf(item);
      this.edit.item = Object.assign({}, item);
    },
    save() {
      const link = this.selected[0];
      fetch(`https://tny.ie/api/links/${link.id}/url`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        mode: "cors",
        body: JSON.stringify({
          url: link.url,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
      this.edit.dialog = false;
    },
    deleteLink() {
      const link = this.selected[0];
      fetch(`https://tny.ie/api/links/${link.id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res)
        this.deleted.dialog = false
      }).catch((error) => {
        // TODO
      })
      
    }
  },
});
</script>
