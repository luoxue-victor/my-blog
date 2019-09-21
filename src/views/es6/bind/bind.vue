<template>
  <div>
    <h1>{{ 'msg' }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { bind } from './bind'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  mounted () {
    ;
  }
}
</script>

<style scoped lang="scss">
  
</style>