import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App)
  .use(store)
  .mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}