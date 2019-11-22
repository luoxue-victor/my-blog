// 策略模式 store
const optionMergeStrategies: { [prop: string]: any } = {};

// 给 _my_option 添加策略
optionMergeStrategies._my_option = function(value) {
  return value + 1
}

// 声明 data
const data = {
  // 添加策略
  _my_option: 1,
  // 未添加策略
  option: 1
};

// 响应式
function reactive (data) {
  const hander = {
    get(target, key, value) {
      const v = Reflect.get(target, key, value);
      // 此属性存在策略
      if (typeof optionMergeStrategies[key] === 'function') {
        return optionMergeStrategies[key](v)
      }
      return v
    }
  };
  return new Proxy(data, hander);
}

const proxy = reactive(data);
// 测试是否添加了响应
proxy._my_option = 10
proxy.option = 10

console.log(proxy._my_option, proxy.option); // 11 10
