<template>
  <el-container>
    <el-header height="30px" style="top: 0; z-index: 3000">
      <div class="header" style="
          height: 50px;
          background-color: #4e6996;
          padding-left: 0;
          padding-right: 0;
          min-width: 1000px;
        ">
        <img src="../../../static/icon.svg" style="width: 45px;padding-top: 2px;margin-left: 70px;float: left;">

        <p style="
            font-size: 1.15em;
            font-family: sans-serif;
            margin-left: 20px;
            margin-top: 10px;
            float: left;
            color: #ffffff;
          ">
          学生科技服务与管理平台
        </p>
      </div>
    </el-header>
    <el-main style="padding: 0px" v-loading="loading">
      <!-- <div style="position: absolute;height: 100%;width:100%;z-index: -10;margin: 0;padding:0;">
      <img src="../../../static/background_01.jpg" alt="" style="height: 240px;opacity: 0.7;width: 100%;min-width: 1400px;">
      <p style="position: absolute;opacity:0.8;margin-top:-220px;margin-left: 30%;font-size: 3em;font-family: Hiragino Sans GB;color:#FFFFFF;">修改密码</p>
    </div> -->
      <div class="background" style="
          min-height: calc(100vh - 90px);
          display: flex;
          justify-content: center;
          align-items: center;
        ">
        <div style="
            box-shadow: 1px 1px 10px #8c939d;
            opacity: .9;
            height: 250px;
            width: 520px;
            padding-top: 50px;
            background-color: white;
          ">
          <div>
            <el-button style="margin-left: 110px" :type="modify_type==='Email' ? 'primary':''" @click="change_type()">
              邮件重置
            </el-button>
            <el-button style="margin-left: 100px" :type="modify_type==='Key' ? 'primary':''" @click="change_type()">
              密钥重置
            </el-button>
            <!--            学号输入框-->
            <el-input
              :class="mystep === 1?'':'myhidden'"
              placeholder="请输入学号或工号"
              v-model="Uid"
              @input=""
              style="width: 280px; margin-left: 23%; margin-top: 30px; margin-bottom: 30px;"
              @keyup.enter.native=""></el-input>
            <!--            验证码输入框-->
            <el-input
              :class="[mystep === 2?'':'myhidden']"
              placeholder="验证码"
              v-model="code"
              @input=""
              style="width: 280px; margin-left: 23%; margin-top: 30px; margin-bottom: 30px;"
              @keyup.enter.native=""></el-input>
            <!--            新密码1输入框-->
            <el-input
              :class="mystep === 3?'':'myhidden'"
              placeholder="新密码"
              v-model="newPwd1"
              @input=""
              style="width: 280px; margin-left: 23%; margin-top: 30px; margin-bottom: 30px;"
              @keyup.enter.native=""></el-input>
            <!--            新密码2输入框-->
            <el-input
              :class="mystep === 3?'':'myhidden'"
              placeholder="确认密码"
              v-model="newPwd2"
              @input=""
              style="width: 280px; margin-left: 23%; margin-top: -30px; margin-bottom: 30px;"
              @keyup.enter.native=""></el-input>
            <div
              style="width: 280px; margin-left: 23%; margin-top: -25px;margin-bottom: 15px; font-size: 10px;color: #8C939D"
              :class="mystep === 2?'':'myhidden'">
              {{ preplace }}<span
              style="color:yellowgreen;">{{ modify_type === "Email" ? Uid : "密钥" }}</span>{{ aftplace }}
            </div>
          </div>
          <el-button
            type="primary"
            @click="submitForm()"
            style="margin-left: 140px"
          >提交
          </el-button
          >
          <el-button @click="turnback" style="margin-left: 80px"
          >返回
          </el-button
          >
        </div>
      </div>
    </el-main>

    <el-footer
      height="60px"
      style="
        background-color: #4e6996;
        z-index: 3000;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div
        style="color: white; text-align: center; font-size: 12px"
        v-html="copyRight"
      ></div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "modifyPassword",
  data() {
    return {
      newPwd1: "",           //新密码1
      newPwd2: "",           //新密码2
      mystep: 1,
      modify_type: "Email",//选择的类型
      preplace: "已向您的邮箱",
      aftplace: "发送邮件",
      code: "",
      Uid: "",
      user_id: this.$store.getters.user_id,
      ifStrngth: true,
      copyRight: this.$store.getters.copyRight,
      loading: false
    };
  },
  methods: {
    initdata() {
      this.mystep = 1
      this.Uid = ""
      this.code = ""
      this.newPwd1 = ""
      this.newPwd2 = ""
    },
    change_type() {
      if (this.modify_type === "Email") {
        this.modify_type = "Key"
        this.initdata()
      } else {
        this.modify_type = "Email"
        this.initdata()
      }
    },
    submitForm() {
      console.log(123,"mystep:",this.mystep)
      if (this.mystep === 1) {
        this.loading = true
        this.axios
          .get("/verify/id/" + this.Uid + "?send=true",)
          .then((response) => {
            if (response.data.code === 2000) {
              if (this.modify_type === "Email") {
                this.preplace = "已向您的邮箱"
                this.aftplace = "发送邮件"
              } else {
                this.preplace = "请输入管理员赋予的"
                this.aftplace = "进行重置"
              }
              this.loading = false
              this.mystep = 2
            } else {
              alert(response.data.data)
              this.loading = false
              this.mystep = 1
            }
            console.log(response)
          })
          .catch(function (response) {
          });
      } else if (this.mystep === 2) {
        this.loading = true
        this.axios
          .get("/verify/code/" + this.code + "?id=" + this.Uid,)
          .then((response) => {
            if (response.data.code === 2000) {
              this.mystep = 3
            } else {
              alert(response.data.data)
              this.mystep = 1
            }
            this.loading = false
            console.log(response)
          })
          .catch(function (response) {
          });
      } else {
        console.log("mehe")
        if (this.newPwd1===this.newPwd2) {
          this.axios
            .post(
              "/user/newpassword",
              {
                code: this.code,
                id: this.Uid,
                newPassword: this.newPwd1,
              },
              {}
            )
            .then((response) => {
              if (response.data.code === 2000) {
                this.$router.back(-1);
                alert("修改密码成功")
              } else {
                alert("修改密码失败")
              }
              console.log(response);
            })
            .catch(function (response) {
              console.log(response);
            });

          // this.$message.error("新密码不一致");
        } else {
          alert("新密码不一致")
          this.mystep = 1
        }
      }

    },
    turnback() {
      // 回到上一个路由地址
      this.$router.back(-1);
    },
  },
};
</script>

<style scoped>
.NotOk .el-input__inner {
  border-color: crimson !important;
}

.background:before {
  background: url("../../../static/background.jpg") no-repeat;
  background-size: cover;
  width: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  /*-1 可以当背景*/
  -webkit-filter: opacity(70%);
  filter: opacity(70%);
}

.myhidden {
  display: none;
}

.el-header {
  padding: 0 0px;
}
</style>

