import { targetMap } from '../proxy/reactive'
const activeReactiveEffectStack: any[] = [];
const EMPTY_OBJ: { readonly [key: string]: any } = Object.freeze({})

export function track(target: any, type: string, key: string) {
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

export function trigger(target: any, key?: string | symbol) {
  const depsMap: any = targetMap.get(target);
  const effects: any = new Set()
  if (depsMap && key) {
    depsMap.get(key).forEach((dep: any) => {
      effects.add(dep)
    });
    effects.forEach((e: any) => e())
  }
}

export function effect(
  fn: Function,
  options: any = EMPTY_OBJ
): any {
  if ((fn as any).isEffect) {
    fn = (fn as any).raw
  }
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}

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

