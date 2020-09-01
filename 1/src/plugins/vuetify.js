import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
          dark: {
            primary: '#FF1744',
            secondary: '#424242',
            accent: '#FF1744',
            error: '#b71c1c',
          },
        },
      },
});
