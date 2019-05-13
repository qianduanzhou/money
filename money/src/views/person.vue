<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <div class="container">
      <p class="title">用户中心</p>
      <img :src="'/static/'+picture" alt="头像">
      <p>用户名</p>
      <input type="text" v-model="userName" disabled>
      <p>密码</p>
      <input type="password" v-model="userPwd">
      <p>姓名</p>
      <input type="text" v-model="name">
      <p>性别</p>
      <input type="radio" name="sex" value="man" ref="man" v-model="sex">
      <span>男</span>
      <input type="radio" name="sex" value="woman" ref="woman" v-model="sex">
      <span>女</span>
      <p>年龄</p>
      <input type="number" v-model="age">
      <p>生日</p>
      <input type="date" v-model="birth">
      <p>电话</p>
      <input type="number" v-model="phone">
      <p>地址</p>
      <input
        type="file"
        class="file"
        name='file'
        ref="file"
        accept="image/png,image/gif,image/jpeg"
        @change="changePic($event)"
        size="100"
        style="width:70px;height:100px"
      >
      <input type="text" v-model="address">
      <br>
      <button @click="tipShow = true">修改</button>
      <button @click="reset">重置</button>
    </div>
    <Tip :tipShow="tipShow" @close="closeTip">
      <img src="static/warn.jpg" slot="logo">
      <p slot="title">请确认是否修改</p>
      <a href="javascript:;" slot="button1" class="button-tip" @click="modify">确定</a>
      <a href="javascript:;" slot="button2" class="button-tip" @click="tipShow = false">取消</a>
    </Tip>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Nav from "../components/Nav";
import Tip from "../components/Tip";
import axios from "axios";
import qs from 'qs'
export default {
  components: {
    Header,
    Nav,
    Footer,
    Tip
  },
  data() {
    return {
      userName: "",
      userPwd: "",
      name: "",
      age: "",
      sex: "",
      birth: "",
      address: "",
      picture: "",
      phone: "",
      tipShow: false
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    //  input的change事件
    changePic(event) {
      this.file = event.target.files[0];
      let data = new FormData();
      data.append('file',this.file);
      console.log(data.get('file'))
       axios({
              method: 'post',
              url: '/uploadimg',
              data:data,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              let res = response.data
              let picture = res.result
              picture = picture.replace(/C:\\fakepath\\/g, "");
              this.picture = picture;
            })
    },
    closeTip() {
      this.tipShow = false;
    },
    init() {
      let userName = this.$route.query.userName;
      axios
        .get("/users/person", {
          params: {
            userName: userName
          }
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.userName = res.result.userName;
            this.userPwd = res.result.userPwd;
            this.name = res.result.name;
            this.age = res.result.age;
            this.sex = res.result.sex;
            this.birth = res.result.birth;
            this.address = res.result.address;
            this.picture = res.result.picture;
            this.phone = res.result.phone;

            if (this.sex == "man") {
              this.$refs.man.checked = true;
              this.$refs.woman.checked = false;
            } else {
              this.$refs.woman.checked = true;
              this.$refs.man.checked = false;
            }
          }
        });
    },
    reset() {
      this.userPwd = "";
      this.name = "";
      this.age = "";
      this.sex = "";
      this.birth = "";
      this.address = "";
      this.picture = "";
      this.phone = "";
    },
    modify() {
      let picture = this.picture;
      console.log(picture)
      if (picture == "") {
        picture = this.picture;
      } else {
        picture = picture.replace(/C:\\fakepath\\/g, "");
      }
      axios
        .post("./users/modify", {
          userName: this.$route.query.userName,
          userPwd: this.userPwd,
          name: this.name,
          age: this.age,
          sex: this.sex,
          birth: this.birth,
          address: this.address,
          picture: picture,
          phone: this.phone
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            //    this.init()
            window.alert("修改成功");
            this.tipShow = false;
          }
        });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
nav a {
  margin: 1.3rem 1rem;
}
.container {
  position: relative;
  width: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px #ccc;
  border-radius: 5px;
}
.file {
  position: absolute;
  top: 39px;
  right: 21px;
  width: 80px;
  height: 100px;
  opacity: 0;
}
.container span {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  margin: 0 3px 0px 3px;
  top: -5px;
}
.container img {
  position: absolute;
  right: 20px;
  width: 80px;
  height: 100px;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px #ccc;
}
.container p:first-child {
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
}
.container p {
  margin: 5px 0 5px 50px;
}
.container input {
  margin: 0px 0 5px 50px;
  width: 200px;
  height: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 0 px #ccc;
  font-size: 14px;
  padding-left: 10px;
}
.container input:nth-of-type(1),
.container input:nth-of-type(2),
.container input:nth-of-type(3),
.container input:nth-of-type(6) {
  width: 100px;
}
.container input:nth-of-type(5) {
  margin-left: 0;
  width: 20px;
  height: 20px;
}
.container input:nth-of-type(4) {
  width: 20px;
  height: 20px;
}
.container button:nth-of-type(1) {
  margin: 10px 10px 20px 150px;
}
.container button {
  width: 50px;
  height: 30px;
  background-color: #009b9b;
  color: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px #ccc;
  border-radius: 3px;
  transition: background-color 0.5s;
  cursor: pointer;
}
.container button:hover {
  background-color: green;
}
@media only screen and (max-width: 480px){
.container {
  width: 350px;
}
.container button:nth-of-type(1) {
  margin: 10px 10px 20px 110px;
}
}
</style>
