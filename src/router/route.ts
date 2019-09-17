/* eslint-disable */
const viewsaboutAbout = () => import('../views/about/About.vue')
const viewsHome = () => import('../views/Home.vue')
const viewshomeHome = () => import('../views/home/Home.vue')
const viewsvueApp = () => import('../views/vue/App.vue')
export const routes = [
  {
    name: "about-About",
    path: "/about-About",
    component: viewsaboutAbout,
    disc: "about-About"
  },
  {
    name: "Home",
    path: "/Home",
    component: viewsHome,
    disc: "Home"
  },
  {
    name: "home-Home",
    path: "/home-Home",
    component: viewshomeHome,
    disc: "home-Home"
  },
  {
    name: "vue-App",
    path: "/vue-App",
    component: viewsvueApp,
    disc: "vue-App"
  }
]