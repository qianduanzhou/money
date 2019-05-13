<template>
    <div>
        <div class="body"></div>
        <transition name="in" mode="out-in">
        <div class="container" v-if="!tipShow">
            <img src="/static/logo@1x.png" @click="index">
            <transition name="fade">
            <p class="tip" v-if="flag">请输入数字或字母的6位以上16位以下字符</p>
            </transition>
            <div class="input">
                <input type="text" v-model="userName">
                <span class="reset" @click="reset">重新输入</span>
                <i class="user"></i>
                <input type="password" v-model="password">
                <i class="pass"></i>
                <input type="text" class="code" v-model="code">
                <div class="codeContainer" @click="reInit">
                <input type="text" class="code2" v-model="code2" disabled>
                </div>
                <button @click="register">注册</button>
                <span><router-link to="/login" class="login">已注册？去登录</router-link></span>
            </div>
        </div>
        </transition>

        <Tip :tipShow= tipShow @close="closeTip">
            <img :src="'/static/'+registersrc" slot="logo">
            <p slot="title" v-show="registerstatus == 0">注册成功，请选择</p>
            <p slot="title" v-show="registerstatus == 1">用户已存在，请选择</p>
            <a href="/#/" slot="button1" class="button-tip">回首页</a>
            <router-link :to="'/login?userName='+userName" slot="button2" 
            class="button-tip" v-if="registerstatus == 0">登录</router-link>
            <router-link to="/register" slot="button2" @click.native="tipShow = false"
            class="button-tip" v-if="registerstatus == 1">重新注册</router-link>
        </Tip>
    </div>
</template>
<script>
import Tip from '../components/Tip'
import axios from 'axios'
export default {
    components:{
        Tip
    },
   data() {
      return {
          userName: '',
          password: '',
          code:'',
          code2:'',
          flag:false,
          tipShow: false,
          registerstatus: 1,
          registersrc : 'success.jpg'
      }
   },
   watch:{
       userName(newVal){
           if(newVal.match(/^\w{6,16}$/g) != null){
               this.flag = false
           }else{
               this.flag = true
           }
       },
       password(newVal){
           if(newVal.match(/^\w{6,16}$/g) != null){
               this.flag = false
           }else{
               this.flag = true
           }
       }
   },
   mounted() {
       this.tipShow = false
       this.initCode()
   },
   methods:{
       index() {
           this.$router.push({path:'/'})
       },
       reset() {
           this.userName = ''
           this.password = ''
       },
        closeTip() {
           this.tipShow = false;
           this.code = ''
           this.code2 = ''
           this.initCode()
       },
       register() {
           if(this.userName.match(/^\w{6,16}$/g) == null || this.password.match(/^\w{6,16}$/g) == null){
               return this.flag = true
           }else if(this.code != this.code2) {
               this.code = ''
               return window.alert('验证码不正确，请重新输入')
           }
           axios.post('/users/register',{
               userName:this.userName,
               password:this.password
           }).then((response) => {
               let res = response.data
               if(res.status == '2'){
                   this.registerstatus = 1,
                   this.registersrc = 'fail.jpg'
                   this.tipShow = true
               }else if(res.status == '0'){
                   this.registerstatus = 0,
                   this.registersrc = 'success.jpg'
                   this.tipShow = true
                   this.password= ''
               }
           })
       },
       initCode(){
           const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            for(var i = 0; i < 4; i++) {
                let index = Math.floor(Math.random()*36)
                this.code2 = this.code2+random[index]
            }
       },
       reInit() {
           this.code2 = ''
           this.initCode()
       }
   }
}
</script>
<style scoped>

.in-enter, .in-leave-to{
    opacity: 0;
    transform:  scale(0.8)
}
.in-enter-active, .in-leave-active{ 
    transition: all 0.5s linear;
}

.body{
    z-index: -1;
    position: relative;
    width: 100%;
    height: 800px;
    background: url('/static/login-bg.jpg') no-repeat;
    background-size: cover;
    filter: blur(10px);
}
.container{
    position: fixed;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 400px;
    box-sizing: border-box;
    padding: 100px 0;
    height: 500px;
    margin: 0 auto;
    border: 1px solid #ccc;
    background-color: #F7F7F7;
    border-radius: 10px;
}

.container img{
    display: block;
    background: url('/static/logo@1x.png') no-repeat;
    margin: 0 auto
}

.container .input{
    width: 300px;
    text-align: center;
    margin: 50px auto;
}
.container .input input{
    display: block;
    margin: 0 auto 10px auto;
    width: 210px;
    height: 35px;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 40px;
    outline:medium;
    border: 1px solid #ccc;
    border-radius: 10px;
}

.container .input span{
    position: absolute;
    transition: color 0.2s;
    cursor:pointer
}
.container .input span:hover{
    color: orange;
}
.container .input .reset{
    top: 193px;
    right: 30px;
    color:#666666;
    cursor:pointer
}


.container .input .user{
    position: absolute;
    left: 100px;
    top: 190px;
    width: 25px;
    height: 25px;
    background: url('/static/login.svg') no-repeat;
}

.container .input .pass{
    position: absolute;
    left: 100px;
    top: 235px;
    width: 25px;
    height: 25px;
    background: url('/static/pass.jpg') no-repeat;
    background-size: cover
}

.container .input .login{
    display: block;
    font-size: 14px;
    margin: 5px -50px;
    transition: color .2s
}

.container .input .login:hover{
    color: orange;
    text-decoration: none
}
.container .input button{
    display: block;
    margin: 5px auto 5px auto;
    width: 100px;
    height: 30px;
    color: white;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #66D15B;
    transition: color .2s;
}

.container .input button:hover{
    color: orange;
    text-decoration: none
}

.container .tip{
    position: absolute;
    border: 2px solid rgba(255, 0, 0, 0.61);
    padding: 5px;
    display: block;
    left: 78px;
    border-radius: 5px;
    color: red;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
}

.container .input .code{
    padding: 0;
    text-align: center;
    width: 100px;
    display: inline-block;
}
.container .codeContainer{
    display: inline;
}
.container .input .code2{
    width: 80px;
    padding: 0;
    margin-left: 20px;
    border-radius: 0px;
    display: inline-block;
    text-align: center;
    padding-left: 5px;
    letter-spacing: 5px;
    color: #1604f7;
    font-weight: bold;
}
@media only screen and (max-width : 480px) {
    .container{
        width: 350px;
    }
    .container .input .reset{
    top: 193px;
    right: 15px;
    color:#666666;
    cursor:pointer
}
.container .input .user{
    left: 70px;
}
.container .input .pass{
    left: 70px;
}
.container .tip {
    left: 55px;
}
}
</style>
