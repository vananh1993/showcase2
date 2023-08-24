import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ShowcaseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/Edit.vue')
    },
    // {
    //   path: '/html/:urlroute/:url',
    //   name: 'detail',
    //   component: () => import('@/views/LoadHtml.vue')
    // },
    {
      path: '/not-found',
      name: '404',
      component: () => import('@/views/404.vue')
    },
    // {
    //   path: '/showcase/:category',
    //   name: 'listFromCate',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/ShowcaseFromCateView.vue')
    // }
  ]
})

export default router
