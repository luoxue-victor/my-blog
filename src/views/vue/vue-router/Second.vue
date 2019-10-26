<template>
  <div class="wrap">
    <h1 @click="to">To First</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  to () {
    this.$router.push({
      path: '/Home/First'
    })
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    height: 100vh;
    background: orangered;
    h1 {
      margin: 300px auto 0;
      text-align: center;
    }
  }
</style>