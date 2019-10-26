<template>
  <div>
    <CreateRoute></CreateRoute>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateRoute from '@/components/CreateRoute/home.vue'
import MoveSwiper from '@/components/swiper/move.vue'

Vue.component('CreateRoute', CreateRoute)
Vue.component('MoveSwiper', MoveSwiper)

@Component
export default class Home extends Vue {
  mounted () {
    console.log(this);
  }
}
</script>
