const config = {
  webpack: {
    name: 'webpack 相关',
    level: 15
  },
  specification: {
    name: '规范大全',
    level: 15
  },
  performance: {
    name: '性能优化',
    level: 14
  },
  engineering: {
    name: '工程化',
    level: 13
  },
  javascript: {
    name: 'javascript 相关',
    level: 12
  },
  vue3: {
    name: 'vue-next',
    level: 11
  },
  vue: {
    name: 'vue 相关',
    level: 10
  },
  typescript: {
    name: 'ts 相关',
    level: 9
  },
  tool: {
    name: '工具',
    level: 8
  },
  design: {
    name: '设计模式',
    level: 7
  },
  device: {
    name: '模拟器',
    level: 5
  },
  flutter: {
    name: 'flutter 相关',
    level: 4
  },
  vscode: {
    name: 'vscode 相关',
    level: 3
  },
  monacoEditor: {
    name: '富文本',
    level: 2
  },
  canvas: {
    name: 'canvas 相关',
    level: 1
  },
  css: {
    name: 'css 相关',
    level: 1
  }
}

module.exports = function () {
  return {
    config,
    sortByLevel: Object.keys(config).sort((a, b) => (config[b].level - config[a].level))
  }
}
