export const routes = [
  {
    path: '/Home',
    name: 'home',
    component: () =>
      import('../views/vue/vue-router/Home.vue'),
    children: [
      {
        path: '/Home/First',
        name: 'Home-First',
        component: () =>
          import('../views/vue/vue-router/First.vue'),
      },
      {
        path: '/Home/Second',
        name: 'Home-Second',
        component: () =>
          import('../views/vue/vue-router/Second.vue'),
      },
    ]
  },
]