import { targetMap } from '../proxy/reactive'
// 储存effect容器
const activeReactiveEffectStack: any[] = [];
const EMPTY_OBJ: { readonly [key: string]: any } = Object.freeze({})

// 追踪器，在 get 时调用该函数，将所有 get 的 target 跟 key 以及 effect 建立起对应关系
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
// 触发器，这个就比较好理解了，拿到target key下的对应的所有 effect，
// 然后遍历执行 effect()
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

