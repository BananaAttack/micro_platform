<template>
  <el-container>
    <el-header height="30px" style="position: -webkit-sticky;position: sticky;top:0;z-index: 3000;">
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

          <div style="float: right;margin-right: 30px;margin-top: 0px;display: inline-block;">
            <p style="font-size: 0.75em;margin-left: 4px;margin-top: 8px;color: #FFFFFF;">{{user.realName}}</p>
            <el-link href="/#/modify_password" type="primary"
              style="font-size: 0.75em;color: #c0c0c0; text-decoration: underline;">修改密码</el-link>
          </div>

          <div style="display: inline-block;float: right;cursor: pointer;">
            <img :src="user.picture" @click="$router.push('/motify_information')"
              style="width: 40px;margin-top: 5px;margin-right: 10px;border-radius: 50%;">
          </div>

        </div>
        <!-- <div style="float: right;margin-top: -10px;margin-right: 60px; width: 60px;height: 60px;">
          <img src="../../../static/message.svg" alt="" style="width: 35px;margin-left: 10px;margin-top: 18px;"
            @click="$router.push('/mailbox')">
          <div v-if="mail.length != 0"
            style="position: absolute;width: 15px;height: 15px;background-color: crimson;border-radius: 50%;margin-top: -40px;margin-bottom: 0px;">
            <p style="color: white;margin-left: 5px;margin-top: 0px;font-size: 12px;">{{mail}}</p>
          </div>
        </div> -->

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
      <el-aside class="sideBar" height="100%"
        style="top:50px;overflow: hidden;position:fixed;overflow-y:scroll;bottom:0;width: 250px;">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#fff" text-color="#545c64" router active-text-color="#1E90FF"
          style="height: 100%;min-height: 800px;">
          <el-menu-item index="/achievements/summary">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的成果物</span>
            </template>
          </el-menu-item>
          <!-- <el-menu-item index="/Student/update/index">
            <i class="el-icon-setting"></i>
            <span>上传科技成果</span>
          </el-menu-item> -->

          <!--  <el-menu-item index="/Manager/summary/sum_studentTechnology">
              <i class="el-icon-setting"></i>
              <span>学生科技数据汇总表</span>
            </el-menu-item>

            <el-submenu index="5">
                           <template slot="title">
                             <i class="el-icon-location"></i>
                             <span>汇总表</span>
                           </template>
                           <el-menu-item-group>
                             <el-menu-item index="/Manager/summary/sum_studentTechnology">学生科技数据汇总</el-menu-item>
                           </el-menu-item-group>
                         </el-submenu>  -->

          <!-- <el-submenu index="6">
                           <template slot="title">
                             <i class="el-icon-location"></i>
                             <span>学生画像</span>
                           </template>
                           <el-menu-item-group>
                             <el-menu-item index="6-1">学生能力画像</el-menu-item>
                             <el-menu-item index="6-2">科技实践能力画像</el-menu-item>
                           </el-menu-item-group>
                         </el-submenu>

                         <el-menu-item index="7">
                                 <i class="el-icon-setting"></i>
                                 <span>成果子集</span>
                               </el-menu-item>

                               <el-menu-item index="8">
                                       <i class="el-icon-setting"></i>
                                       <span>评分</span>
                                     </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main style="margin-left: 250px;padding:5px;display: flex;align-items: center;flex-direction: column;min-height: calc(100vh - 90px);overflow:hidden">
        <div style="width: 95%;">
          <!-- 缓存所有列表，在store的components中处理 -->
          <keep-alive :include="catch_components">
            <router-view style="padding-bottom: 30px;padding-top: 20px;"></router-view>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
    <el-footer height="60px" style="background-color: #4E6996;z-index: 3000;width: 100%;display: flex;justify-content: center;align-items: center;">
      <div style="color: white;text-align: center;font-size: 12px;" v-html="copyRight"></div>
  </el-footer>



  </el-container>
</template>

<script>
  export default {
    name: "teaHomepage",
    data() {
      return {
        user_id: this.$store.getters.user_id,
        role: this.$store.getters.roles,
        user: {},
        img: require('../../../static/timg.jpg'),
        copyRight:this.$store.getters.copyRight,
      }
    },
    methods: {
      goBack() {
        this.$router.push('/login');
        sessionStorage.setItem('Token', '');
        location.reload();
      },
      changeInformation() {
        this.$router.push({
          name: 'tea_motify_information'
        })
      },

      get_teacher() { //搜索教师
        this.axios.get('/user/teacher/info?user_id=' + this.user_id, {

        })
          .then(response => {
            this.user = response.data.data;
            if (this.user.picture == null) {
              this.user.picture = this.img;
            }
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },    //计算属性存放需要缓存的路由，从store中获取
    computed:{
      catch_components(){
        return this.$store.getters.get_catch;
      }
    },
    created() {
      this.get_teacher();
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
