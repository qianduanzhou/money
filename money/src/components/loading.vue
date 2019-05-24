<template>
  <div class="loading">
      <h1>加载中</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .loading {
        width: 1000px;
        height: 1000px;
        background: red;
    }
    h1 {
        position: fixed;
        top: 50%;
        left: 50;
        transform: translate(-50%,-50%);
    }
</style>