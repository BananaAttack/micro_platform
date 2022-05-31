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
    <el-main class="background"  >
         <div id="au_report" style="width:900px;background:white;height:auto;margin:30px auto;padding:40px">
     <div class="head" style="width:95%;height:235px;border-bottom:1px solid #909399;margin: auto">
                  <div class="info_frame" style="width:80%;height:235px;display:inline-block">
                   <div class="title" style="width:100%;height:60px;border-bottom:1px solid #909399">
              <div style="font-size:40px;font-weight:bolder;float:left;height:60px">科技成果认证报告</div>
               <div id="qrcode" style="height:60px;width:60px;float:right;float:right;margin-right:25px;margin-top:-5px"> 
                  <vue-qr 
                  text=" http://124.222.44.159/#/check_report" :margin="0" colorDark="black" colorLight="white"  :size="55">
                  </vue-qr>
                </div>
                <div class="web_info" style="width:38%;height:60px;float:left;margin-left:10px">
                    <p style="line-height:33px;font-size:13px">验证码：{{$route.params.id}}</p>
                    <p style="line-height:18px;font-size:13px">查询网站:124.222.44.159/#/check_report</p>
                </div>
          </div>
          <div class="detail_info" style="width:100%;height:170px;">
          <div style="width:40%;height:auto;float:left;margin:30px 0px">
              <p style="font-size:20px;line-height:40px;">姓名：{{stu_info.realName}}
              </p>
               <p style="font-size:20px;line-height:40px;">
                   专业：{{stu_info.major}}
              </p>
               <p style="font-size:20px;line-height:40px;">
                   电话：{{stu_info.phone}}
              </p>


         </div>
         <div style="width:40%;height:auto;float:left;margin:30px 0px">
              <p style="font-size:20px;line-height:40px;">性别：{{stu_info.sex}}
              </p>
               <p style="font-size:20px;line-height:40px;">
                   班级：{{stu_info.stu_class}}
              </p>
               <p style="font-size:20px;line-height:40px;">
                   邮箱：{{stu_info.email}}
              </p>
         </div>


          </div>


          </div>
           <div class="photo" style="border:1px solid black;height:220px;width:18%;float:right">
             <img :src="stu_info.picture" width="100%" height="100%">
           </div>
      </div>  
         <div class="tabelframe" style="width:100%;height:auto;margin-top:30px">
           <p style="font-size:25px;font-weight:bolder">竞赛成果 {{competitions_list.length}}项</p>
           <el-table
           
            :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="competitions_list"
           style="width:100%;font-size:18px;margin:10px auto"
          
           >
           <el-table-column
           label="年份"
           align='center'
           width="100%"
           prop="achieve_year"
           >
           </el-table-column>
           <el-table-column
           label="竞赛名称"
            align='center'
              prop="competition_name"
           >
           </el-table-column>
            <el-table-column
           label="作品项目"
            align='center'
              prop="achieve_name"
           >
           </el-table-column>
            <el-table-column
           label="竞赛级别"
            align='center'
              width="100%"
                prop="competition_level"
           >
           </el-table-column>
 <el-table-column
           label="获得奖项"
            align='center'
            width="100%"
              prop="award"
           >
           </el-table-column>

           </el-table>
           </div>

            <div class="tabelframe" style="width:100%;height:auto;margin-top:10px">
           <p style="font-size:25px;font-weight:bolder">项目成果 {{projects_list.length}}项</p>
           <el-table
            :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="projects_list"
           style="width:100%;font-size:18px;margin:10px auto"
           
           >
           <el-table-column
           label="年份"
           align='center'
           width="100%"
           prop="achieve_year"
           >
           </el-table-column>
           <el-table-column
           label="作品类型"
            align='center'
              prop="category"
              width='200%'
           >
           </el-table-column>
            <el-table-column
           label="作品名称"
            align='center'
              prop="achieve_name"
           >
           </el-table-column>
            <el-table-column
           label="完成进度"
            align='center'
              width="100%"
                prop="pro_schedule"
           >
           </el-table-column>
 <el-table-column
           label="立项/结题时间"
            align='center'
            width="150%"
              prop="pro_date"
           >
           </el-table-column>

           </el-table>


           </div>
 <div class="tabelframe" style="width:100%;height:auto;margin-top:10px">
           <p style="font-size:25px;font-weight:bolder">论文 {{papers_list.length}}项</p>
           <el-table
           :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="papers_list"
           style="width:100%;font-size:18px;margin:10px auto"
           
           >
           <el-table-column
           label="年份"
           align='center'
           width="100%"
           prop="achieve_year"
           >
           </el-table-column>
           <el-table-column
           label="论文名称"
            align='center'
            prop="achieve_name"
            width="250%"
           >
           </el-table-column>
            <el-table-column
           label="类型"
            align='center'
              prop="paper_type"
              width="100%"
           >
           </el-table-column>
            <el-table-column
           label="期刊/会议名"
            align='center'
            width="200%"
             
                prop="conference_name"
           >
           </el-table-column>
 <el-table-column
           label="级别"
            align='center'
            
              prop="paper_level"
           >
           </el-table-column>
           <el-table-column
           label="发布日期"
            align='center'
         
              prop="release_date"
           >
           </el-table-column>

           </el-table>


           </div>
          <div class="tabelframe" style="width:100%;height:auto;margin-top:10px">
           <p style="font-size:25px;font-weight:bolder">知识产权 {{patents_list.length}}项</p>
           <el-table
           :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="patents_list"
           style="width:100%;font-size:18px;margin:10px auto"
           
           >
           <el-table-column
           label="年份"
           align='center'
           width="100%"
           prop="achieve_year"
           >
           </el-table-column>
           <el-table-column
           label="作品类型"
            align='center'
              prop="patent_type"
            width="170%"
           >
           </el-table-column>
            <el-table-column
           label="作品名称"
            align='center'
              prop="achieve_name"
              width="250%"
             
           >
           </el-table-column>
            <el-table-column
           label="知识产权号"
            align='center'
            width="150%"
             
                prop="patent_number"
           >
           </el-table-column>
 <el-table-column
           label="申请日期"
            align='center'
            
              prop="apply_date"
           >
           </el-table-column>
           <el-table-column
           label="授权日期"
            align='center'
         
              prop="grant_date"
           >
           </el-table-column>

           </el-table>


           </div>
