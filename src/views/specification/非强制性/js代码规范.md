1、命名：

- 变量命名采用驼峰命名方式
- 常量使用全字母大写，单词间下划线分隔的命名方式
- 函数采用驼峰命名方式，函数名使用动宾短语
- 类使用 Pascal 命名方式、类的 方法 / 属性 使用驼峰命名方式，类名使用名词
- 枚举变量使用 Pascal 命名法，枚举的属性使用全部字母大写，单词间下划线分隔 的命名方式
- boolean 类型的变量使用 is 或 has 开头。

2、注释

- vue 文件使用 vuese 做组件注释提取，使用文档
- js 文件使用 jsdoc 注释提取，安装各自编辑器对应的插件，如 sublime 的 DocBlockr，省去手动编写，jsdoc 使用方法以及示例

3、无用的代码删除掉，需要用到的时候再通过 git 版本查找，重复的代码提取到函数中

4、增加错误处理，兼容后端返回的数据，父组件传递下来的参数做校验

不要使用魔术数字

bad

```js
if (students.length > 23) {
}
```

good

```js
const maxClassSize = 23;
if (students.length > maxClassSize) {
```

bad

```js
if (status > 1) return `do something`
if (status > 2) return `do something`
```

good

```js
const activity = {
  START: 'START',
  END: 'END'
}

if (status > activity.START) return `do something`
if (status > activity.END) return `do something`
```
