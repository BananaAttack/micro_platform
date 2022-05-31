<template>
  <div style="">
    <span style="font-size: 30px; color: #696969">学生科技成果数据统计</span>
    <el-radio
      v-model="only"
      label="all"
      style="padding-left: 10px"
      @change="changeData">查看所有
    </el-radio>
    <el-radio v-model="only" label="only" @change="changeData">只看本院学生主持</el-radio>
    <el-row>
      <el-col :span="17">
        <div style="padding-top: 25px">
          <div class="countCard_total">
            <el-row>
              <el-col :span="18" style="padding-left: 10px">
                <p>成果总数</p>
                <p><span style="font-size: 30px">{{ achievement_num.total }}</span>件</p>
              </el-col>
            </el-row>
          </div>
          <div class="countCard">
            <el-row>
              <el-col :span="19" style="padding-left: 10px">
                <p>竞赛成果</p>
                <p><span style="font-size: 30px">{{ achievement_num.competition }}</span>件</p>
              </el-col>
              <el-col :span="2" style="padding-right: 10px">
                <i class="el-icon-trophy" style="font-size: 30px;padding-top: 18px;opacity: 30%"></i>
              </el-col>
            </el-row>
          </div>
          <div class="countCard">
            <el-row>
              <el-col :span="19" style="padding-left: 10px">
                <p>项目成果</p>
                <p><span style="font-size: 30px">{{ achievement_num.projects }}</span>件</p>
              </el-col>
              <el-col :span="2" style="padding-right: 10px">
                <i class="el-icon-postcard" style="font-size: 30px;padding-top: 18px;opacity: 30%"></i>
              </el-col>
            </el-row>
          </div>
          <br><br>
          <div class="countCard">
            <el-row>
              <el-col :span="19" style="padding-left: 10px">
                <p>论文成果</p>
                <p><span style="font-size: 30px">{{ achievement_num.paper }}</span>件</p>
              </el-col>
              <el-col :span="2" style="padding-right: 10px">
                <i class="el-icon-reading" style="font-size: 30px;padding-top: 18px;opacity: 30%"></i>
              </el-col>
            </el-row>
          </div>
          <div class="countCard">
            <el-row>
              <el-col :span="19" style="padding-left: 10px">
                <p>知识产权成果</p>
                <p><span style="font-size: 30px">{{ achievement_num.patent }}</span>件</p>
              </el-col>
              <el-col :span="2" style="padding-right: 10px">
                <i class="el-icon-wallet" style="font-size: 30px;padding-top: 18px;opacity: 30%"></i>
              </el-col>
            </el-row>
          </div>
          <div class="countCard">
            <el-row>
              <el-col :span="19" style="padding-left: 10px">
                <p>荣誉成果</p>
                <p><span style="font-size: 30px">{{ achievement_num.honors }}</span>件</p>
              </el-col>
              <el-col :span="2" style="padding-right: 10px">
                <i class="el-icon-user" style="font-size: 30px;padding-top: 18px;opacity: 30%"></i>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div
          id="total_pie"
          style="width: 100%; height: 200%"
        >
        </div>
      </el-col>
    </el-row>
    <!--各类图表-->
    <div style="margin-top: 30px">
      <el-card class="box-card">
        <div style="height: 200px">
          <div id="yearly_achievement" style="width: 100%; height: 100%"></div>
        </div>
      </el-card>
    </div>
    <!--竞赛成果详情 暂无-->
    <el-row style="padding-top: 12px">
      <el-col :span="16">
        <el-card style="width: 100%">
          <div style="height: 200px">
            <div id="competition" style="width: 100%; height: 100%"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="width: 98%;margin-left: 2%">
          <div style="height: 200px;text-align: center">
            <p style="font-size: 13px">竞赛获奖数同比去年增长</p>
            <div id="competition_increase" style="padding-top:15px;width: 100%; height: 100%"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="margin-top: 30px">
      <el-card class="box-card">
        <div style="height: 200px">
          <div id="project" style="width: 100%; height: 100%"></div>
        </div>
      </el-card>
    </div>

    <el-row style="padding-top: 30px">
      <el-col :span="10">
        <el-card style="width: 98%">
          <div style="height: 200px">
            <div id="paper_conference" style="width: 100%; height: 100%"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card style="width: 98%; padding-left: 2%">
          <div style="height: 200px">
            <div id="papar_journal" style="width: 100%; height: 100%"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="margin-top: 30px">
      <el-card class="box-card">
        <div style="height: 200px">
          <div id="patent" style="width: 100%; height: 100%"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Echarts",
    data() {
      return {
        only: "all",
        achievement_num: {
          total: 0,
          competition: 0,
          projects: 0,
          paper: 0,
          patent: 0,
          honors: 0,
        },
        zoomStart: 60,
        zoomEnd: 100,
        xAxis_data: [],
        competition_year: [],
        competition_level_list: [],
        competition_increase: 0,//同比竞赛增长
        paper_level_list: [[], []],//0-journal 1-conference
        data_temp: [],
        data_ours: [
          [],
          [[], [], [], [], []],
          [[], [], []],
          [[], [], [], [], [], [], []],
          [[], [], [], []],
          [[], [], []],
        ],
        data_all: [
          //看所有
          [
            //0 - 历年科技成果统计
            // [10,10,10,10,10] //竞赛
            // [10,10,10,10,10] //项目
            // [10,10,10,10,10] //论文
            // [10,10,10,10,10] //专利
          ],
          [
            //1 -历年竞赛获奖情况
            [], // [70, 80, 64, 50, 60, 70], //1 0国际级
            [], // [30, 40, 40, 90, 41, 52], //1 1国家级
            [], // [50, 60, 66, 60, 46, 55], //1 2省级
            [], // [30, 50, 40, 40, 52, 42], //1 3校级
            [], // [30, 60, 40, 53, 60, 74], //1 4院级
          ],
          [
            //2 - 历年项目数
            [], //2 0 省新苗
            [], //2 1 国创
            [], //2 2 校创
          ],
          [
            //3 - 历年期刊论文
            [], //SCI
            [], //CSCD
            [], //EI检索
            [], //一级
            [], //二级
            [], //三级
            [], //ISTP
          ],
          [
            //4 - 历年会议论文
            [], //最顶级
            [], //一级
            [], //二级
            [], //三级
          ],
          [
            // 5 - 专利
            [], //发明专利
            [], //学生软件著作权
            [], //学生实用新型专利
          ],
        ],
      };
    },
    methods: {
      get_achieve_year() {
        //动态获取年份
        let achieve_year = [];
        let date = new Date();
        let y = date.getFullYear();
        let i = 0;
        for (let k = 2010; k <= y; k++) {
          achieve_year[i] = k;
          i++;
        }
        return achieve_year;
      },
      //获取竞赛级别列表
      getCompetitionLevel(postType) {
        this.axios.get("/opt/option/distribution/level?type=competition", {}, {}).then((response) => {
          var i;
          for (i = 0; i < response.data.data.length; i++) {
            this.competition_level_list.push(response.data.data[i].name)
          }
        });
      },
      //获取论文级别
      getPaperLevel(postType) {
        //期刊
        this.axios.get("/opt/option/distribution/level?type=journal", {}, {}).then((response) => {
          var i;
          for (i = 0; i < response.data.data.length; i++) {
            this.paper_level_list[0].push(response.data.data[i].name)
          }
        });
        //会议
        this.axios.get("/opt/option/distribution/level?type=conference", {}, {}).then((response) => {
          var i;
          for (i = 0; i < response.data.data.length; i++) {
            this.paper_level_list[1].push(response.data.data[i].name)
          }
        });
        console.log(this.paper_level_list)
      },
      getData() {
        this.getCompetitionLevel();
        this.getPaperLevel();
        this.axios.get("/query/all/all", {}).then((response) => {
          //历年科技成果统计 所有
          this.data_all[0] = response.data.data;
          this.$nextTick(() => {
            this.myEcharts();
            this.calTotalData();
            this.calCompetitionIncrease();
          });
        });
        this.axios.get("/query/all/ours", {}).then((response) => {
          //历年科技成果统计 本院
          this.data_ours[0] = response.data.data;
          this.$nextTick(() => {
            this.myEcharts();
            this.calTotalData();
            this.calCompetitionIncrease();
          });
        });
        this.axios.get("/query/all/competition3", {}).then((response) => {
          //历年竞赛获奖情况 所有
          var year = this.get_achieve_year();
          var i, j;
          for (i = 0; i < year.length; i++) {
            for (j = 0; j < this.competition_level_list.length; j++) {
              this.data_all[1][j].push(response.data.data[year[i]][this.competition_level_list[j]]);
            }
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });

        this.axios.get("/query/ours/competition3", {}).then((response) => {
          //历年竞赛获奖情况 本院
          var year = this.get_achieve_year();
          var i, j;
          for (i = 0; i < year.length; i++) {
            for (j = 0; j < this.competition_level_list.length; j++) {
              this.data_ours[1][j].push(response.data.data[year[i]][this.competition_level_list[j]]);
            }
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });
        this.axios.get("/query/all/project3", {}).then((response) => {
          //历年项目获奖情况 所有
          var year = this.get_achieve_year();
          var i;
          for (i = 0; i < year.length; i++) {
            this.data_all[2][0].push(response.data.data[year[i]]["浙江省新苗人才计划"]);
            this.data_all[2][1].push(response.data.data[year[i]]["国家级创新创业项目"]);
            this.data_all[2][2].push(response.data.data[year[i]]["校级创新创业项目"]);
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });
        this.axios.get("/query/ours/project3", {}).then((response) => {
          //历年项目获奖情况 本院
          var year = this.get_achieve_year();
          var i;
          for (i = 0; i < year.length; i++) {
            this.data_ours[2][0].push(response.data.data[year[i]]["浙江省新苗人才计划"]);
            this.data_ours[2][1].push(response.data.data[year[i]]["国家级创新创业项目"]);
            this.data_ours[2][2].push(response.data.data[year[i]]["校级创新创业项目"]);
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });

        this.axios.get("/query/all/paper3", {}).then((response) => {
            //历年论文 所有
            var year = this.get_achieve_year();
            var i, j;
            for (i = 0; i < year.length; i++) {
              for (j = 0; j < this.paper_level_list[0].length; j++) {
                this.data_all[3][j].push(
                  response.data.data["期刊论文"][year[i]][this.paper_level_list[0][j]]
                );
              }
            }
            for (i = 0; i < year.length; i++) {
              for (j = 0; j < this.paper_level_list[1].length; j++) {
                this.data_all[4][j].push(
                  response.data.data["会议论文"][year[i]][this.paper_level_list[1][j]]
                );
              }
            }
            this.$nextTick(() => {
              this.myEcharts();
            });
            console.log(this.data_all)
          }
        );
        this.axios.get("/query/ours/paper3", {}).then((response) => {
          //历年论文 本院
          var year = this.get_achieve_year();
          var i;
          for (i = 0; i < year.length; i++) {
            this.data_ours[3][0].push(
              response.data.data["期刊论文"][year[i]]["SCI"]
            );
            this.data_ours[3][1].push(
              response.data.data["期刊论文"][year[i]]["CSCD"]
            );
            this.data_ours[3][2].push(
              response.data.data["期刊论文"][year[i]]["EI检索"]
            );
            this.data_ours[3][3].push(
              response.data.data["期刊论文"][year[i]]["一级"]
            );
            this.data_ours[3][4].push(
              response.data.data["期刊论文"][year[i]]["二级"]
            );
            this.data_ours[3][5].push(
              response.data.data["期刊论文"][year[i]]["三级"]
            );
            this.data_ours[3][6].push(
              response.data.data["期刊论文"][year[i]]["ISIP"]
            );
            this.data_ours[4][0].push(
              response.data.data["会议论文"][year[i]]["最顶级"]
            );
            this.data_ours[4][1].push(
              response.data.data["会议论文"][year[i]]["一级"]
            );
            this.data_ours[4][2].push(
              response.data.data["会议论文"][year[i]]["二级"]
            );
            this.data_ours[4][3].push(
              response.data.data["会议论文"][year[i]]["三级"]
            );
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });
        this.axios.get("/query/all/patent3", {}).then((response) => {
          //历年专利 所有
          var year = this.get_achieve_year();
          var i;
          for (i = 0; i < year.length; i++) {
            this.data_all[5][0].push(response.data.data[year[i]]["发明专利"]);
            this.data_all[5][1].push(
              response.data.data[year[i]]["学生软件著作权"]
            );
            this.data_all[5][2].push(
              response.data.data[year[i]]["学生实用新型专利"]
            );
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });
        this.axios.get("/query/ours/patent3", {}).then((response) => {
          //历年专利
          var year = this.get_achieve_year();
          var i;
          for (i = 0; i < year.length; i++) {
            this.data_ours[5][0].push(response.data.data[year[i]]["发明专利"]);
            this.data_ours[5][1].push(
              response.data.data[year[i]]["学生软件著作权"]
            );
            this.data_ours[5][2].push(
              response.data.data[year[i]]["学生实用新型专利"]
            );
          }
          this.$nextTick(() => {
            this.myEcharts();
          });
        });
      },
      calTotalData() {
        //计算顶部统计数据
        this.achievement_num.competition = 0; //竞赛类
        this.achievement_num.projects = 0; //项目类
        this.achievement_num.paper = 0; //论文类
        this.achievement_num.patent = 0; //专利类
        this.achievement_num.honors = 0; //荣誉类
        this.achievement_num.total = 0; //总计
        for (var i = 0; i < this.data_temp[0][0].length; i++) {
          this.achievement_num.competition += this.data_temp[0][0][i];
        }
        for (var i = 0; i < this.data_temp[0][1].length; i++) {
          this.achievement_num.projects += this.data_temp[0][1][i];
        }
        for (var i = 0; i < this.data_temp[0][2].length; i++) {
          this.achievement_num.paper += this.data_temp[0][2][i];
        }
        for (var i = 0; i < this.data_temp[0][3].length; i++) {
          this.achievement_num.patent += this.data_temp[0][3][i];
        }
        for (var i = 0; i < this.data_temp[0][4].length; i++) {
          this.achievement_num.patent += this.data_temp[0][4][i];
        }
        this.achievement_num.total =
          this.achievement_num.patent +
          this.achievement_num.paper +
          this.achievement_num.projects +
          this.achievement_num.competition +
          this.achievement_num.honors;
      },
      handleCommand_year(command) {
        //竞赛详情的具体年份
        this.competition_year = command;
      },
      handleCommand_level(command) {
        //竞赛详情的具体类别
        this.competition_level = this.competition_level_list[command];
      },
      changeData() {
        //修改显示所有还是本院学生
        if (this.only == "all") {
          this.data_temp = this.data_all;
          this.calTotalData();
        } else {
          this.data_temp = this.data_ours;
          this.calTotalData();
        }
        this.myEcharts();
      },
      myEcharts() {
        let yearly_achievement = this.$echarts.init(
          document.getElementById("yearly_achievement")
        );
        let competition = this.$echarts.init(
          document.getElementById("competition")
        );
        let competition_increase = this.$echarts.init(
          document.getElementById("competition_increase")
        );
        let total_pie = this.$echarts.init(
          document.getElementById("total_pie")
        );
        let project = this.$echarts.init(
          document.getElementById("project")
        );
        let papar_journal = this.$echarts.init(
          document.getElementById("papar_journal")
        );
        let paper_conference = this.$echarts.init(
          document.getElementById("paper_conference")
        );
        let patent = this.$echarts.init(document.getElementById("patent"));
        // 基于准备好的dom，初始化echarts实例
        // 指定图表的配置项和数据
        //历年科技成果统计
        yearly_achievement.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF', '#743600', '#FFEBCC'],
          title: {
            text: "历年科技成果统计",
          },
          legend: {
            data: ["竞赛", "项目", "论文", "知识产权", "荣誉"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.xAxis_data,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "竞赛",
              data: this.data_temp[0][0],
              type: "bar",
            },
            {
              name: "项目",
              data: this.data_temp[0][1],
              type: "bar",
            },
            {
              name: "论文",
              data: this.data_temp[0][2],
              type: "bar",
            },
            {
              name: "知识产权",
              data: this.data_temp[0][3],
              type: "bar",
            },
            {
              name: "荣誉",
              data: this.data_temp[0][4],
              type: "bar",
            },
          ],
          dataZoom: [
            {
              type: "slider",
              show: true,
              bottom: "-10%",
              start: this.zoomStart,
              end: this.zoomEnd, //初始化滚动条
            },
          ],
        });
        //历年竞赛获奖情况
        competition.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF', '#743600', '#FFEBCC'],
          title: {
            text: "历年竞赛获奖情况",
          },
          legend: {
            data: this.competition_level_list,
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.xAxis_data,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: this.competition_level_list[0],
              data: this.data_temp[1][0],
              type: "bar",
            },
            {
              name: this.competition_level_list[1],
              data: this.data_temp[1][1],
              type: "bar",
            },
            {
              name: this.competition_level_list[2],
              data: this.data_temp[1][2],
              type: "bar",
            },
            {
              name: this.competition_level_list[3],
              data: this.data_temp[1][3],
              type: "bar",
            },
            {
              name: this.competition_level_list[4],
              data: this.data_temp[1][4],
              type: "bar",
            },
          ],
          dataZoom: [
            {
              type: "inside",
              show: true,
              bottom: "-10%",
              start: this.zoomStart,
              end: this.zoomEnd, //初始化滚动条
            },
          ],
        });
        //增长仪表图
        competition_increase.setOption({
          series: [
            {
              radius: '120%',
              center: ['50%', '60%'],
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 30,
              splitNumber: 3,
              itemStyle: {
                color: '#58D9F9',
                shadowColor: 'rgba(0,138,255,0.45)',
                shadowBlur: 5,
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              progress: {
                show: true,
                roundCap: true,
                width: 12
              },

              splitLine: {
                length: 12,
                lineStyle: {
                  width: 3,
                  color: '#999'
                }
              },
              detail: {
                width: '60%',
                lineHeight: 40,
                height: 40,
                borderRadius: 8,
                offsetCenter: [0, '35%'],
                formatter: '{value} %',
                fontSize: 20,
              },
              data: [
                {
                  value: this.competition_increase
                }
              ]
            }
          ]
        })
        //顶部饼图
        total_pie.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF', '#743600', '#FFEBCC'],
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              type: 'pie',
              radius: '80%',
              center: ['50%', '57%'],
              data: [
                {value: this.achievement_num.competition, name: '竞赛'},
                {value: this.achievement_num.projects, name: '项目'},
                {value: this.achievement_num.paper, name: '论文'},
                {value: this.achievement_num.patent, name: '知识产权'},
                {value: this.achievement_num.honors, name: '荣誉'},
              ],
            }
          ]
        });
        project.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF'],
          title: {
            text: "历年科技项目成果",
          },
          legend: {
            data: ["省新苗", "国创", "校创"],
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.xAxis_data,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "省新苗",
              data: this.data_temp[2][0],
              type: "bar",
            },
            {
              name: "国创",
              data: this.data_temp[2][1],
              type: "bar",
            },
            {
              name: "校创",
              data: this.data_temp[2][2],
              type: "bar",
            },
          ],
        });
        papar_journal.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF', '#743600', '#FFEBCC', '#8D7257', '#9BAEBC'],
          title: {
            text: "期刊论文",
          },
          legend: {
            data: ["SCI", "CSCD", "EI检索", "一级", "二级", "三级", "ISTP"],
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.xAxis_data,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "SCI",
              data: this.data_temp[3][0],
              type: "bar",
            },
            {
              name: "CSCD",
              data: this.data_temp[3][1],
              type: "bar",
            },
            {
              name: "EI检索",
              data: this.data_temp[3][2],
              type: "bar",
            },
            {
              name: "一级",
              data: this.data_temp[3][3],
              type: "bar",
            },
            {
              name: "二级",
              data: this.data_temp[3][4],
              type: "bar",
            },
            {
              name: "三级",
              data: this.data_temp[3][5],
              type: "bar",
            },
            {
              name: "ISTP",
              data: this.data_temp[3][6],
              type: "bar",
            },
          ],
          dataZoom: [
            {
              type: "inside",
              show: true,
              bottom: "-10%",
              start: this.zoomStart,
              end: this.zoomEnd, //初始化滚动条
            },
          ],
        });
        paper_conference.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF', '#743600'],
          title: {
            text: "会议论文",
          },
          legend: {
            data: ["最顶级", "一级", "二级", "三级"],
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "1%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.xAxis_data,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "最顶级",
              data: this.data_temp[4][0],
              type: "bar",
            },
            {
              name: "一级",
              data: this.data_temp[4][1],
              type: "bar",
            },
            {
              name: "二级",
              data: this.data_temp[4][2],
              type: "bar",
            },
            {
              name: "三级",
              data: this.data_temp[4][3],
              type: "bar",
            },
          ],
          dataZoom: [
            {
              type: "slider",
              show: true,
              bottom: "-10%",
              start: this.zoomStart,
              end: this.zoomEnd, //初始化滚动条
            },
          ],
        });
        patent.setOption({
          color: ['#87CEFA', '#4D98C1', '#CCF6FF'],
          title: {
            text: "历年专利成果",
          },
          legend: {
            data: ["发明专利", "学生软件著作权", "学生实用新型专利"],
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "1%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.xAxis_data,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "发明专利",
              data: this.data_temp[5][0],
              type: "bar",
            },
            {
              name: "学生软件著作权",
              data: this.data_temp[5][1],
              type: "bar",
            },
            {
              name: "学生实用新型专利",
              data: this.data_temp[5][2],
              type: "bar",
            },
          ],
        });
      },
      calCompetitionIncrease() { //计算年度增长
        var thisyear = 0;
        var lastyear = 0;
        var i = this.data_temp[0][0].length - 1
        thisyear = this.data_temp[0][0][i];
        lastyear = this.data_temp[0][0][i-1];
        if(thisyear == 0 ){
          this.competition_increase = 0
        }else {
          this.competition_increase = parseInt((thisyear / lastyear)* 1000) /10
        }
      },
    },
    mounted() {
      this.data_temp = this.data_all;
      this.xAxis_data = this.get_achieve_year();
      this.competition_year = this.get_achieve_year();
      this.myEcharts();
      this.getData();
      this.calCompetitionIncrease()
    },
  };
</script>

<style>
  .countCard {
    display: inline-block;
    width: 30%;
    height: 70px;
    border-radius: 5px;
    background-color: #F5F5F5;
    padding-top: 10px;
    margin-right: 20px;
    color: #000;
  }

  .countCard_total {
    background-image: linear-gradient(45deg, #87CEFA, #F5F5F5);
    display: inline-block;
    width: 30%;
    height: 70px;
    border-radius: 5px;
    padding-top: 10px;
    margin-right: 20px;
    color: #000;
  }

  .countCard_competition {
    display: inline-block;
    width: 30%;
    height: 70px;
    border-radius: 5px;
    background-color: #F5F5F5;
    padding-top: 10px;
    margin-right: 20px;
    color: #000;
  }
</style>
