# vue3 实现 v-model 原理

> vue3 源码正式放出来了，想必大家也都开始争先恐后的学习 vue3 的知识了。由于 vue3 已经不再支持 v-model 了，而使用 .sync 来代替，但是为了这篇文章可以帮助大家快速了解 vue 的双向绑定实现原理，部分使用了 vue2.x v-model 的实现原理

proxy 的基础知识，相信大家已经都很了解了，让我们一起来回顾一下吧

##### proxy 是对一个对象的代理，并返回一个已代理的对象，已代理的对象如果发生任何 set 跟 get 的方法都可以被捕获到，我们写一个简单的 🌰

```js
const target = {
  a: 1
}
const handers = {
  get() {
    // 当对 observed.a 进行取值时会触发
  },
  set() {
    // 当对 observed.a 进行赋值时会触发
  },
  // 还有一些额外的参数如 has 等，这里用不到，就不多说了
  ....
}
const observed = new Proxy(target, handers)
```

这样我们就可以对 target 对象设置了一层代理，当我们对 target 进行取赋值操作的时候就可以接可以截获到它的行为了，但是如果你以为就只有这么简单你就错了。

我们把 target 改写成多层嵌套

```js
const target = {
  a: {
    b: 1
  }
}

...

const observed = new Proxy(target, handers)
```

##### 我们再获取 observed.a.b = 2 的时候，get 方法取到的是 a 的值 { b: 1 }, 而 set 并不会触发。这也说明了 proxy 只能代理一层对象，不能深层代理！

那么我们需要监听到嵌套的对象怎么办？

其实这个也不难，就是在 get 的时候判断一下得到的值是不是对象，如果是对象的话就 在对它代理一层，直到最后一层，全部代理完为止，这里就需要一个递归函数

```js
const target = {
  a: {
    b: 1
  }
}

function reactive(data: any) {
  const handers = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      if (isObject(res)) {
        data[key] = reactive(res);
      }
      return target[key];
    }
  }
  const observed = new Proxy(target, handers)
}
```

这样我们就可以对目标函数内部的所有属性进行深层监听了，但是这样还是不够，因为我们每次取值的时候都会设置代理这样会导致代码无限循环->死循环，所以我们需要做一层判断，如果已经设置了代理的或这已经是代理的对象就不需要在此设置代理了。又因为我们要储存对象的映射，所以需要使用map函数。下面是reactive完整的代码。

```js
const rawToReactive: WeakMap<any, any> = new WeakMap();
const reactiveToRaw: WeakMap<any, any> = new WeakMap();

function reactive(data: any) {
  // 已经有代理
  let observed = rawToReactive.get(data);
  if (observed !== void 0) {
    return observed;
  }
  // 这个数据已经是代理
  if (reactiveToRaw.has(data)) {
    return data;
  }
  const handler = {
    get: function(target: any, key: string, receiver: any) {
      const res = Reflect.get(target, key, receiver);
      if (isObject(res)) {
        data[key] = data[key] = reactive(res);
      }
      return target[key];
    },
    set: function(target: any, key: string, value: any) {
      // 将新值赋值
      target[key] = value;
      // 通知所有订阅者触发更新
      trigger(target);
      // 严格模式下需要设置返回值，否则会报错
      return value;
    }
  };
  // 返回代理监听对象
  observed = new Proxy(data, handler as any);
  rawToReactive.set(data, observed);
  reactiveToRaw.set(observed, data);

  return observed;
}
```
#### 定义watcher 用来作为 compile 跟 reactive 的桥梁， 跟 vue3 的实现可能不一样

```js
// 收集watcher依赖
const Dep: Dep = {
  deps: [],
  add(watcher: Watcher) {
    this.deps.push(watcher);
  }
};

// observer跟compile的桥梁，在编译时添加watcher，在数据更新时触发update更新视图
function _watcher(node: any, attr: string, data: any, key: string): Watcher {
  return {
    node,
    attr,
    data,
    key,
    update() {
      // 逐层取值
      const mutationKeys = this.key.split('.');
      if (mutationKeys.length > 1) {
        let d: any = null;
        mutationKeys.forEach(key => (d = this.data[key] || (d && d[key])));
        this.node[this.attr] = d;
        return;
      }
      this.node[this.attr] = this.data[this.key];
    }
  };
}
```

#### 接下来是编译模板

*这里只是模拟编译，真正的编译不是这样的*

获取到模板上的 v-model 、 v-bind 属性，获取到绑定的属性。当数据发生变化时，更新视图（这里会在trigger进行触发），当视图改变数据时修改数据（为了简单，通过eval函数实现），具体代码如下

```js
// 编译模板
function _compile(nodes: any, $data: any) {
  [...nodes].forEach((e, index) => {
    const theNode = nodes[index];
    // 获取到 input标签下的 v-model 属性，并添加watcher
    if (theNode.tagName === 'INPUT' && theNode.hasAttribute('v-model')) {
      const key = theNode.getAttribute('v-model');
      Dep.add(_watcher(theNode, 'value', $data, key));
      // 监听input事件
      theNode.addEventListener('input', () => {
        const mutationKeys = key.split('.');
        if (mutationKeys.length > 1) {
          eval(`$data.${key}='${theNode.value}'`);
          return;
        }
        $data[key] = theNode.value;
      });
    }
    // 获取 v-bind 属性，并添加watcher
    if (theNode.hasAttribute('v-bind')) {
      const key = theNode.getAttribute('v-bind');
      Dep.add(_watcher(theNode, 'innerHTML', $data, key));
    }
  });
  trigger($data);
}
```
trigger 对依赖进行触发

```js
function trigger(target: any, key?: string | symbol) {
  Dep.deps.forEach((e: Watcher) => {
    e.update();
  });
}
```

#### 使用效果

#### 废话不多说。直接上代码！

假设我们有一个模板是这样的，接下来我们在这个模板的 id="my-app" 元素内实现双向绑定

```js
<div id="my-app">
  <h1 v-bind="a"></h1>
  <input v-model="a" type="text">
</div>
```

vue3 中 new Vue 已经被 createApp 所代替，reactive 是反应原理，可以抽出来单独使用，vue3 外漏了所有内部的 api，都可以在外部使用

```js
const { createApp, reactive } = require('./vue.ts').default;
const App = {
  setup() {
    const react = reactive({
      a: {
        b: {
          c: {
            d: {
              e: 111
            }
          }
        }
      }
    });
    // 测试异步反应
    setTimeout(() => {
      react.a.b.c.d.e = 222;
    }, 100);
    return react;
  }
};
createApp().mount(App, '#my-app');
```
