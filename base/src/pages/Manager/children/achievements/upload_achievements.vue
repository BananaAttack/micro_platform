<template>
  <div class='container'>
    <div class='header' style="width:100%;height:60px;">
        <span style="font-size:35px;line-height:60px;font-weight:bold">成果物批量导入</span>
        <div style="display:inline-block;width:78%;float:right;margin-top:10px;">
         <el-steps :active="active" style="font-family: helvetica;font-size: 16px;" space='40%' align-center >
          <el-step title="数据导入" icon='el-icon-upload'></el-step>
          <el-step title="数据预览" icon='el-icon-s-order' ></el-step>
          <el-step title="完成导入" icon='el-icon-success'></el-step>
        </el-steps>
        </div>
  </div>
  <div class="step1" style="width:100%;height:auto;text-align: center;" v-if="visible_step1">
      <div style="margin:100px;display:block;">
      <el-upload
      :on-remove="handleRemove"
      style="height:300px;"
      :limit=1
       :on-change="handleChange"
      :file-list=fileList
      :auto-upload='false'
      :http-request="upload_file"
      ref='el_upload'
      class="upload-demo" 
      drag
      accept=".xls,.xlsx"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件</div>
</el-upload>
  <el-button style="margin:100px 80px;display:inline-block;" type="primary"  @click="exprot_models">下载文件模板</el-button>  <el-button :disabled="fileList.length===0" style="margin:100px 80px;display:inline-block" type="primary" @click="visible_step1=false;visible_step2=true;active++">上传文件</el-button>
      </div>
  </div>
<!----------------------------------------------->
<div class="setp2" style="width:100%;height:auto;text-align: center;" v-if="visible_step2">
<div class='info' style="width:100%;height:20px;text-align:left;line-heighr:20px;margin-top:10px">
<span style="color:#909399">当前导入成果物类型为：<span style="color:black">{{type}}</span>&nbsp;&nbsp;&nbsp;&nbsp;检索到{{excel_data.length}}条成果物，<span style="color:#67C23A">{{accepted_list.length}}条成果物可导入</span>，<span style="color:#F56C6C">{{unaccepted_list.length}}条成果物有误</span></span>
</div>
<el-tabs type="border-card" style="margin-top:5px">
  <el-tab-pane label="可导入成果物">
    <div class='tabel' style="margin-top:10px" v-if="type==='项目'">
<el-table :data='accepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="项目类型"
  label="项目名称"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="项目类型"
  label="项目类型"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="立项/结题"
  label="完成进度"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="立项/结题时间"
  label="立项/结题时间"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
    <i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text' @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
    </div>
<!------------------------------------------------------------------------>
<div class='tabel' style="margin-top:10px" v-if="type==='竞赛'">
  <el-table :data='accepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="竞赛名称"
  label="竞赛名称"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="竞赛类型"
  label="竞赛类型"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="竞赛等级"
  label="竞赛等级"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="作品类型"
  label="作品类型"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="奖项"
  label="奖项"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
 <i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>
    
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text' @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!------------------------------------------------------------------------------------>
<div class='tabel' style="margin-top:10px" v-if="type==='论文'">
<el-table :data='accepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="论文类型"
  label="论文类型"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="期刊/会议名"
  label="期刊/会议名"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="发布日期"
  label="发布日期"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="级别"
  label="级别"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="奖项"
  label="奖项"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
    <i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'>查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!------------------------------------------------------------------------------------------>
<div class='tabel' style="margin-top:10px" v-if="type==='专利'">
<el-table :data='accepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="专利类型"
  label="知识产权类型"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="专利号"
  label="专利号"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="专利申请时间"
  label="申请时间"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="专利授权时间"
  label="授权时间"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
  <i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'  @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!-------------------------------------------------------------------------------------->
