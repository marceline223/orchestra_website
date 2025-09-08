import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const myCustomLightTheme = {
  dark: false,
  colors: {
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    'on-primary': '#ff0', // Add similar entries for other components
    'light-green-color': '#6EA06A',
    'green-text-color': '#064B00',
    'footer-color': '#D9F3D0',
    'darker-green-text-color': '#144311',
  },
};

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
    iconfont: 'fa',
  },
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
});

export default vuetify;
