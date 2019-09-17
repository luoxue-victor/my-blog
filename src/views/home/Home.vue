<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  list = [
    {
      link: '/Home',
      name: ''
    }
  ]
}
</script>
