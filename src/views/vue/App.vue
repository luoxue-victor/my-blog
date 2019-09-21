<template>
  <div id="myapp">
    hahahha
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Button } from 'iview'


Vue.component('Button', Button)

@Component
export default class HelloWorld extends Vue {
  mounted () {
  }  
}
</script>

<style scoped lang="scss">

</style>
