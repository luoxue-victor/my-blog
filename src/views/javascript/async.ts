// 执行迭代步骤
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    // 迭代器完成
    resolve(value);
  } else {
    // -- 这行代码就是精髓 --
    // 将所有值promise化
    // 比如 yield 1
    // const a = Promise.resolve(1) a 是一个 promise
    // const b = Promise.resolve(a) b 是一个 promise
    // 可以做到统一 promise 输出
    // 当 promise 执行完之后再执行下一步
    // 递归调用 next 函数，直到 done == true
    Promise.resolve(value).then(_next, _throw);
  }
}
// 异步迭代
function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    // 将返回值promise化
    return new Promise(function(resolve, reject) {
      // 获取迭代器实例
      var gen = fn.apply(self, args);
      // 执行下一步
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      // 抛出异常
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      // 第一次触发
      _next(undefined);
    });
  };
}

const asyncFunc = _asyncToGenerator(function* () {
  console.log(1);
  yield new Promise(resolve => {
    setTimeout(() => {
      resolve();
      console.log('sleep 1s');
    }, 1000);
  });
  console.log(2);
  const a = yield Promise.resolve('a');
  const d = yield 'd';
  console.log(3);
  const b = yield Promise.resolve('b');
  const c = yield Promise.resolve('c');
  return [a, b, c, d];
})

asyncFunc().then(res => {
  console.log(res)
});

// const func = async () => {
//   console.log(1)
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//       console.log('sleep 1s')
//     }, 1000)
//   })
//   console.log(2)
//   const a = await Promise.resolve('a')
//   console.log(3)
//   const b = await Promise.resolve('b')
//   const c = await Promise.resolve('c')
//   return [a, b, c]
// }

// func().then(res => {
//   console.log(res)
// })