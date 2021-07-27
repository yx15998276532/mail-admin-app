<template>
  <div class="home-container">
      <Menu :key="key"/>
      <div :class="{'menu-right':true, 'menu-unfold':$store.state.collapsed}">
      <MainHeadr/>
      <router-view></router-view>
      </div>
</div>
</template>
<script>
import Menu from './components/Menu.vue';
import MainHeadr from './components/MainHeadr.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    Menu,
    MainHeadr,
  },
};
</script>

<style scoped lang="less">
.home-container{
   width: 100%;
   height: 100%;
 .menu-right{
         margin-left: 180px;
         transition: all 0.5s;
      &.menu-unfold{
         margin-left: 80px;
      }
 }

}
</style>
