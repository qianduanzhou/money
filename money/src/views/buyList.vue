<template>
    <div class="body">
        <Header></Header>
        <Nav></Nav>
        <div class="container">
            <p class="header">已买产品列表</p>
            <div class="title">
                <p>产品类型</p>
                <p :class="{'active':checked == 'all'}" @click="checked = 'all';
                productName='all';init()">所有产品</p>
                <p v-for="(item,index) in titleList" :key="item"
                :class="{'active':checked == index}" @click="check(index,item)">{{ item }}</p>
            </div>
            <div class="content">
                <div class="item">
                    <p>订单号</p>
                    <p>产品种类</p>
                    <p>产品期限</p>
                    <p>产品利率</p>
                    <p>已买金额</p>
                </div>
                <div class="item" v-for="item in changePage()" :key="item._id">
                    <p>{{ item._id }}</p>
                    <p>{{ item.productName }}</p>
                    <p>{{ item.productData }}</p>
                    <p>{{ item.productRate }}</p>
                    <p>{{ item.productMoney }}</p>
                </div>
            </div>
        </div>
        <div class="page">
            <span @click="pre"></span>
            <span @click="next">></span>
        </div>
        <Tip :tipShow="tipShow" @close="closeTip">
      <img slot="logo" src="static/warn.jpg">
      <p slot="title">当前未登录,请点击登录</p>
      <a href="/#/login" slot="button1" class="button-tip">去登录</a>
      <a href="javascript:;" slot="button2" class="button-tip" @click="tipShow = false">取消</a>
    </Tip>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Tip from "../components/Tip";
import Nav from "../components/Nav";
import axios from 'axios'
export default {
    components:{
        Header,
        Footer,
        Nav,
        Tip
    },
    data() {
        return {
          titleList: [],
          buyList: [],
          productName: 'all',
          checked:'all',
          tipShow: false,
          num : 5,
          first:0,
          last:5
        }
   },
   mounted() {
       this.init()
   },
   methods: {
       closeTip() {
      this.tipShow = false;
    },
       init() {
           var param = {
                productName: this.productName
            }
           axios.get('/users/buyList',{
               params: param
           }).then((response) => {
               let res = response.data
               if(res.status == '0'){
                   this.titleList = res.result.productTitle
                   this.buyList = res.result.productList
               }else{
                   this.tipShow = true;
               }
           })
       },
       check(index,productName) {
           this.checked = index
           this.productName = productName
           this.init()
       },
       //   分页
       pre() {
           if(this.first > 0){
               this.first = this.first - this.num
               this.last = this.last - this.num
               this.init()
           }
       },
       next() {
           if(this.last < this.buyList.length){
               this.first = this.first + this.num
               this.last = this.last + this.num
               this.init()
           }
       },
       changePage() {
           return this.buyList.slice(this.first,this.last)
       },
   }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.active{
    background-color: rgba(0,200,255,0.1);
    color: blue;
}
.container{
    width: 80%;
    margin: 100px auto 0 auto;
    border: 1px solid #ccc;
    box-shadow: 0 0 4px #ccc;
    clear: both;
    display: table;
}
.container .header{
    background-color: #3E424D;
    color: white;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    padding-left: 20px;
}
.container .title{
    float: left;
    width: 10%;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
}
.container .title p{
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    transition: all 0.2s;
}
.container .title p+p{
    font-weight: normal;
}
.container .title p:first-child{
    border-bottom: 1px solid #ccc;
}
.container .content{
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    width: 90%;
    float: left;
}
.container .content p{
    box-sizing: border-box;
    font-size: 16px;
    padding: 10px 0 10px 0; 
    font-weight: bold;
    float: left;
    text-align: center;
}
.container .content p:first-child{
    width: 30%;
}
.container .content p+p{
    width: calc(70%/4);
}
.container .content .item:first-child p{
    border-bottom: 1px solid #ccc;
}
.container .content .item + .item p{
    font-weight: normal;
}

.page{
    width: 500px;
    height: 30px;
    margin: 30px auto 100px auto;
    text-align: center;
}
.page span{
    display: inline-block;
    margin: 0 10px 0 10px;
    width: 40px;
    line-height: 36px;
    height: 40px;
    border-radius: 5px;
    color: white;
    font-size: 30px;
    background-color: aqua;
    transition: background-color .5s;
    cursor: pointer;
}
.page span:hover{
    background-color: blue;
}
@media only screen and (max-width:480px) {
    .container{
        margin-top: 20px;
    }
    .container .title{
    border-bottom: 1px solid #ccc;
    float: none;
    clear: both;
    width: 100%;
    font-size: 14px;
}
.container .title p:first-child{
    font-size: 16px
}
.container .title p + p{
    box-sizing: border-box;
    display: inline-block;
    width: 32.8%;
    padding: 5px;
}
.container .content{
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    width: 100%;
    float: none;
    clear: both;
}
.container .content p{
    box-sizing: border-box;
    font-size: 12px;
    padding: 10px 0 10px 0; 
}
.container .content p:first-child{
    width: 20%;
}
.container .content p+p{
    width: 20%;
}
.container .content .item{
    width: 100%;
    clear: both;
    border-bottom: 1px solid #ccc;
    display: table;
}
.container .content .item+.item p{
    width: 20%;
    padding: 5px 0 5px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.page{
    width: 300px;
    margin: 20px auto 100px auto;
}
.page span{
    width: 40px;
    line-height: 40px;
    height: 40px;
    font-size: 20px;
}
}
</style>
