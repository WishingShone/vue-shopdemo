<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 16:21:24
 * @LastEditTime: 2019-07-20 16:28:45
 * @LastEditors: Please set LastEditors-->
<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名:</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入用户名"></input>
        </div>
        <span class="g-form-error">{{userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码:</span>
        <div class="g-form-input">
          <input type="password" v-model="passwordModel" placeholder="请输入密码"></input>
        </div>
        <span class="g-form-error">{{passwordErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{errorText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logform',
  data(){
    return{
      passwordModel:'',
      usernameModel:'',
      errorText:''
    }
  },
  computed:{
    userErrors(){
      let errorText,status=false
      if(!/^\w{1,8}$/g.test(this.usernameModel)){
        status=false
        errorText='不包含@' 
      }
      else{
        status=true
        errorText=''
      }
      if(!this.userFlag){
        errorText=''
        this.userFlag=true
      }
      return{
        status,errorText
      }
    },
    passwordErrors:function(){
      let errorText,status=false
      if(!/^\w{1,20}$/g.test(this.passwordModel)){
        status=false
        errorText='长度必须为1-8位' 
      }
      else{
        status=true
        errorText=''
      }
      if(!this.passwordFlag){
        errorText=''
        this.passwordFlag=true
      }
      return{
        status,errorText
      }
    }
  },
  methods:{
    onLogin:function(){
      if(!this.userErrors.status || !this.passwordErrors.status){
        this.errorText='验证不通过'
      }
      else{
        this.$http.post('/api/getUser')
        .then((res)=>{
          this.$emit('haslog',res.data)
        },(error)=>{})
      }
    }
  }
}
</script>
<style scoped></style>
