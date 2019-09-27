<script>
export default {
  data() {
    return {
      dontUseProps: ['basePath', 'onlyShow'],
      list: [
        {
          name: 'banner',
          props: {
            props: {
              msg: '我是来自banner props'
            }
          },
          style: {
            background: 'red',
            marginTop: '100px'
          }
        },
        {
          name: 'tabs',
          props: {
            props: {
              msg: '我是来自tabs props'
            }
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    removeProp(o) {
      const list = this.dontUseProps || [];
      list.forEach(e => o[e] && delete o[e]);
    },
    filter(o) {
      // 一些逻辑过滤 比如只在哪个端展示
      return true;
    }
  },
  render(h) {
    const components = this.list
      .map(component => {
        try {
          if (!this.filter(component)) return false;
          const c = require(`@/components/modules/${component.name}.vue`)
            .default;
          this.removeProp(component);
          return h(c, { ...component });
        } catch (error) {
          return console.error(error), false;
        }
      })
      .filter(_ => _);
    return h('div', {}, components);
  }
};
</script>
