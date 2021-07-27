import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/useCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    user: getUserCookie(),
    menuRoutes: [], // 存储菜单路由
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        appkey: '',
        email: '',
        role: '',
        username: '',
      };
    },
    setRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changgeCollapsed(ctx) {
      ctx.commit('setCollapsed');
    },
    setUserInfo(ctx, userInfo) {
      ctx.commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    userLogout(ctx) {
      ctx.commit('logout');
      removeUserCookie();
    },
    setRoutes(ctx, routes) {
      ctx.commit('setRoutes', routes);
    },
  },
  modules: {
  },
});
