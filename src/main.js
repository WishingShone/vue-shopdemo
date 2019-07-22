// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
//配置store
import store from './store'
import layout from './components/layout'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import countPage from './pages/details/count'
import forecastPage from './pages/details/forecast'
import analysisPage from './pages/details/analysis'
import deliverPage from './pages/details/deliver'
import OrderList from './pages/orderList.vue'

Vue.config.productionTip = false
Vue.use(vueRouter)
/**当使用vue-resource后，在任何页面都可以使用【this.$http】 */
Vue.use(vueResource)

let router = new vueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component:IndexPage
    },
    {
      path: '/orderList',
      component:OrderList
    },
    {
      path:'/detail',
      redirect:'/detail/count',
      component:DetailPage,
      children:[
        {
          path:'count',
          component:countPage
        },
        {
          path:'forecast',
          component:forecastPage
        },
        {
          path:'analysis',
          component:analysisPage
        },
        {
          path:'deliver',
          component:deliverPage
        }
      ]
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // 改变项目启动时的渲染位置
  components: { layout },
  template: '<layout/>'
})
