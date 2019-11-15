1. 文档声明：统一使用 `HTML5` 的文档声明

```html
<!DOCTYPE html>
```
2. 页面必须包含 `title` 标签声明标题

```html
<title>移动端HTML模版</title>
```

3. 编码统一为UTF-8

```js
<meta charset="UTF-8" />
```

4. DNS预解析

```html
<link rel="dns-prefetch" href="//xxx.cdn.com.cn">
```

5. 手机端页面meta设定

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

6. 缩进：html 与 js、css 保持一致，用2个空格作为缩进单位 

7. 命名：html 标签名、类名、标签属性(值)和大部分属性统一用小写

8. 布尔类型的属性，建议不添加属性值

```html
<input type="text" disabled />
```

9. 标签闭合：具有开始&结束标签的，必须写起止标签，空元素标签，以空格+/>结尾

```html
<!-- good -->
<div>
  <h1>我是h1标题</h1>
  <p>我是一段文字，有始有终，浏览器能正确解析</p>
</div>
<br />
<input type="button" value="button" />

<!-- bad -->
<div>
  <h1>我是h1标题</h1>
  <p>我是一段文字，有始无终，浏览器也能正确解析
</div>
<br>
<input type="button" value="button" />
```

10. 标签语义化：

- p - 段落
- h1,h2,h3,h4,h5,h6 - 层级标题
- strong,em - 强调
- ul - 无序列表
- ol - 有序列表
- dl,dt,dd - 定义列表


11. 标签的使用应尽量简洁，减少不必要的标签嵌套

12. js、css路径引用请以//开始，不建议写死protocol

```html
<!-- good -->
<script src="//test.a.com/libs/xxx.min.js"></script>
<!-- bad -->
<script src="https://test.a.com/libs/xxx.min.js"></script>
```

13. 图片格式

- gif、png8、png24、jp(e)g、webp，根据图片格式特性和场景选择合适的图片格式。
- `原则`：保证不严重失真的前提下，体积越小越好。

建议：

- 内容图以jpg(webp)为主，背景图优先考虑使用png格式；
- 半透明效果的，为避免毛边等瑕疵，用png24；
- 条件允许的情况下，webp或许是最优选择；

14. 模板

```html
<!DOCTYPE html><html>
  <head>
  <meta charset="UTF-8">
  <link rel="dns-prefetch" href="//img.58cdn.com.cn">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" >
  <title>移动端HTML模版</title>
  </head>
  <body>
    <div>
      <span>页面内容</span>
    </div>
    <script src="//img.58cdn.com/path/to/your/js"></script>
  </body>
</html>
```