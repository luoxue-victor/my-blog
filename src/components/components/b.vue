<template>
  <div>
    <h1>bbbbbbbbbbb</h1>
    <h2>{{ props }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'b'
})
export default class B extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
  
</style>