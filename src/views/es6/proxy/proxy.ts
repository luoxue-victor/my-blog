interface Dep {
  deps: any[];
  add(watcher: any): void;
}

interface Watcher {
  node: any;
  attr: string;
  data: any;
  key: string;
  update(): void;
}

const enum OperationTypes {
  SET = 'set',
  ADD = 'add',
  DELETE = 'delete',
  CLEAR = 'clear',
  GET = 'get',
  HAS = 'has',
  ITERATE = 'iterate'
}

const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object';

const rawToReactive: WeakMap<any, any> = new WeakMap();
const reactiveToRaw: WeakMap<any, any> = new WeakMap();
const targetMap: WeakMap<any, any> = new WeakMap();
const activeReactiveEffectStack: any[] = [];
const EMPTY_OBJ: { readonly [key: string]: any } = Object.freeze({})

export default {
  createApp() {
    return {
      mount(app: any, el: any) {
        let data = app.setup();
        // 获取模版节点
        const nodes: HTMLElementTagNameMap[] = document.querySelector(el)
          .children;
        // 将data设置代理并返回代理对象赋值给$data
        const $data = data;
        effect(() => {
          console.log('一些操作')
        })
        // 编译模板
        _compile(nodes, $data);
      }
    };
  },
  reactive
};

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
// reactive用来监听data
// 如有发生变动就会触发set方法，拿到最新值通知订阅者
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
      track(target, OperationTypes.GET, key);
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

  if (!targetMap.has(data)) {
    targetMap.set(data, new Map());
  }
  return observed;
}

// 编译模板
function _compile(nodes: any, $data: any) {
  [...nodes].forEach((e, index) => {
    const theNode = nodes[index];
    // 获取到 input标签下的 c-model 属性，并添加watcher
    if (theNode.tagName === 'INPUT' && theNode.hasAttribute('c-model')) {
      const key = theNode.getAttribute('c-model');
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
    // 获取 c-bind 属性，并添加watcher
    if (theNode.hasAttribute('c-bind')) {
      const key = theNode.getAttribute('c-bind');
      Dep.add(_watcher(theNode, 'innerHTML', $data, key));
    }
  });
  trigger($data);
}

function track(target: any, type: string, key: string) {
  console.log('track')
  const effect = activeReactiveEffectStack[activeReactiveEffectStack.length - 1];
  if (effect) {
    console.log(targetMap)
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

function trigger(target: any, key?: string | symbol) {
  const depsMap: any = targetMap.get(target);
  const effects: any = new Set()
  if (depsMap && key) {
    depsMap.get(key).forEach((dep: any) => {
      effects.add(dep)
    });
    effects.forEach((e: any) => e())
  }
  Dep.deps.forEach((e: Watcher) => {
    e.update();
  });
}

function effect(
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
    cleanup(effect)
    try {
      activeReactiveEffectStack.push(effect)
      return fn(...args)
    } finally {
      activeReactiveEffectStack.pop()
    }
  }
}

function cleanup(effect: any) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}