<div class='tabel' style="margin-top:10px" v-if="type==='荣誉'">
<el-table :data='accepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="荣誉类型"
  label="荣誉类型"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="获得时间"
  label="获得时间"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
    <i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'  @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<div>
        <el-pagination
          style="margin-top: 60px"
          @size-change="1"
          @current-change="handleChange_accept"
          :current-page.sync="accept_current_page"
          page-size=30
          layout="total, prev, pager, next, jumper"
          :total.sync="accepted_list.length"
        >
        </el-pagination>
  </div>
<!------------------------------------------------------------------------------------>
    </el-tab-pane>
  <el-tab-pane label="有误成果物">
<div class='tabel' style="margin-top:10px" v-if="type==='项目'">
<el-table :data='unaccepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="项目类型"
  label="项目名称"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="项目类型"
  label="项目类型"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="立项/结题"
  label="完成进度"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="立项/结题时间"
  label="立项/结题时间"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope" >
    <!--<i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>-->
    <el-popover
    trigger="hover"
    placement="bottom"
    >
    <div slot="reference" style="border-radius:50%;font-size:10px;color:white;background-color:#F56C6C;width:20px;height:20px;line-height:20px;margin:0 auto;font-weight:bolder">2</div>
    </el-popover>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text' @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!----------------------------------------------------------------->
<div class='tabel' style="margin-top:10px" v-if="type==='竞赛'">
<el-table :data='unaccepted_show_list' tooltip-effect="dark" stripe size="small" border style="margin-top:30px">
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="竞赛名称"
  label="竞赛名称"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="竞赛类型"
  label="竞赛类型"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="竞赛等级"
  label="竞赛等级"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="作品类型"
  label="作品类型"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="奖项"
  label="奖项"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
 <el-popover
    trigger="hover"
    placement="bottom"
    >
    <p>错误项：</p>
    <div v-for="(item,index) in scope.row.errolist "  >
      {{index+1}}. 缺少{{item}}
    </div>
    <div slot="reference" style="border-radius:50%;font-size:10px;color:white;background-color:#F56C6C;width:20px;height:20px;line-height:20px;margin:0 auto;font-weight:bolder">{{scope.row.errolist.length}}</div>
    </el-popover>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'  @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!------------------------------------------------------------------------->
<div class='tabel' style="margin-top:10px" v-if="type==='论文'">
  <el-table :data='unaccepted_show_list' tooltip-effect="dark" stripe size="small" border>
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="论文类型"
  label="论文类型"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="期刊/会议名"
  label="期刊/会议名"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="发布日期"
  label="发布日期"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="级别"
  label="级别"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="奖项"
  label="奖项"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
     <el-popover
    trigger="hover"
    placement="bottom"
    >
    <p>错误项：</p>
    <div v-for="(item,index) in scope.row.errolist "  >
      {{index+1}}. 缺少{{item}}
    </div>
    <div slot="reference" style="border-radius:50%;font-size:10px;color:white;background-color:#F56C6C;width:20px;height:20px;line-height:20px;margin:0 auto;font-weight:bolder">{{scope.row.errolist.length}}</div>
    </el-popover>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'  @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!--------------------------------------------------------->
<div class='tabel' style="margin-top:10px" v-if="type==='专利'">
<el-table :data='unaccepted_show_list' tooltip-effect="dark" stripe size="small" border style="margin-top:30px">
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="专利类型"
  label="知识产权类型"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="专利号"
  label="专利号"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="年份"
  label="年份"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="专利申请时间"
  label="申请时间"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="专利授权时间"
  label="授权时间"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="老师姓名1"
  label="第一指导老师"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
   <el-popover
    trigger="hover"
    placement="bottom"
    >
    <p>错误项：</p>
    <div v-for="(item,index) in scope.row.errolist "  >
      {{index+1}}. 缺少{{item}}
    </div>
    <div slot="reference" style="border-radius:50%;font-size:10px;color:white;background-color:#F56C6C;width:20px;height:20px;line-height:20px;margin:0 auto;font-weight:bolder">{{scope.row.errolist.length}}</div>
    </el-popover>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'  @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<!------------------------------------------------------------------------------------>
