1. 全局样式参考：BEM、OOCSS、SMACSS设计方案，详情请看 css 编码规范中的 base.scss、global.scss、iconfont.scc
2. base.scss 包含全局的 reset 样式，遵循最小子集、最小干扰、最大通用原则
3. global.scss 包含各业务线的ui规范，全局 text 的色值、btn 的大小都放在这里。
4. font-face 只允许添加 iconfont，不接受 ui 给出的自定义字体
5. 全局样式：采用公共的 sasscore
6. 局部组件使用scoped，scoped穿透方案使用 /deep/，命名方式：有层级就行. 具体不要求。
7. 移动端适配方案老项目还是以flexible为主，新项目切换成vw，参考移动端接入vw适配方案,1px解决方案
8. 文件编码必须采用utf-8编码，保存格式必须是utf-8无BOM格式
9. 书写顺序不便于统一，这里不做要求
10. 十六进制、组合属性组，能缩写的尽量缩写,为0的属性值后面不加单位

```css
.zz-wrapper {  width: 100px;
  box-shadow: 1px 1px 1px #333, 0 2px 0 #ccc;
  background: url(../img/bg.png) no-repeat fixed center 100% / 100%;
}
```

11. 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确
12. class 命名：避免过度任意的简写，.btn 代表 button，但是 .s 不能表达任何意思；class 名称应当尽可能短，并且意义明确，使用有组织的或目的明确的名称；基于最近的父 class 或基本（base） class 作为新 class 的前缀