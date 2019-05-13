<template>
    <div>
        <input type="file" ref="file">
        <div class="container">
          <a href="">1</a>
          <a href="">2</a>
          <a href="">3</a>
        </div>
    </div>
</template>
<script>
export default {
   data() {
      return {
          flag:false
      }
   },
   mounted() {
       console.log(this.$refs.file.value)
   }
}
</script>
<style scoped>
.container{
    width: 500px;
    margin: 50px auto;
    border: 2px solid #ccc;
    text-align: center;
}
a{
  background-color: gray;
  color:white;
  margin: 50px;
}

</style>
