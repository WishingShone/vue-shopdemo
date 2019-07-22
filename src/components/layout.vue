<template>
<div>
  <!-- 设定布局 -->
  <div class="app-head">
    <div class='app-head-inner'>
      <a href="/" tooltip='返回首页'><img src="../assets/logo.png" class="head-logo"></a>
      <div class='head-nav'>
        <ul class='nav-list'>
          <li v-if="username!=''">{{username}}</li>
          <li @click="loginClick" v-if="username===''">登录</li>
          <li class='nav-pile'>|</li>
          <li @click="regClick" v-if="username===''">注册</li>
          <li @click="logoutClick" v-if="username!=''">退出</li>
          <li class='nav-pile'>|</li>
          <li @click="aboutClick">关于</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="app-content">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
  <div class="app-foot">
    <foot></foot>
  </div>
  <dialogview :isShow="isShowloginDialog" @on-close="closeWindow('isShowloginDialog')">
   <logform @haslog="onSuccessLog"></logform>
  </dialogview>
  <dialogview :isShow="isShowregDialog" @on-close="closeWindow('isShowregDialog')">
    <regform></regform>
  </dialogview>
  <dialogview :isShow="isShowaboutDialog" @on-close="closeWindow('isShowaboutDialog')">
    <p>♥️关于小🐶的网站，非常的可爱♥️🎵🎵🎵</p>
  </dialogview>
</div>
</template>

<script>
import foot from '../pages/foot'
import dialogview from '../components/dialog'
import logform from '../components/logform'
import regform from '../components/regform'
export default {
  components:{
    foot,
    dialogview,
    logform,
    regform
  },
  data(){
    return {
      isShowloginDialog:false,
      isShowregDialog:false,
      isShowaboutDialog:false,
      username:''
    }
  },
  methods:{
    aboutClick:function(){
      this.isShowaboutDialog=true
    },
    loginClick:function(){
      this.isShowloginDialog=true
    },
    regClick:function(){
      this.isShowregDialog=true
    },
    closeWindow:function(attr){
      this[attr]=false
    },
    logoutClick:function(){
      this.username=''
    },
    onSuccessLog:function(data){
      console.log(data)
      this.isShowloginDialog=false
      this.username=data[0].username
    }
  }
}
</script>
<style>
html.body,div,span,applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,
blockquote,pre,
a,abbr,acronym,address,big,cite,code,
del,dfn,em,img,ins,kbd,q,s,samp,
strike,small,strong,sub.sup,tt,var,
b,u,i,center,
dl,dt,dd,ol,ul,li,
fieldset,form,label,legend,
table,caption,tbody,tfoot,thead,tr,th,td,
article,aside,canvas,details,embed,
figure,figcaption,footer,header,hgroup,
menu,mark,audio,nav,output,ruby,section,summary,time,video{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font:inherit;
  vertical-align: baseline;
}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{
  display: block;
}
body{
  line-height: 1;
}
ol,ul{
  list-style: none;
}
blockquote,q{
  quotes: none;
}
blockquote::before,blockquote::after,q::before,q::after{
  content: '';
  content: none;
}
table{
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  color: inherit;
  text-decoration: none;
}

body{
  background: #f0f2f5;
  font-family: 'Times New Roman', Times, serif,sans-serif,'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head{
  background:#363636;
  color:#b2b2b2;
  height: 80px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner{
  width: 1200px;
  margin: 0 auto;
}
.head-logo{
  float: left;
}
.app-head-inner img{
  width: 50px;
  margin-top: 20px;
}
.head-nav{
  float: right;
}
.head-nav ul{
  overflow: hidden;
}
.head-nav li{
  cursor: pointer;
  float: left;
}
.nav-pile{
  padding: 0 10px;
}
.app-foot{
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.container{
  width: 1200px;
  margin:  0 auto;
}
.hr{
  height: 1px;
  widows: 100px;
  background: #ddd;
}
.button{
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover{
  background: #4fc08d;
}
.g-form{

}
.g-form-line{
  padding: 15px 0;
}
.g-form-label{
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input{
  display: inline-block;
}
.g-form-input input{
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn{
  padding-left: 100px;
}
.g-form-error{
  color: red;
  padding-left: 5px;
}
.hot-tag{
  background: red;
  color: rgba(244, 248, 4, 0.733);
}
</style>
