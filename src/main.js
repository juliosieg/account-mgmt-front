import { createApp } from 'vue'
import App from './App.vue'

//Vue Router
import router from './routes/router.js'

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

//VueToastr
import Toaster from '@meforma/vue-toaster';

//VueLoading
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

library.add(fas)

createApp(App)
    .component("fa", FontAwesomeIcon)
    .use(Toaster)
    .use(VueLoading)
    .use(router)
    .mount('#app')
