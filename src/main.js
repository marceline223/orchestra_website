import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.ts'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
    dark: false,
    colors: {
        //background: "#b0b0b0",
        surface: "#FF0000",
        primary: "#FF0000",
        "primary-darken-1": "#FF0000",
        secondary: "#03DAC6",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
        'on-primary': '#ff0', // Add similar entries for other components
    },
};

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "myCustomLightTheme",
        themes: {
            myCustomLightTheme
        }
    }
})

createApp(App).use(vuetify).use(router).mount('#app')
