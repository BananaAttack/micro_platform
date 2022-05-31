<template>
  <div>
    <div class="header">
      <div style="display: inline-block;">
        <i class="el-icon-back"
          style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
          @click="$router.back(-1)"></i>
        <p
          style="font-size: 24px;display: inline-block;margin-top: 0px;font-family: arial;color: #1f2f3d;font-weight: 400;">
          {{type_name}}详情</p>
      </div>

      <div style="margin-right: 30px;margin-top: 10px;display: inline-block;float: right;">
        <el-button class="stand-button" type="primary" style="display: inline-block;width: 120px;height:30px;"
          @click="goNext">修改</el-button>
        <el-button class="stand-button-delete" type="primary"
          style="display: inline-block;margin-left: 30px;width: 120px;height:30px;" @click="visible_delete=true">删除
        </el-button>
      </div>
    </div>

    <el-card class="box-card" style="margin-top: 20px;min-width: 800px;width: 100%;" label="成果物详情">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px;font-weight: bold">成果物详情</span>
        <div style="float: right;width: 60px;position: relative;" >
          <div v-if="info.status ===4" style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 6px;">不完整</div>
          <div v-else style="color: black;z-index: 999;position: relative;color: blanchedalmond;margin-left: 14px;">完整</div>
          <img src="@/assets/images/status.png" alt="" style="width: 60px;position: absolute;;margin-top: -25px;">
        </div>
      </div>
      <div class="content">
        <div style="float: left;margin-left: 20px;width: 120px;">
          <div v-for="(item,i) in base_data[achieve_type]">
            <p style="font-weight: bold;font-family: Arial;text-align:right">
              {{item.ch}}</p>
            <br>
          </div>
        </div>
        <div style="margin-left: 140px;width: 500px;">
          <div v-for="(item,i) in base_data[achieve_type]" style="margin-left: 50px;">
            <p v-if="info[item.en] !== null">{{info[item.en]}}</p>
            <p v-else>暂无</p>
            <br>
          </div>
        </div>
      </div>
      <div class="row_10" v-if="this.achieve_type === '论文'" style="margin-left: 20px;margin-bottom: 10px;">
        <div style="width: 120px;display: inline-block;">
          <p style="font-weight: bold;font-family: Arial;display: inline;float:right;">检索凭证</p>
        </div>
        <div style="display: inline-block;overflow: hidden;">
          <p v-if="info.retrieve" style="display: inline;margin-left: 45px;">{{info.retrieveName}}</p>
          <el-link type="primary" v-if="info.support_files !== null"
            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file_paper">预览</el-link>
          <el-link type="primary" v-if="info.support_files !== null"
            style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file_paper">下载</el-link>
          <p v-else style="display: inline;margin-left: 45px;">暂无支撑材料</p>
        </div>
      </div>
      <div class="row_10" style="margin-left: 20px;margin-bottom: 10px;">
        <div style="width: 120px;display: inline-block;">
          <p style="font-weight: bold;font-family: Arial;display: inline;float:right;">支撑材料</p>
        </div>
        <div style="display: inline-block;overflow: hidden;">
          <p v-if="info.fileName" style="display: inline;margin-left: 45px;">{{info.fileName}}</p>
          <el-link type="primary" v-if="info.support_files !== null"
            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
          <el-link type="primary" v-if="info.support_files !== null"
            style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file">下载</el-link>
          <p v-else style="display: inline;margin-left: 45px;">暂无支撑材料</p>
        </div>
      </div>
    </el-card>
    <el-card label="团队详情" class="box-card" style="margin-top: 20px;min-width: 800px;width: 100%;">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px;font-weight: bold">成员信息</span>
      </div>
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

      <div style="margin-top: 30px;">
        <span style="font-size: 16px;font-weight: bold">指导老师</span>
        <el-divider></el-divider>
      </div>
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

    </el-card>


    <!--  <div style="margin-top: 30px;margin-left: 30px;">
        <el-button type="primary" style="display: inline-block;width: 120px;" @click="goNext">修改</el-button>
        <el-button style="display: inline-block;margin-left: 30px;width: 120px;" @click="visible_delete=true">删除</el-button>
      </div> -->



    <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible_delete = false">取 消</el-button>
        <el-button type="primary" @click="delete_choosed">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  const _ = require('lodash');
  import Vue from 'vue';
  import {Base64} from 'js-base64';
  export default {
    name: "stuAchieveDetails",
    data() {
      return {
        user_id: this.$store.getters.user_id,
        base_data: {
          竞赛: [
            {
              ch: '竞赛名称',
              en: 'competition_name'
            }, {
              ch: '竞赛类型',
              en: 'competition_type'
            },
            {
              ch: '作品名称',
              en: 'achieve_name'
            }, {
              ch: '作品类型',
              en: 'work_type'
            }, {
              ch: '年份',
              en: 'achieve_year'
            }, {
              ch: '公布获奖日期',
              en: 'award_date'
            }, {
              ch: '竞赛级别',
              en: 'competition_level'
            }, {
              ch: '获得奖项',
              en: 'award'
            }, {
              ch: '成果简介',
              en: 'achieve_summary'
            }
          ],
          项目: [
            {
              ch: '项目名称',
              en: 'pro_name'
            }, {
              ch: '项目类型',
              en: 'category'
            }, {
              ch: '作品名称',
              en: 'achieve_name'
            }, {
              ch: '作品类型',
              en: 'work_type'
            }, {
              ch: '年份',
              en: 'achieve_year'
            }, {
              ch: '完成进度',
              en: 'pro_schedule'
            }, {
              ch: '立项/结题时间',
              en: 'pro_date'
            }, {
              ch: '成果简介',
              en: 'achieve_summary'
            }
          ],
          论文: [
            {
              ch: '作品名称',
              en: 'achieve_name'
            }, {
              ch: '论文类型',
              en: 'paper_type'
            }, {
              ch: '期刊/会议名',
              en: 'conference_name'
            }, {
              ch: '年份',
              en: 'achieve_year'
            }, {
              ch: '发布日期',
              en: 'release_date'
            }, {
              ch: '级别',
              en: 'paper_level'
            }, {
              ch: '成果简介',
              en: 'achieve_summary'
            }
          ],
          知识产权: [
            {
              ch: '作品名称',
              en: 'achieve_name'
            }, {
              ch: '知识产权类型',
              en: 'patent_type'
            }, {
              ch: '知识产权号',
              en: 'patent_number'
            }, {
              ch: '年份',
              en: 'achieve_year'
            }, {
              ch: '申请时间',
              en: 'apply_date'
            }, {
              ch: '授权时间',
              en: 'grant_date'
            }, {
              ch: '成果简介',
              en: 'achieve_summary'
            }
          ], 荣誉: [
            {
              ch: '作品名称',
              en: 'achieve_name'
            }, {
              ch: '荣誉类型',
              en: 'honor_type'
            }, {
              ch: '年份',
              en: 'achieve_year'
            }, {
              ch: '获得日期',
              en: 'honor_date'
            }, {
              ch: '荣誉级别',
              en: 'honor_level'
            }, {
              ch: '成果简介',
              en: 'achieve_summary'
            }
          ],
        },
        achieve_id: '', //从上个页面传来的id
        achieve_type: '', //上个页面传来的类型
        type_name: '', //获取到的type转为中文
        info: [],
        visible_delete: false
      }
    },
    methods: {
      check() {
        this.$forceUpdate()
        console.log(this.form_competition.workType)
      },
      goNext() {
        this.$router.push({
          path: "achieve_details/modify_achieve",
          query: {
            achieve_id: this.achieve_id,
            type: this.achieve_type
          }
        });
      },
      async get_achievement() {
        console.log(this.achieve_type);
        if (this.achieve_type == "竞赛") {
          await this.get_competition_single();
        } else if (this.achieve_type == "项目") {
          await this.get_projects_single();
        } else if (this.achieve_type == "论文") {
          await this.get_paper_single();
        } else if (this.achieve_type == "荣誉") {
          await this.get_honor_single();
        } else if (this.achieve_type == "知识产权") {
          await this.get_patent_single();
        }
        if (this.info.support_files) {
          Vue.set(this.info, 'fileName', this.cut_fileName(this.info.support_files));
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
        this.$api_achievement.user_search_achieve_single(this.achieve_id, 4, this.user_id).then(res => {
          this.info = res;
        })
      },
      //切割文件名
      cut_fileName(fileName) {
        return fileName.split('A').slice(-1)[0];
      },
      //在线预览文件
      async view_file() {
        let url = await (this.$api_achievement.admin_get_download(this.info.support_files));
        window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
      },
      //下载支撑材料
      async download_file() {
        //await (this.$api_achievement.admin_download(this.info.support_files));
        let url = await (this.$api_achievement.admin_download(this.info.support_files));
        window.open(url);
      },
      //在线预览检索凭证
      async view_file_paper() {
        let url = await (this.$api_achievement.admin_get_download(this.info.retrieve));
        window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
      },
      //下载检索凭证
      async download_file_paper() {
        //await (this.$api_achievement.admin_download(this.info.retrieve));
        let url = await (this.$api_achievement.admin_download(this.info.retrieve));
        window.open(encodeURIComponent(url));
      },
      delete_choosed() { //删除所选项，奖项分布另用一个函数
        this.axios.delete('/achievement?achieve_id=' + this.achieve_id, {
          headers: {
            'Token': this.Token,
          },
        })
          .then(response => {
            this.$router.back(-1);
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      checkDetails_tea(row) {
        if(row.n === 1){
          row.n = 2
        }
        this.$router.push({
            path: '/user_info',
            query: {
              user_id: row.user_id,
              role: 'tea',
              n:row.n
            }
          })
      },
      checkDetails_stu(row) {
        this.$router.push({
            path: '/user_info',
            query: {
              user_id: row.user_id,
              role: 'stu',
              n:row.n
            }
          })
      },


    },
    created() {
      this.achieve_id = this.$route.query.achieve_id;
      this.achieve_type = this.$route.query.type;
      this.get_achievement();
      //this.get_competition();
    },
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 90%;
  }
/*   /deep/  .el-card__body{ 
    padding: 0px 20px 20px 20px !important;
  } */
</style>