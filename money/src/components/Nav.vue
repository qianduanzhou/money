<template>
    <div>
        <nav class="clearfix">
      <a href="/" class="brand">
        <img src="../../static/logo@1x.png" alt="回到首页">
      </a>
      <ul>
        <li>
          <router-link to="/" class="header-nav">首页</router-link>
        </li>
        <li>
          <router-link to="#" class="header-nav">理财频道</router-link>
        </li>
        <li>
          <router-link to="#" class="header-nav">投资频道</router-link>
        </li>
        <li>
          <router-link to="#" class="header-nav">新手专区</router-link>
        </li>
        <li>
          <router-link to="#" class="header-nav">安全保障</router-link>
        </li>
      </ul>
    </nav>
    </div>
</template>
<script>
import "../assets/css/normalize.css";
import "../assets/css/main.css";
export default {
   data() {
      return {
      }
   },
}
</script>
<style>
</style>
