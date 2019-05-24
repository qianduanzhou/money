<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <section class="report clearfix">
      <p>平台累计成交金额
        <em>{{allMoney | filterMoney}}</em>万元
      </p>
      <p>过去七日成交金额
        <em>{{sevenMoney | filterMoney}}</em>万元
      </p>
      <p>
        <router-link to="/report" class="report-a">查看平台运营报告</router-link>
      </p>
    </section>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in imgList" :key="item.id">
          <picture>
            <source media="(min-width:50em)" :srcset="'/static/'+ item.advertImgList.L" :alt="item.advertName">
            <source media="(min-width:30em)" :srcset="'/static/'+ item.advertImgList.M" :alt="item.advertName">
            <img :src="'/static/'+ item.advertImgList.S" :alt="item.advertName">
          </picture>
        </div>
      </div>
      <div class="swiper-pagination"></div>
       <div class="swiper-button-prev"></div><!--左箭头-->
    <div class="swiper-button-next"></div><!--右箭头-->
    </div>
    <section class="self-container clearfix">
      <div class="self-item">
        <p class="self-title">安全</p>
        <div class="self-info">
          <p>国家AAA信用平台</p>
          <p>银行资金托管</p>
          <p>上市公司保证</p>
        </div>
      </div>
      <div class="self-item">
        <p class="self-title">安全</p>
        <div class="self-info">
          <p>国家AAA信用平台</p>
          <p>银行资金托管</p>
          <p>上市公司保证</p>
        </div>
      </div>
      <div class="self-item">
        <p class="self-title">安全</p>
        <div class="self-info">
          <p>国家AAA信用平台</p>
          <p>银行资金托管</p>
          <p>上市公司保证</p>
        </div>
      </div>
    </section>
    <section class="new">
      <p>最新公告：
        <span class="data">2019-02-01</span>
        <em>
          元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦
          期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间
          元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦
          期间元旦期间元旦期间元旦期间元旦期间元旦期间元旦期间
        </em>
      </p>
    </section>
    <section class="product clearfix" v-for="(item,index) in productList" :key="item.id" >
      <div class="product-title">
        <h1>{{ item.productName}}</h1>
        <b
          v-for="item0 in productList[index].productInfoList"
          :key="item0._id"
        >{{ item0.productInfo}}</b>
      </div>
      <div
        class="product-container"
        v-for="item1 in productList[index].productTypeList"
        :key="item1._id"
        @click="toDetail(item1)"
      >
        <div class="product-item">
          <p class="time">
            <i>{{item1.productData}}</i>个月
          </p>
          <div class="in">
            <p>
              月底年化收益率:
              <span class="rate">
                {{item1.productRate}}
                <b>起</b>
              </span>
            </p>
            <p>
              总成交金额:
              <span class="money">
                {{item1.productMoney | filterMoney}}
                <b>万元</b>
              </span>
            </p>
          </div>
          <div class="bug">
            <a href="javascript:;" class="bug-a" @click.stop="bugTip(item1.productName,item1._id)">购买</a>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    <Tip :tipShow="tipShow" @close="closeTip">
      <img slot="logo" src="/static/warn.jpg">
      <p slot="title" v-if="$store.state.userName">请输入购买的产品金额</p>
      <p slot="title" v-if="!$store.state.userName">当前未登录，请选择</p>
      <div slot="content" v-if="$store.state.userName">
        <span class="down" @click="down">-</span>
        <input class="money" type="number" min="1000" max="50000" v-model="money">
        <span class="up" @click="up">+</span>
      </div>
      <a href="javascript:;" slot="button1" class="button-tip" @click="buy" v-if="$store.state.userName">确定</a>
      <a href="/#/login" slot="button1" class="button-tip" v-if="!$store.state.userName">登录</a>
      <a href="javascript:;" slot="button2" class="button-tip" @click="tipShow = false">取消</a>
    </Tip>
  </div>
</template>
<script>
import "../assets/css/normalize.css";
import "../assets/css/main.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Tip from "../components/Tip";

import axios from "axios";

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

//  异步加载 方式一
// const Header = (resolve) => {
//   setTimeout(() => {
//     require(['../components/Header.vue'],resolve)
//   }, 10);
// }
//  异步加载 方式二
export default {
  components: {
    Header,
    Footer,
    Tip,
    Nav
  },
  data() {
    return {
      productList: [],
      imgList:[],
      tipShow: false,
      money: 1000,
      allMoney: 0,
      sevenMoney:0,
      productName: "",
      productData: ""
    };
  },
  mounted() {
    // this.init()
    this.initAd() 
    this.initMoney()
  },
  filters:{
    filterMoney: function(value){
      return value = Math.floor(value/1000)/10
    }
  },
  methods: {
    closeTip() {
      this.tipShow = false;
      this.money = 1000
    },
    mySwiper() {
      let mySwiper = new Swiper(".swiper-container", {
        //  direction: 'vertical',    //翻转方向
        loop: true,
        autoplay: {
          //自动播放，里面有很多参数可以根据需求进行调试
          delay: 3000,
          disableOnInteraction: true //触碰后停止
        },
        effect: "coverflow", //翻转方式
        pagination: {
          el: ".swiper-pagination", //分页
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },
    // 获取公告列表
    initAd() {
      axios.get('/products/advert').then((response) => {
        let res = response.data
        if(res.status == '0') {
          this.imgList = res.result
           // DOM还没有更新
          this.$nextTick(() => {
          // DOM更新了
          // swiper重新初始化
          this.mySwiper()
    })
        }
      })
    },

    // 获取产品列表
    init() {
      axios.get("/products/list").then(response => {
        let res = response.data;
        if ((res.status = "0")) {
          this.productList = res.result;
        }
      });
    },
    initMoney(){
      axios.get('/products/buyMoney').then((response) => {
        let res = response.data
        if(res.status == '0') {
          this.allMoney = res.result.allMoney
          this.sevenMoney = res.result.sevenMoney
          this.init()
        }
      })
    },
    down() {
      if (this.money >= 2000) {
        this.money = parseInt(this.money) - 1000;
      }
    },
    up() {
      if (this.money <= 49000) {
        this.money = parseInt(this.money) + 1000;
      }
    },
    bugTip(name,id) {
       this.tipShow = true
       this.productName = name
       this.productId = id
    },
    buy() {
       axios.post('/users/buy',{
          productName: this.productName,
          productId: this.productId,
          productMoney:this.money
       }).then((response) => {
          let res = response.data
          if(res.status == '0') {
             window.alert('购买完成')
             this.initMoney()
             this.tipShow = false
             this.money = 1000
          }
       })
    },
    toDetail(item) {
      this.$router.push('/productdetail/'+item._id+'/'+item.productName)
    }
  }
};
</script>
<style>
</style>
