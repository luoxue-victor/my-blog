# async/await 源码实现

> 看到 async/await 是ea7带来的新语法糖，可以将内部的异步方法同步处理，看一下下面的例子

## async/await 应用场景

如果你有一个这样的场景，b依赖于a，c依赖于b，那么我们只能通过promise then的方式实现。这样的的可读性就会变得很差，而且不利于流程控制，比如我想在某个条件下只走到 b 就不往下执行 c 了，这种时候就变得不是很好控制！
```js
Promise.resolve(a)
  .then(b => {
    // do something
  })
  .then(c => {
    // do something
  })
  ... 
  ...
  .catch(x => {
    console.error(x)
  })
```

async/await实现上述代码，可读性跟流程控制都变的很方便，但是异常捕获只能通过try/catch来实现

```js
async () => {
  try {
    const resA = await Promise.resolve(a);
    // do something
    const resB = await Promise.resolve(b);
    // do something
  } catch(e) {
    console.log(e)
  }
}
```

## 生成器（generator）

> 在想知道 async/await 实现原理之前，我们要首先了解生成器（generator），其实async/await看起来，像极了generator（生成器），只是生成器它不能自动迭代，只能手动触发。举个🌰

```js
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen();

g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.next() // { value: 3, done: true }

```
- g.next() 返回的是一个对象 { value: 1, done: false }
- value 每调一次就会执行下一个 yield，value 就是 yield 的一个值，比如第一次就是 1，第二次就是 2
- done done 的值为 true 则说明下面已经没有可迭代项了
- yield 你可以认为是一个 return，会阻断下面代码的执行，并且会将后面的数值返回回去

## 生成器自迭代

> 我们可以试想一下，如果生成器能够自动执行所有的迭代任务的话，是否执行下次迭代由 Promise 来决定，那么我们就可以实现 async/await 了？

#### 为什么必须是 Promise？

因为 Promise 用于表示一个异步操作的最终完成 (或失败), 及其结果值。最适合用来判断上一个动作是否结束。

#### 如何实现自迭代？

思路： 

1. 通过递归调用生成器对象 next 函数，直到 done：false 结束。

```js
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
```
2. 上次 Promise 执行完成后，立即执行下一步，迭代器状态 done：true 时返回最终结果

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    // 迭代器完成，将返回值（return）保存起来
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
```

3. 使用函数

```js
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
  console.log(3);
  const b = yield Promise.resolve('b');
  const c = yield Promise.resolve('c');
  return [a, b, c];
})

asyncFunc().then(res => {
  console.log(res)
});

// 运行结果
// 1
// sleep 1s
// 2
// 3
// ["a", "b", "c"]
```

4. 与使用 async/await 对比

```js
const func = async () => {
  console.log(1)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      console.log('sleep 1s')
    }, 1000)
  })
  console.log(2)
  const a = await Promise.resolve('a')
  console.log(3)
  const b = await Promise.resolve('b')
  const c = await Promise.resolve('c')
  return [a, b, c]
}

func().then(res => {
  console.log(res)
})

// 运行结果
// 1
// sleep 1s
// 2
// 3
// ["a", "b", "c"]
```
> 可以看出，我们的代码与 async/await 的输出完全一致，最后再通过 babel等工具 做一些词法转换就可以了

#### 生成器实现

> 虽然我们已经完成了对 async/await 的实现，但是作为一个好奇猫，我们还想知道 generator 到底怎么实现的？为什么能够阻断我们代码的执行，下次调用的时候再走下一个 yield。这好像很难用 js 代码去解释！

还是使用我们刚才的🌰，我们看一下 babel 是怎么实现生成器的？

看完这段代码之后，一定会打破你的认知！原来代码还可以这样写！

```js
// 这是我们的异步生成器
var asyncFunc = _asyncToGenerator(
// regeneratorRuntime 这个对象是 迭代器的运行时，mark函数 将所有的变量保存在它作用域下
regeneratorRuntime.mark(function _callee() {
  var a, d, b, c;
  // wrap 是对下面代码片段的一个包裹函数，每执行一次迭代就会调用一次 _callee$
  // _context.next, 执行完本次迭代后将指针指到下一个迭代
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // --------- ⬇⬇ 这是第一个代码片段 ⬇⬇ -----------
          console.log(1);
          _context.next = 3;
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve();
              console.log('sleep 1s');
            }, 1000);
          });
          // --------- ⬆⬆ 这是第一个代码片段 ⬆⬆ -----------
        case 3:
          // --------- ⬇⬇ 这是第二个代码片段 ⬇⬇ -----------
          console.log(2);
          _context.next = 9;
          return Promise.resolve('a');
          // --------- ⬆⬆ 这是第二个代码片段 ⬆⬆ -----------
          // ...
          // ... 下面以此类推每一个 yield 会被放进一个 case，作为一个代码片段，
          // ... 每次执行完就return，并且将 _context.next 指向下一个
          // ... 等待下次调用
        case 9:
          d = _context.sent;
          console.log(3);
          _context.next = 13;
          return Promise.resolve('b');

        case 13:
          b = _context.sent;
          _context.next = 16;
          return Promise.resolve('c');

        case 16:
          c = _context.sent;
          return _context.abrupt("return", [a, b, c, d]);

        case 18:
        case "end":
          // 最后执行 stop 结束
          return _context.stop();
      }
    }
  }, _callee);
}));

asyncFunc().then(function (res) {
  console.log(res);
}); 
```

如此巧妙的构思，让我对代码有了新的认识。通过词法解析将代码分割成多个片段，用现有的语法实现未来的功能，实在是很巧妙。

## 体会

通过这次的源码学习，让我打破了原本的思维模式，通过源码更加了解到了 promise 的妙用，以及词法的巧妙转换，都让我感触颇深。

## 最后有两件小事

1. 有想入群的学习前端进阶的加我微信 luoxue2479 回复加群即可
2. 我的 github 地址，所有我的文章及源码都在这里，欢迎来star

> https://github.com/luoxue-victor/source-code