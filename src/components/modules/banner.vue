<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Banner extends Vue {
  msg = '我是一个banner'
}
</script>

<style scoped lang="scss">
  
</style>
