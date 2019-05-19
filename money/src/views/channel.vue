<template>
  <div class="channel">
      <Header></Header>
      <Nav></Nav>
      <div class="channel-Container">
          <div class="channel-Item" v-for="item in list" :key="item.id" ref="container" @click="toDetail(item)">
              <img :src="item.bimg" class="channer-pic">
              <div class="channer-detail">
                  <p class="channer-title">{{item.title}}</p>
                  <div class="channer-tag-container">
                      <span class="channer-tag" v-for="tag in item.tag_label" :key="tag[1]">{{tag[0]}}</span>
                  </div>
                  <div class="channer-time-container">
                    <span class="channer-time-from">{{item.source}}</span>
                    <span class="channer-time-time">{{item.ts | formatTime}}</span>
                  </div>
              </div>
          </div>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import jsonp from 'jsonp'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Nav from "../components/Nav";
export default {
    data() {
        return {
            page:1,
            loading:true,
            list:[]
        }
    },
    components:{
        Header,
        Footer,
        Nav
    },
    created() {
        this.init()
        this.more()
    },
    filters:{
        formatTime(time) {
            var now = (new Date()).getTime()
            return parseInt((now-time*1000)/1000/60/60) + '小时前'
        }
    },
    destroyed() {
        document.onscroll = null
    },
    methods: {
        init() {
            jsonp(`https://pacaio.match.qq.com/irs/rcd?cid=146&token=49cbb2154853ef1a74ff4e53723372ce&ext=finance_lic&page=${this.page}`,{params:"__jp4"},(err,res) => {
                this.list = this.list.concat(res.data)
                console.log(this.list)
            })
        },
        more() {
            
            document.onscroll =  () => {
                var lastTop = this.$refs.container[this.$refs.container.length-1].offsetTop
                var scroll = document.documentElement.scrollTop
                if(scroll >= lastTop - 600 && this.loading) {
                    this.loading = false
                    this.page = this.page + 1
                    this.init()
                    setTimeout(() => {
                        this.loading = true
                    }, 200);
                }
            }
        },
        toDetail(item) {
            this.$store.commit('setTag',JSON.stringify(item.tag_label))
            this.$store.commit('setImg',item.bimg)
            this.$router.push(`/channelDetail?id=${item.id}&title=${item.title}`)
        }
    }
}
</script>

<style>
.channel-Container {
    margin: 0 auto;
    width: 36rem;
    box-sizing: border-box;
    padding: 2rem;
    display: flex;
    flex-direction: column;
}
.channel-Item {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #E1E1E2;
}
.channer-pic {
    width: 12rem;
    height: 8rem;
    background: red;
}
.channer-detail {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 2rem;
}
.channer-title {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
}
.channer-tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background: #E1E1E2;
    color: #555;
    border-radius: 0.8rem;
    font-size: 1rem;
}
.channer-time-container {
    margin-top: 0.5rem;
    color: #555;
}
.channer-time-time {
    margin-left: 0.5rem;
}
@media screen and (min-width:800px){
    .channel-Container {
    width: 70rem;
    }
    .channel-Item {
        justify-content: flex-start;
    }
    .channer-pic {
        width: 20rem;
        height: 14rem;
        background: red;
    }
    .channer-detail {
        display: flex;
        flex-direction: column;
        margin: 0 0 0 10rem;
    }
    .channer-title {
        font-size: 2.5rem;
        margin: 0 0 2rem 0;
    }
    .channer-tag {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        background: #E1E1E2;
        color: #555;
        border-radius: 0.8rem;
        font-size: 1.5rem;
    }
    .channer-time-container {
        margin-top: 1.5rem;
        color: #555;
        font-size: 1.5rem;
    }
    .channer-time-time {
        margin-left: 1rem;
    }
}
</style>