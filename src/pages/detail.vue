<template>
  <div class="detail-wrap">
    <div class="detail-left">
      <div class="product-board">
        <!-- 图片做映射 -->
        <img :src="productIcon">
        <ul>
          <router-link v-for="item in products" :to="{path:item.path}" tag="li" active-class="active">
            {{item.name}}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  created:function(){
    this.$http.get('/api/getProducts').
    then((res)=>{
      this.products=res.data
    },
    (err)=>{return})
  },
  computed :{
    productIcon(){
      //console.log(this.$route.path,this.imgMap)
      /**
       * $route为当前router跳转对象里面可以获取name、path、query、params等
       * $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
       * 返回上一个history也是使用$router.go方法 */
      return this.imgMap[this.$route.path]
    }
  },
  data(){
    return{
      products:'',
      imgMap:{
        '/detail/count':require('../assets/images/1.png'),
        '/detail/forecast':require('../assets/images/2.png'),
        '/detail/analysis':require('../assets/images/3.png'),
        '/detail/deliver':require('../assets/images/4.png'),
      }   
    }
  }
}
</script>
<style>
.detail-wrap {
  width: 1200px;
  margin: 10px auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.product-board li a {
  display: block;
}
.sales-board {
  background: #fff;
}
.sales-board-form {
}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>
