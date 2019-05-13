<template>
  <div>
    <transition name="in" mode="out-in">
      <div class="containerTip" v-if="tipShow">
        <p class="nav">提示
          <span @click="closeTip">×</span>
        </p>
        <section class="tip-container">
          <div class="img">
            <slot name="logo"></slot>
          </div>
          <div class="tip-title">
            <slot name="title"></slot>
          </div>
          <div class="tip-content">
            <slot name="content"></slot>
          </div>
        </section>
        <div class="button-container">
          <div class="button">
            <slot name="button1"></slot>
          </div>
          <div class="button">
            <slot name="button2"></slot>
          </div>
        </div>
      </div>
    </transition>
    <div class="overlay" v-if="tipShow" @click="closeTip"></div>
  </div>
</template>
<script>
export default {
  props: ["tipShow"],
  data() {
    return {};
  },
  methods: {
    closeTip() {
      this.$emit("close");
    }
  }
};
</script>
<style>
/* * {
  padding: 0;
  margin: 0;
} */
.in-enter, .in-leave-to{
    opacity: 0;
}
.in-enter-active, .in-leave-active{ 
    transition: all 0.5s linear;
}
.containerTip {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 550px;
  height: auto;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  z-index: 201;
  border: 1px solid green;
}
.containerTip .nav {
  margin: 0;
  padding: 0;
  position: relative;
  color: white;
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 30px;
  box-sizing: border-box;
  padding-left: 15px;
  background-color: #83c82f;
}
.containerTip .nav span {
  text-align: center;
  position: absolute;
  line-height: 20px;
  top: -1px;
  right: 5px;
  font-size: 16px;
  width: 40px;
  height: 20px;
  border: 1px solid #89ca3c;
  background-color: #a3d660;
}

.containerTip .tip-container {
  width: 100%;
  padding: 30px 0;
  margin: 0 auto;
  clear: both;
  display: table;
  background-color: #ffffff;
}
.containerTip .img {
  float: left;
  width: 60px;
  height: 60px;
  margin: 0 0 5% 25%;
  /* background-color: red; */
}

.containerTip .tip-title {
  float: right;
  width: 200px;
  height: 50px;
  box-sizing: border-box;
  padding: 20px 0;
  margin: 0 20% 5% 0;
}
.containerTip .tip-title p {
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.containerTip .tip-content {
  display: block;
  margin: 0px auto;
  text-align: center;
  width: 50%;
  height: auto;
  clear: both;
}
.containerTip .tip-content span {
position: relative;
top:6px;
display: inline-block;
font-size: 30px;
width: 30px;
text-align: center;
line-height: 28px;
cursor: pointer;
height: 30px;
border-radius: 50%;
background-color: rgb(0, 217, 255);
}
.containerTip .tip-content .money{
  display: inline-block;
  width: 60%;
  height: 30px;
  font-size: 20px;
  text-align: center;
  color: red;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.containerTip .button-container {
  width: 50%;
  background-color: #ffffff;
  margin: 0 auto;
  display: flex;
  margin-bottom: 40px;
}
.containerTip .button-container .button {
  flex: 1;
  box-sizing: border-box;
  width: 40%;
  /* height: 50px; */
  /* background-color: purple; */
}

.containerTip .button-container .button .button-tip {
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  font-size: 14px;
  background-color: #83c82f;
  transition: all 0.2s;
}
.containerTip .button-container .button .button-tip:hover {
  background: rgba(131, 200, 47, 0.8);
  color: orange;
  text-decoration: none;
}
.containerTip .button-container .button .button-tip:first-child {
  display: block;
}

.containerTip .button-container .button:first-child {
  margin-left: 40px;
  padding-right: 10px;
}
.containerTip .button-container .button:last-child {
  margin-right: 40px;
  padding-left: 10px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
}
@media only screen and (max-width : 480px){
  .containerTip {
    width: 350px;
  }
  .containerTip .img {
  margin: 0 10px 20px 50px
}
.containerTip .tip-title {
  margin: 0 10px 20px 0
}
.containerTip .tip-content span {
  top:3px;
}
.containerTip .button-container {
  width: 70%;
}
}
</style>
