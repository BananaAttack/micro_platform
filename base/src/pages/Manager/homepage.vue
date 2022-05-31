<template>
  <el-container>
    <el-header height="50px" style="position: -webkit-sticky;position: sticky;top:0;z-index: 3000;">
      <div class="header"
        style="height: 50px;background-color: #4E6996;padding-left: 0;padding-right: 0;min-width: 1000px;">
        <img src="../../../static/icon.svg" style="width: 45px;padding-top: 2px;margin-left: 70px;float: left;">

        <p
          style="font-size: 1.15em;font-family:sans-serif;margin-left: 20px;margin-top: 10px; float: left;color:#FFFFFF">
          学生科技服务与管理平台</p>
        <div>
          <div style="float: right;margin-right: 100px;margin-top:15px;">
            <el-link target="_blank" @click="goBack" style="color: #FFFFFF;">退出</el-link>
          </div>
          <div
            style="width: 1px;height: 20px;background-color: #C0C0C0;float: right;margin-right: 30px;margin-top: 15px;">
          </div>
          <div style="float: right;margin-right: 30px;margin-top: 0px;">
            <p style="font-size: 0.75em;margin-left: 4px;margin-top: 8px;color: #FFFFFF;">管理员</p>
            <!-- TODO:改为history路由需要修改此处 -->
            <el-link href="/#/admin_modify_password" type="primary"
              style="font-size: 0.75em;color: #c0c0c0; text-decoration: underline;">修改密码</el-link>
          </div>
        </div>
        <!-- <div style="float: right;margin-top: -10px;margin-right: 80px; width: 60px;height: 60px;">
            <img src="../../../static/message.svg" alt="" style="width: 35px;margin-left: 10px;margin-top: 18px;"
              @click="$router.push('/mailbox')">
            <div v-if="mail.length != 0"
              style="position: absolute;width: 15px;height: 15px;background-color: crimson;border-radius: 50%;margin-top: -40px;margin-bottom: 0px;">
              <p style="color: white;margin-left: 5px;margin-top: 0px;font-size: 12px;">{{mail}}</p>
            </div>
        </div> -->
        <div style="float: right;margin-right: 100px;margin-top:15px;">
          <el-link target="_blank" @click="$router.push('/recycleBin')" style="color: #FFFFFF;">回收站</el-link>
        </div>
        <div class="header_2">
          <!-- <div style="float: right;margin-top: -10px;margin-right: 80px; width: 60px;height: 60px;">
            <img src="../../../static/message.svg" alt="" style="width: 40px;margin-left: 10px;margin-top: 15px;"
              @click="$router.push('/mailbox')">
            <div v-if="mail.length != 0"
              style="position: absolute;width: 15px;height: 15px;background-color: crimson;border-radius: 50%;margin-top: -45px;margin-bottom: 0px;">
              <p style="color: white;margin-left: 5px;margin-top: 0px;font-size: 12px;">{{mail}}</p>
            </div> -->

        </div>
        <div>
          <!-- <p style="font-size: 1.5em;color:#000000;margin-top: 40px;margin-left: 60px;color: white;">管理员</p> -->
        </div>
      </div>

    </el-header>

    <el-container>

      <el-aside class="sideBar"
        style="overflow: scroll;overflow-y:scroll;bottom:0px;width: 250px;position: fixed;top:50px;height: calc(100vh - 110px);"><!-- max-height: calc(100vh - 110px); -->
        <!-- <el-aside class="sideBar" height="100%"> -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#fff" text-color="#545c64" router active-text-color="#1E90FF"
          style="height: 100%;">

          <el-menu-item index="/statistics">
            <i class="el-icon-s-data"></i>
            <span>数据统计</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-flag"></i>
              <span @click="$router.push('/achievements/summary')">学生科技成果</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/achievements/competition">竞赛</el-menu-item>
              <el-menu-item index="/achievements/projects">项目</el-menu-item>
              <el-menu-item index="/achievements/paper">论文</el-menu-item>
              <el-menu-item index="/achievements/patent">知识产权</el-menu-item>
              <el-menu-item index="/achievements/honor">荣誉</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/update/update">
            <i class="el-icon-upload"></i>
            <span>上传科技成果</span>
          </el-menu-item>

          <el-menu-item index="/mailbox">
            <i class="el-icon-document-copy"></i>
            <span>待审核成果</span>
          </el-menu-item>

          <el-menu-item index="/achieve_subset/list">
            <i class="el-icon-s-grid"></i>
            <span>成果子集</span>
          </el-menu-item>

          <!-- <el-menu-item index="/react_app">
            <i class="el-icon-s-grid"></i>
            <span>react子应用</span>
          </el-menu-item> -->

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-receiving"></i>
              <span>配置项管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/competition&project_items/competition_items">竞赛条目</el-menu-item>
              <el-menu-item index="/competition&project_items/project_items">项目条目</el-menu-item>
              <el-menu-item index="/competition&project_items/add_typeAlevel">添加类型/级别</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户身份管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/identity/configuration">班级等配置项</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="5">
              <template slot="title">学生</template>
              <el-menu-item index="/identity/student">本院学生</el-menu-item>
              <el-menu-item index="/identity/student_outer">外院学生</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">教师</template>
              <el-menu-item index="/identity/teacher">本院教师</el-menu-item>
              <el-menu-item index="/identity/teacher_outer">外院教师</el-menu-item>
            </el-submenu>
            <el-menu-item-group>
              <el-menu-item index="/identity/key_reset">重置密钥</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main
          style="margin-left: 250px;padding:5px;display: flex;align-items: center;flex-direction: column;min-height: calc(100vh - 110px);">
          <div style="width: 95%;">
            <!-- 缓存所有列表，在store的components中处理 -->
            <keep-alive :include="catch_components">
              <router-view style="padding-bottom: 30px;padding-top: 20px;"></router-view>
            </keep-alive>
            <div id="react"></div>
            <!-- <div id="react-test" class="single-spa-react">
            <div id="react"></div>
          </div> -->
          </div>
        </el-main>
      </el-container>

      <el-footer height="60px"
      style="min-width: 1000px;background-color: #4E6996;z-index: 3000;width: 100%;display: flex;justify-content: center;align-items: center;">
      <div style="color: white;text-align: center;font-size: 12px;" v-html="copyRight"></div>
    </el-footer>

    </el-container>





  </el-container>
