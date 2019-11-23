项目文档结构

- 简介（Introduction）： [必备][文件] 提供对产品和文档本身的总体的、扼要的说明
- 使用（Usage）： [必备][目录] 又称”使用篇“，提供初级的使用教程
  - 安装（Installation）：[可选][文件] 软件的安装方法
  - 使用命令行（commander）：[必备][文件] 软件使用需要满足的前置条件
- 开发（Development）：[可选][目录] 具体项目细节
- API（Reference）：[可选][目录|文件] 软件 API 的逐一介绍
- FAQ：[可选][文件] 常见问题解答
- 附录（Appendix）：[可选][目录] 不属于教程本身、但对阅读教程有帮助的内容
  - Glossary：[可选][文件] 名词解释
  - Recipes：[可选][文件] 最佳实践
  - Troubleshooting：[可选][文件] 故障处理
  - ChangeLog：[可选][文件] 版本说明
  - Feedback：[可选][文件] 反馈方式

--------------------------------------------------

readme 模板

## 简介（Introduction）

介绍此项目的用途，项目背景，主要作用

## 使用（Usage）

### 安装（Installation）

```bash
$ git clone https://github.com/xxx/xxx.git
$ cd xxx
$ npm install
$ npm start  # visit http://localhost:8000
```

### 使用命令行（commander）

```bash
# 安装依赖（如果生成初始化项目时已经安装完毕，无需安装）
npm install

# 开发模式 localhost:8080
npm run dev

# 构建模式
npm run build

# 构建模式 + 分析报告
npm run build --report
```

## 开发（Development）

具体开发注意事项，使用的工具包，功能特征等等

### 页面配置

- 页面配置
- 页面配置

### 页面对应地址

页面 | 功能 | 地址  
---|---|---
home |  首页 | https://xxxxx/home 
detail | 详情页 | https://xxxxx/detail

## API（Reference）

1. api 1
2. api 2
3. api 3

## FAQ（常见问题解答）

1. 常见问题1
2. 常见问题2
3. 常见问题3

## 附录

- ChangeLog
- Recipes


