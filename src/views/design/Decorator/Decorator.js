var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 比如我们有一个 button，内部定义了 click 方法
class Button {
  click() {
    console.log('点击 dom');
  }
}
__decorate([
  BuridDecorator,
  LoginDecorator
], Button.prototype, "click", null);
// 登陆逻辑的装饰器
function LoginDecorator(target, name, descriptor) {
  const oriFun = target[name];
  descriptor.value = async function () {
    const code = await Login();
    if (code === 0) {
      console.log('登陆成功');
      oriFun.call(this, ...arguments);
    }
  };
}
// 设置埋点的装饰器
function BuridDecorator(target, name, descriptor) {
  console.log(`${name} 方法添加了一个埋点`);
}
async function Login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0);
    }, 1000);
  });
}
const btn = new Button();
btn.click();
// 添加一个埋点
// 登陆成功
// 点击 dom
