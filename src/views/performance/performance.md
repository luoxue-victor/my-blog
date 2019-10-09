
# spa首屏计算方案

> 对于首屏的定义，浏览器没有给出标准的指标，因为不同网站对于首屏的要求也是不尽相同的。我们从谷歌的第一次有效时间（first meaningfull paint）得到了一些启发，例如，一个新闻网站文字跟字体对于它来说是更重要的，而图片是次要的。新闻网站可以认为所有文字或字体加载出来即为首屏。但是对于电商网站来说，电商网站的图片可能更加重要，因为图片占据整个网站的80%以上。所以仅仅字体或文字被加载出来并不能定义为首屏时间。以此可以看出，首屏并不是一个可以通过简单的api就能计算出来的，首屏的方案也是因公司而异的。幸运的是，浏览器提供了各种监测性能及dom的api，可以让我们通过这些api来计算首屏时间。

#### 首屏定义

举个例子，作为一个二手交易的电商平台，转转网站一半以上是由图片组成。我们以优品首页为例。它的页面加载过程看起来是这样的：

![优品](https://pic6.zhuanstatic.com/zhuanzh/n_v224c03ae8539d44aab6fbb0507dacf13e.png)

<span style="color:green">*由白屏 -> 加载文字、布局 -> 渲染图片 -> 图片完全加载出来*</span>

通过上图，我们可以看出来，在图片加载出来之前（第一张图片），我们并不能清楚知道这个页面想要告诉我们什么，上面白色的位置跟下面热卖专区即将是什么内容我们一概不知。直到所有图片加载出来为止，我们才能够清楚的知道整个页面所要表达的意图。


> 那么我们用一句话来概括电商首屏定义：<span style="color: red">初次</span>手机<span style="color: red">屏幕内</span>页面<span style="color: red">有效元素</span>（图片）<span style="color: red">完全展现</span>时间。

这里面有几个关键词：初次、屏幕内、有效元素、完全展现。

#### 我们如何判断页面初次有效渲染的时间？

因为现在我们的前端页面大都是spa项目，而spa项目所有的渲染都是通过js来动态渲染的。所以w3c提供的一些api（load、DOMContentLoaded、domComplete）都会计算的不准确。因为我们整个网站html最初只有一个div。

那我们对于spa项目如何做到比较准确的性能统计呢？假如准许你可以使用框架钩子并可以侵入业务代码，那么你可以做哪些事情？

以vue为例，我们混合为每个组件添加一个mounted钩子，并记录mounted时间，最后在onLoad时候，取最后那个mounted时间，即最后一个组件挂载完成的时间为首屏时间。下面伪代码示例。

```js
Vue.mixin({
    mounted() {
        setStore(time)
    }
})

window.addEventListener('load', () => {
    Pref.send(Math.max(...getStore))
}
```

这种方法在某些场景可以作为首屏时间，因为一个完整的可复用的高可维护的页面它的颗粒度是足够细的。但是你可能有好多疑问？

- 如果一个页面并没有抽象成组件化，而它所有的渲染都是依赖于接口返回的数据，那么这种计算方式可能是有瑕疵的。
- spa项目是异步加载的，onload时间是否是初次渲染结束的时间？
- 还有最重要的一点，它并没有统计到图片下载的时间。
- 如何判断当前页面dom初次渲染完成时间？
- 。。。

好吧，我承认这种方式我们很容易找到投机的方式，并做到很好的性能数据。比如我的数据请求是在onload之后，页面使用模版渲染来代替使用组件，组件渲染时机放在onload之后...等等。但是这些操作并不是我们所提倡的，它反而延长了我们页面真正的渲染时间！

那么我们如何另辟蹊径，找到另一个突破口，尽量不侵入代码的情况下而做到准确的首屏时间呢？

在我不知道MutationObserver这个方法之前，我甚至觉得这是不可能做到。

> <span style="color: #555">MutationObserver接口提供了监视对DOM树所做更改的能力</span>

<span style="color: #b5c">我们可以大胆假设，如果通过 MutationObserver 监听页面body，当页面body元素变化最剧烈并达到最大时就是首屏初次渲染完成的时间。让我们试一下吧～</span>


```js
var targetNode = document.body;
var observerOptions = {
  childList: true, // 观察目标子节点的变化，添加或者删除
  subtree: true // 默认为 false，设置为 true 可以观察后代节点
}
var store = [];
var o = n.MutationObserver;
(new o(function () {
  // 计算dom数量并将dom变化时间记录下来，放进store
  store.push({
    num: computedDomNum(), // 计算dom元素，这个后面会讲
    time: performance.now() // 高精度时间获取
  })
  
})).observe(targetNode, observerOptions)
```

这样确实可以得到dom变化的数量以及速率，但是我们的首页往往是一个很长页面，而下面列表的dom元素被加载出来的时候其实我们并不是很关心，因为有很多已经不在我们的可视范围内了。所以我们需要将页面的元素增加不同的权重。

OK，我们调整一下计算dom的方法，这也是阿里云的计算方法

```js
function r(e, n, t) {
    var i = 0,
        u = e.tagName;
    if ("SCRIPT" !== u && "STYLE" !== u && "META" !== u && "HEAD" !== u) {
      var c = e.children ? e.children.length : 0;
      if (c > 0) for (var a = e.children, l = c - 1; l >= 0; l--) {
        i += r(a[l], n + 1, i > 0);
      }if (i <= 0 && !t) {
        if (!(e.getBoundingClientRect && e.getBoundingClientRect().top < o)) return 0;
      }
      i += 1 + .5 * n;
    }
    return i;
  }
```

这样我们就可以达到，只计算首屏时间，这段代码的意思就是：只计算页面在屏幕内出现的元素，屏幕之外的元素不会统计在内。每一层子元素的权重会增加0.5，比如一个元素是在第一层那么这个元素的权重就是1.5，如果元素在第五层那么这个元素就是3.5。

#### 接下来解决图片的加载问题

要解决图片加载问题，首先就要找出页面中所有的img跟div的background-image。

如果是img的话，我们可以使用img标签下的src属性获取属性值即可，如果是div的化可以使用 window.getComputedStyle(dom) 方式获取它的属性值

```js
var computedStyle = window.getComputedStyle(dom);
var bgImg = computedStyle.getPropertyValue('background-image') || computedStyle.getPropertyValue('background');
```
然后通过正则获取图片的链接即可

然后通过 performance.getEntriesByName(element)[0].responseEnd 的方式可以获取到图片的下载时间，与我们计算的dom响应时间相比取最大值。

这个是获取图片的demo
```js
(() => {
  const imgs = []
  const getImageDomSrc = {
    _getImgSrcFromBgImg: function (bgImg) {
      var imgSrc;
      var matches = bgImg.match(/url\(.*?\)/g);
      if (matches && matches.length) {
        var urlStr = matches[matches.length - 1];
        var innerUrl = urlStr.replace(/^url\([\'\"]?/, '').replace(/[\'\"]?\)$/, '');
        if (((/^http/.test(innerUrl) || /^\/\//.test(innerUrl)))) {
          imgSrc = innerUrl;
        }
      }
      return imgSrc;
    },
    // 提取图片链接
    getImgSrcFromDom: function (dom, imgFilter) {
      if (!(dom.getBoundingClientRect && dom.getBoundingClientRect().top < window.innerHeight))
        return false;
      imgFilter = [/(\.)(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)/i]
      var src;
      if (dom.nodeName.toUpperCase() == 'IMG') {
        src = dom.getAttribute('src');
      } else {
        var computedStyle = window.getComputedStyle(dom);
        var bgImg = computedStyle.getPropertyValue('background-image') || computedStyle.getPropertyValue('background');
        var tempSrc = this._getImgSrcFromBgImg(bgImg, imgFilter);
        if (tempSrc && this._isImg(tempSrc, imgFilter)) {
          src = tempSrc;
        }
      }
      return src;
    },

    _isImg: function (src, imgFilter) {
      for (var i = 0, len = imgFilter.length; i < len; i++) {
        if (imgFilter[i].test(src)) {
          return true;
        }
      }
      return false;
    },

    f(e) {
      var t = this
        , u = e.tagName;
      if ("SCRIPT" !== u && "STYLE" !== u && "META" !== u && "HEAD" !== u) {
        var b = this.getImgSrcFromDom(e)
        if (b && !imgs.includes(b))
          imgs.push(b)
        var c = e.children ? e.children.length : 0;
        if (c > 0)
          for (var a = e.children, l = c - 1; l >= 0; l--)
            t.f(a[l]);
      }
    }
  }

  getImageDomSrc.f(document.body)
  // 获取到的首屏所有图片
  console.log(imgs) 
  var max = Math.max(...imgs.map(element => {
    if (/^(\/\/)/.test(element))
      element = 'https:' + element;
    try {
      return performance.getEntriesByName(element)[0].responseEnd || 0
    } catch (error) {
      return 0
    }
  }
  ))
  // 所有图片的responseEnd时间跟计算的fmp相比较得出最大值
  console.log(max)
}
)()
```

这就是性能统计的关键代码，现在许多公司都是使用的这种计算方法，希望通过这篇文章帮助大家了解首屏的计算。各个公司也应该根据自己的业务场景做一些计算上的修改。比如你项目中使用的图片较少，就可以不把图片计算在内，如果你项目对字体比较敏感，那你就应该把字体的加载计算在内...。总之，计算首屏是没有统一标准的，因为所有公司的页面性质是不同的，侧重点也不一样，要根据公司业务的实际情况来计算。