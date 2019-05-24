import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "product" */'../views/product.vue')
    },
    {
      path:'/login',
      component: () => import(/* webpackChunkName: "Login" */ '../views/Login')
    },
    {
      path:'/register',
      component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
    },
    {
      path:'/buyList',
      component: () => import(/* webpackChunkName: "buyList" */ '../views/buyList')
    },
    {
      path:'/person',
      component: () => import(/* webpackChunkName: "person" */ '../views/person')
    },
    {
      path:'/productdetail/:id/:name',
      component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail')
    },
    {
      path:'/channel',
      component: () => import(/* webpackChunkName: "channel" */ '../views/channel')
    },
    {
      path:'/channelDetail',
      component: () => import(/* webpackChunkName: "channelDetail" */ '../views/channelDetail')
    },
    {
      path:'/report',
      component: () => import(/* webpackChunkName: "report" */ '../views/report')
    }
  ]
})
