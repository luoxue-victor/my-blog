<template>
  <div>
    <template v-for="index in num">
      <h2 class="h2" :key="index">{{ index }}</h2>
      <!-- <img :key="'imgkey' + index" src="https://img1.zhuanstatic.com/common/cycle/list-empty.png" alt=""> -->
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Perf extends Vue {
  private num = 10;
  computedPerf(msg: string) {
    const ptiming = window.performance.timing;
    const time = ptiming.domContentLoadedEventEnd - ptiming.navigationStart;
    console.log(msg, time);
  }
  created() {
    window.eventHub.$on("fmp", (res: number) => {
      console.log("统计时间：", res);
    });
  }
  mounted() {
    console.log("mounted", parseInt(window.performance.now() + ""));
    window.onload = () => {
      console.log("onload", parseInt(window.performance.now() + ""));
    };
    this.computedPerf("domContentLoadedEventEnd: ");
    // setTimeout(() => {
    //   this.num =100
    // }, 1000)
  }
}
</script>

<style scoped lang="scss">
.h2 {
  text-align: center;
}
</style>