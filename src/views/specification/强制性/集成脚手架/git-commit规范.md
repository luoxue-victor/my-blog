## 开篇

在团队中代码提交（git commit）会有各种各样的风格，甚至有些人根本没有 commit 规范的概念，所以在我们回头去查找在哪个版本出现问题的时候，就会非常尴尬😅，很难快速定位到问题。为了项目的规范化，代码提交规范就显得尤为重要！下面是我做的代码提交规范插件 `vue-cli-plugin-commitlint`（对 conventional-changelog-angular 进行了修改/封装）。开箱即用！

## vue-cli-plugin-commitlint 介绍

`vue-cli-plugin-commitlint` 是根据 vue 插件的形式写的，可以执行 `vue add commitlint` 直接使用，如果不是 vue 的项目也可以根据下面的配置自行配置。

结合 `commitizen` `commitlint` `conventional-changelog-cli` `husky` `conventional-changelog-angular`，进行封装，一键安装，开箱即用的代码提交规范。

## 功能

1. 自动检测 commit 是否规范，不规范不允许提交
2. 自动提示 commit 填写格式。不怕忘记规范怎么写
3. 集成 git add . && git commit 不需要在执行两个命令
4. 自动生成 changelog

## 配置

1. 如果您是 vue-cli3 的项目可以直接使用即可

```bash
vue add commitlint
```

2. 如果您不是 vue-cli3 的项目

```bash
npm i vue-cli-plugin-commitlint commitizen commitlint conventional-changelog-cli husky -D
```

- 在 package.json 中添加

```json
{
  "scripts": {
    "log": "conventional-changelog --config ./node_modules/vue-cli-plugin-commitlint/lib/log -i CHANGELOG.md -s -r 0",
    "cz": "npm run log && git add . && git cz"
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/vue-cli-plugin-commitlint/lib/cz"
    }
  }
}
```

增加 commitlint.config.js 文件

```js
module.exports = {
  extends: ['./node_modules/vue-cli-plugin-commitlint/lib/lint']
};
```

## 使用

```bash
npm run cz  # git add . && git commit -m 'feat:(xxx): xxx'
npm run log # 生成 CHANGELOG
```

1. 代码提交 npm run cz

![commander](./asset/commander.png)

2. 选择一个类型会自动询问

    1. (非必填）本次提交的改变所影响的范围
    2. (必填）写一个简短的变化描述
    3. (非必填）提供更详细的变更描述
    4. (非必填)是否存在不兼容变更?
    5. (非必填)此次变更是否影响某些打开的 issue 
 
![prompt](./asset/prompt.png)

### changelog 演示

![changelog](./asset/changelog.png)

## 规则

| 规范名   | 描述                                                    |
| -------- | ------------------------------------------------------- |
| docs     | 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等 |
| chore    | 改变构建流程、或者增加依赖库、工具等                    |
| feat     | 新增 feature                                            |
| fix      | 修复 bug                                                |
| merge    | 合并分支                                                |
| perf     | 优化相关，比如提升性能、体验                            |
| refactor | 代码重构，没有加新功能或者修复 bug                      |
| revert   | 回滚到上一个版本                                        |
| style    | 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑      |
| test     | 测试用例，包括单元测试、集成测试等                      |

## 总结

目前我有好几个项目都在使用这套规范，用起来简直不要太爽！

项目地址：https://github.com/luoxue-victor/commitlint

欢迎来 pr、star

## 最后有两件小事

1. 有想入群的学习前端进阶的加我微信 `luoxue2479` 回复加群即可
2. 喜欢这篇文章的话，点个 `在看`，让更多的人看到
3. 有写错的地方和更好的建议可以在下面 `留言`，一起讨论