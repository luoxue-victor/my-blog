<template>
  <div>
    <h1>aaaaaaaaaaaa</h1>
    <h2>{{ props }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'a'
})
export default class A extends Vue {
  @Prop() private props!: string;
}
</script>

<style scoped lang="scss">
  
</style>