<div class="tabelframe" style="width:100%;height:auto;margin-top:10px">
           <p style="font-size:25px;font-weight:bolder">荣誉成果 {{honors_list.length}}项</p>
           <el-table
           :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="honors_list"
           style="width:100%;font-size:18px;margin:10px auto"
           
           >
           <el-table-column
           label="年份"
           align='center'
           width="100%"
           prop="achieve_year"
           >
           </el-table-column>
           <el-table-column
           label="荣誉类型"
            align='center'
              prop="honor_type"
        
           >
           </el-table-column>
            <el-table-column
           label="荣誉级别"
            align='center'
              prop="honor_level"
             
           >
           </el-table-column>
            <el-table-column
           label="获得时间"
            align='center'
           
             
                prop="achieve_year"
           >
            </el-table-column>
        
           </el-table>


           </div>

      </div>

    </el-main>
    <el-footer height="60px"
               style="background-color: #4E6996;z-index: 3000;width: 100%;display: flex;justify-content: center;align-items: center;">
      <div style="color: white;text-align: center;font-size: 12px;" v-html="copyRight"></div>
    </el-footer>
  </el-container>
</template>

<script>
import VueQr from 'vue-qr'
export default {
    name:'show_report',
    components:{
        VueQr
    },
     data(){
    return{
      stu_info:{},
      competitions_list:[],
  papers_list:[],
  patents_list:[],
   projects_list:[],
   honors_list:[],
      copyRight:this.$store.getters.copyRight,
     


}
    
  },
  created(){
    this.axios.get('http://124.222.44.159:8080/certification',{
  params:{
    code:this.$route.params.id
  }
},
{
  headers:{
       Token: window.sessionStorage.getItem('Token')
  }
}).then(res=>{
  if(res.data.code==2000){
    console.log(eval(res.data.data.competitions)[0])
    for(var i=0;i<eval(res.data.data.competitions).length;i++){
    this.axios.get("http://124.222.44.159:8080/user/diff/achieve",{
      params:{
        achieve_id:eval(res.data.data.competitions)[i],
        type:0,
        user_id:res.data.data.user_id
      }
    }).then(Response=>{
      if(Response.data.code===2000){
        this.competitions_list.push(Response.data.data)
      }else{
        console.log(Response)
      }

    })
    
    }
     for(var i=0;i<eval(res.data.data.papers).length;i++){
       this.axios.get("http://124.222.44.159:8080/user/diff/achieve",{
      params:{
        achieve_id:eval(res.data.data.papers)[i],
        type:2,
        user_id:res.data.data.user_id
      }
    },{
      headers:{
        Token: window.sessionStorage.getItem('Token')
      }
    }).then(Response=>{
      if(Response.data.code===2000){
        this.papers_list.push(Response.data.data)
      }else{
        console.log(Response)
      }

    })
    }
     for(var i=0;i<eval(res.data.data.honors).length;i++){
      this.axios.get("http://124.222.44.159:8080/user/diff/achieve",{
      params:{
        achieve_id:eval(res.data.data.honors)[i],
        type:4,
        user_id:res.data.data.user_id
      }
    },{
      headers:{
        Token: window.sessionStorage.getItem('Token')
      }
    }).then(Response=>{
      if(Response.data.code===2000){
        this.honors_list.push(Response.data.data)
      }else{
        console.log(Response)
      }

    })
    }
     for(var i=0;i<eval(res.data.data.patents).length;i++){
       this.axios.get("http://124.222.44.159:8080/user/diff/achieve",{
      params:{
        achieve_id:eval(res.data.data.patents)[i],
        type:3,
        user_id:res.data.data.user_id
      }
    },{
      headers:{
        Token: window.sessionStorage.getItem('Token')
      }
    }).then(Response=>{
      if(Response.data.code===2000){
        this.patents_list.push(Response.data.data)
      }else{
        console.log(Response)
      }

    })
    }
     for(var i=0;i<eval(res.data.data.projects).length;i++){
      this.axios.get("http://124.222.44.159:8080/user/diff/achieve",{
      params:{
        achieve_id:eval(res.data.data.projects)[i],
        type:1,
        user_id:res.data.data.user_id
      }
    },{
      headers:{
        Token: window.sessionStorage.getItem('Token')
      }
    }).then(Response=>{
      if(Response.data.code===2000){
        this.projects_list.push(Response.data.data)
      }else{
        console.log(Response)
      }

    })
    }
     this.axios.get("http://124.222.44.159:8080/user/stu/info",{
      params:{
        n:0,
        user_id:res.data.data.user_id
      }
    }).then(res=>{
      if(res.data.code===2000){
        this.stu_info=res.data.data
      }else{
        console.log(res)
      }
    })

  }else{
    console.log(res)
  }
})
  }

}
</script>

<style lang="scss" scoped>
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
  border-color: black !important; 
}
 .el-table--border::after,  .el-table::before{
  background-color: black;
}
.tabelframe{
  margin-top: 15px;
}
.el-input > > > .el-input__inner {
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
    background: #909399;
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
</style>>

