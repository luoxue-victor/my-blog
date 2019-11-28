### CSS 书写顺序

1. 定位属性：position  display  float  left  top  right  bottom   overflow  clear   z-index
1. 自身属性：width  height  padding  border  margin   background
1. 文字样式：font-family   font-size   font-style   font-weight   font-varient   color
1. 文本属性：text-align   vertical-align   text-wrap   text-transform   text-indent    text-decoration   letter-spacing    word-spacing    white-space   text-overflow
1. css3 中新增属性：content   box-shadow   border-radius  transform ……

**目的：**减少浏览器 reflow（回流），提升浏览器渲染 dom 的性能

```css
/* bad */
div {
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
  z-index: 1;
}
```

```css
/* good */
div {
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background: red;
}
```

### 注释的写法:

```css
/* Header */
.header {
  ... ...;
}
/* End Header */
```

### 非全局组件使用 scoped

```html
<!-- good -->
<style scoped lang="scss">
```

```html
<!-- bad -->
<style lang="scss">
```

### 全局样式参考：BEM 设计方案

*注意是全局样式* 

`good`

```html
<!-- good -->
<ul class="menu">
<li class="menu__item menu__item--selected">Menu Item 1</li>
<li class="menu__item">Menu Item 2</li>
<li class="menu__item">Menu Item 3</li>
</ul>
```

`bad`

```html
<!-- bad -->
<ul class="menu">
<li class="item selected">Menu Item 1</li>
<li class="item">Menu Item 2</li>
<li class="item">Menu Item 3</li>
</ul>
```


5. 全局样式：采用公共的 sasscore
6. 局部组件使用 scoped，scoped 穿透方案使用 /deep/，命名方式：有层级就行. 具体不要求。
7. 移动端适配方案老项目还是以 flexible 为主，新项目切换成 vw，参考移动端接入 vw 适配方案,1px 解决方案
8. 文件编码必须采用 utf-8 编码，保存格式必须是 utf-8 无 BOM 格式
9. 十六进制、组合属性组，能缩写的尽量缩写,为 0 的属性值后面不加单位

```css
.zz-wrapper {
  width: 100px;
  box-shadow: 1px 1px 1px #333, 0 2px 0 #ccc;
  background: url(../img/bg.png) no-repeat fixed center 100% / 100%;
}
```

11. 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确
12. class 命名：避免过度任意的简写，.btn 代表 button，但是 .s 不能表达任何意思；class 名称应当尽可能短，并且意义明确，使用有组织的或目的明确的名称；基于最近的父 class 或基本（b1. class 作为新 class 的前缀

### 常用的 CSS 命名规则

| 功能                     | 命名              |
| ------------------------ | ----------------- |
| 头                       | header            |
| 内容                     | content/container |
| 尾                       | footer            |
| 导航                     | nav               |
| 侧栏                     | sidebar           |
| 栏目                     | column            |
| 页面外围控制整体佈局宽度 | wrapper           |
| 左右中                   | left right center |
| 登录条                   | loginbar          |
| 标志                     | logo              |
| 广告                     | banner            |
| 页面主体                 | main              |
| 热点                     | hot               |
| 新闻                     | news              |
| 下载                     | download          |
| 子导航                   | subnav            |
| 菜单                     | menu              |
| 子菜单                   | submenu           |
| 搜索                     | search            |
| 友情链接                 | friendlink        |
| 页脚                     | footer            |
| 版权                     | copyright         |
| 滚动                     | scroll            |
| 内容                     | content           |
| 标签                     | tags              |
| 文章列表                 | list              |
| 提示信息                 | msg               |
| 小技巧                   | tips              |
| 栏目标题                 | title             |
| 加入                     | joinus            |
| 指南                     | guide             |
| 服务                     | service           |
| 注册                     | regsiter          |
| 状态                     | status            |
| 投票                     | vote              |
| 合作伙伴                 | partner           |

### CSS 样式表文件命名

以 scss 为例

| 样式表文件 | 命名           |
| ---------- | -------------- |
| 主要的     | master.scss     |
| 模块       | module.scss     |
| 基本共用   | base.scss       |
| 布局、版面 | layout.scss     |
| 主题       | themes.scss     |
| 专栏       | columns.scss    |
| 文字       | font.scss       |
| 主要的     | main.scss       |
| 表单       | forms.scss      |
| 补丁       | mend.scss       |
| 打印       | print.scss      |
| 变量       | variables.scss  |
| 功能函数   | mixins.scss     |
| 色值       | colors.scss     |
| 动画       | animations.scss |
| 字体       | iconfont.scss   |
