import Vue from 'vue';
import App from './App.vue';
import VueSignature from "vue-signature-pad"
import * as fcl from "@onflow/fcl";
import store from "./store";
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueSignature)

fcl.config()
  .put("accessNode.api", "http://localhost:8080") // local Flow emulator
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate") // local dev wallet
// .put("accessNode.api", "https://access-testnet.onflow.org") // Flow testnet
// .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn") // Blocto testnet wallet

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')