# render函数-VS-动态component

> 大家应该都知道vue的render函数跟vue的动态组件，但是可能在90%的业务场景中都不会用到这方法，所以可能也不会去深究这些api的用法。这次正好有幸做了一次动态渲染组件的需求，小编就拿出来给大家分享一下。

## 需求--页面需要支持模块化可配置，比如首页需要有banner模块、列表模块、中通模块、金刚模块等等，通过配置的方式实现模块的展示。

在做需求之前我们思考一下，有几种做法。

> 第一种使用动态组件，通过is特性来在模板上展示对应组件。第二种使用render函数直接生成VNode渲染。接下来我们评估一下这两个方案的优劣点和如何使用

### 1. 使用动态component组件

这是一个动态组件官方示例

```html
<component v-bind:is="currentTabComponent"></component>
```

- 解决将组件挂载到模板：首先我们要通过require动态引入组件，然后遍历component组件，使用is属性将组件挂载在模板上。

```js
<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="index"
      v-bind:is="component.component"
    ></component>
  </div>
</template>
```

- 解决向子组件传参：因为我们不可能知道所有组件都有什么属性，所以我们需要将所有props聚合到一起，注册一个props属性，在子组件通过唯一的props属性取值

```js
<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="index"
      v-bind:is="component.component"
      :props="component.prop"
    ></component>
  </div>
</template>
```

- 解决更改组件样式：需要手动声明一个style，然后传给子组件，子组件把style更新展示

```js
<template>
  <div>
    <component
      v-for="(component, index) in components"
      :key="index"
      v-bind:is="component.component"
      :props="component.prop"
      :style="component.style"
    ></component>
  </div>
</template>
```

- 。。。

由此可以看出，动态组件的问题，我如果想要更改子组件，都需要通过props向下传给子组件，让子组件处理对应逻辑，这样每次需要对子组件约定一套规定的写法，比如props需要聚合，style要放到props内才能使用，注册class、attr等等都需要如此操作。而这个方案需要让第二个使用者知道才能更好的工作，无疑增加了使用成本。接下来是一个动态组件的完整例子

```js
<template>
  <div>
    <component
      v-for="(component, index) in components"
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
      prop: {
        msg: '我是来自banner props'
      },
      style: {
        background: 'green'
      }
    },
    {
      name: 'tabs',
      prop: {
        msg: '我是来自tabs props'
      }
    }
  ];
  get components() {
    return this.list.map(component => {
      const c = require(`@/components/modules/${component.name}.vue`).default
      return {
        component: c,
        prop: component.prop
        style: component.style
      };
    });
  }
}
</script>
```

### 2. 使用render函数重写上面的代码

首先介绍一下render函数

- 如果想要在vue单文件中使用render函数，必须不能有temlpate模板，因为vue会检测组件内有模板就不会调用render
- render有三个参数，第一个参数是组件或者标签名，第二个参数是组件的VNode配置选项，第三个参数是一个数组，数组是子组件的集合
- 需要注意的一点是，如果第二个参数是字符串，那么第三个参数是不生效的, 如下展示h2不会生效
```js
createElement('h1', '我是一个父组件' , [
  createElement('h2', '我是一个子组件'),
  createElement('h2', '我是一个子组件'),
])
```

使用示例 usage

```js
createElement('div', { color: 'red' }, [
  createElement('h1', '我是一个子组件')
])
```

理解了render函数之后我们思考一下如何重写上面的需求，我们不需要动态注册模板，因为render已经帮我们做了这件事，props和style等传值也可以直接交给render函数就可以了。看起来我们什么都不需要做，只需要写一个render就可以实现我们上面所有的问题了。让我们拭目以待哦

这是一个完整的render示例

```js
<script>
export default {
  data() {
    return {
      list: [
        {
          name: 'banner',
          props: {
            msg: '我是来自banner props'
          },
          style: {
            background: 'red',
            marginTop: '100px'
          }
        },
        {
          name: 'tabs',
          props: {
            msg: '我是来自tabs props'
          }
        }
      ]
    };
  },
  render(h) {
    const components = this.list
      .map(component => {
        try {
          const c = require(`@/components/modules/${component.name}.vue`)
            .default;
          this.removeProp(component);
          return h(c, { ...component });
        } catch (error) {
          return console.error(error), false;
        }
      })
      .filter(_ => _);
    return h('div', {}, components);
  }
};
</script>

```

是不是很精简，render函数可以让我们的语法更接近js，我们的核心代码仅仅不到十行就可以完成了一次壮举哈哈，希望能够让大家从中得到启发，让代码使我们变得更美好。