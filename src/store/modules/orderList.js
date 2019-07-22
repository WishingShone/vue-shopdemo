import Vue from 'vue'

//存放数据
const state = {
    orderList:[],
    params:{}
}
//页面调用lazy延迟,调用state数据
const getters = {
    orderList:function(state){
        return state.orderList
    }
}
//可以进行异步操作，异步请求，只允许mutations进行更改，不允许actions进行更改
const actions = {
    fetchOrderList({commit,state}){
        //commit来调用mutation
        Vue.http.post('/api/getOrderList',state.params)
        .then((res)=>{
            //相当于在vue中的state.orderList = res.data.list
            commit('updateOrderList',res.data.list)
            
        },(err)=>{})
    }
}
//同步状态更改，只允许mutations进行更改，不允许actions进行更改
const mutations = {
    //params1:当前数据 params2:需要赋值的数据
    updateOrderList(state,orderList){
        state.orderList=orderList

    }
}
export default {
    state,
    getters,
    actions,
    mutations
}