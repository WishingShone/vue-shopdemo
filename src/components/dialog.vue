<template>
<div>
  <div class="dialog-wrap">
    <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
    <transition name="drop-dialog">
    <div class="dialog-cntent" v-if="isShow">
      <p class="dialog-close" @click="closeMyself" style="cursor:pointer">❌</p>
      <slot>空</slot>
    </div>
    </transition>
    </div>
    </div>
</template>

<script>
export default {
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      
    }
  },
  methods:{
    closeMyself:function(){
      this.$emit('on-close')
    }
  }
}
</script>
<style scoped>
.drop-dialog-enter-active{
  transition: all .5s ease-in;
}
.drop-dialog-leave-active{
  transition: all .3s ease-in;
}
.drop-dialog-enter{
  transform: translateY(-500px)
}
.drop-dialog-leave-active{
  transform: translateY(-500px)
}
.dialog-wrap{
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover{
  background: #000;
  opacity: .5;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-cntent{
  width: 50%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #646068;
  padding: 2%;
  line-height: 1.6
}
.dialog-close{
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
