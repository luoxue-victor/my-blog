// tsc -t esnext Observer.ts && node Observer.js
// 公众号订阅者
abstract class Persen {
  abstract update(): void;
  protected subject: Subject;
}
// 状态
type state = 'await' | 'publish';
// 依赖
class Subject {
  private _state: state = 'await';
  // 依赖集合
  subs: Persen[] = [];
  // 防止频繁设置状态
  lock = false;
  // 设置状态，如果是发布状态的话，就发布文章
  set state(state: state) {
    // 锁上之后就不能设置状态了，只有锁解开后才可以设置状态
    if (this.lock || (this._state = state) === 'await') return;
    this.lock = true;
    Promise.resolve().then(() => {
      this.notify();
      this.lock = false;
    });
  }
  // 获得当前状态
  get state(): state {
    return this._state;
  }
  // 添加订阅
  attach(persen: Persen) {
    this.subs.push(persen);
  }
  // 通知更新
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
// 创建一个 Tom
class Tom extends Persen {
  constructor(subject: Subject) {
    super();
    subject.attach(this);
  }
  update() {
    console.log('通知到了 Tom');
  }
}
// 创建一个 Jick
class Jick extends Persen {
  constructor(subject: Subject) {
    super();
    subject.attach(this);
  }
  update() {
    console.log('通知到了 Jick');
  }
}
// 实例化依赖
const subject = new Subject();

// Tom Jick 订阅公众号
new Tom(subject);
new Jick(subject);

// 因为设置了 lock 所以在一次 event loop 只会执行一次
subject.state = 'publish';
subject.state = 'await';
console.log(subject.state) // publish
subject.state = 'publish';

setTimeout(() => {
  subject.state = 'publish';
}, 1000);

// 通知到了 Tom
// 通知到了 Jick
// 一秒后...
// 通知到了 Tom
// 通知到了 Jick
