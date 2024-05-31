import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/Layout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home/Home.vue')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/Category.vue'),
          meta: {
            title: '分类'
          }
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/SubCategory/SubCategory.vue')
        },
        {
          path: 'detail/:id',
          component: () => import('@/views/Detail/Detail.vue')
        },
        {
          path: 'cartlist',
          component: () => import('@/views/CartList/CartList.vue')
        },
        {
          path: 'checkout',
          component: () => import('@/views/CheckOut/CheckOut.vue')
        },
        {
          path: 'pay',
          component: () => import('@/views/Pay/Pay.vue')
        },
        {
          path: 'paycallback',
          component: () => import('@/views/Pay/PayBack.vue')
        },
        {
          path: 'member',
          component: () => import('@/views/Member/Member.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Member/components/UserInfo.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login.vue'),
    }
  ],
  // 路由滚动行为定制
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

export default router
