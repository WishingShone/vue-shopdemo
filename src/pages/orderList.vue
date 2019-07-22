<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>
      <div class="order-list-option">
        开始日期:
        <date-picker v-model="startDate" valueType="format" :first-day-of-week="1" @change="getStartDate"></date-picker>
        <!-- <v-date-picker @on-change="getStartDate"></v-date-picker> -->
      </div>
      <div class="order-list-option">
        结束日期:
        <date-picker v-model="endDate" valueType="format" :first-day-of-week="1" @change="getEndtDate"></date-picker>
        <!-- <v-date-picker @on-change="getStartDate"></v-date-picker> -->
      </div>
      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrder(head)"  :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
      <div class="table-pagenation">
        <v-pagenation :total="total" :pageSize="pageSize" @on-change="pageChange(offset)"></v-pagenation>  
      </div>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import DatePicker from 'vue2-datepicker'
import VPagenation from '../components/base/pagenation'
import _ from 'lodash'
var self = this
export default {
  created(){
    self = this
  },
  components: {
    VSelection,
    DatePicker,
    VPagenation
  },
  data(){
    return{
      /*****DataPicker******/
      startDate: '',
      endDate: '',
      /*****DataPicker******/
      query: '',
      productId: 0,
      products: [],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      currentOrder:'asc',
      //tableData: [],
      pageSize: 10,
      offset: 0,
      total:10
    }
  },
  computed:{
    tableData:{
      get:function(){
        return this.$store.getters.getOrderList
        },
        set:function(){}
    }
  },
  mounted(){
    this.getProductLists()
    //发送http请求
    this.$store.dispatch('fetchOrderList')
    console.log(this.$store.state);
    //this.getTableData()
  },
  watch:{
    query(){
      this.getTableData()
      //console.log('响应query')
    }
  },
  methods:{
    productChange:function(obj){
      this.productId = obj.value
      this.getTableData()
    },
    getStartDate(){
      this.getTableData()
    },
    getEndtDate(){
      this.getTableData()
    },
    getProductLists(){
      this.$http.post('/api/getProducts').then((res)=>{
        this.products = res.data
        //console.log(res.data)
      },(err)=>{
      })
    },
    getTableData(){
      //this.$store.dispatch('fetchOrderList')
      let respParams={
        query:this.query,
        productId:this.productId,
        startDate:this.startDate,
        endDate:this.endDate
      }
      this.$http.post('/api/getOrderList',respParams).then((res)=>{
        this.tableData = res.data.list
        //console.log(res.data)
      },(err)=>{
        //this.tableData='无数据'
      })
    },
    changeOrder:function(headItem){
      //所有标题变成灰色
      this.tableHeads.map((item)=>{
        item.active = false
        return item
      })
      //选中标题高亮
      headItem.active = true
      if(this.currentOrder === 'asc'){
        this.currentOrder = 'desc'
      }
      if(this.currentOrder === 'dasc'){
        this.currentOrder = 'asc'
      }
      //根据条件排序
      this.tableData = _.orderBy(this.tableData,headItem.key,this.currentOrder)
    },
    pageChange(offset){
      this.offset=offset
      this.getTableData()
    }
  }
}
</script>
<style scoped>
.order-wrap {
  width: 1000px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
.table-pagenation {
  padding: 15px;
  text-align: right;
}
</style>