<div class='tabel' style="margin-top:10px" v-if="type==='荣誉'">
<el-table :data='unaccepted_show_list' tooltip-effect="dark" stripe size="small" border style="margin-top:30px">
   <el-table-column
  prop="index"
  label="excel对应行数"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="作品名称"
  label="作品名称"
  align="center"
  >
  </el-table-column>
  <el-table-column
  prop="荣誉类型"
  label="荣誉类型"
  align="center"
  >
  </el-table-column>
    <el-table-column
  prop="获得时间"
  label="获得时间"
  align="center"
  >
  </el-table-column>
   <el-table-column
  prop="学生姓名1"
  label="第一作者"
  align="center"
  >
  </el-table-column>
   <el-table-column
  label="可导入状态"
  align="center"
  >
  <template scope="scope">
    <i class='el-icon-success' style="color:#67C23A;font-size:20px"></i>
  </template>
  </el-table-column>
  <el-table-column
  label="操作"
  align="center"
 >
  <template scope="scope">
    <el-button type='text'  @click="show_report(scope.row)">查看详情</el-button>
  </template>
  </el-table-column>
</el-table>
</div>
<div>
        <el-pagination
          style="margin-top: 60px"
          @current-change="handleChange_unaccept"
          :current-page.sync="unaccept_current_page"
          page-size=30
          layout="total,  prev, pager, next, jumper"
          :total.sync="unaccepted_list.length"
        >
        </el-pagination>
  </div>
  </el-tab-pane>
