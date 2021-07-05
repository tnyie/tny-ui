<template style="width: 100%">
  <v-container
    dark
    class="white--text mb-12"
    style="width: 100%; text-align: center"
  >
    <h1 class="mt-16 mb-16">Links</h1>
    <template class="mt-16">
      <v-card dark style="font-size: 2em" v-show="selected.length > 0">
        <v-card-title class="d-flex align-center justify-center">
          <v-btn class="ma-2" icon @click="fetchlinks">
            <v-icon> mdi-refresh </v-icon>
          </v-btn>
          <v-dialog v-model="deleted.dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="checkSelected"
                :disabled="selected[0].slug == ''"
                icon
                v-on="on"
                v-bind="attrs"
              >
                <v-icon dark class="ma-4"> mdi-delete </v-icon>
              </v-btn>
            </template>

            <v-card dark style="width: 100vw !important">
              <v-card-title class="error" style="text-align: center">
                <span style="text-align: center" class="headline"
                  >Delete {{ selected[0].slug }} link</span
                >
              </v-card-title>

              <v-card-text class="my-4">
                Are you sure you want to delete {{ selected[0].slug }}?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleted.dialog = false"
                >
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
                <v-icon> mdi-pencil </v-icon>
              </v-btn>
            </template>
            <v-card dark style="max-width: 100vw !important">
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
            dark
            clearable
            style="width: 10%"
            single-line
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
          <template v-slot:item.actions="{ item }">
            <v-icon @click="redirect(item)">
              mdi-chart-bar
            </v-icon>
          </template>
          <template #item.url="{ value }">
            <a :href="value">
              {{ value }}
            </a>
          </template>
          <template v-slot:item.lease="{ item, value }">
            <v-btn
              color="error"
              v-if="value < new Date().getTime() / 1000"
              @click="reactivate(item)"
            >
              Reactivate
            </v-btn>
            <div
              v-else
              v-text="new Date(Number(value) * 1000).toLocaleDateString()"
            ></div>
          </template>
        </v-data-table>
      </v-card>
      <template>
        <v-snackbar v-model="snackbar" timout="500">
          <span
            v-text="
              this.status
                ? 'Successfully updated link'
                : 'Failed to update link'
            "
          ></span>
          <template v-slot:action="{ attrs }">
            <v-btn
              text
              v-bind="attrs"
              @click="snackbar = false"
              :color="status ? 'green' : 'orange darken-2'"
              >Close</v-btn
            >
          </template>
        </v-snackbar>
      </template>
    </template>
  </v-container>
</template>

<style scoped>
.text-start {
  padding: 1em;
}

.text-start:hover {
  background: #fff !important;
}

.v-data-table a {
  text-decoration: none;
}
</style>

<script lang="ts">
import Vue from "vue";

import { links } from "@/api/api";

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
      status: true,
      snackbar: false,
      edit: {
        index: 0,
        item: {},
        dialog: false
      },
      deleted: {
        dialog: false
      },
      selected: [{ id: "", slug: "", url: "" }],
      search: "",
      uid: "",
      links: [] as links.Link[],
      table: {
        headers: [
          { text: "Slug", align: "start", filterable: true, value: "slug" },
          { text: "URL", filterable: true, value: "url" },
          { text: "Visits", value: "visits" },
          { text: "Created", filterable: true, value: "created_at" },
          { text: "Updated", filterable: true, value: "updated_at" },
          { text: "Unlock Time", filterable: true, value: "unlocktime" },
          { text: "Valid until", filterable: true, value: "lease" },
          {
            text: "Graph",
            filterable: false,
            value: "actions",
            sortable: false
          }
        ]
      }
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
        }
      ];
    }
  },
  async mounted() {
    await this.fetchlinks();
    console.log(this.links);
  },
  methods: {
    redirect(item: links.Link) {
      this.$router.push("/graph/" + item.id);
    },
    async reactivate(item: links.Link) {
      await links.UpdateLinkLease(item);
      this.fetchlinks();
    },
    async fetchlinks() {
      this.links = await links.FetchOwnLinks();
      for (const link of this.links) {
        link.created_at = new Date(
          Number(link.created_at) * 1000
        ).toDateString();
        const updated_at = new Date(Number(link.updated_at) * 1000);
        if (
          updated_at.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
        ) {
          link.updated_at = new Date(
            Number(link.updated_at) * 1000
          ).toLocaleTimeString();
        } else {
          link.updated_at = new Date(
            Number(link.updated_at) * 1000
          ).toLocaleDateString();
        }
        link.unlock_time =
          link.unlock_time == 0
            ? ""
            : new Date(Number(link.unlock_time) * 1000).toLocaleString();
      }
    },
    checkSelected() {
      console.log(this.selected);
    },
    editItem(item: any) {
      this.edit.index = this.links.indexOf(item);
      this.edit.item = Object.assign({}, item);
    },
    async save() {
      const link = this.selected[0];

      this.status = !(await links.UpdateLinkURL(link.id, link.url));

      this.snackbar = true;
      this.edit.dialog = false;

      this.fetchlinks();
    },

    async deleteLink() {
      const link = this.selected[0];
      links.DeleteLink(link.id);
      this.deleted.dialog = false;
      this.fetchlinks();
    }
  }
});
</script>
