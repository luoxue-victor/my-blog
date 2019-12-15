# webpack5 + webpack-chain 构建一个大型应用系列 2（附 vscode 跟 prettier 配置）

继上一篇 [一步步从零开始用 webpack 搭建一个大型项目](https://juejin.im/post/5de06aa851882572d672c1ad) 之后的第二篇。本文使用了 `webpack5` 将项目进行了重构，并全程使用的 `webpack-chain` 来配置 `webpack`，每个功能也都是独立文件，可单独使用。因此该项目的配置可以在任何项目中被使用。此项目可实战亦可当成 `webpack` 手册来学习。我开发这个项目的目的就是无论你是新手还是有经验的大佬都可以从中有所收获。此项目为想学 `webpack` 的同学提供了最好的实战平台，每一个 `插件` 每一个 `loader` 都会有详细的讲解及使用背景。

现在是一个信息爆炸的时代，只要你想学就会有无数的文章可以被搜索到，但是我们也会被这些大量的信息所迷惑，它们可能浅显、可能片面、可能非你所找、也可能是错误的，我们需要做的是`判断`、`选择` 和 `整理`，这些都需要我们有足够的辨识能力，跟精力去辨别它们。为了节省大家时间，提升学习效率，我想要将所有 `webpack` 相关的系列都集成在这里，这里的每一个优化都是经过我反复推敲实践而来，也会吸取一些优秀的开源库来完善它，此项目将长期维护，也诚挚欢迎所有人参与到该项目的当中，一起成为该项目的共建者！

项目地址：https://github.com/luoxue-victor/webpack-box

因为本文是使用 `webpack5` 进行了重构，那我就先将第 14 课时放在前面讲了

本文目录

- <a href="#home2_1">课时 14：升级 webpack5</a>
- <a href="#home2_2">课题 10：添加 eslint 并开启自动修复</a>
- <a href="#home2_3">课题 11：添加 stylelint 并开启自动修复</a>
- <a href="#home2_4">课题 12：添加 tslint 并开启自动修复</a>
- <a href="#home2_5">课题 13：配置别名</a>
- <a href="#home2_6">课时 15：定义通用变量</a>
- <a href="#home2_7">课时 16：严格区分路径大小写</a>
- <a href="#home2_8">课时 17：加载资源 images、svg、media、fonts</a>
- <a href="#home2_9">课时 18：设置全局样式</a>
- <a href="#home2_10">vscode 配置</a>
- <a href="#home2_11">prettier 配置</a>

接下来计划去做的 TODO https://github.com/luoxue-victor/webpack-box/issues

## <a name="home2_1">课时 14：升级 webpack5</a>

本章主要将项目升级到 webpack5，先踩一下坑。把踩坑的经过给大家分享一下。

webpack5 更像是一个黑盒了，好多之前必须要用插件来完成的工作，现在 webpack5 内部已经被集成了，开箱即用。webpack5 主要为了优化编译速度、更多的默认配置（内置了更多的配置）、更好的代码生成、为将来 webpack 走的更远做铺垫。

本章概要

- <a href="#14_1">webpack5 做了哪些事情？</a>
- <a href="#14_2">升级 webpack5</a>
- <a href="#14_3">编译速度对比</a>
- <a href="#14_4">webpack4 到 webpack5 的变化</a>

### <a name="14_1">webpack5 做了哪些事情？</a>

- 使用长期缓存提升编译速度
- 使用更好的算法和默认值来改善长期缓存
- 通过更好的 Tree Shaking 和 Code Generation 来改善 bundle 大小
- 重构内部结构，在不引入任何重大更改的情况下实现 v4 的功能
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5

### <a name="14_2">升级 webpack5</a>

本教程可以通过脚手架命令一键升级/降级

```bash
webpack-box upgrade 5/4
```

主要升级了两个插件，其他使用到的模块都已经被兼容，`html-webpack-plugin` 插件因为涉及到热更新，目前热更新的 bug 还没有修复，所以大家切换到 `webpack5` 之后的第一次编译可以成功，但是保存后的再次编译会报错（这点我会持续关注，一旦修理立即更新版本）

package.json

```json
{
  "html-webpack-plugin": "^4.0.0-beta.11",
  "webpack": "^5.0.0-beta.9"
}
```

### <a name="14_3">编译速度对比</a>

```bash
webpack-box build index
```

Version: webpack `4.41.2`

以下是使用了 `cache-loader`

- 第一次 `4216ms`
- 第二次 `2781ms`
- 第三次 `2827ms`
- 第四次 `2797ms`

Version: webpack `5.0.0-beta.9`

使用了 `持久缓存`

- 第一次 `3567ms`
- 第二次 `2602ms`
- 第三次 `2609ms`
- 第四次 `2582ms`

可以看出来 `webpack5` 使用持久缓存的情况下比 `webpack4` 使用 cache-loader 的编译速度快了 `100ms ～ 200ms`，所以以后就没有必要使用 cache-loader，webpack5 提供了更好的算法跟更优秀的缓存方案

### <a name="14_4">webpack4 到 webpack5 的变化</a>

#### 1. cache-loader 不再需要

使用持久性缓存时，您不再需要缓存加载器。与 babel cacheDirectory 相同。

#### 2. html-webpack-plugin 问题

一些错误并修复 `error`

1. Cannot add property htmlWebpackPluginAlterChunks, object is not extensible

安装 4.x 版本可修复

```bash
npm i html-webpack-plugin@4.0.0-beta.11
```

2. Cannot read property 'get' of undefined

`未修复` 第一次编译生效，保存之后会报错，`webpack5` 对热更新进行了重写，导致 `html-webpack-plugin` 不兼容，[原因可查](https://github.com/jantimon/html-webpack-plugin/issues/1129)

#### 3. 动态加载的文件终于有名字了，不再是 id，而是改为项目路径的拼接

可以使用 optimization.chunkIds 进行修改

[点击看文档](https://webpack.js.org/configuration/optimization/#optimizationchunkids)

```js
module.exports = {
  //...
  optimization: {
    chunkIds: "named"
  }
};

// 链式修改
config.optimization.set("chunkIds", "natural");
```

![](./asset/14/import5.jpg)

#### 嵌套 tree-shaking

如下，在 webpack4 中 a、b 都会被打包进 bundle 中，webpack5 会对嵌套的无用代码也会删除掉，也就是说 b 并不会被打包进 bundle 中了，因为 b 并没有被使用到

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from "./inner";
export { inner };

// user.js
import * as module from "./module";
console.log(module.inner.a);
```

#### 内部模块 tree-shaking

webpack5 会检查都模块内部的方法是否被使用，如果没有被使用的话，那么会把模块内部调用的方法也会被删除

但是前提是你要知道这些代码是无副作用的，不然很有可能将你的代码删掉，比如你要写一个组件，而你库里并没有使用它，那么就有可能在打包的时候被 tree-shaking 了

使用它您需要在 `package.json` 中配置 `"sideEffects": false`，并且设置 `optimization.usedExports` 为 true

```js
// package.json
{
  "sideEffects": false
}

// config/optimization.js
config.optimization.usedExports(true);
```

`代码演示`

```js
import { something } from "./something";

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

如果外部模块没有使用 test 方法的话，那么 usingSomething、something 也会在 bundle 中被删除

#### 改进代码生成

告诉 webpack webpack 生成代码的最大 EcmaScript 版本

`webpack4` 仅能支持到 ES5，`webpack5` 支持 ES5 跟 ES6

`ecmaVersion` 的取值范围 5 ~ 11 或 2009 ~ 2020，webpack5 默认采用最小值 5

```js
config.output.set("ecmaVersion", 6);
```

#### SplitChunks and Module Sizes

webpack5 可以根据不同类型的文件分别设置 splitChunks 打包的尺寸，默认情况下只针对 javascript 进行分离打包

```js
config.optimization.splitChunks({
  minSize: {
    javascript: 30000,
    style: 50000
  }
});
```

#### 持久缓存

webpack5 提供了两种缓存方式，一种是持久缓存将文件缓存在文件系统，另一种是缓存在内存里

```js
// type {filesystem | memory}
config.cache({
  type: "filesystem"
});
```

默认情况下，会被缓存在 `node_modules/.cache/webpack` 下，您可以通过 `cacheDirectory` 选项修改缓存目录

#### 其他

[webpack5 具体调整内容点这里](https://github.com/webpack/changelog-v5/blob/master/README.md)

## <a name="home2_2">课题 10：添加 eslint 并开启自动修复</a>

本章概要

- <a href="#10_1">抽离 cwd 层，职能单一化</a>
- <a href="#10_2">配置 eslint-loader</a>
- <a href="#10_3">eslint 自动修复功能</a>
- <a href="#10_4">添加脚手架命令</a>
- <a href="#10_5">使用编译器自动修复</a>
- <a href="#10_6">代码提交检查（lint-staged）</a>

### <a name="10_1">抽离 cwd 层，职能单一化</a>

目的：让职能更加清晰，每一层只做一件事情，使用标准化的 api 去处理同类逻辑

- PluginAPI 处理脚手架插件逻辑
- CommandAPI 处理脚手架命令行逻辑
- cwd 抽离 command 层

```bash
└── api
   │── CommandAPI.js
   └── PluginAPI.js
└── cwd
   │── build:ssr.js
   │── build.js
   │── dev.js
   │── dll.js
   │── lint.js
   └── ssr:server.js
```

### <a name="10_2">配置 eslint-loader</a>

配置 eslint-loader，在 webpack-box dev 时会检测 eslint 规则，如果有报错会显示在控制台上

```js
config.module
  .rule("eslint")
  .pre()
  .exclude.add(/node_modules/)
  .end()
  .test(/\.(vue|(j)sx?)$/)
  .use("eslint-loader")
  .loader(require.resolve("eslint-loader"))
  .options({
    extensions,
    cache: true,
    cacheIdentifier,
    emitWarning: allWarnings,
    emitError: allErrors,
    eslintPath: path.dirname(
      resolveModule("eslint/package.json", cwd) ||
        resolveModule("eslint/package.json", __dirname)
    ),
    formatter: loadModule("eslint/lib/formatters/codeframe", cwd, true)
  });
```

### <a name="10_3">eslint 自动修复功能</a>

当我们项目改变某一个规则时，我们项目中都会出现大量的错误，我们肯定不希望手动一个个去修改，所以我们需要使用 eslint 的自动修复的功能，它能够帮助我们修复绝大数的错误，还有一些修复不了的我们再手动修复就可以了

这里写出了部分代码，更多细节可以在项目里面看

packages/eslint/lint.js

```js
const { CLIEngine } = loadModule("eslint", cwd, true) || require("eslint");
const config = Object.assign({
  extensions,
  fix: true,
  cwd
});
const engine = new CLIEngine(config);
const defaultFilesToLint = ["src", "tests", "*.js", ".*.js"].filter(pattern =>
  globby
    .sync(pattern, { cwd, absolute: true })
    .some(p => !engine.isPathIgnored(p))
);

const files = args._ && args._.length ? args._ : defaultFilesToLint;
const report = engine.executeOnFiles(files);
if (config.fix) {
  CLIEngine.outputFixes(report);
}
```

### <a name="10_4">添加脚手架命令</a>

我们希望通过命令行的形式去修复，`webpack-box lint eslint`，所以需要在 `cwd` 层添加命令行

cwd/lint.js

```js
module.exports = function(injectCommand, api) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command("lint [type]")
      .description("修复lint")
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd);
        const args = Object.assign(options, { name }, boxConfig);
        require("../build/lint")(args, api);
      });
  });
};
```

这样我们可以使用 `webpack-box lint eslint` 去修复大部分的错误了，去试一下吧～

### <a name="10_5">使用编译器自动修复</a>

当然我们执行 `webpack-box lint eslint` 命令时可以去修复一些错误，但是当我们写代码时希望编译器能够帮助我们自动修改，而不是等到代码写完了才去校验，这样会给我们带来二次麻烦，甚至会出现修复不了的问题。

所以我们使用 `vscode` 的 `eslint` 插件来帮助我们实现吧

首先您必须使用的编译器是 vscode，当然其它的编译器也可以，但是我们这里只讲 vscode 的配置。

您安装了 eslint 插件后，需要在设置中设置 `"eslint.autoFixOnSave": true`，这样就可以在保存时自动修复 `eslint` 的错误了

当然您可能只在这个项目中使用了 `eslint`，而在其他项目中并不需要保存时修复

可以在根目录添加

```js
└── .vscode
   └── settings.json
```

放一份我自己的配置供大家参考

```json
{
  /*
   * @description 编译器配置
   * @param tabSize 默认tab为两个空格
   * @param formatOnSave 保存时自动修复
   */
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  /*
   * @description eslint 配置
   * @param alwaysShowStatus 配置
   * @param autoFixOnSave 保存时自动修复
   * @param validate 在vue中添加错误提示
   */
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  /*
   * @description tslint 配置
   * @param autoFixOnSave 保存时自动修复
   * @param alwaysShowRuleFailuresAsWarnings 所有特征都是用 Warnings
   */
  "tslint.autoFixOnSave": true,
  "tslint.alwaysShowRuleFailuresAsWarnings": true,
  /*
   * @description stylelint 配置
   * @param autoFixOnSave 保存时自动修复
   */
  "stylelint.autoFixOnSave": true,
  /*
   * @description vetur 配置
   */
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false,
      "singleQuote": true
    }
  },
  /*
   * @description 配置编辑器设置以覆盖某种语言
   */
  "[typescript]": {
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
    "editor.defaultFormatter": "eg2.tslint"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "eg2.tslint"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### <a name="10_6">代码提交检查（lint-staged）</a>

上述的操作都是我们理想状态下的检测跟修复，但是有时还会遇到意外的情况，并没有 lint 代码就提交了，这样会导致可能出现问题，所以我们需要在提交代码前进行一次代码检验

在 package.json 中添加 lint-staged，在代码提交时会先执行 lint，lint 通过之后才能提交成功

package.json

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": ["webpack-box lint eslint", "git add"]
  }
}
```

## <a name="home2_3">课题 11：添加 stylelint 并开启自动修复</a>

本章概要

- <a href="#11_1">配置 stylelint standard 插件</a>
- <a href="#11_2">配置 stylelint 插件</a>
- <a href="#11_3">自动修复</a>
- <a href="#11_4">代码提交检查</a>

### <a name="11_1">配置 stylelint standard 插件</a>

使用 stylelint-config-standard 插件

.stylelintrc.js

```js
module.exports = {
  root: true,
  extends: "stylelint-config-standard"
};
```

### <a name="11_2">配置 stylelint 插件</a>

```js
module.exports = ({
  config,
  options: { stylelint: { lintOnSave = false, extensions } = {} },
  api
}) => {
  const StyleLintPlugin = require("stylelint-webpack-plugin");
  const CodeframeFormatter = require("stylelint-codeframe-formatter");
  const stylelint = [];
  return () => {
    config.plugin("stylelint").use(StyleLintPlugin, [
      Object.assign(
        {
          failOnError: lintOnSave === "error",
          files: ["src/**/*.{vue,htm,html,css,sss,less,scss}"],
          formatter: CodeframeFormatter
        },
        stylelint
      )
    ]);
  };
};
```

### <a name="11_3">自动修复</a>

```js
module.exports = async function lint({ api, args = {}, pluginOptions = {} }) {
  const cwd = api.resolve(".");

  const files =
    args._ && args._.length
      ? args._
      : [cwd + "/src/**/*.{vue,htm,html,css,sss,less,scss}"];
  if (args["no-fix"]) {
    args.fix = false;
    delete args["no-fix"];
  }

  const { formatter } = args;
  if (
    formatter &&
    typeof formatter === "string" &&
    !["json", "string", "verbose"].includes(formatter)
  ) {
    try {
      args.formatter = require(formatter);
    } catch (e) {
      delete args.formatter;
      if (typeof pluginOptions.formatter !== "function") {
        console.log(
          format(
            chalk`{bgYellow.black  WARN }`,
            chalk`${e.toString()}\n{yellow Invalid formatter}`
          )
        );
      }
    }
  }

  const options = Object.assign(
    {},
    {
      configBasedir: cwd,
      fix: true,
      files,
      formatter: CodeframeFormatter
    },
    pluginOptions,
    normalizeConfig(args)
  );

  try {
    const { errored, results, output: formattedOutput } = await stylelint.lint(
      options
    );
    if (!errored) {
      if (!args.silent) {
        const hasWarnings = results.some(result => {
          if (result.ignored) {
            return null;
          }
          return result.warnings.some(
            warning => warning.severity === "warning"
          );
        });
        if (hasWarnings) {
          console.log(formattedOutput);
        } else {
          console.log(
            format(
              chalk`{bgGreen.black  DONE }`,
              `stylelint 没有发现错误!${
                options.fix ? chalk` {blue (已经自动修复)}` : ""
              }`
            )
          );
        }
      }
    } else {
      console.log(formattedOutput);
      process.exit(1);
    }
  } catch (err) {
    console.log(
      format(chalk`{bgRed.black  ERROR }`, err.stack.slice(" Error:".length))
    );
    process.exit(1);
  }
};
```

### <a name="11_4">代码提交检查</a>

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{vue,htm,html,css,sss,less,scss}": [
      "webpack-box lint stylelint",
      "git add"
    ],
    "*.{js,jsx}": ["webpack-box lint eslint", "git add"]
  }
}
```

## <a name="home2_4">课题 12：添加 tslint 并开启自动修复</a>

本章概要

- <a href="#12_1">配置插件</a>
- <a href="#12_2">添加规则</a>
- <a href="#12_3">自动修复功能</a>
- <a href="#12_4">提交检查</a>

### <a name="12_1">配置插件</a>

config/tslintPlugin.js

```js
module.exports = ({
  config,
  options: { tslint: { lintOnSave = false, useThreads = false } = {} },
  api
}) => {
  const fs = require("fs");
  return () => {
    config.plugin("fork-ts-checker").tap(([options]) => {
      options.tslint =
        lintOnSave !== false && fs.existsSync(api.resolve("tslint.json"));
      options.formatter = "codeframe";
      options.checkSyntacticErrors = useThreads;
      return [options];
    });
  };
};
```

### <a name="12_2">添加规则</a>

tslint.json

```json
{
  "defaultSeverity": "warning",
  "extends": ["tslint:recommended"],
  "linterOptions": {
    "exclude": ["node_modules/**"]
  },
  "rules": {
    "max-classes-per-file": [true, 5, "exclude-class-expressions"],
    "quotemark": [true, "single"],
    "semicolon": [true, "never"],
    "indent": [true, "spaces", 2],
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "no-consecutive-blank-lines": false,
    "disable-next-line": false,
    "only-arrow-functions": false,
    "radix": false,
    "class-name": false,
    "eofline": false,
    "no-unused-expression": false,
    "no-console": false,
    "trailing-comma": false,
    "interface-name": false
  }
}
```

### <a name="12_3">自动修复功能</a>

```js
const { done } = require("@vue/cli-shared-utils");

module.exports = function lint({ args = {}, api, silent }) {
  const options = {
    fix: args.fix !== false,
    formatter: args.format || "codeFrame",
    formattersDirectory: args["formatters-dir"],
    rulesDirectory: args["rules-dir"]
  };

  const program = tslint.Linter.createProgram(api.resolve("tsconfig.json"));
  const linter = new tslint.Linter(options, program);

  const updateProgram = linter.updateProgram;
  linter.updateProgram = function(...args) {
    updateProgram.call(this, ...args);
    patchProgram(this.program);
  };

  const tslintConfigPath = tslint.Configuration.CONFIG_FILENAMES.map(filename =>
    api.resolve(filename)
  ).find(file => fs.existsSync(file));

  const config = tslint.Configuration.findConfiguration(tslintConfigPath)
    .results;

  const lint = file => {
    const filePath = api.resolve(file);
    const isVue = isVueFile(file);
    patchWriteFile();
    linter.lint(filePath, "", isVue ? vueConfig : config);
    restoreWriteFile();
  };

  const files =
    args._ && args._.length
      ? args._
      : [cwd + "/src/**/*.ts", cwd + "/src/**/*.vue", cwd + "/src/**/*.tsx"];

  return globby(files, { cwd }).then(files => {
    files.forEach(lint);
    if (silent) return;
    const result = linter.getResult();
    if (result.output.trim()) {
      process.stdout.write(result.output);
    } else if (result.fixes.length) {
      const f = new tslint.Formatters.ProseFormatter();
      process.stdout.write(f.format(result.failures, result.fixes));
    } else if (!result.failures.length) {
      done("tslint 没有发现错误.\n");
    }

    if (result.failures.length && !args.force) {
      process.exitCode = 1;
    }
  });
};
```

### <a name="12_4">提交检查</a>

```json
{
  "lint-staged": {
    "*.{vue,htm,html,css,sss,less,scss}": [
      "webpack-box lint stylelint",
      "git add"
    ],
    "*.{ts,tsx}": ["webpack-box lint tslint", "git add"],
    "*.{js,jsx}": ["webpack-box lint eslint", "git add"]
  }
}
```

## <a name="home2_5">课题 13：配置别名</a>

在我们工作中，如果一个文件需要被 copy 到另外一个目录下，那么这个文件的引用依赖就可能发生路径错误。还有我们不喜欢每次引入依赖都要逐层去查找，我们希望能够有一个别名来指定某一个目录，无论我们在哪里使用它。

本章概要

- <a href="#13_1">在项目中使用别名</a>
- <a href="#13_2">配置别名</a>
- <a href="#13_3">webpack 实现</a>
- <a href="#13_4">编译器跳转配置</a>

### <a name="13_1">在项目中使用别名</a>

src/main.js

```js
import { cube } from "./treeShaking";
import { cube } from "@/treeShaking";
import { cube } from "@src/treeShaking";
```

### <a name="13_2">配置别名</a>

```js
alias: {
  '@': resolve('src'),
  '@src': resolve('src')
}
```

### <a name="13_3">webpack 实现</a>

```js
module.exports = ({ config, options, resolve }) => {
  const fs = require("fs");
  const conf = options.alias;
  return () => {
    // 生成默认别名
    const dirs = fs.readdirSync(resolve("src"));
    let aliasConfig = config.resolve.extensions
      .merge([".mjs", ".js", ".jsx", ".vue", ".ts", ".json", ".wasm"])
      .end().alias;
    dirs.forEach(v => {
      const stat = fs.statSync(resolve(`src/${v}`));
      if (stat.isDirectory()) {
        aliasConfig = aliasConfig.set(`@${v}`, resolve(`src/${v}`));
      }
    });

    // 用户配置别名
    if (conf.alias) {
      const keys = Object.keys(conf.alias);
      keys.forEach(key => {
        aliasConfig = aliasConfig.set(key, conf.alias[key]);
      });
    }

    // 自定义设置别名
    aliasConfig.set("@", resolve("src")).set("@src", resolve("src"));
  };
};
```

### <a name="13_4">编译器跳转配置</a>

如果您使用的是 ts 的话，那么配置别名了之后会失去类型，提示找不到模块，所以我们需要在编译器配置对应的别名才可以

tsconfig.json/jsconfig.json

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": {
      "@src/*": [
        "src/*"
      ],
      "@/*": [
        "src/*"
      ],
    }
  }
}
```

## <a name="home2_6">课时 15：定义通用变量</a>

有时我们需要在脚手架跟业务代码之间有一个通信的桥梁

比如我们 `npm run build` 时我们是运行的生产环境，我想在 `main.js` 中生产环境下做一些特殊的逻辑。但是 `main.js` 执行是在浏览器端，而 `npm run build` 时运行在 `node` 端，两端没有办法做通讯。那么我们怎么办呢？

`webpack` 给我们提供了一个插件 `EnvironmentPlugin`，这个插件可以将我们在 `node` 端定义的变量，在编译时将值编译到代码中，举个例子

我们在 `main.js` 中写了一段 `node` 中看起来很常见的代码，但是这在浏览器中是不能识别的，因为浏览器中并没有 `process` 对象，这段代码不出意外会报错

main.js

```js
if (process.env.NODE_ENV === "production") {
  console.log("Welcome to production");
}
```

我们配置 `webpack.EnvironmentPlugin` 插件

```js
const webpack = require("webpack");

module.exports = ({ config, resolve, options }) => {
  return () => {
    const resolveClientEnv = require("../util/resolveClientEnv");
    config
      .plugin("process-env")
      .use(webpack.EnvironmentPlugin, [resolveClientEnv(options)]);
  };
};
```

util/resolveClientEnv.js

```js
module.exports = function resolveClientEnv(options, raw) {
  const env = {};
  if (process.env) {
    Object.keys(process.env).forEach(key => {
      if (key === "NODE_ENV") {
        env[key] = process.env[key];
      }
    });
  }
  if (options.env) {
    Object.assign(env, options.env);
  }
  return env;
};
```

我们执行 `npm run build`，看一下 `dist/index.bundle.js` 会编译成什么

```js
// "production" === "production"
if (true) {
  console.log("Welcome to production");
}
```

`webpack` 将 `process.env.NODE_ENV` 的值编译在 `bundle` 中，这样我们就可以在 `web` 端运行了，而且编译出来是在生产环境下

## <a name="home2_7">课时 16：严格区分路径大小写</a>

有时我们经常会出现这样的情况，明明本地编译没有问题，但是上线 jenkins 编译的时候就会报错，这种问题往往会花费我们较长的时间才能发现这个 bug，原来是本地路径的大小写出现了问题，引用路径时我们本地是不区分大小写的。举个例子

```
└──── src
   │── Index.js
   └── main.js
```

上面的路径中 Index.js 的首字母是大写，但是我在 main.js 用小写去引用它

main.js

```js
import Index from "./index.js";
```

这样在本地是不会报错的，但是当你用 Jenkins 上线的时候，就会报错找不到 ./index.js 模块

所以我们需要一个插件，在我们开发时就严格检查大小写，这样就不会出现这样的问题了。

我们使用 `case-sensitive-paths-webpack-plugin` 插件来实现它

```js
module.exports = ({ config, webpackVersion, resolve, options }) => {
  return () => {
    // webpack 5 不兼容
    if (parseInt(webpackVersion) >= 5) return;
    config
      .plugin("case-sensitive-paths")
      .use(require("case-sensitive-paths-webpack-plugin"));
  };
};
```

## <a name="home2_8">课时 17：加载资源 images、svg、media、fonts</a>

这章就直接上代码吧，是之前基础篇的补充

```js
module.exports = ({ config, webpackVersion, resolve, options }) => {
  return () => {
    const getAssetPath = require("../util/getAssetPath");
    const inlineLimit = 4096;

    const genAssetSubPath = dir => {
      return getAssetPath(
        options,
        `${dir}/[name]${options.filenameHashing ? ".[hash:8]" : ""}.[ext]`
      );
    };

    const genUrlLoaderOptions = dir => {
      return {
        limit: inlineLimit,
        fallback: {
          loader: "file-loader",
          options: {
            name: genAssetSubPath(dir)
          }
        }
      };
    };

    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .options(genUrlLoaderOptions("img"));

    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("file-loader")
      .loader(require.resolve("file-loader"))
      .options({
        name: genAssetSubPath("img")
      });

    config.module
      .rule("media")
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .options(genUrlLoaderOptions("media"));

    config.module
      .rule("fonts")
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .options(genUrlLoaderOptions("fonts"));
  };
};
```

## <a name="home2_9">课时 18：设置全局样式</a>

在书写 css 时，我们会将常用到的函数/变量等封装成一个 global.less/scss，然后在我们用到的时候将其引入。显然每次都要手动引入变得很麻烦，也容易出错（尤其组内来新人的时候），所以我们想如果把 global 自动引入到文件中不就完美了吗？

我们需要一个 `style-resources-loader` 来帮助我们完成这件事

### 配置 style-resources-loader

config/styleResourceLoader.js

```js
module.exports = ({ config, options }) => {
  const resourcesOpt = options.resources;
  return () => {
    ["normal"].forEach(oneOf => {
      Object.keys(resourcesOpt).forEach(loader => {
        config.module
          .rule(loader)
          .oneOf(oneOf)
          .use("style-resources-loader")
          .loader("style-resources-loader")
          .options({
            patterns: resourcesOpt[loader].patterns
          });
      });
    });
  };
};
```

config/style.js

```js
if (loader) {
  let resolvedLoader;
  try {
    resolvedLoader = require.resolve(loader);
  } catch (error) {
    resolvedLoader = loader;
  }
  rule
    .use(loader)
    .loader(resolvedLoader)
    // options 是对应 config 中的 css 参数，可以自行配置对应loader的参数
    .options(Object.assign({ sourceMap }, options));
}
```

### 项目配置

box.config.js

```js
{
  "css": {
    "sourceMap": true,  // 是否开启css source map
    "loaderOptions": { // 配置loader的options
      "css": {},
      "less": {
        "globalVars": { // less 设置全局变量
          "gray": "#ccc"
        }
      },
      "sass": {},
      "postcss": {},
      "stylus": {}
    },
    "isCssModule": false, // 是否对css进行模块化处理
    "needInlineMinification": false // 是否需要压缩css
  },
  "resources": {
    "less": {
      "patterns": [path.resolve(__dirname, "./src/global/*.less")]
    },
    "scss": {
      "patterns": [path.resolve(__dirname, "./src/global/*.scss")]
    }
  }
}
```

### 使用

```js
└──── src
   │── global
   │  │── index.less
   │  └── index.scss
   └── style
      └── index.less
```

#### 设置全局样式

global/index.less

```less
.g-less-height () {
  height: 100%;
}

.g-less-test {
  width: 100%;
}
```

#### 使用全局样式

style/index.less

```less
.test {
  width: 300px;
  color: @gray;
  .g-less-height();
}
```

style/index.scss

```scss
.g-scss-test {
  width: 100%;
}
```

#### 编译后

dist/css/index.css

```css
.g-less-test {
  width: 100%;
}

.test {
  color: #ccc;
  width: 100%;
  height: 100%;
}

.g-scss-test {
  width: 100%;
}
```

可见全局的样式都被打包进 `dist/css/index.css` 中了，我们再也不用每次都手动引入了

## <a name="home2_10">vscode 配置</a>

放在根目录，开启自动修复 eslint/tslint/stylelint 功能

.vscode/setting.json

```js
{
  /*
   * @description 编译器配置
   * @param tabSize 默认tab为两个空格
   * @param formatOnSave 保存时自动修复
   */
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  /*
   * @description eslint 配置
   * @param alwaysShowStatus 配置
   * @param autoFixOnSave 保存时自动修复
   * @param validate 在vue中添加错误提示
   */
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  /*
   * @description tslint 配置
   * @param autoFixOnSave 保存时自动修复
   * @param alwaysShowRuleFailuresAsWarnings 所有特征都是用 Warnings
   */
  "tslint.autoFixOnSave":  true,
  "tslint.alwaysShowRuleFailuresAsWarnings": true,
  /*
   * @description stylelint 配置
   * @param autoFixOnSave 保存时自动修复
   */
  "stylelint.autoFixOnSave":  true,
  /*
   * @description vetur 配置
   */
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false,
      "singleQuote": true
    }
  },
  /*
   * @description 配置编辑器设置以覆盖某种语言
   */
  "[typescript]": {
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
    "editor.defaultFormatter": "eg2.tslint"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "eg2.tslint"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## <a name="home2_11">prettier 配置</a>

配合 lint 做一些，代码样式上的格式化

prettier.config.js

```js
/**
 * pretiier 标准配置
 */
module.exports = {
  // 在ES5中有效的结尾逗号（对象，数组等）
  trailingComma: "es5",
  // 不使用缩进符，而使用空格
  useTabs: false,
  // tab 用两个空格代替
  tabWidth: 2,
  // 仅在语法可能出现错误的时候才会添加分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 在Vue文件中缩进脚本和样式标签。
  vueIndentScriptAndStyle: true,
  // 一行最多 100 字符
  printWidth: 100,
  // 对象的 key 仅在必要时用引号
  quoteProps: "as-needed",
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: "always",
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: "preserve",
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: "css",
  // 换行符使用 lf
  endOfLine: "lf"
};
```
