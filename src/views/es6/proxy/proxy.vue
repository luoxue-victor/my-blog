<template>
  <div id="my-app">
    <!-- <h1 c-bind="a"></h1>
    <h1 c-bind="a.b.c"></h1>-->
    <input />
    <h1 c-bind="a.b.c.d.e"></h1>
    <input c-model="a.b.c.d.e" type="text" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Proxy extends Vue {
  private msg: string = "proxy";
  mounted() {
    const { createApp, reactive } = require("./proxy.ts").default;
    const App = {
      setup() {
        const react = reactive({
          a: {
            b: {
              c: {
                d: {
                  e: 222
                }
              }
            }
          }
        });
        setTimeout(() => {
          react.a.b.c.d.e = "444";
          let count = 0;
          const timer = setInterval(() => {
            react.a.b.c.d.e = ++ count;
            if (count == 10) clearInterval(timer);
          }, 100);
        }, 100);
        return react;
      }
    };
    createApp().mount(App, "#my-app");
  }
}
</script>