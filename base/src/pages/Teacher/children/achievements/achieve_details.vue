<template>
  <div>
    <div style="display: inline-block;">
      <i class="el-icon-back"
        style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
        @click="$router.back(-1)"></i>
      <p
        style="font-size: 24px;display: inline-block;margin-top: 0px;font-family: arial;color: #1f2f3d;font-weight: 400;">
        {{type_name}}详情</p>
    </div>

      <el-tabs type="border-card" style="margin-top: 30px;">
        <el-tab-pane v-if="achieve_type == '竞赛'" label="成果物详情" style="margin-left: 40px;margin-bottom: 30px;">
          <div style="float: right;width: 60px;position: relative;margin-right: 10px;" >
            <div v-if="info.status ===4" style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 6px;">不完整</div>
            <div v-else style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 14px;">完整</div>
            <img src="@/assets/images/status.png" alt="" style="width: 60px;position: absolute;;margin-top: -25px;">
          </div>
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品名称</span></div>
            <!-- <p style="display: inline">作品名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">竞赛名称</span></div>
            <!-- <p style="display: inline">竞赛名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.competition_name}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">竞赛类型</span></div>
            <!-- <p style="display: inline">竞赛类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.competition_type}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品类型</span></div>
            <!-- <p style="display: inline">作品类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.work_type}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">年份</span></div>
            <!-- <p style="display: inline;margin-left: 32px;">年份</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">公布获奖日期</span></div>
            <!-- <p style="display: inline;margin-left: -32px;">公布获奖日期</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.award_date}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">竞赛级别</span></div>
            <!-- <p style="display: inline">竞赛级别</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.competition_level}}</p>
          </div>
          <div class="row_8" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">获得奖项</span></div>
            <!-- <p style="display: inline">获得奖项</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.award}}</p>
          </div>
          <div class="row_9" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">成果简介</span></div>
            <!-- <p style="display: inline">成果简介</p> -->
            <span
              style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</span>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">支撑材料</span></div>
           <!--  <p style="display: inline">支撑材料</p> -->
            <!-- <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link> -->
              <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
              </el-link>
              <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
          </div>

        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == '项目'" label="成果物详情" style="margin-left: 40px;margin-bottom: 30px;">
          <div style="float: right;width: 60px;position: relative;margin-right: 10px;" >
            <div v-if="info.status ===4" style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 6px;">不完整</div>
            <div v-else style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 14px;">完整</div>
            <img src="@/assets/images/status.png" alt="" style="width: 60px;position: absolute;;margin-top: -25px;">
          </div>
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">项目名称</span></div>
            <!-- <p style="display: inline">项目名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.pro_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">项目类型</span></div>
            <!-- <p style="display: inline">项目类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.category}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品名称</span></div>
            <!-- <p style="display: inline">作品名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品类型</span></div>
            <!-- <p style="display: inline">作品类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.work_type}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">年份</span></div>
            <!-- <p style="display: inline;margin-left: 32px;">年份</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">完成进度</span></div>
            <!-- <p style="display: inline;">完成进度</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.pro_schedule}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">立项/结题时间</span></div>
            <!-- <p style="display: inline;margin-left: -38px;">立项/结题时间</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.pro_date}}</p>
          </div>
          <div class="row_8" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">成果简介</span></div>
            <!-- <p style="display: inline">成果简介</p> -->
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">支撑材料</span></div>
           <!--  <p style="display: inline">支撑材料</p> -->
            <!-- <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link> -->
              <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
              </el-link>
              <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
          </div>
        
        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == '论文'" label="成果物详情" style="margin-left: 40px;margin-bottom: 30px;">
          <div style="float: right;width: 60px;position: relative;margin-right: 10px;" >
            <div v-if="info.status ===4" style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 6px;">不完整</div>
            <div v-else style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 14px;">完整</div>
            <img src="@/assets/images/status.png" alt="" style="width: 60px;position: absolute;;margin-top: -25px;">
          </div>
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品名称</span></div>
            <!-- <p style="display: inline">作品名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">论文类型</span></div>
            <!-- <p style="display: inline">论文类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.paper_type}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">期刊/会议名</span></div>
            <!-- <p style="display: inline;margin-left: -22px;">期刊/会议名</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.conference_name}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">年份</span></div>
           <!--  <p style="display: inline;margin-left: 32px;">年份</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">发布日期</span></div>
            <!-- <p style="display: inline">发布日期</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.release_date}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">级别</span></div>
            <!-- <p style="display: inline;margin-left: 32px;">级别</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.paper_level}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">成果简介</span></div>
            <!-- <p style="display: inline">成果简介</p> -->
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">检索凭证</span></div>
            <!-- <p style="display: inline">检索凭证</p> -->
            <!-- <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData_paper">下载</el-link> -->
              <p v-if="info.retrieve" style="display: inline;margin-left: 30px;">{{info.retrieveName}}</p>
                        <el-link type="primary" v-if="info.support_files !== null"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file_paper">预览
                        </el-link>
                        <el-link type="primary" v-if="info.support_files !== null"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file_paper">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无检索凭证</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">支撑材料</span></div>
           <!--  <p style="display: inline">支撑材料</p> -->
            <!-- <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link> -->
              <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
              </el-link>
              <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
          </div>
        
        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == '知识产权'" label="成果物详情" style="margin-left: 40px;margin-bottom: 30px;">
          <div style="float: right;width: 60px;position: relative;margin-right: 10px;" >
            <div v-if="info.status ===4" style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 6px;">不完整</div>
            <div v-else style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 14px;">完整</div>
            <img src="@/assets/images/status.png" alt="" style="width: 60px;position: absolute;;margin-top: -25px;">
          </div>
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品名称</span></div>
            <!-- <p style="display: inline">作品名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">知识产权类型</span></div>
            <!-- <p style="display: inline">知识产权类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.patent_type}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">年份</span></div>
            <!-- <p style="display: inline;margin-left: 32px;">年份</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">知识产权号</span></div>
            <!-- <p style="display: inline;margin-left: 16px;">知识产权号</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.patent_number}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">申请时间</span></div>
            <!-- <p style="display: inline;margin-left: -32px;">知识产权申请时间</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.apply_date}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">授权时间</span></div>
            <!-- <p style="display: inline;margin-left: -32px;">知识产权授权时间</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.grant_date}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">成果简介</span></div>
            <!-- <p style="display: inline">成果简介</p> -->
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">支撑材料</span></div>
            <!-- <p style="display: inline">支撑材料</p> -->
            <!-- <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link> -->
              <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
              </el-link>
              <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
          </div>
        
        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == '荣誉'" label="成果物详情" style="margin-left: 40px;margin-bottom: 30px;">
          <div style="float: right;width: 60px;position: relative;margin-right: 10px;" >
            <div v-if="info.status ===4" style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 6px;">不完整</div>
            <div v-else style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 14px;">完整</div>
            <img src="@/assets/images/status.png" alt="" style="width: 60px;position: absolute;;margin-top: -25px;">
          </div>
        
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">作品名称</span></div>
            <!-- <p style="display: inline">作品名称</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">荣誉类型</span></div>
            <!-- <p style="display: inline">荣誉类型</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.honor_type}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">年份</span></div>
            <!-- <p style="display: inline;margin-left: 32px;">年份</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">获得日期</span></div>
            <!-- <p style="display: inline;margin-left: 16px;">获得日期</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.honor_date}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">荣誉级别</span></div>
            <!-- <p style="display: inline;margin-left: -32px;">荣誉级别</p> -->
            <p style="display: inline;margin-left: 30px;">{{info.honor_level}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">成果简介</span></div>
            <!-- <p style="display: inline">成果简介</p> -->
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <div style="width: 100px;text-align: right;display: inline-block;font-weight: bold">
              <span style="font-family: helvetica;">支撑材料</span></div>
            <!-- <p style="display: inline">支撑材料</p> -->
            <!-- <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link> -->
              <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
              <el-link type="primary" v-if="info.support_files"
                  style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
              </el-link>
              <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
          </div>
        
        </el-tab-pane>
        <el-tab-pane label="团队详情" style="margin-bottom: 30px;">

          <div class="members">
            <p style="margin-top: 30px;margin-bottom: 30px;font-weight: bold">成员信息:</p>
            <!-- <div v-for="(item,i) in info.students" :key="i" style="display: inline-block;">
              <div class="card" @click="checkDetails(item,'stu')"
                style="width: 180px;height: 40px;border-style: solid;border-radius: 10px;border-width:1px;border-color: #D9D9D9;margin-right: 30px;margin-bottom: 20px;cursor: pointer;">
                <div class="card_order"
                  style="display: inline-block;width: 20px;height: 20px;border-style: solid;border-radius: 50%;border-width:1px;border-color: #D9D9D9;margin-top: 8px;margin-left: 10px;">
                  <p style="margin-left: 5px;">{{i+1}}</p>
                </div>
                <p style="display: inline;font-size: 15px;">{{item.realName}}</p>
                <p style="display: inline;font-size: 12px;">{{item.ranks}}</p>
              </div>
            </div> -->
            <div style="padding: 0px 10px 10px 30px;">
              <div class="members">
                <el-table :data="info.students" style="width: 100%;min-width: 600px;">
                  <el-table-column prop="team_order" label="队内排序" align="center">
                  </el-table-column>
                  <el-table-column prop="realName" label="姓名" align="center">
                    <!-- <template slot-scope="scope">
                      <span @click="checkDetails(scope.row,'stu')"
                        style="text-overflow: ellipsis;cursor: pointer;">{{scope.row.realName}}</span>
                    </template> -->
                  </el-table-column>
                  <el-table-column prop="stid" label="学号" align="center">
                  </el-table-column>
                  <el-table-column prop="stu_class" label="班级" align="center">
                  </el-table-column>
                  <el-table-column prop="ranks" label="队内身份" align="center">
                  </el-table-column>
                  <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button @click="checkDetails_stu" type="text" size="small">查看详情</el-button>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
            </div>
          </div>

          <div class="teachers">
            <p style="margin-top: 30px;margin-bottom: 30px;font-weight: bold">指导老师:</p>
            <!-- <div v-for="(item,i) in info.teachers" :key="i" style="display: inline-block;">
              <div class="card" @click="checkDetails(item,'tea')"
                style="width: 180px;height: 40px;border-style: solid;border-radius: 10px;border-width:1px;border-color: #D9D9D9;margin-right: 30px;margin-bottom: 20px;cursor: pointer;">
                <div class="card_order" 
                  style="display: inline-block;width: 20px;height: 20px;border-style: solid;border-radius: 50%;border-width:1px;border-color: #D9D9D9;margin-top: 8px;margin-left: 10px;">
                  <p style="margin-left: 5px;">{{i+1}}</p>
                </div>
                <p style="display: inline;font-size: 15px;">{{item.realName}}</p>
                <p style="display: inline;font-size: 12px;">{{item.ranks}}</p>
              </div>
            </div> -->
            <div style="padding: 0px 10px 10px 30px;">
              <div class="teachers">
                <el-table :data="info.teachers" style="width: 100%;min-width: 600px;">
                  <el-table-column prop="team_order" label="队内排序" align="center">
                  </el-table-column>
                  <el-table-column prop="realName" label="姓名" align="center">
                    <!-- <template slot-scope="scope">
                      <span @click="checkDetails(scope.row,'tea')"
                        style="text-overflow: ellipsis;cursor: pointer;">{{scope.row.realName}}</span>
                    </template> -->
                  </el-table-column>
                  <el-table-column prop="phone" label="手机号" align="center">
                  </el-table-column>
                  <el-table-column prop="department" label="院系" align="center">
                  </el-table-column>
                  <el-table-column prop="ranks" label="职称" align="center">
                  </el-table-column>
                  <!-- <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button @click="checkDetails_tea" type="text" size="small">查看详情</el-button>
                    </template>
                  </el-table-column> -->
                </el-table>
              </div>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
      <!-- <div style="margin-top: 30px;margin-left: 30px;">
        <el-button type="primary" style="display: inline-block;" @click="goNext">修改</el-button>
        <el-button style="display: inline-block;margin-left: 30px;" @click="visible_delete=true">删除</el-button>
      </div>

      <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible_delete = false">取 消</el-button>
          <el-button type="primary" @click="delete_choosed">确 定</el-button>
        </span>
      </el-dialog> -->

    </div>
</template>

<script>
   import Vue from 'vue';
   import {Base64} from 'js-base64';
  export default {
    name:"teaAchieveDeatils",
    data() {
      return {
        
        user_id: this.$store.getters.user_id,
        achieve_id: '', //从上个页面传来的id
        achieve_type:'', //上个页面传来的类型
        type_name: '', //获取到的type转为中文
        info: [],
        visible_delete :false,
        
      }
    },
    methods: {
      check(){
        this.$forceUpdate()
        console.log(this.form_competition.workType)
      },
      goNext(){
        this.$router.push({
          path: "achieve_details/modify_achieve",
          query: {
            achieve_id: this.achieve_id,
            type: this.achieve_type
          }
        });
      },
      async get_achievement() {
                if (this.achieve_type == "竞赛") {
                    await this.get_competition_single();
                } else if (this.achieve_type == "项目") {
                    await this.get_projects_single();
                } else if (this.achieve_type == "论文") {
                    await this.get_paper_single();
                } else if (this.achieve_type == "知识产权") {
                    await this.get_patent_single();
                } else if (this.achieve_type == "荣誉") {
                    await this.get_honor_single();
                }
                if (this.info.support_files) {
                    console.log(this.info.support_files);
                    Vue.set(this.info, 'fileName', this.cut_fileName(this.info.support_files));
                    console.log(this.info.fileName);
                }
                if (this.info.retrieve) {
                    Vue.set(this.info, 'retrieveName', this.cut_fileName(this.info.retrieve));
                }
            },

            async get_competition_single() {
              await this.axios
          .get("/user/diff/achieve?achieve_id=" + this.achieve_id + "&type=0&user_id=" + this.user_id, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      async get_projects_single() {
        await this.axios
          .get("/user/diff/achieve?achieve_id=" + this.achieve_id + "&type=1&user_id=" + this.user_id, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      async get_paper_single() {
        await this.axios
          .get("/user/diff/achieve?achieve_id=" + this.achieve_id + "&type=2&user_id=" + this.user_id, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      async get_patent_single() {
        await this.axios
          .get("/user/diff/achieve?achieve_id=" + this.achieve_id + "&type=3&user_id=" + this.user_id, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      async get_honor_single() {
        await this.$api_achievement.user_search_achieve_single(this.achieve_id,4,this.user_id).then(res=>{
          this.info = res;
        })
      },
      async exportData() { //下载支撑材料
                /* window.open(
                    this.info.support_files
                ); */
                let url = await (this.$api_achievement.admin_download(this.info.support_files));
                window.open(url);
            },
            //在线预览文件
            async view_file() {
                let url = await (this.$api_achievement.admin_get_download(this.info.support_files));
                window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
            },
            /* exportData_paper() { //下载支撑材料
                window.open(
                    this.info.retrieve
                );
            }, */
            //在线预览论文凭证
            async view_file_paper() {
                let url = await (this.$api_achievement.admin_get_download(this.info.retrieve));
                window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
            },
            //下载论文凭证
            async download_file_paper() {
                // await (this.$api_achievement.admin_download(this.info.retrieve));
                let url = await (this.$api_achievement.admin_download(this.info.retrieve));
                window.open(url);
            },
      delete_choosed() { //删除所选项，奖项分布另用一个函数
        this.axios.delete('/achievement?achieve_id=' + this.achieve_id ,{
            headers: {
              'Token': this.Token,
            },
          })
          .then(response => {
            this.$router.back(-1);
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      checkDetails(row, role) { 
        if(role === "tea" && row.n === 1){
          row.n = 2
        }
                this.$router.push({
                    path: '/user_info',
                    query: {
                        user_id: row.user_id,
                        role: role,
                        n:row.n
                    }
                })
            },
            //切割文件名
            cut_fileName(fileName) {
                return fileName.split('A').slice(-1)[0];
            },


    },
    created() {
      this.achieve_id = this.$route.query.achieve_id;
      this.achieve_type = this.$route.query.type;
      this.type_name = this.achieve_type
      /* if (this.achieve_type == "competition") {
        this.type_name = "竞赛"
      } else if (this.achieve_type == "projects") {
        this.type_name = "项目"
      } else if (this.achieve_type == "paper") {
        this.type_name = "论文"
      } else if (this.achieve_type == "patent") {
        this.type_name = "知识产权"
      } */
      this.get_achievement();
      //this.get_competition();
    },
  }
</script>

<style>
</style>