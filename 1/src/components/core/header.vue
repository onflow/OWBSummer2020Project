<template>
    <v-toolbar color="primary" app>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn text to="/" color="white">
                <v-icon left>mdi-home</v-icon>Home
            </v-btn>
            <v-btn text to="/account" color="white" v-if="loggedIn">
                <v-icon left>mdi-account</v-icon>Account
            </v-btn>
        </v-toolbar-items>
        <v-spacer />
        <v-btn text color="white" v-if="loggedIn" @click="fcl.unauthenticate">
            <v-icon left>mdi-logout</v-icon>Logout
        </v-btn>
        <v-btn text color="white" v-else @click="fcl.authenticate">
            <v-icon left>mdi-login</v-icon>Login
        </v-btn>
    </v-toolbar>
</template>

<script>
import * as fcl from "@onflow/fcl";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            fcl,
        };
    },
    computed: {
        ...mapGetters(["loggedIn"]),
    },
};
</script>