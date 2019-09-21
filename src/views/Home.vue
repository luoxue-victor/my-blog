<template>
  <div>
    <MoveSwiper></MoveSwiper>
    <CreateRoute></CreateRoute>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateRoute from '@/components/CreateRoute/home.vue'
import MoveSwiper from '@/components/swiper/move.vue'
// import TopSwiper from '@/components/swiper/home.vue'

Vue.component('CreateRoute', CreateRoute)
Vue.component('MoveSwiper', MoveSwiper)

@Component
export default class Home extends Vue {
  
}
</script>
