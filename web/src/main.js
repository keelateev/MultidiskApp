import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App);
app.use(store);
app.mixin({
  methods: {
    formatBytes: (bytes, decimals = 2) => {
      if (!+bytes) return ''
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }
  },
})
app.mount('#app')
