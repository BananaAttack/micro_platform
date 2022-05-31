<template>
  <div class="container">
    <div class="main">
      <img src="../../../static/icon.svg" style="width: 130px;margin-top: 50px;">
      <div>
        <p style="font-size: 28px;font-weight: bolder;color:white">学生科技服务与管理平台</p>
        <p style="font-size: 20px;padding-top: 20px;padding-bottom: 20px;color:white">学生教师登录</p>
      </div>
      <el-input class="userinput" prefix-icon="el-icon-user" placeholder="学号或工号" v-model="username"></el-input>
      <el-input class="userinput" prefix-icon="el-icon-lock" placeholder="默认密码为学号或工号" type="password" v-model="password"></el-input>
      <el-button class="userinput" @click="goNext" type="primary" style="margin-top: 20px">登录</el-button>
      <br>
      <div style="width: 80%;padding-left: 10%">
        <span class="footButtonBg" style="text-align: left"><a class="footButton" @click="ForgetKey" >忘记密码</a></span>
      <span class="footButtonBg" style="text-align: right"><a class="footButton" @click="toAdmin" >管理员登录</a></span>
      <span class="footButtonBg" style="text-align: left;display:block"><a class="footButton" @click="toCheckReport" >获取认证报告</a></span>
      </div>
      <div class="footer">
        Copyright 陈佳威 1710080232<br>
        软件1802班 浙江工商大学
      </div>
    </div>
  </div>
</template>

<script scoped>
  import router from "../../router";
  import {
    adminRouterMap,
    stuRouterMap,
    teaRouterMap,
    constantRouterMap,
  } from "../../router";

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      toCheckReport(){
this.$router.push("/check_report")
      },
      ForgetKey() {
        this.$router.push("/modify_password");
      },
      toAdmin() {
        this.$router.push("/admin_login");
      },
      goNext() {
        this.axios
          .post("/user/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            if (response.data.code == 2000) {
              //在浏览器中存放token、user_id、role用于后续调用
              sessionStorage.setItem("Token", response.data.data.Token);
              switch (response.data.data.role) {
                case "admin": {
                  router.addRoutes(adminRouterMap);
                }
                case "student": {
                  router.addRoutes(stuRouterMap);
                }
                case "teacher": {
                  router.addRoutes(teaRouterMap);
                }
              }
              this.$router.push("/");
            } else {
              this.$message.error("用户名或密码错误");
              this.username = "";
              this.password = "";
            }
          })
          .catch(function (response) {
            console.log(response);
          });
      },
    },
    created() {
    },
  };
</script>

<style scoped lang="scss">
  .container {
    background: url("../../../static/background.jpg") no-repeat;
    background-size: cover;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
  }
  .main {
    margin:0 auto;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 460px;
    height: 100%;
  }

  .footButtonBg{
    float:left;
    width:49%;
    padding-top: 1%;
    font-size: 14px;
    color: white;
    text-shadow: 0px 0px 3px #000;
  }

  .footButton:hover{
    cursor: pointer;
  }

  .userinput {
    min-width: 360px;
    max-width: 360px;
    height: 40px;
  }

  .footer {
    position: absolute;
    bottom: 5%;
    color: white;
    font-size: 12px;
    width: 460px;
    text-shadow: 0px 0px 3px #000;
  }
  //上面为新的

</style>
