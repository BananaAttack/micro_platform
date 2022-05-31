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
    <el-main class="main">
      <div class="background" style="text-align: center">

        <div style="margin:0 auto; margin-top:10%;width:600px;height: 280px;background: rgba(255,255,255,0.8);border-radius: 8px;">
          <h1 style="padding-top: 40px;font-size: 35px">科技成果报告认证</h1>
          <el-input v-model="code" placeholder="请输入报告验证码"
                    style="width: 400px;margin:15px 45px!important; ">
          </el-input>
          <el-button type="primary" style="margin: 0px auto 15px auto;width: 400px;display: block;" @click="check_code">
            验证
          </el-button>
          <el-button @click="turnback" style="margin: 0px auto;width: 400px;display: block;">
            返回首页
          </el-button>
        </div>
         <el-dialog
             width="30%"
            :visible.sync="visibel_correct"
            style="font-size:24px!important;margin-top:20vh"
            >
              <template slot="title">
                   <div style="font-size:25px;font-weight:bolder;float:left">提示</div>
             </template>
           <div style="font-size:20px;float:left">验证成功，点击确定查看认证报告</div>
           <div slot="footer" class="dialog-footer" >
           <el-button type="primary"  @click="visibel_correct = false"  >取消</el-button>
            <el-button type="primary" @click="$router.push({name:'show_report',params:{id:code}})">确定</el-button>
           </div>
                </el-dialog>
                  <el-dialog
             width="30%"
            :visible.sync="visibel_error"
            style="font-size:24px!important;margin-top:20vh"
            >
              <template slot="title">
                   <div style="font-size:25px;font-weight:bolder;float:left">提示</div>
             </template>
           <div style="font-size:20px;float:left">验证失败，请重新输入!</div>
           <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="visibel_error=false">确定</el-button>
           </div>
                </el-dialog>

      </div>
    </el-main>
    <el-footer height="60px"
               style="background-color: #4E6996;z-index: 3000;width: 100%;display: flex;justify-content: center;align-items: center;">
      <div style="color: white;text-align: center;font-size: 12px;" v-html="copyRight"></div>
    </el-footer>
  </el-container>
</template>

<script>
 import router from "../../router";
  import {
    adminRouterMap,
    stuRouterMap,
    teaRouterMap,
    constantRouterMap,
  } from "../../router";
export default {
  name: "check_report",
  data(){
    return{
      copyRight:this.$store.getters.copyRight,
      code:'',
      visibel_correct:false,
      visibel_error:false,
    }
  },
  methods:{
      turnback() {
        // 回到上一个路由地址
        this.$router.back(-1);
      },
      check_code(){
         this.axios.get('http://124.222.44.159:8080/certification',{
          params:{
          code:this.code
           }}
          ).then(res=>{
             if(res.data.code==2000){
               this.visibel_correct=true
             }else{
               console.log(res)
               this.visibel_error=true
             }
           })
       
      },
       
  }
}

  
  
</script>

<style scoped lang="scss">
/deep/ .el-input__inner {
    font-size: 16px;
    text-align: center;
  }

  .el-container {
    height: 100vh;
  }

  .el-header {
    padding: 0 0px;
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
    -webkit-filter: opacity(70%);
    filter: opacity(70%);
  }
</style>

