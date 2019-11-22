// 比如我们有一个 button，内部定义了 click 方法
class Button {
  @BuridDecorator
  @LoginDecorator
  click() {
    console.log('点击 dom')
  }
}
// 登陆逻辑的装饰器
function LoginDecorator(target, name, descriptor) {
  const oriFun = target[name]
  descriptor.value = async function() {
    const code = await Login();
    if (code === 0) {
      console.log('登陆成功')
      oriFun.call(this, ...arguments)
    }
  }
}
// 设置埋点的装饰器
function BuridDecorator(target, name, descriptor) {
  console.log(`${name} 方法添加了一个埋点`)
}
// 登陆逻辑
async function Login () {
  return new Promise((resolve, reject)=> {
    setTimeout(() => {
      resolve(0)
    }, 1000)
  })
}
// 点击按钮
const btn = new Button()
btn.click();

// click 方法添加了一个埋点
// 登陆成功
// 点击 dom