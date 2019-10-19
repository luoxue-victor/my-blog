<template>
  <div class="device-wrapper">
  <div class="device" data-device="iPhone6" data-orientation="portrait" data-color="white" >
    <div class="screen">
      <iframe
        width="100%"
        height="100%"
        frameborder="1"
        scrolling="no"
        src="https://flutter-go.pub/flutter_go_web/"
      ></iframe>
    </div>
  </div>
</div>
 
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import 'html5-device-mockups'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
body {
  -webkit-overflow-scrolling: touch;
}
.device .screen {
  pointer-events: auto;
}
</style>