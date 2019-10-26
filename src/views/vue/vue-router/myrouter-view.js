export default {
  name: 'MyRouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render (_, { props, children, parent, data }) {
    // let depth = 0
    // const h = parent.$createElement
    // const name = props.name
    // const route = parent.$route
    // const matched = route.matched[depth]
    // const component = matched.components[name]

    // // const component = cache[name] = matched.components[name]
    // data.registerRouteInstance = (vm, val) => {
    //   const current = matched.instances[name]
    //   if (
    //     (val && current !== vm) ||
    //     (!val && current === vm)
    //   ) {
    //     matched.instances[name] = val
    //   }
    // }

    // return h(component, data, children)
  }
}
