<template>
  <div>
    <MonacoEditor
      height="200"
      language="typescript"
      :code="code"
      :editorOptions="options"
      @codeChange="onCodeChange"
    ></MonacoEditor>
    <div class="res">{{ res }}</div>
  </div>
</template>
<script>
import MonacoEditor from '../../components/vue-monaco-editor';
let logStore = [];
export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      res: ' noop',
      code: 
`const noop = () => {
  console.log('noop')
}
noop()
`,
      options: {}
    };
  },
  methods: {
    clear() {
      this.res = '';
      logStore = [];
    },
    // 重写consolelog，并储存在logStore内
    overwriteConsoleLog() {
      console.log = function(...arg) {
        logStore.push(arg);
      };
    },
    // 抽象出一层修饰层
    modify(e) {
      if (typeof e === 'object') e = JSON.stringify(e);
      return e;
    },
    // 输出
    printf(ori) {
      const _this = this
      logStore.forEach(item => {
        function str() {
          return item.map(_this.modify);;
        }
        ori(str(item));
        this.res +=
          str(item)
            .join(' ') + '\n';
      });
      console.log = ori;
    },
    onCodeChange(code) {
      // 保存 console.log 对象
      const ori = console.log;
      // 清空副作用
      this.clear();
      // 重写 console.log，为了将控制台打印值输出在页面上
      this.overwriteConsoleLog();
      // 获取代码的片段字符串
      const v = code.getValue();
      try {
        // 执行代码
        eval(v);
        // 将控制台打印值输出在页面上
        this.printf(ori)
      } catch (error) {
        console.error(error)
      }
    }
  }
};
</script>
<style>
</style>
<style lang="scss">
.editor {
  width: 100%;
  height: 100vh;
  margin-top: 50px;
}
.res {
  height: 500px;
  background: orange;
  font-size: 30px;
  white-space: pre-wrap;
  padding-left: 20px;
}
</style>
