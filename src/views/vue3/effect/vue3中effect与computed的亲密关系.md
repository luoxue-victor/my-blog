# vue3中effect与computed的亲密关系

> 在我刚看完vue3响应式的时候，心中就有一个不可磨灭的谜团，让我茶不思饭不想，总想生病。那么这个谜团是什么呢？就是在响应式中一直穿行在tranger跟track之间的effect。如果单纯的响应式原理根本就用不上effect，那么effect到底是干什么的呢？

#### 船到桥头自然直，柳岸花明又一村。苦心人天不负，偶然间我看到了effect测试代码用例！

```js
it('should observe basic properties', () => {
  let dummy
  const counter = reactive({ num: 0 })
  effect(() => (dummy = counter.num))

  expect(dummy).toBe(0)
  counter.num = 7
  expect(dummy).toBe(7)
})
```

解释一下，这段代码

- 首先声明dummy变量，然后在effect的回调中把已响应的对象counter的num属性赋值给dummy
- 然后做断言判断 dummy是否等于 0
- 将 counter.num 赋值 7 ，然后 dummy 也变成了 7 ！

这，，，让我想到了什么？？

##### 这就是computed的吗？

赶紧看下 computed 的测试用例！！

```js
const value = reactive<{ foo?: number }>({})
const cValue = computed(() => value.foo)
expect(cValue.value).toBe(undefined)
value.foo = 1
expect(cValue.value).toBe(1)
```
哈哈哈

阿哈哈哈哈

hhhhhhhhhhhhhhhhhhhh

忍不住想仰天长啸！！

> 果然跟我猜想的一样！！！我终于直到effect是个什么鬼了，顾名思义effect是副作用的意思，也就是说它是响应式副产品，每次触发了 get 时收集effect，每次set时在触发这些effects。这样就可以做一些响应式数据之外的一些事情了，比如计算属性computed。

#### 让我们用effect实现一个computed 可能会更清晰一点

我就不写一些乱七八糟的判断了，让大家能够看的更加清楚

```js
function computed (fn) {
  let value = undefined
  const runner = effect(fn, {
    // 如果lazy不置为true的话，每次创建effect的时候都会立即执行一次
    // 而我们要实现computed显然是不需要的
    lazy: true
  })
  // 为什么要使用对象的形式，是因为我们最后需要得到computed的值
  // 如果不用对象的 get 方法的话我们就需要手动再调用一次 computed() 
  return {
    get value() {
      return runner()
    }
  }
}

// 使用起来是这样的

const value = reactive({})
const cValue = computed(() => value.foo)
value.foo = 1

console.log(cValue.value) // 1
```

#### 这也太简单了吧，那么重点来了，effect怎么实现的呢？

别着急，我们先捋一下逻辑

1. 首先 如果 effect 回调内有已响应的对象被触发了 get 时，effect就应该被储存起来 
2. 然后，我们需要一个储存effect的地方，在effect函数调用的时候就应该把effect放进这个储存空间，在vue中使用的是一个数组activeReactiveEffectStack = []
3. 再后，每个target被触发的时候，都可能有多个effect，所以每个target需要有一个对应的依赖收集器 deps，等到 set 时遍历 deps 执行 effect()
4. 然而，这个依赖收集器 deps 不能放在 target 本身上，这样会使数据看起来不是很简洁，还会存在多余无用的数据，所以我们需要一个 map 集合来储存 target 跟 deps 的关系， 在vue中这个储存集合叫 targetMap 。

##### 几个概念

1. track 追踪器，在 get 时调用该函数，将所有 get 的 target 跟 key 以及 effect 建立起对应关系

```js
// 比如 const react = reactive({a: { b: 2 })
// react.a 时 target -> {a: { b: 2 } key -> a 
// targetMap 储存了 target --> Map --> key --> Set --> dep --> effect 
// 当调用 react.a.b.c.d.e 时 depsMap
// {"a" => Set(1)} --> Set --> effect
// {"b" => Set(1)}
// {"c" => Set(1)}
// {"d" => Set(1)}
// {"e" => Set(1)}
export function track(target: any, key: string) {
  const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1];
  if (effect) {
    let depsMap = targetMap.get(target);
    if (depsMap === void 0) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key!);
    if (!dep) {
      depsMap.set(key!, (dep = new Set()));
    }
    if (!dep.has(effect)) {
      dep.add(effect);
      effect.deps.push(dep);
    }
  }
}
```

2. trigger 触发器，这个就比较好理解了，拿到target key下的对应的所有 effect，然后遍历执行 effect()

```js
export function trigger(target: any, key?: string | symbol) {
  const depsMap: any = targetMap.get(target);
  const effects: any = new Set()
  if (depsMap && depsMap.get(key)) {
    depsMap.get(key).forEach((dep: any) => {
      effects.add(dep)
    });
    effects.forEach((e: any) => e())
  }
}
```

3. effect 函数实现

```js
// 暴露的 effect 函数
export function effect(
  fn: Function,
  options: any = EMPTY_OBJ
): any {
  if ((fn as any).isEffect) {
    fn = (fn as any).raw
  }
  const effect = createReactiveEffect(fn, options)
  // 如果不是 lazy，则会立即执行一次
  if (!options.lazy) {
    effect()
  }
  return effect
}

// 创建 effect
function createReactiveEffect(
  fn: Function,
  options: any
): any {
  const effect = function effect(...args: any): any {
    return run(effect as any, fn, args)
  } as any
  effect.isEffect = true
  effect.active = true
  effect.raw = fn
  effect.scheduler = options.scheduler
  effect.onTrack = options.onTrack
  effect.onTrigger = options.onTrigger
  effect.onStop = options.onStop
  effect.computed = options.computed
  effect.deps = []
  return effect
}

// 执行函数，执行完之后会将储存的 effect 删除
// 这是函数 effect 的所有执行，所经历的完整的声明周期
function run(effect: any, fn: Function, args: any[]): any {
  if (!effect.active) {
    return fn(...args)
  }
  if (activeReactiveEffectStack.indexOf(effect) === -1) {
    try {
      activeReactiveEffectStack.push(effect)
      return fn(...args)
    } finally {
      activeReactiveEffectStack.pop()
    }
  }
}
```

> 一口气写了这么多，最后总结一下。在大家看源码的时候，如果发现有哪个地方无从下手的话，可以先从测试用例开始看。因为测试用例可以很清楚的知道这个函数想要达到什么效果，然后从效果上想，为什么这么做，如果我自己写的话应该怎么写，这样一点点就能揣摩出作者的意图了。再根据源码结合自己的想法你就能够学到很多。