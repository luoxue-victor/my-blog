```json
{
  "defaultSeverity": "warning", // 默认所有提示均为警告
  "extends": ["tslint:recommended"], // 插件使用 tslint:recommended
  "linterOptions": {
    "exclude": ["node_modules/**"] // lint 排除 node_modules
  },
  // 设置符合规则全局变量
  "globals": {
    "require": true,
    "wx": true
  },
  "rules": {
    "max-classes-per-file": [true, 5, "exclude-class-expressions"], // 每个文件最大class数量
    "quotemark": [true, "single"], // 使用单引号
    "semicolon": [true, "never"], // 不使用分号
    "indent": [true, "spaces", 2], // 两个空格缩进
    "ordered-imports": false, // imports 导入顺序
    "object-literal-sort-keys": false, // 检查对象 key 的声明顺序
    "no-consecutive-blank-lines": false, // 不允许连续出现一个或多个空行
    "only-arrow-functions": false, // 仅使用箭头函数
    "radix": false, // 当使用p arseInt() 函数时，指定第二个参数 radix
    "class-name": false, // class 大写开头
    "eofline": false, // 文件必须用新的行结束
    "no-unused-expression": false, // 禁止没有用到的表达式
    "no-console": false, // 禁止使用console
    "interface-name": false, // 接口使用大写 I 开头
    "jsdoc-format": false, // 强制执行JSDoc注释的基本格式规则。
    "switch-default": false, // 在switch语句中必须使用default
    "forin": true, //用for in 必须用if进行过滤
    "max-line-length": [true, 200], // 每行最大长度200
    "no-empty": false, // 关闭不许有空代码块
    "member-access": false, // 不强制要求 class 的成员声明，例如：private, public
    // 尾逗号
    "trailing-comma": [
      true,
      {
        "singleline": "never",
        "multiline": {
          "objects": "ignore",
          "arrays": "ignore",
          "functions": "never",
          "typeLiterals": "ignore"
        }
      }
    ],
    // 关闭不能打console
    "no-console": [
      false,
      "log",
      "error",
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ]
  }
}
```