</el-tabs>
<el-button type="primary" style="margin-top:10px" @click="goBack">重新上传</el-button> <el-button style="margin-top:10px" type="primary" :disabled="unaccepted_list.length>0" @click="upload">开始导入</el-button>
<el-dialog
  :visible.sync="visible_dialog"
  width="50%"
  center>
   <template slot="title">
       <div style="font-size:30px;font-weight:bolder;float:left">导入成果物详情</div>
   </template>
   <div style="margin-top:20px;font-size:18px;line-height:50px" v-if="type==='竞赛'">
     <div  class=frame><div class="title">作品名称</div><div class="content">{{info_list.作品名称}}</div></div>
     <div  class=frame><div class="title">竞赛名称</div><div class="content">{{info_list.竞赛名称}}</div></div>
     <div class=frame><div  class="title">竞赛类型</div> <div class="content">{{info_list.竞赛类型}}</div></div>
     <div  class=frame><div  class="title" >竞赛等级</div> <div class="content">{{info_list.竞赛等级}}</div></div>
     <div  class=frame><div class="title" >作品类型</div> <div class="content">{{info_list.作品类型}}</div></div>
     <div  class=frame><div  class="title">年份</div> <div class="content">{{info_list.年份}}</div></div>
     <div  class=frame><div  class="title" >奖项</div> <div class="content">{{info_list.奖项}}</div></div>
      <div  class=frame><div class="title" >公布获奖时间</div> <div class="content">{{info_list.公布获奖日期}}</div></div>
     <div  class=frame><div class="title"  >作者团队</div> <div class="content">{{info_list.stulist}}</div></div>
      <div  class=frame><div class="title">指导老师</div> <div class="content">{{info_list.teacherlist}}</div></div>
   </div>
   <div style="margin-top:20px;font-size:18px;line-height:50px" v-if="type==='项目'">
     <div  class=frame><div class="title">作品名称</div><div class="content">{{info_list.作品名称}}</div></div>
     <div  class=frame><div class="title">项目名称</div><div class="content">{{info_list.项目类型}}</div></div>
     <div class=frame><div  class="title">项目类型</div> <div class="content">{{info_list.项目类型}}</div></div>
     <div  class=frame><div class="title" >完成进度</div> <div class="content">{{info_list['立项/结题']}}</div></div>
     <div  class=frame><div  class="title">年份</div> <div class="content">{{info_list.年份}}</div></div>
     <div  class=frame><div  class="title" >立项/结题时间</div> <div class="content">{{info_list['立项/结题时间']}}</div></div>
     <div  class=frame><div class="title"  >作者团队</div> <div class="content">{{info_list.stulist}}</div></div>
      <div  class=frame><div class="title">指导老师</div> <div class="content">{{info_list.teacherlist}}</div></div>
   </div>
   <div style="margin-top:20px;font-size:18px;line-height:50px" v-if="type==='论文'">
     <div  class=frame><div class="title">作品名称</div><div class="content">{{info_list.作品名称}}</div></div>
     <div  class=frame><div class="title">论文类型</div><div class="content">{{info_list.论文类型}}</div></div>
     <div class=frame><div  class="title">期刊/会议名</div> <div class="content">{{info_list["期刊/会议名"]}}</div></div>
     <div  class=frame><div class="title" >发布日期</div> <div class="content">{{info_list.发布日期}}</div></div>
     <div  class=frame><div  class="title">年份</div> <div class="content">{{info_list.年份}}</div></div>
     <div  class=frame><div  class="title" >级别</div> <div class="content">{{info_list.级别}}</div></div>
     <div  class=frame><div class="title"  >作者团队</div> <div class="content">{{info_list.stulist}}</div></div>
      <div  class=frame><div class="title">指导老师</div> <div class="content">{{info_list.teacherlist}}</div></div>
   </div>
    <div style="margin-top:20px;font-size:18px;line-height:50px" v-if="type==='专利'">
     <div  class=frame><div class="title">作品名称</div><div class="content">{{info_list.作品名称}}</div></div>
     <div  class=frame><div class="title">知识产权类型</div><div class="content">{{info_list.专利类型}}</div></div>
     <div class=frame><div  class="title">知识产权号</div> <div class="content">{{info_list.专利号}}</div></div>
     <div  class=frame><div  class="title">年份</div> <div class="content">{{info_list.年份}}</div></div>
     <div  class=frame><div  class="title" >申请日期</div> <div class="content">{{info_list.专利申请日期}}</div></div>
      <div  class=frame><div class="title" >授权日期</div> <div class="content">{{info_list.专利授权日期}}</div></div>
     <div  class=frame><div class="title"  >作者团队</div> <div class="content">{{info_list.stulist}}</div></div>
      <div  class=frame><div class="title">指导老师</div> <div class="content">{{info_list.teacherlist}}</div></div>
   </div>
     <div style="margin-top:20px;font-size:18px;line-height:50px" v-if="type==='荣誉'">
     <div  class=frame><div class="title">作品名称</div><div class="content">{{info_list.作品名称}}</div></div>
     <div  class=frame><div class="title">荣誉类型</div><div class="content">{{info_list.荣誉类型}}</div></div>
     <div class=frame><div  class="title">获得时间</div> <div class="content">{{info_list.获得时间}}</div></div>
     <div  class=frame><div  class="title" >荣誉级别</div> <div class="content">{{info_list.荣誉等级}}</div></div>
     <div  class=frame><div class="title"  >作者团队</div> <div class="content">{{info_list.stulist}}</div></div>
      <div  class=frame><div class="title">指导老师</div> <div class="content">{{info_list.teacherlist}}</div></div>
   </div>
</el-dialog>

</div>
<div class="step3" v-if="visible_step3" style="text-align:center;width:100%;">
  <div style="text-align:center;margin:0 auto;;width:400px;color:#67C23A;font-size:20px;font-weight:bold">
   <i class="el-icon-success" style="font-size:140px;margin-top:150px"></i>
   <p>导入成功</p>
     <p>并导入{{accepted_list.length}}条成果物</p>
