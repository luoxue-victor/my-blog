<template>
  <div class="wrap">
    <button @click="push('a')">pushState A</button>
    <button @click="push('b')">pushState B</button>
    <my-router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { pushState } from './index'
import MyVueRouter from './router'

Vue.use(MyVueRouter)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
 
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

new MyVueRouter({ routes })

@Component
export default class Router extends Vue {
  @Prop() private msg!: string;
  push (name) {
    const _that: any = this
    _that.$myrouter.push({
      path: `/${ name }.html`
    })
  }

  mounted () {
    console.log(this);
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    margin-left: 150px;
  }
  button {
    width: 100px;
    height: 30px;
    margin-right: 20px;
    margin-top: 50px;
    margin-left: 20px;
  }
</style>