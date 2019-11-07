import Vue from 'vue'
import App from './app'
import store from './store/index'

// 声明当前组件类型
App.myType = 'app' // 应用

// 将store对象放置至Vue原型上，否则无法使用Vuex的映射函数
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
