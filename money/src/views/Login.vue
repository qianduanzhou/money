<template>
    <div>
        <div class="body"></div>
        <transition name="in" mode="out-in">
        <div class="container" v-if="!tipShow">
            <img src="/static/logo@1x.png" @click="index">
            <div class="input">
                <input type="text" v-model="userName">
                <span class="reset" @click="reset">重新输入</span>
                <i class="user"></i>
                <input type="password" v-model="password">
                <span><router-link to="/modify">忘记密码？点击修改</router-link></span>
                <i class="pass"></i>
                <button @click="login">登录</button>
                <a href="/#/register" class="register">没有帐号？点击注册</a>
            </div>
        </div>
        </transition>
        
        <Tip :tipShow = tipShow @close="closeTip">
            <img :src="'/static/'+logosrc" slot="logo">
            <p slot="title" v-show="loginstatus == 0">登录成功，请选择</p>
            <p slot="title" v-show="loginstatus == 1">帐号或密码错误，请选择</p>
            <a href="/#/" slot="button1" class="button-tip">回首页</a>
            <router-link to="/buyList" slot="button2" 
            class="button-tip" v-if="loginstatus == 0">已买产品</router-link>
            <router-link to="/login" slot="button2" @click.native="tipShow = false"
            class="button-tip" v-if="loginstatus == 1">重新登录</router-link>
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
          userName:'',
          password:'',
          tipShow:false,
          loginstatus: 1,
          logosrc:'success.jpg'
      }
   },
   mounted(){
       this.UserName()
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
       },
       login() {
           if(this.userName == '' && this.password ==''){
               return window.alert('帐号密码不能为空')
           }
           axios.post('/users/login',{
               userName:this.userName,
               password:this.password
           }).then((response) => {
               let res = response.data
               if(res.status == '2'){
                   this.loginstatus = 1,
                   this.logosrc = 'fail.jpg'
                   this.tipShow = true
                   this.password= ''
               }else if(res.status == '0'){
                   this.loginstatus = 0,
                   this.logosrc = 'success.jpg'
                   this.tipShow = true
                   this.userName= ''
                   this.password= ''
                   this.$store.commit("updataUserInfo",res.result.userName)
               }
           })
       },
       //   通过路由传过来的userName
       UserName() {
           this.userName = this.$route.query.userName
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
    margin-bottom: 10px;
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
.container .input a{
    transition: color .2s;
}
.container .input a:hover{
    color: orange;
    text-decoration: none
}
.container .input .register{
    font-size: 14px;
}

.container .input button{
    display: block;
    margin: 5px auto 10px auto;
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
}
</style>
