<template>
<div class="container" style="width:100%;height:100%;padding:0px 0px 0px !important;">
  <div class="header" style="width:100%;margin:15px auto;z-index:20">
     <i class="el-icon-back" style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
        @click="$router.back(-1)"></i>
       <el-button type="primary" style="float:right;margin-left:10px;margin-top:10px" @click="delete_report">
         删除认证报告
      </el-button>
      <el-button type="primary" style="float:right;margin-left:10px;margin-top:10px" @click="getPdf('au_report','认证报告')">
          下载PDF文件
      </el-button>
  </div>
                     <div class="main" id='main_frame' style="background:#909399;width:100%;border:1px solid black;margin:10px auto;height: 100%;overflow:hidden" >
         <div id="au_report" style="width:900px;background:white;margin:40px auto;padding:40px;overflow:hidden">
     <div class="head" style="width:95%;height:235px;border-bottom:1px solid #909399;margin: auto">
                  <div class="info_frame" style="width:80%;height:235px;display:inline-block">
                   <div class="title" style="width:100%;height:60px;border-bottom:1px solid #909399">
              <div style="font-size:40px;font-weight:bolder;float:left;height:60px">科技成果认证报告</div>
                <div id="qrcode" style="height:60px;width:60px;float:right;float:right;margin-right:25px;margin-top:-5px"> 
                  <vue-qr 
                  text="http://124.222.44.159/#/check_report" :margin="0" colorDark="black" colorLight="white"  :size="55">



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
           <div class="photo" style="height:220px;width:18%;float:right">  <img :src="stu_info.picture" width="100%" height="100%"></div>
         
      </div>  
         <div class="tabelframe" style="width:100%;height:auto;margin-top:30px" id='tabel1'>
           <p style="font-size:25px;font-weight:bolder">竞赛成果 {{competitions_list.length}}项</p>
           <el-table
           :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="competitions_list"
           style="width:100%;font-size:18px;margin-top: 8px;"
         
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

            <div class="tabelframe" style="width:100%;height:auto;" id='tabel2'>
           <p style="font-size:25px;font-weight:bolder">项目成果 {{projects_list.length}}项</p>
           <el-table
          :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="projects_list"
           style="width:100%;font-size:18px;margin-top: 8px"
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
 <div class="tabelframe" style="width:100%;height:auto;" id='tabel3'>
           <p style="font-size:25px;font-weight:bolder">论文 {{papers_list.length}}项</p>
           <el-table
           :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
            border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="papers_list"
           style="width:100%;font-size:18px;margin-top: 8px"
           
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
          <div class="tabelframe" style="width:100%;height:auto;margin-top: 8px" id='tabel4'>
           <p style="font-size:25px;font-weight:bolder">知识产权 {{patents_list.length}}项</p>
           <el-table
             :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="patents_list"
           style="width:100%;font-size:18px;margin-top:8px"
           
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
<div class="tabelframe" style="width:100%;height:auto;margin-top:11px" id='tabel5'>
           <p style="font-size:25px;font-weight:bolder">荣誉成果 {{honors_list.length}}项</p>
           <el-table
            :row-style="{borderColor:'black'}"
           :cell-style="{borderColor:'black'}"
           border
            :header-cell-style="{background:'white',borderColor:'black'}"
           :data="honors_list"
           style="width:100%;font-size:18px;margin-top: 8px"
          
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

        </div>
  </div>
</template>

<script >
import Watermark from'../../../../watermaker';
import {QRCode} from "qrcode"
import htmlToPdf from '@/htmlToPdf';
import VueQr from 'vue-qr'
export default {
name:'report',
components:{
VueQr
},
data(){
return{
  competitions_list:[],
  papers_list:[],
  patents_list:[],
   projects_list:[],
   honors_list:[],
   stu_info:{}

}},
methods:{
  delete_report(){
      this.axios.delete('http://124.222.44.159:8080/certification',
                {
                    params:{
                        code:this.$route.params.id
                    }
                },{
                    headers:{
                          Token: window.sessionStorage.getItem('Token')
                    }
                }).then(res=>{
                    if(res.data.code===2000){
                        this.$message.success("删除成功")
                        this.$router.back(-1)
                        console.log(res)
                        
                    }else{
                        console.log(res)
                    }
                })
  }
 




},
created(){
  console.log(this.$route.params.id)
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
    console.log(this.$store.getters.user_id)
    for(var i=0;i<eval(res.data.data.competitions).length;i++){
    this.axios.get("http://124.222.44.159:8080/user/diff/achieve",{
      params:{
        achieve_id:eval(res.data.data.competitions)[i],
        type:0,
        user_id:this.$store.getters.user_id
      }
    },{
      headers:{
        Token: window.sessionStorage.getItem('Token')
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
        user_id:this.$store.getters.user_id
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
        user_id:this.$store.getters.user_id
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
        user_id:this.$store.getters.user_id
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
        user_id:this.$store.getters.user_id
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
        user_id:this.$store.getters.user_id
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



},
updated(){
  this.$nextTick(()=>{
  document.getElementById('au_report').style.height=document.getElementById('tabel1').offsetHeight+document.getElementById('tabel2').offsetHeight+document.getElementById('tabel3').offsetHeight+document.getElementById('tabel4').offsetHeight+document.getElementById('tabel5').offsetHeight+335+'px'
  document.getElementById('main_frame').style.height=document.getElementById('tabel1').offsetHeight+document.getElementById('tabel2').offsetHeight+document.getElementById('tabel3').offsetHeight+document.getElementById('tabel4').offsetHeight+document.getElementById('tabel5').offsetHeight+535+'px'
  })
   Watermark.set();
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
  margin-top: 15px !important;
}
/deep/.el-main{
overflow:none !important;
}
.container{
    font-family: "Arial Normal", "Arial", sans-serif;
}
html, body{  height:100%; }
</style>>

