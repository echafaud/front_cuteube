import {createApp} from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import {loadFonts} from './plugins/webfontloader';
import router from "@/router/router";
import store from "@/store/store";
import api from '@/plugins/api'
import errorHandler from "@/plugins/errorHandler";
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

loadFonts()
const app = createApp(App)
app
    .use(vuetify)
    .use(router)
    .use(store)
    .use(api)
    .use(errorHandler)
    .use(VueVideoPlayer)
    .mount('#app')