</template>

<script>
  export default {
    name: "amdinHomepage",
    data() {
      return {
        user_id: this.$store.getters.user_id,
        role: this.$store.getters.roles,
        url: {
          competition: '',
          projects: '',
          paper: '',
          patent: '',
          competition_items: '',
          project_items: '',
          add_typeAlevel: '',
          student: '',
          teacher: '',
          configuration: '',
          summary: ''
        },
        mail: '',//邮件数量
        copyRight: this.$store.getters.copyRight,
      }
    },
    methods: {
      goBack() {
        this.$router.push('/login');
        sessionStorage.setItem('Token', '');
        //TODO:重新加载文档可以重置路由，但页面也会重新加载，效果不好，最好更换方法
        location.reload();
      },
      /* check_role(){
        if(this.role != "admin"){
          this.$router.push('/');
          sessionStorage.setItem('Token', '');
          sessionStorage.setItem('user_id', '');
          sessionStorage.setItem('role', '');
          this.$message({
            message:"请先登录",
            type:'warning'
          });
        }
      }, */
      get_mail() {
        this.axios
          .get("/query/adm/achievement", {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.mail = response.data.data.list.length;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      /* get_student() { //搜索学生
        this.axios.get('/user/stu/info?user_id=' + this.user_id, {
          headers: {
            'Token': Token
          },
        })
          .then(response => {
            this.user = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      }, */
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
      //this.check_role();
      this.get_mail();
    },
    //计算属性存放需要缓存的路由，从store中获取
    computed: {
      catch_components() {
        return this.$store.getters.get_catch;
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-header {
    padding: 0 0px;
  }

  .header_2 {
    height: 70px;
    width: 100%;
  }

  .header_2:before {
    background: url('../../../static/background_01.jpg') no-repeat;
    background-size: cover;
    height: 50px;
    width: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    /*-1 可以当背景*/
    -webkit-filter: opacity(70%);
    filter: opacity(70%);
  }

  .sideBar {
    &::-webkit-scrollbar {
      display: none;
    }

    ;
  }
</style>
