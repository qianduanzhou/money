<template>

  <div class="channelDetail">
    <Header></Header>
    <Nav></Nav>
    <p class="channelDetail-title">{{data.title}}</p>
    <div class="channelDetail-tagContainer">
        <span v-for="item in data.tag" :key="item[1]">{{item[0]}}</span>
    </div>
    <img :src="data.img" class="channelDetail-img"/>
    <ul class="infoList" v-for="(item,index) in data.info" :key="index">
        <li class="info">{{item}}</li>
    </ul>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Nav from "../components/Nav";
export default {
    data() {
        return {
            data:{}
        }
    },
    components:{
        Header,
        Footer,
        Nav
    },
    created() {
        this.init()
    },
    methods:{
        init() {
            var info = this.$store.state.info.split('\n')
            this.data = {
                title: this.$route.query.title,
                tag: JSON.parse(this.$store.state.tag),
                img: this.$store.state.img,
                info: info
            }
        }
    }
}
</script>

<style>
.channelDetail-title {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
}
.channelDetail-tagContainer {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
.channelDetail-tagContainer span {
    font-size: 1.6rem;
    margin: 0 2rem;
    border: 1px solid #ccc;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
}
.channelDetail-img {
    width: 90%;
    display: block;
    margin: 0 auto;
}
.infoList {
    width: 90%;
    margin: 2rem auto;
    font-size: 1.8rem;
    color:black;
    line-height: 3rem;
}
@media screen and (min-width:800px){
    .channelDetail-title {
        margin: 0 auto;
        font-size: 3rem;
    }
    .channelDetail-tagContainer {
        display: flex;
        justify-content: center;
        margin: 4rem 0;
    }
    .channelDetail-tagContainer span {
        font-size: 2rem;
        margin: 0 5rem;
    }
    .channelDetail-img {
        width: 50%;
    }
    .infoList {
        width: 50%;
        font-size: 2.5rem;
        color:black;
        line-height: 4rem;
    }
}
</style>