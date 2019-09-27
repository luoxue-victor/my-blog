<template>
  <div>
    <component
      v-for="(component, index) in currentComponent"
      :key="index"
      v-bind:is="component.component"
      :props="component.prop"
    ></component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Components extends Vue {
  private list = [
    {
      name: 'banner',
      props: {
        msg: '我是来自banner props'
      }
    },
    {
      name: 'tabs',
      props: {
        msg: '我是来自tabs props'
      }
    }
  ];
  get currentComponent() {
    return this.list.map(component => {
      const c = require(`@/components/modules/${component.name}.vue`).default
      return {
        component: c,
        prop: component.props
      };
    });
  }
}
</script>