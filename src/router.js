import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/Overview.vue";
import Products from "./views/Products.vue";
import Orders from "./views/Orders.vue";
import Reviews from "./views/Reviews.vue";
import About from './views/About.vue';
import Shop from './views/Shop.vue';
import ProductView from './views/ProductDetail.vue';
const fb = require('./firebase')

Vue.use(Router);

const router =  new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: 'about',
      component: About
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
    }, 
    {
      path: '/proview/:id',
      name: 'proview',
      props: true,
      component: ProductView
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: { requiresAuth: true },
      children:[
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "products",
          name: "products",
          component: Products
        },
        {
          path: "orders",
          name: "orders",
          component: Orders
        },
        {
          path: "reviews",
          name: "reviews",
          component: Reviews
        }
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth.currentUser

  if (requiresAuth && !currentUser) {
     next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router;