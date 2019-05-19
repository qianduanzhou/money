<template>
  <div class="detail">
    <mon-header></mon-header>
    <mon-nav></mon-nav>
      <p class="title">{{detail.productName}}</p>
      <div class="infoContainer">
        <div class="itemContainer">
          <p class="item">期限: <span>{{detail.productData}}</span>个月</p>
        </div>
        <div class="itemContainer">
          <p class="item">已购买: <span>{{detail.productMoney | filterMoney}}</span>万</p>
        </div>
        <div class="itemContainer">
          <p class="item">利率: <span>{{detail.productRate}}</span></p>
        </div>
      </div>
      <div class="productDetial">
        <p class="detailTitle">介绍：</p>
        <p class="detailContent">
          {{detail.productDetial}}
        </p>
      </div>
      <div href="javascript:;" class="buy" @click.stop="bugTip()">购买</div>
      <mon-footer></mon-footer>

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
import axios from 'axios'
import monHeader from '../components/Header.vue'
import monNav from '../components/Nav'
import monFooter from '../components/Footer'
import Tip from '../components/Tip'

export default {
  data() {
    return {
      detail:[],
      tipShow: false,
      productName:'',
      productId:'',
      money:1000
    }
  },
  components: {
    monHeader,
    monNav,
    monFooter,
    Tip
  },
  created() {
    this.init()
    console.log(this.$route.params.id)
  },
  filters:{
    filterMoney: function(value){
      return value = Math.floor(value/1000)/10
    }
  },
  methods: {
    init() {
      axios.get('/products/detail',{
        params:{
          id:this.$route.params.id,
          name:this.$route.params.name
        }
      }).then((result) => {
        let res = result.data
        this.detail = res.result
        console.log(this.detail)
      })
    },
    bugTip(name,id) {
       this.tipShow = true
       this.productName = this.$route.params.name
       this.productId = this.$route.params.id
    },
    closeTip() {
      this.tipShow = false;
      this.money = 1000
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
  }
}
</script>

<style scoped>
  .detail {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 2rem;
    text-align: center;
    background: green;
    box-shadow: 0 0.5rem 0.2rem green;
    color: white;
    margin: 0;
  }
  .infoContainer {
    display: flex;
    justify-content: space-around;
  }
  .itemContainer {
    font-size: 1.5rem;
  }
  .itemContainer .item {
    color: green;
  }
  .itemContainer span {
    color: orange;
    padding: 0.3rem;
    font-weight: bold;
  }
  .productDetial .detailTitle {
    font-size: 1.8rem;
    font-weight:bold;
  }
  .detailContent {
    font-size: 1.5rem;
    padding: 0 1rem;
  }
  .buy {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    color: white;
    background: orange;
    padding: 0.5rem 0;
    font-size: 1.6rem;
    border-radius: 0.5rem;
  }
</style>