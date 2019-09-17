<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { routes } from '../router/route'
import { extraRouteConfig } from '../types/route'

@Component
export default class Home extends Vue {
  routes = routes;
  clickRoute (item: extraRouteConfig) {
    this.$router.push(item.path)
  }
  render (h: Function) {
    const o = (item: extraRouteConfig) => {
      return h('h2', {
        on: {
          click: () => {
            this.clickRoute(item)
          }
        }
      }, [ h('span', item.name) ])
    }
    return h('h1', {}, [
      ...routes.map(item => o(item)),
    ])
  }
}
</script>
