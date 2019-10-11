import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'login',
      redirect:'menusbar',
    },
    {
      path:'/menusbar',
      name:'menusbar',
      component:() => import("./views/Menusbar.vue")
    },
    {
      path:'/commoditylist',
      name:'commoditylist',
      component:() => import("./components/Commoditylist.vue")
    },
    {
      path:'/commodityquery',
      name:'commodityquery',
      component:() => import("./components/Commodityquery.vue")
    },
    {
      path:'/address',
      name:'address',
      component:() => import("./components/address/Address.vue")
    },
  ]
})
