<template>
  <div class="main-header">
        <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
<div class="header-breadcrumb" v-if="currentRoute.length > 1">
    <a-breadcrumb-item>{{ currentRoute[0]?currentRoute[0].meta.title : '' }}</a-breadcrumb-item>
    <a-breadcrumb-item> <router-link to="">{{ currentRoute[1]? currentRoute[1].meta.title : '' }}
        </router-link>  </a-breadcrumb-item>
</div>
  <ul class="header-user">
    <li class="user-info">
        {{ $store.state.user.username }}
        <a-icon type="down" />
    </li>
    <li class="out" @click="handleExit">退出</li>
</ul>
   </div>
</template>
<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched, // 第一次预编译时给的默认值
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changgeCollapsed');
    },
    handleExit() {
      this.$store.dispatch('userLogout');
      this.$router.push('/login');
    },
  },

  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },

  },

};
</script>
<style lang="less" scoped>
.main-header{
          border-bottom: 1px solid #eee;
          height: 50px;
          line-height: 50px;
          padding-left: 1em;
         .header-breadcrumb{
            margin-left: 1em;
           display: inline-block;
      }
      }
        .header-user{
               display: inline-block;
               position: absolute;
                cursor: pointer;
                right: 2px;
                text-align: center;
         li{
              padding: 0 ;
          }
          .out{
              display: none;
              &:hover{
                  color: black;
                  font-weight: 900;
                  background: #9f9f9f;
                  border-radius: 5px;
                  z-index: 999;
              }
          }

          &:hover{
              li{
                  display:block;
              }
          }
      }

</style>
