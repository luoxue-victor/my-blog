<template>
    <MonacoEditor
        height="600"
        language="typescript"
        :code="code"
        :editorOptions="options"
        @mounted="onMounted"
        @codeChange="onCodeChange"
        >
    </MonacoEditor>
</template>
<script>
import MonacoEditor from '../../components/vue-monaco-editor'
export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: `const noop = () => {}\n\n\n\n\n\n`,
      options: {}
    }
  },
  methods: {
    onMounted() {

    },
    onCodeChange(code) {
      var v = code.getValue()
      try {
        eval(v)
      } catch (error) {
        
      }
    }
  }
}
</script>
<style>
</style>
<style lang="scss">
.editor {
  width: 100%;
  height: 100vh;
  margin-top: 50px;
}
</style>
