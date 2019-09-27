<template>
  <div>
    <h1>{{ msg }}</h1>
    <h1>{{ props.msg }}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {
  msg = '我是一个tabs组件'
  @Prop() private props!: string;
}
</script>

<style scoped lang="scss">
  
</style>
