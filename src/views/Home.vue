<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
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
        style: {
          color: 'orange'
        },
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
