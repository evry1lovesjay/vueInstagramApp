import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/404View.vue'
import AutoCompleteView from '../views/AutoCompleteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/home',
      redirect: "/"
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/auto',
      name: 'auto',
      component: AutoCompleteView
    },
    {
      path: "/:catchall(.*)*",
      name:"Not Found",
      component: NotFoundView
    }
  ]
})

export default router
