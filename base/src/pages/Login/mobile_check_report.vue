<template>
  <el-container height="100vh">
   <el-header height="50px" style="position: -webkit-sticky;position: sticky;top:0;z-index: 3000;">
     <div class="header"
          style="height: 50px;background-color: #4E6996;padding-left: 0;padding-right: 0;width: 100vw;line-height:50px;text-align:center">
            <i class="el-icon-arrow-left" style="display:inline-block;float:left;margin-top:0px;font-size:1.15em;color:white;line-height:50px;cursor:pointer;" @click="$router.push('/login')"></i>
       <span
         style="font-size: 1.15em;font-family:sans-serif;margin:0px auto; display:inline-block;color:#FFFFFF;margin:0 auto">
         科技成果验证报告</span>
     </div>
   </el-header>
  <el-container>
   <el-main height="100vh" class="main">
     <div style="width: 90%;height: 250px;background: white;opacity: 90%;border-radius: 8px;margin: 40% auto;padding: 0px">
       <div style="font-size:30px;font-weight: bolder;color:black;margin: 20px auto;text-align: center">
         科技成果报告认证
       </div>
       <el-input v-model="code" placeholder="请输入报告验证码" style="width: 80%;margin:15px auto!important;text-align: center!important;display:block ">
       </el-input>
       <el-button type="primary" style="margin: 20px auto;display: block;width: 80%">
         验证
       </el-button>
     </div>
   </el-main>
  </el-container>
 </el-container>
</template>

<script>
export default {
    name:"mobile_check_report",
    data(){
         return{copyRight:this.$store.getters.copyRight} 
    }


}
</script>

<style scoped lang='scss'>

.el-input>>>.el-input__inner {
  &::placeholder {
    font-size: 16px;
    text-align: center;
  }
}
.el-container{
  height: 100%;
   padding: 0 0px !important;
}
.el-header {
  padding: 0 0px !important;
}
.main{
  display: flex;
  align-items: center;flex-direction: column;min-height: calc(100vh);
  background: url('../../../static/background.jpg') no-repeat;
  background-size: cover;
  -webkit-filter: opacity(70%);
  filter: opacity(70%);

}
</style>