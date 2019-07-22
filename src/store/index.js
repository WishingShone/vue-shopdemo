import Vue from 'vue'
import Vuex from 'vuex'
import orderList from './modules/orderList'
//实例化VuexStore数据仓库
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        orderList
    }
})