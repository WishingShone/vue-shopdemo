<template>
  <div>
    <mydialog :is-show="isShowCheckDialog" @on-close="checkStatus">
      请检查你的支付状态！
      <div class="button" @click="checkStatus">
        支付成功
      </div>
      <div class="button"  @click="checkStatus">
        支付失败
      </div>
    </mydialog>
    <mydialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
      购买成功！
    </mydialog>
    <mydialog :is-show="isShowFailDialog" @on-close="toOrderList">
      购买失败！
    </mydialog>
  </div>
</template>

<script>
import mydialog from '../components/dialog'
export default {
  components:{
    mydialog
  },
  props:{
    isShowCheckDialog:{
      type:Boolean,
      default:false
    },
    orderid: {
      type: [String,Number]
    }

  },
  data(){
    return{
      isShowSuccessDialog:false,
      isShowFailDialog:false
    }
  },
  methods:{
    checkStatus:function(){
      this.$http.post('/api/checkOrder',{
        orderid: this.orderid
      }).then((res)=>{
          this.orderId = res.data.orderid
          this.isShowSuccessDialog = true
          //this.isShowCheckDialog=false
          //不允许从子组件中修改从父组件中传过来的变量，只能在父组件中修改该变量
          this.$emit('on-close-check-dialog')
        },
        (err)=>{
          this.isShowFailDialog=true
          //this.isShowCheckDialog=false
          this.$emit('on-close-check-dialog')
        })
    },
    toOrderList:function(){
      /**
       * $route为当前router跳转对象里面可以获取name、path、query、params等
       * $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
       * 返回上一个history也是使用$router.go方法 */
      this.$router.push({
        path: '/orderList'
        })
    }
  }
}
</script>
<style scoped></style>
