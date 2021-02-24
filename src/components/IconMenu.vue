<template>
    <v-menu class="mr-6" :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
                <v-icon>
                    {{icon}}
                </v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'IconMenu',
    props: ["icon"],
    data () {
        return {
            items: [
                {title: "Log out of Account"},
                {title: "Delete Account"}
            ]
        }
    }
})
</script>