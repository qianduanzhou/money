// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userName: '',
    tag:'',
    img:'',
    info:'北京时间5月17日周五晚23点08分，即美股开盘一个半小时后，瑞幸咖啡正式开始交易。赴美上市首日开盘价报25美元，较IPO发行价17美元/ADS大涨47.06%。发行价位于指导区间15-17美元的上限。\nIPO规模为3300万股，募资5.61亿美元，市值接近60亿美元。分析指出，瑞幸咖啡IPO发行股数较最初预期高出300万股，按17美元发行价估算的市值为42亿美元，上市前最后一次私下融资的估值为30亿美元。\n瑞幸咖啡IPO首日的交易过程如下：\n正式交易五分钟内，瑞幸咖啡触及日高25.96美元，较发行价上涨52.7%。交易10分钟内，最低触及23.32美元，较发行价涨37%。'
  },
  mutations:{
    updataUserInfo(state,userName){
      state.userName = userName
    },
    setTag(state,tag) {
      state.tag = tag
    },
    setImg(state,img) {
      state.img = img
    },
    setInfo(state,info) {
      state.info = info
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
