import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/Login.vue';
import getMenuRoutes from '@/utils/permission';
import store from '@/store';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    hidden: false,
    icon: 'inbox',
    title: '商品',
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      hidden: false,
      icon: 'unordered-list',
      title: '商品列表',
    },
    component: () => import('@/views/page/ProductList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      hidden: false,
      icon: 'file-add',
      title: '添加商品',
    },
    component: () => import('@/views/page/ProductAdd.vue'),
  }, {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      hidden: true,
      icon: 'file-add',
      title: '编辑商品',
    },
    component: () => import('@/views/page/ProductAdd.vue'),
  }, {
    path: 'manage',
    name: 'Manage',
    meta: {
      hidden: false,
      icon: 'file-done',
      title: '类目管理',
    },
    component: () => import('@/views/page/Manage.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      icon: 'home',
      hidden: false,
      title: '首页',
    },
    children: [{
      path: 'statistics',
      name: 'Statistics',
      meta: {
        hidden: false,
        icon: 'solution',
        title: '统计',
      },
      component: () => import('@/views/page/Statistics.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录',
    },
    component: Login,
  }];
const router = new VueRouter({
  routes,
});
let isAddRuoutes = false;
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey
        && store.state.user.email && store.state.user.role) {
      if (!isAddRuoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
        // console.log(menuRoutes);
        store.dispatch('setRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          return next();
        });
        isAddRuoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
