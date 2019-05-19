import Vue from 'vue'
import Router from 'vue-router'
import Product from '../views/product'
import Login from '../views/Login'
import Register from '../views/Register'
import test from '../components/test'
import BuyList from '../views/buyList'
import Person from '../views/person'
import Detail from '../views/Detail'
import Channel from '../views/channel'
import ChannelDetail from '../views/channelDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Product
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/register',
      component: Register 
    },
    {
      path:'/buyList',
      component: BuyList
    },
    {
      path:'/test',
      component: test
    },
    {
      path:'/person',
      component:Person
    },
    {
      path:'/productdetail/:id/:name',
      component:Detail
    },
    {
      path:'/channel',
      component:Channel
    },
    {
      path:'/channelDetail',
      component:ChannelDetail
    }
  ]
})
