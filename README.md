# 技匠
> 总结了个人的一些新技术、最佳实践、工程化、效率、工作体会等文章。欢迎star、pr，微信luoxue2479，下面是我的公众号，可以关注我【前端技匠】，随时获取最新动态哦！

![前端技匠](public/gongzhonghao.jpeg)

执行 npm run dev 可以运行结果调试
执行 npm run build 构建工程化
#### [css模块化](src/views/css/css模块化.md) 
 > 你是否为class命名而感到苦恼？  

#### [一些工程化常用到的包及工具](src/views/engineering/一些工程化常用到的包及工具.md) 
 > 在我们构建工程化时，最难入手的应该就是不知道有哪些好用的工具使用，这里列举了一些常用的工具包，如果你还有更好用的可以下面留言 

#### [flutter的mac安装教程](src/views/flutter/flutter的mac安装教程.md) 
 > 虽然官网上已经有很详细的教程了，但是作为一名没有开发过客户端，刚买mac不到一年的人来说还是有很多不是很明白的地方，本次教程就是准对完全没有经验的小白的安装教程 

#### [如何写一个代码编辑器](src/views/monacoEditor/如何写一个代码编辑器.md) 
 > 当我们看到这个编辑器的时候，你有没有好奇这是这么做出来的？如果是让你来做，你会怎么做？ 

#### [spa首屏计算方案](src/views/performance/spa首屏计算方案.md) 
 > 对于首屏的定义，浏览器没有给出标准的指标，因为不同网站对于首屏的要求也是不尽相同的。我们从谷歌的第一次有效时间（first meaningfull paint）得到了一些启发，例如，一个新闻网站文字跟字体对于它来说是更重要的，而图片是次要的。新闻网站可以认为所有文字或字体加载出来即为首屏。但是对于电商网站来说，电商网站的图片可能更加重要，因为图片占据整个网站的80%以上。所以仅仅字体或文字被加载出来并不能定义为首屏时间。以此可以看出，首屏并不是一个可以通过简单的api就能计算出来的，首屏的方案也是因公司而异的。幸运的是，浏览器提供了各种监测性能及dom的api，可以让我们通过这些api来计算首屏时间。 

#### [vue中使用ts](src/views/typescript/vue中使用ts.md) 
 > 注意：此文并不是把vue改为全部替换为ts，而是可以在原来的项目中植入ts文件，目前只是实践阶段，向ts转化过程中的过渡。 

#### [vue指令实现墓碑元素](src/views/vue/vue指令实现墓碑元素.md) 
 > 话不多说，先上图 

#### [async|await源码实现](src/views/javascript/async/async|await源码实现.md) 
 > 看到 async/await 是ea7带来的新语法糖，可以将内部的异步方法同步处理，看一下下面的例子 

#### [render函数-VS-动态component](src/views/vue/render/render函数-VS-动态component.md) 
 > 大家应该都知道vue的render函数跟vue的动态组件，但是可能在90%的业务场景中都不会用到这方法，所以可能也不会去深究这些api的用法。这次正好有幸做了一次动态渲染组件的需求，小编就拿出来给大家分享一下。 

#### [vue3中effect与computed的亲密关系](src/views/vue3/effect/vue3中effect与computed的亲密关系.md) 
 > 在我刚看完vue3响应式的时候，心中就有一个不可磨灭的谜团，让我茶不思饭不想，总想生病。那么这个谜团是什么呢？就是在响应式中一直穿行在tranger跟track之间的effect。如果单纯的响应式原理根本就用不上effect，那么effect到底是干什么的呢？ 

#### [vue3实现v-model原理](src/views/vue3/proxy/vue3实现v-model原理.md) 
 > vue3 源码正式放出来了，想必大家也都开始争先恐后的学习 vue3 的知识了。由于 vue3 已经不再支持 v-model 了，而使用 .sync 来代替，但是为了这篇文章可以帮助大家快速了解 vue 的双向绑定实现原理，部分使用了 vue2.x v-model 的实现原理 

