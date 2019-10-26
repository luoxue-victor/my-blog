<template>
  <div class="wrap">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>

export default {
  data() {
    return {
      transitionName: 'turning-down'
    }
  },
  watch: {  
    '$route' (to, from) {  
      if(to.path > from.path) {
        // 进入下一页
        this.transitionName = 'turning-up';  
      }else{  
        // 返回上一页
        this.transitionName = 'turning-down';  
      }
    }
  }
}
</script>

<style scoped lang="scss">
.child-view {  
  position: absolute;  
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;  
  transition: all 4s ease;
  transform-origin: 0% center;
}

.turning-down-enter{
  opacity: 1;
  transform-origin: left;
  transform-style: preserve-3d;
  -webkit-transform: perspective(1000px) rotateY(-180deg);
  transform: perspective(1000px) rotateY(-180deg);
}

.turning-up-leave-active {
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(-180deg);
  z-index: 100;
}
</style>