</div>
<el-button type="primary" @click="continue_upload" style="margin-top:30px;width:150px">继续导入</el-button>
</div>
  </div>
</template>
<script>

export default {
name:'upload_achievements',
data(){
  return{
    accepted_current_page:1,
    unaccepted_current_page:1,
    accepted_show_list:'',
    unaccepted_show_list:'',
    info_list:'',
    visible_dialog:false,
    accepted_list:[],
    unaccepted_list:[],
    excel_data:'',
    type:'',
    active:0,
    excel_Temp:'',
    fileList:[],
    visible_step1:true,
    visible_step2:false,
    visible_step3:false,
  }

},
methods:{
  upload(){
    this.active++
    this.visible_step2=false
    this.visible_step3=true
  },
  goBack(){
    this.active--
    this.visible_step1=true
    this.visible_step2=false
    this.fileList=[]
    this.info_list=[]
    this.accepted_show_list=[]
    this.unaccepted_show_list=[]
    this.accepted_list=[]
    this.unaccepted_list=[]
  },
  show_report(row){
    this.visible_dialog=true
      let stulist=[]
      let teacherlist=[]
      this.info_list=row
      Object.keys(this.info_list).forEach((e)=>{
        if(e.search("学生姓名")!=-1&&this.info_list[e]!=''){
          stulist.push(this.info_list[e])
        }
        if(e.search("老师姓名")!=-1&&this.info_list[e]!=""){
          teacherlist.push(this.info_list[e])
        }
      })
      this.info_list.stulist=stulist.join(',')
      this.info_list.teacherlist=teacherlist.join(',')

  },
  continue_upload(){
    this.active=0
    this.visible_step1=true
    this.visible_step3=false
    this.fileList=[]
    this.info_list=[]
    this.accepted_show_list=[]
    this.unaccepted_show_list=[]
    this.accepted_list=[]
    this.unaccepted_list=[]
  },
  handleRemove(){
    this.fileList=[]
    this.excel_Temp=''
  },
  importExcelData(obj){
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      let rABS = false; //是否将文件读取为二进制字符串
      let f = this.file;
      let reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = '';
        let rABS = false; //是否将文件读取为二进制字符串
        let wb; //读取完成的数据
        let outdata;
        let reader = new FileReader();
        reader.onload = function(e) {
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          let XLSX = require('xlsx');
          if (rABS) {
            wb = XLSX.read(btoa(_this.fixdata(binary)), {
              //手动转化
              type: 'base64'
            });
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames],{ defval: "" }); //outdata就是你想要的东西
          let da = [...outdata];
          _this.excel_data=da
          console.log(  _this.excel_data)
          _this.type=_this.excel_data[0].成果类型
          if(_this.excel_data[0].成果类型=="竞赛"){
             console.log(1111)
             console.log(_this.excel_data.length)
              for(var i=0;i<_this.excel_data.length;i++){
                  _this.excel_data[i].index=i+2
                  _this.excel_data[i].errolist=new Array()
                    if( _this.excel_data[i].作品名称==""){
                     _this.excel_data[i].errolist.push("作品名称")
                  }
                   if( _this.excel_data[i].竞赛名称==""){
                     _this.excel_data[i].errolist.push("竞赛名称")
                  }
                  if( _this.excel_data[i].竞赛类型==""){
                     _this.excel_data[i].errolist.push("竞赛类型")
                  }
                    if( _this.excel_data[i].竞赛等级==""){
                     _this.excel_data[i].errolist.push("竞赛等级")
                  }
                    if( _this.excel_data[i].作品类型==""){
                     _this.excel_data[i].errolist.push("作品类型")
                  }
                    if( _this.excel_data[i].年份==""){
                     _this.excel_data[i].errolist.push("年份")
                  }
                    if( _this.excel_data[i].奖项==""){
                     _this.excel_data[i].errolist.push("奖项")
                  }
                    if( _this.excel_data[i].学生姓名1==""){
                     _this.excel_data[i].errolist.push("第一作者")
                  }
                    if( _this.excel_data[i].老师姓名1==""){
                     _this.excel_data[i].errolist.push("第一指导老师")
                  }
                  if(_this.excel_data[i].errolist.length==0){
                    _this.accepted_list.push(_this.excel_data[i])
                  }else{
                    _this.unaccepted_list.push(_this.excel_data[i])
                  }
          }
          }else if(_this.excel_data[0].成果类型=="项目")
          {
              for(var i=0;i<_this.excel_data.length;i++){
                  _this.excel_data[i].index=i+2
                  _this.excel_data[i].errolist=new Array()
                    if( _this.excel_data[i].作品名称==""){
                     _this.excel_data[i].errolist.push("作品名称")
                  }
                   if( _this.excel_data[i].项目类型==""){
                     _this.excel_data[i].errolist.push("项目名称")
                  }
                  if( _this.excel_data[i].项目类型==""){
                     _this.excel_data[i].errolist.push("项目类型")
                  }
                    if( _this.excel_data[i].年份==""){
                     _this.excel_data[i].errolist.push("年份")
                  }
                    if( _this.excel_data[i]['立项/结题时间']==""){
                     _this.excel_data[i].errolist.push("立项/结题时间")
                  }
                    if( _this.excel_data[i].学生姓名1==""){
                     _this.excel_data[i].errolist.push("第一作者")
                  }
                    if( _this.excel_data[i].老师姓名1==""){
                     _this.excel_data[i].errolist.push("第一指导老师")
                  }
                  if(_this.excel_data[i].errolist.length==0){
                    _this.accepted_list.push(_this.excel_data[i])
                  }else{
                    _this.unaccepted_list.push(_this.excel_data[i])
                  }
          }
          }else if(_this.excel_data[0].成果类型=="论文") {
              for(var i=0;i<_this.excel_data.length;i++){
                  _this.excel_data[i].index=i+2
                  _this.excel_data[i].errolist=new Array()
                    if( _this.excel_data[i].作品名称==""){
                     _this.excel_data[i].errolist.push("作品名称")
                  }
                   if( _this.excel_data[i].论文类型==""){
                     _this.excel_data[i].errolist.push("论文类型")
                  }
                  if( _this.excel_data[i].竞赛类型==""){
                     _this.excel_data[i].errolist.push("项目类型")
                  }
                    if( _this.excel_data[i].年份==""){
                     _this.excel_data[i].errolist.push("年份")
                  }
                    if( _this.excel_data[i]['期刊/会议名']==""){
                     _this.excel_data[i].errolist.push("期刊/会议名")
                  }
                    if( _this.excel_data[i].发布日期==""){
                     _this.excel_data[i].errolist.push("发布日期")
                  }
                     if( _this.excel_data[i].级别==""){
                     _this.excel_data[i].errolist.push("级别")
                  }
                    if( _this.excel_data[i].学生姓名1==""){
                     _this.excel_data[i].errolist.push("第一作者")
                  }
                    if( _this.excel_data[i].老师姓名1==""){
                     _this.excel_data[i].errolist.push("第一指导老师")
                  }
                  if(_this.excel_data[i].errolist.length==0){
                    _this.accepted_list.push(_this.excel_data[i])
                  }else{
                    _this.unaccepted_list.push(_this.excel_data[i])
                  }
          }
          }else if (_this.excel_data[0].成果类型=="专利") {
              for(var i=0;i<_this.excel_data.length;i++){
                  _this.excel_data[i].index=i+2
                  _this.excel_data[i].errolist=new Array()
                    if( _this.excel_data[i].作品名称==""){
                     _this.excel_data[i].errolist.push("作品名称")
                  }
                   if( _this.excel_data[i].专利类型==""){
                     _this.excel_data[i].errolist.push("知识产权类型")
                  }
                  if( _this.excel_data[i].专利号==""){
                     _this.excel_data[i].errolist.push("知识产权号")
                  }
                    if( _this.excel_data[i].年份==""){
                     _this.excel_data[i].errolist.push("年份")
                  }
                    if( _this.excel_data[i].专利申请时间==""){
                     _this.excel_data[i].errolist.push("申请时间")
                  }
                    if( _this.excel_data[i].专利授权时间==""){
                     _this.excel_data[i].errolist.push("授权时间")
                  }
                     if( _this.excel_data[i].级别==""){
                     _this.excel_data[i].errolist.push("级别")
                  }
                    if( _this.excel_data[i].学生姓名1==""){
                     _this.excel_data[i].errolist.push("第一作者")
                  }
                    if( _this.excel_data[i].老师姓名1==""){
                     _this.excel_data[i].errolist.push("第一指导老师")
                  }
                  if(_this.excel_data[i].errolist.length==0){
                    _this.accepted_list.push(_this.excel_data[i])
                  }else{
                    _this.unaccepted_list.push(_this.excel_data[i])
                  }
          }
          }else if(_this.excel_data[0].成果类型=="荣誉"){
             for(var i=0;i<_this.excel_data.length;i++){
                  _this.excel_data[i].index=i+2
                  _this.excel_data[i].errolist=new Array()
                    if( _this.excel_data[i].作品名称==""){
                     _this.excel_data[i].errolist.push("作品名称")
                  }
                   if( _this.excel_data[i].荣誉类型==""){
                     _this.excel_data[i].errolist.push("荣誉类型")
                  }
                  if( _this.excel_data[i].获得时间==""){
                     _this.excel_data[i].errolist.push("获得时间")
                  }
                    if( _this.excel_data[i].年份==""){
                     _this.excel_data[i].errolist.push("年份")
                  }
                    if( _this.excel_data[i].荣誉级别==""){
                     _this.excel_data[i].errolist.push("荣誉级别")
                  } 
                    if( _this.excel_data[i].学生姓名1==""){
                     _this.excel_data[i].errolist.push("第一作者")
                  }
                  if(_this.excel_data[i].errolist.length==0){
                    _this.accepted_list.push(_this.excel_data[i])
                  }else{
                    _this.unaccepted_list.push(_this.excel_data[i])
                  }
          }
          }
        _this.unaccepted_show_list=_this.unaccepted_list.slice(0,30)
        _this.accepted_show_list=_this.accepted_list.slice(0,30)
        };
     
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }

    },
    handleChange_accept(val){
      this.accepted_current_page=val
      this.accepted_show_list=this.accepted_list.slice((val-1)*30,(val-1)*30+30)

    },
     handleChange_unaccept(val){
          this.unaccepted_current_page=val
        this.unaccepted_show_list=this.unaccepted_list.slice((val-1)*30,(val-1)*30+30)
     },
   handleChange(file, fileList) {
      console.log(file, fileList)
      this.excel_Temp = file.raw;
      console.log(this.excel_Temp)
      this.fileList=fileList
      console.log(this.fileList)
  },
  upload_file(){

  },
  exprot_models() {
      let choice = Number(this.import_type)
      this.$api_achievement.admin_import_module();
    },
check(){
   console.log(this.$refs.el_upload)
}
},
watch:{
    excel_Temp(val) {
      if (val) {
        if (
            val.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            val.type == 'application/vnd.ms-excel'
        ) {
          this.importExcelData(val);
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          });
        }
      }
    }
  },
  mounted(){
    console.log(this.fileList.length)
  }
}
</script>

<style lang="scss" scoped>
.content{
  margin-top:10px;
 width:calc(100% - 170px);
 float:right;line-height:30px
}
.frame{
  width:100%;
  display:inline-block;
}
.title{
line-height:30px;
height:100%;
 width:150px;
 display:inline-block;
 font-weight:bolder;}
</style>

