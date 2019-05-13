<template>
    <div>
        <header>
           <p class="tel">理财热线：400-888-8888</p>
           <ul>
              <li :class="{'clearpadding':$store.state.userName}">
                 <router-link to="/login" class="header-a" v-if="!$store.state.userName">
                 登录
                 </router-link>
               </li>
              <li :class="{'clearpadding':!$store.state.userName}">
                 <router-link :to="'/person?userName='+$store.state.userName" class="header-a" v-if="$store.state.userName">
                 个人中心
                 </router-link>
               </li>
              <li :class="{'clearpadding':!$store.state.userName}">
                 <a href="javascript:;" class="header-a" v-if="$store.state.userName" @click.prevent="logout" >
                    退出
                  </a></li>
              <li :class="{'clearpadding':$store.state.userName}"><router-link to="/register" class="header-a" v-if="!$store.state.userName"
               >快速注册</router-link></li>
              <li><router-link to="/buyList">已买产品</router-link></li>
              <li><a href="#">帮助</a></li>
              <li><a href="#">App下载</a></li>
           </ul>
        </header>
    </div>
</template>
<script>
import '../assets/css/normalize.css'
import '../assets/css/main.css'
import axios from 'axios'
export default {
   data() {
      return {
      }
   },
   mounted() {
      this.checkLogin()
   },
   methods: {
      checkLogin() {
         axios.get('/users/checkLogin').then((response) => {
            let res = response.data
            if(res.status == '0') {
               this.$store.commit("updataUserInfo",res.result)
            }
         })
      },
      logout() {
         axios.get('/users/logout').then((response) => {
            let res = response.data
            if(res.status == '0') {
               this.$store.commit("updataUserInfo",'')
               window.alert('退出成功')
            }
         })
      }
   }
}
</script>
<style>
</style>
