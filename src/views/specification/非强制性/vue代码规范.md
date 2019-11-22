内容节选自 [Vue 官方风格指南](https://cn.vuejs.org/v2/style-guide/)

1. 单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。协商统一（建议以 kebab-case 为标准）

```js
// badmycomponent.vue
myComponent.vue;

// good
my - component.vue;
MyComponent.vue;
```

2. 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

```js
// badcomponents/
- TodoList.vue
- TodoItem.vue
└─ TodoButton.vue

// good
components/
- TodoList.vue
- TodoListItem.vue
└─ TodoListItemButton.vue
```

3. 在单文件组件中没有内容的组件应该是自闭合的

<!-- bad --><my-component></my-component>

<!-- good -->
<my-component />
4、	在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板中应该始终使用 kebab-case。

```js
// badexport default {
  props: {
    'greeting-text': String
  }
};

// good
export default {
  props: {
    greetingText: String
  }
}

<!-- bad --><welcome-message greetingText="hi" />

<!-- good -->
<welcome-message greeting-text="hi" />
```

5. 指令缩写

```html
<!-- bad --><input v-bind:value="value" v-on:input="onInput" />

<!-- good -->

<input :value="value" @input="onInput"
```

> 6、 标签的 Props 应该有统一的顺序，依次为指令、属性和事件

```html
<my-component
  v-if="if"
  v-show="show"
  v-model="value"
  ref="ref"
  :key="key"
  :text="text"
  @input="onInput"
  @change="onChange"
/>
```

7、 组件选项应该有统一的顺序。

```js
export default {
  name: "",

  mixins: [],

  components: {},

  props: {},

  data() {},

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
};
```

8. 组件选项较多时，建议在属性之间添加空行。

```js
export default {
  computed: {
    formattedValue() {
      // ...
    },

    styles() {
      // ...
    }
  },

  methods: {
    onInput() {
      // ...
    },

    onChange() {
      // ...
    }
  }
};
```

9. 父组件负责拉接口，子组件负责展示页面，保持数据的单向流动
10. 组件表达式简单化，当行内表达式较复杂时，导致难以阅读，且不够通用导致重复编码的问题。

```html
<!-- 推荐 --><template>
  <h1>
    {{ `${year}-${month}` }}
  </h1>
</template>
<script type="text/javascript">
  export default {
    computed: {
      month() {
        return this.twoDigits(new Date().getUTCMonth() + 1);
      },
      year() {
        return new Date().getUTCFullYear();
      }
    },
    methods: {
      twoDigits(num) {
        return ("0" + num).slice(-2);
      }
    }
  };
</script>

<!-- 避免 -->
<template>
  <h1>
    {{ `${(new Date()).getUTCFullYear()}-${('0' + ((new
    Date()).getUTCMonth()+1)).slice(-2)}` }}
  </h1>
</template>
```

11. 组件 props 原子化，尽可能使用简单数据类型的数据参数，使得组件 API 清晰，便于开发者理解每一个 props 的含义，传递复杂数据类型不能够清楚知道哪些属性或方法被自定义组件使用，难以重构和维护。

```html
<!-- 推荐 --><range-slider
  :values="[10, 20]"
  min="0"
  max="100"
  step="5"
  :on-slide="updateInputs"
  :on-end="updateResults"
>
</range-slider>

<!-- 避免 -->

<range-slider :config="complexConfigObject"></range-slider>
```

12. 验证组件的 props，组件的 props 即 API，验证组件 props 可以保证组件永远是可用的（防御性编程）。即使其他开发者并未按照组件设计者的预想方法使用也不会出错

```html
<template>
  <input type="range" v-model="value" :max="max" :min="min" />
</template>

<script type="text/javascript">
  export default {
    props: {
      max: {
        type: Number, // 这里添加了数字类型的校验
        default() {
          return 10;
        }
      },
      min: {
        type: Number,
        default() {
          return 0;
        }
      },
      value: {
        type: Number,
        default() {
          return 4;
        }
      }
    }
  };
</script>
```

13. 谨慎使用 this.$parent与this.$refs，vue 支持组件嵌套，并且子组件可访问父组件的上下文。访问组件之外的上下文违背了“基于组件&&模块开发”的第一原则。

- 提供良好的组件 API
- 拒绝定制代码。如果在一个通用的组件内部编写特定需求的代码，那么代表这个组件的 API 不够通用，此时很可能需要重复开发一个组件来应对不同的需求
- props 向下传递，事件向上传递
- 数据驱动开发模式下，当一些特别情况需要操作 DOM 时，可以使用 this.\$refs，而不是通过 document.getElementById 等方法

14. 关于 vuex 的使用

- vuex 是解决组件之间通信的终极解决方案，考虑使用它并不是“该不该”，而是“想不想”
- 若只是父子组件间共享的数据，完全可以通过 props 及自定义事件来实现
- 除了非父子数据传递（兄弟、祖孙、任意组件间等）外，Vuex 还有一个重要价值是：将分散于多个组件的状态操作统一到一个节点中。这意味着，当 你需要对某个状态做进一步的、无关组件具体行为的处理时，你只需要对接 Vuex Store 就可以了。
- 使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。
