<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowindex].href">
        <transition name="slide-trans">
          <img v-if="isshow" :src="slides[nowindex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isshow" :src="slides[nowindex].src">
        </transition>
      </a>
    </div>
    <h2>{{slides[nowindex].title}}</h2>
    <ul class="slide-pages">
      <li><a href="#" @click="goto(prevIndex)">&laquo;</a></li>
      <li v-for="(item,index) in slides" @click="goto(index)">
        <a href="#" :class="{on: index === nowindex}">{{index+1}}</a>
      </li>
      <li><a href="#" @click="goto(nextIndex)">&raquo;</a></li>
    </ul>
  </div>
</template>

<script>
import { setInterval, clearInterval, setTimeout } from 'timers';
export default {
props:{
  slides:{
    type:Array,
    default:[]
  },
  invTime:{
    type:Number,
    default:3000
  }
},
data(){
  return{
    nowindex: 0,
    invId: null,
    isshow:true
  }
},
computed:{
  //通过计算属性来翻页
  prevIndex(){
    if(this.nowindex === 0){
      return this.slides.length-1
    }
    else{
      return this.nowindex -1
    }
  },
  nextIndex(){
    if(this.nowindex === this.slides.length-1){
      return 0
    }
    else{
      return this.nowindex +1
    }
  }
},
methods:{
  goto: function(index){
    this.isshow = false
    setTimeout(()=>{
      this.isshow = true
      this.nowindex = index
      this.$emit('onChange',index)
    },10)
  },
  //自动播放幻灯片
  runInv: function(){
    this.invId=setInterval(()=>{
      //console.log(1111)
      this.goto(this.nextIndex)
    },this.invTime)
    
  },
  clearInv: function(){
    clearInterval(this.invId)
  }
},
mounted(){
  //在加载时运行
  this.runInv()
}
}
</script>
<style scoped>
.slide-trans-enter-active{
  transition: all .5s;
}
.slide-trans-enter{
  transform: translateX(900px);
}
.slide-trans-old-leave-active{
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show{
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 350px;
  overflow: hidden;
}
.slide-show h2{
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
}
.slide-img{
  width: 100%;
}
.slide-show img{
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages{
  position: absolute;bottom: 10px;right: 15px;
}
.slide-pages li{
  display: inline;
  text-align: center;
}
.slide-pages a{
  float: left;
  display: block;
  font-size: 14px;
  text-decoration: none;
  padding: 6px 6px;
  color: #fff;
  margin-left: -1px;
  border: 1px solid transparent;
  line-height: 0;
}
.slide-pages a:hover {
  background: #eee;
  color:rgb(58, 9, 238);
}
.on
{
  background: rgb(24, 2, 2);color:rgb(248, 248, 248);
  opacity: .5;
}
</style>
