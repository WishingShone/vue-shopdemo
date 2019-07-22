<template>
  <div class="index-wrap">
    <div class='index-left'>
      <div class="index-left-block">
        <h2 @click="isShow=!isShow" style="cursor:pointer">全部产品</h2>
          <template v-for="items in productlist" v-if="isShow">
          <h3>{{items.title}}</h3>
          <ul> 
            <li v-for="item in items.list">
              <a :href='item.url'>{{item.name}}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!items.last" class="hr"></div>
        </template> 

        
      </div>
      <div class="index-left-block">
        <h2 @click="isShow2=!isShow2" style="cursor:pointer">最新消息</h2>
        <ul v-if="isShow2">
          <li v-for="items in newslist" >
             <a :href="items.url" class="new-item">{{items.name}}</a>
          </li>
          
        </ul>
      </div>
    </div>

    <div class="index-right">
      <slideShow :slides="slides" :invTime="invTime" @onChange="dosomethingShow"></slideShow>
      <div class="index-board-list">
        <div 
        class="index-board-item" 
        v-for="(item,index) in boardList" 
        :class="[{'line-last':(index+1)%2===0},'index-board-'+item.id]">
          <div class="index-board-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
              <a :href="item.href" class="button">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from '../components/slideshow'

export default {
  components:{
    //slideShow是index.vue的子组件，父组件使用props通知子组件，子组件使用事件响应父组件的通知
    slideShow
  },
  created:function(){
    //请求一个地址
    this.$http.get('api/getList')
    .then(
      (res)=>{
        this.boardList=res.data
      },
      (err)=>{return})
this.$http.get('api/getproductlist')
    .then(
      (res)=>{
        this.productlist=res.data
      },
      (err)=>{return})
      this.$http.get('api/getslides')
      .then((res)=>{
        this.getslides=res.data
      },(err)=>{return})
  },
  data(){
    return{
      isShow:true,
      isShow2:true,
      productlist:'',
      newslist:[
        {name:'最劲爆文学',url:'#'},
        {name:'最劲爆图片',url:'#'},
        {name:'最劲爆影视',url:'#'},
        {name:'最劲爆音乐',url:'#'}
      ],
      invTime:2000,
      getslides:'',
      slides:[
        {
          //图片通过js引入需要使用require
          src:require('../assets/images/slideshow/pic1.jpg'),
          title:"图片1",
          href:"detail/analysis"
        },
        {
          src:require('../assets/images/slideshow/pic2.jpg'),
          title:"图片2",
          href:"detail/count"
        },
        {
          src:require('../assets/images/slideshow/pic3.jpg'),
          title:"图片3",
          href:"detail/forecast"
        },
        {
          src:require('../assets/images/slideshow/pic4.jpg'),
          title:"图片4",
          href:"detail/deliver"
        },
        {
          src:require('../assets/images/slideshow/pic5.jpg'),
          title:"图片5",
          href:"detail/count"
        }
      ],

      boardList:''
    }
  },
  methods:{
    dosomethingShow:function(index){
      //console.log('轮播了一下'+index)
    }
  }
}
</script>
<style scoped>
.index-left-block li:hover{
  background: #4fc08d;
  color:#fff;
}
.index-left-block li:active{
  background: #4fc08d;
  color:#fff;
}
.menu-trans-enter-active{
  transition: all 1s;
}
.menu-trans-enter{
  transform: translateX(-900px);
}
.menu-trans-leave-active{
  transition: all 1s;
  transform: translateX(-900px);
}
.index-wrap{
  width: 1200px;
  margin: 10px auto;
  overflow: hidden;
}
.index-left{
  float: left;
  width: 300px;
  text-align: left;
}
.index-right{
  float: left;
  width: 900px;
}
.index-left-block{
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr{
  margin-bottom: 20px;
  border-top: 1px solid #807c7c;
}
.index-left-block h2{
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3{
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul{
  padding: 10px 10px;
}
.index-left-block li{
  padding: 5px;
}
.index-left-block li:active .index-left-block li:hover{
  background: #4fc08d;
  color:#fff;
}
.index-board-list{
  overflow: hidden;
}
.index-board-item{
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner{
  min-height: 125px;
  padding-left: 120px;
}
.index-board-0 .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-1 .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-2 .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-3 .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2{
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last{
  margin-right: 0;
}
.index-board-button{
  margin-top: 20px;
}
.index-board-button .button{
  padding: 5px;
  color: white;
  background: #4fc08d;
}
.lastest-news{
  min-height: 512px;
}
.new-item{
  display: inline-block;
  width: 200px;
  text-overflow: ellipsis;  /**超出省略**/
  white-space: nowrap;    /**不允许换行**/
}
.click-trans-enter-active{
  transition: all .5s;
}

</style>
