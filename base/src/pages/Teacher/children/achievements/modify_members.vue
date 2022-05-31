<template>
  <div>
    <div class="header" style="margin-top: 10px;margin-left: 50px;">
      <i class="el-icon-back" style="display: inline-block;margin-right: 40px;font-size: 40px;" @click="$router.back(-1)"></i>
      <p style="font-size: 30px;display: inline-block;margin-top: -10px;">{{info.achieve_type}}详情</p>

      <el-tabs type="border-card" style="margin-top: 30px;margin-right: 30px;">
        <el-tab-pane v-if="achieve_type == 'competition'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">

          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <p style="display: inline">作品名称</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <p style="display: inline">竞赛名称</p>
            <p style="display: inline;margin-left: 30px;">{{info.competition_name}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <p style="display: inline">竞赛类型</p>
            <p style="display: inline;margin-left: 30px;">{{info.competition_type}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <p style="display: inline">作品类型</p>
            <p style="display: inline;margin-left: 30px;">{{info.work_type}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: 32px;">年份</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: -32px;">公布获奖日期</p>
            <p style="display: inline;margin-left: 30px;">{{info.award_date}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <p style="display: inline">竞赛级别</p>
            <p style="display: inline;margin-left: 30px;">{{info.competition_level}}</p>
          </div>
          <div class="row_8" style="margin-bottom: 10px;">
            <p style="display: inline">获得奖项</p>
            <p style="display: inline;margin-left: 30px;">{{info.award}}</p>
          </div>
          <div class="row_9" style="margin-bottom: 10px;">
            <p style="display: inline">成果简介</p>
            <span
              style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</span>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <p style="display: inline">支撑材料</p>
            <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link>
          </div>

        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == 'projects'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">
        
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <p style="display: inline">项目名称</p>
            <p style="display: inline;margin-left: 30px;">{{info.pro_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <p style="display: inline">项目类型</p>
            <p style="display: inline;margin-left: 30px;">{{info.category}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <p style="display: inline">作品名称</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <p style="display: inline">作品类型</p>
            <p style="display: inline;margin-left: 30px;">{{info.work_type}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: 32px;">年份</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <p style="display: inline;">完成进度</p>
            <p style="display: inline;margin-left: 30px;">{{info.pro_schedule}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: -38px;">立项/结题时间</p>
            <p style="display: inline;margin-left: 30px;">{{info.pro_date}}</p>
          </div>
          <div class="row_8" style="margin-bottom: 10px;">
            <p style="display: inline">成果简介</p>
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <p style="display: inline">支撑材料</p>
            <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link>
          </div>
        
        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == 'paper'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">
        
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <p style="display: inline">作品名称</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <p style="display: inline">论文类型</p>
            <p style="display: inline;margin-left: 30px;">{{info.paper_type}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: -22px;">期刊/会议名</p>
            <p style="display: inline;margin-left: 30px;">{{info.conference_name}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: 32px;">年份</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <p style="display: inline">发布日期</p>
            <p style="display: inline;margin-left: 30px;">{{info.release_date}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: 32px;">级别</p>
            <p style="display: inline;margin-left: 30px;">{{info.paper_level}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <p style="display: inline">成果简介</p>
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <p style="display: inline">检索凭证</p>
            <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <p style="display: inline">支撑材料</p>
            <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link>
          </div>
        
        </el-tab-pane>
        <el-tab-pane v-if="achieve_type == 'patent'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">
        
          <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
            <p style="display: inline">作品名称</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
          </div>
          <div class="row_2" style="margin-bottom: 10px;">
            <p style="display: inline">知识产权类型</p>
            <p style="display: inline;margin-left: 30px;">{{info.patent_type}}</p>
          </div>
          <div class="row_3" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: 32px;">年份</p>
            <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
          </div>
          <div class="row_4" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: 16px;">知识产权号</p>
            <p style="display: inline;margin-left: 30px;">{{info.patent_number}}</p>
          </div>
          <div class="row_5" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: -32px;">申请时间</p>
            <p style="display: inline;margin-left: 30px;">{{info.apply_date}}</p>
          </div>
          <div class="row_6" style="margin-bottom: 10px;">
            <p style="display: inline;margin-left: -32px;">授权时间</p>
            <p style="display: inline;margin-left: 30px;">{{info.grant_date}}</p>
          </div>
          <div class="row_7" style="margin-bottom: 10px;">
            <p style="display: inline">成果简介</p>
            <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
          </div>
          <div class="row_10" style="margin-bottom: 10px;">
            <p style="display: inline">支撑材料</p>
            <el-link type="primary" style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
              @click="exportData">下载</el-link>
          </div>
        
        </el-tab-pane>
        <el-tab-pane label="团队详情" style="margin-left: 80px;margin-bottom: 30px;">

          <div class="members">
            <p style="margin-top: 30px;margin-bottom: 30px;">成员信息:</p>
            <div v-for="(item,i) in info.students" :key="item.realName" style="display: inline-block;">
              <div class="card"
                style="width: 180px;height: 40px;border-style: solid;border-radius: 10px;border-width:1px;border-color: #D9D9D9;margin-right: 30px;margin-bottom: 20px;">
                <div class="card_order"
                  style="display: inline-block;width: 20px;height: 20px;border-style: solid;border-radius: 50%;border-width:1px;border-color: #D9D9D9;margin-top: 8px;margin-left: 10px;">
                  <p style="margin-left: 5px;">{{i+1}}</p>
                </div>
                <p style="display: inline;font-size: 15px;">{{item.realName}}</p>
                <p style="display: inline;font-size: 12px;">{{item.ranks}}</p>
              </div>
            </div>
          </div>

          <div class="teachers">
            <p style="margin-top: 30px;margin-bottom: 30px;">指导老师:</p>
            <div v-for="(item,i) in info.teachers" :key="item.realName" style="display: inline-block;">
              <div class="card"
                style="width: 140px;height: 40px;border-style: solid;border-radius: 10px;border-width:1px;border-color: #D9D9D9;margin-right: 30px;margin-bottom: 20px;">
                <div class="card_order"
                  style="display: inline-block;width: 20px;height: 20px;border-style: solid;border-radius: 50%;border-width:1px;border-color: #D9D9D9;margin-top: 8px;margin-left: 10px;">
                  <p style="margin-left: 5px;">{{i+1}}</p>
                </div>
                <p style="display: inline;font-size: 15px;">{{item.realName}}</p>
                <p style="display: inline;font-size: 12px;">{{item.ranks}}</p>
              </div>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 30px;margin-left: 30px;">
        <el-button type="primary" style="display: inline-block;" @click="open_modify">修改</el-button>
        <el-button style="display: inline-block;margin-left: 30px;">删除</el-button>
      </div>

      <el-dialog title="竞赛信息" :visible.sync="modify_competition" width="30%" :before-close="cleanAll">
        <el-form :model="form_competition" label-width="100px">
          <el-form-item label="作品名称">
            <div style="width: 200px;">
            <el-input v-model="form_competition.achieve_name"></el-input>
          </div>
          </el-form-item>
          <el-form-item label="竞赛名称">
            <el-select v-model="form_competition.name" placeholder="选择竞赛名称" @change="set_competition"
                style="width: 200px;">
                <el-option v-for="item in competition" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="年份">
            <el-date-picker v-model="form_competition.year"  type="year" placeholder="选择年份" format="yyyy">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="公布获奖日期">
            <el-date-picker v-model="form_competition.award_date" type="date" placeholder="选择获奖日期" format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="作品类型">
            <el-select v-model="form_competition.workType" @change="check" placeholder="选择作品类型" style="width: 150px;">
              <el-option v-for="item in options_workType" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="竞赛级别">
            <div style="width: 200px;">
            <el-input v-model="form_competition.competition_level" disabled></el-input>
          </div>
          </el-form-item>
          <el-form-item label="获得奖项">
            <el-select v-model="form_competition.award" @change="set_award_value" placeholder="选择奖项" style="width: 150px;">
              <el-option v-for="(id,val) in options_prize" :key="id" :label="val" :value="val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成果简介">
            <el-input v-model="form_competition.achieve_summary"></el-input>
          </el-form-item>
          <el-form-item label="上传支撑材料">
            <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc" multiple :file-list="fileList">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modify_competition = false">取 消</el-button>
          <el-button type="primary" @click="modify_competition = false">下一步</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  export default {
    name:"teaModifyMembers",
    data() {
      return {
        achieve_id: '', //从上个页面传来的id
        achieve_type:'', //上个页面传来的类型
        info: [],
        modify_competition: false, //修改对话框
        modify_projects: false, //修改对话框
        modify_paper: false, //修改对话框
        modify_patent: false, //修改对话框
        competition:[],
        options_prize: [], //奖项分布数据
        options_workType: [], //作品类型数据
        fileList: [], //上传的文件
        competition: [], //获取到的竞赛列表
        competition_now: [], //在竞赛名称确定后，将该竞赛全部信息存入此数组
        projects: [], //项目名称列表
        projects_type: [], //获取到的项目作品列表
        options_prize: [], //奖项分布数据
        options_workType: [], //作品类型数据
        options_paper_level: [], //论文级别数据
        options_patent_type: [], //知识产权类型
        formdata: null, //上传的支撑材料暂存于此
        formdata_paper: null, //上传的论文凭据暂存于此
        achieve_id:'', //上传成果物表单后返回的表单id
        members: [], //总成员信息数据
        members_single: { //单个成员信息，本院学生只用到realName
          realName: '',
          stu_class: '',
          user_id: '',
          stid: '',
          phone: '',
          college: '' //判断是否是本院学生
        },
        members_single_2: { //单个成员信息的中转信息，本院学生只用到realName
          realName: '',
          stu_class: '',
          user_id: '',
          stid: '',
          phone: '',
          team_order: '',
        },
        members_selected: [{}], //搜索到的该姓名学生列表,由于页面状态管理需要而在初始时设置一个空队列
        members_name_selected: '', //选择搜索到的学生列表中的学生，控制选择按钮
        teachers: [], //指导老师数据
        teachers_single: { //单个指导老师信息
          realName: '',
          phone: '',
          ranks: '',
          college: '', //判断是否是本院教师
        },
        teachers_single_2: { //单个教师信息的中转信息，本院教师只用到realName
          user_id: '',
          realNmae: '',
          stid: '',
          phone: '',
          ranks: '',
          team_order: '',
        },
        teachers_selected: [{}], //搜索到的该姓名教师列表,由于页面状态管理需要而在初始时设置一个空队列
        teachers_name_selected: '', //选择搜索到的教师列表中的教师，控制选择按钮
        form_competition:{ //保存修改数据
          achieve_name:'',
          year:'',
          achieve_summary:'',
          achieve_type:'',
          user_id:'',
          name:'',
          level:'',
          competition_type:'',
          rank:'',
          workType:'',
          award_date:'',
          award:'',
          award_value:'',
          achieve_id:''
        }, 
      }
    },
    methods: {
      check(){
        this.$forceUpdate()
        console.log(this.form_competition.workType)
      },
      get_achievement(){
        if(this.achieve_type == "competition"){
          this.get_competition_single();
        }else if(this.achieve_type == "projects"){
          this.get_projects_single();
        } else if (this.achieve_type == "paper") {
          this.get_paper_single();
        } else if (this.achieve_type == "patent") {
          this.get_patent_single();
        }
      },

      get_competition_single() {
        this.axios
          .get("/query/diff/achieve?achieve_id=" + this.achieve_id + "&type=0", {
            headers: {
              Token: this.$root.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      get_projects_single() {
        this.axios
          .get("/query/diff/achieve?achieve_id=" + this.achieve_id + "&type=1", {
            headers: {
              Token: this.$root.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      get_paper_single() {
        this.axios
          .get("/query/diff/achieve?achieve_id=" + this.achieve_id + "&type=2", {
            headers: {
              Token: this.$root.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      get_patent_single() {
        this.axios
          .get("/query/diff/achieve?achieve_id=" + this.achieve_id + "&type=3", {
            headers: {
              Token: this.$root.Token,
            },
          })
          .then((response) => {
            this.info = response.data.data;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      get_competition() { //获取竞赛信息数据
        var _this = this
        this.axios.get('/opt/achieve/list?choice=0&pageNum=1&pageSize=1000', {
            headers: {
              'Token': this.$root.Token
            },
          })
          .then(response => {
            this.competition = response.data.data.list
            Object.keys(_this.competition).forEach(res => { //修改决赛时间的日期格式
              _this.competition[res].finalDate = _this.competition[res].finalDate.substr(0, 10)
            })
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      get_projects() { //获取项目名称数据
        var _this = this
        this.axios.get('/opt/achieve/list?choice=1&pageNum=1&pageSize=1000', {
          headers: {
            'Token': this.$root.Token
          },
        })
          .then(response => {
            this.projects = response.data.data.list
            /* Object.keys(_this.projects).forEach(res => { //修改决赛时间的日期格式
              _this.projects[res].finalDate = _this.projects[res].finalDate.substr(0, 10)
            }) */
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_project_type() { //获取项目作品类型数据
        this.axios.get('/opt/option/items?type=project_type', {
          headers: {
            'Token': this.$root.Token
          },
        })
          .then(response => {
            this.projects_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_journal_paper() { //获取期刊论文等级数据
        this.axios.get('/opt/option/paper/ranks?type=0', {
          headers: {
            'Token': this.$root.Token
          },
        })
          .then(response => {
            this.options_paper_level = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_conference_paper() { //获取会议论文等级数据
        this.axios.get('/opt/option/paper/ranks?type=1', {
          headers: {
            'Token': this.$root.Token
          },
        })
          .then(response => {
            this.options_paper_level = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_patent_type() { //获取知识产权类型
        this.axios.get('/opt/option/items?type=patent_type', {
          headers: {
            'Token': this.$root.Token
          },
        })
          .then(response => {
            this.options_patent_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_student() { //搜索学生
        this.axios.get('/user/id?user_name=' + this.members_single.realName + "&choice=0", {
            headers: {
              'Token': this.$root.Token
            },
          })
          .then(response => {
            this.members_selected = response.data.data
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      get_teacher() { //搜索教师
        this.axios.get('/user/id?user_name=' + this.teachers_single.realName + "&choice=1", {
            headers: {
              'Token': this.$root.Token
            },
          })
          .then(response => {
            this.teachers_selected = response.data.data
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      exportData() { //下载支撑材料
        window.open(
          this.info.support_files
        );
      },
      open_modify(){ //打开修改对话框,并修改form数据
        if(this.achieve_type == "competition"){
        this.form_competition = Object.assign({},this.info);
        this.form_competition.workType = this.info.work_type;
        this.form_competition.name = this.info.competition_name;
        this.form_competition.year = this.info.achieve_year;
        this.get_competition();
        var _this = this;
        Object.keys(_this.competition).forEach(res => { //从竞赛数组中拉出一组列表，将奖项和作品类型用分隔符隔开存到各自数组,同时保存等级和竞赛类型、年份
            _this.options_prize = _this.competition[res].prizeRank
            console.log(_this.competition[res].workType.split("/"))
            _this.options_workType = _this.competition[res].workType.split("/")
            console.log(_this.options_workType);
        })
        var _this = this;                                                                   
        this.form_competition.year = this.form_competition.year.toString();
      }
        this.modify_competition = true;
      },
      cleanAll(){ //关闭对话框时清除数据
        Object.keys(this.form_competition).forEach(res =>{
          this.form_competition[res] = '';
        })
      },
      
      set_competition() { //上传竞赛：在竞赛名称确定后，将该竞赛的作品类型和获得奖项存入中转数组
        var _this = this
        this.form_competition.workType = ''
        Object.keys(_this.competition).forEach(res => { //从竞赛数组中拉出一组列表，将奖项和作品类型用分隔符隔开存到各自数组,同时保存等级和竞赛类型、年份
          if (_this.competition[res].name == _this.form_competition.name) {
            _this.options_prize = _this.competition[res].prizeRank
            _this.options_workType = _this.competition[res].workType.split("/")
            _this.form_competition.rank = _this.competition[res].rank
            _this.form_competition.competitionType = _this.competition[res].competitionType
            _this.form_competition.year = _this.competition[res].year.toString()
            console.log(_this.options_workType);
          }
        })
      },
      set_award_value(){ //在选定竞赛的奖项后，同步获取其值
        Object.keys(this.options_prize).forEach(res => {
          if(this.form_competition.award == res){
            this.form_competition.award_value = this.options_prize[res]
          }
        })
      },
      set_paper_level() { //上传论文：在论文类型确定后，获取论文的级别
        if (this.form_paper.paper_type == 0) {
          this.get_journal_paper();
        } else {
          this.get_conference_paper();
        }
      },
      set_input_members() { //添加成员：选定本院或非本院后开放后续输入框
        if (this.members_single.college == '1') {
          this.if_college = true
          this.if_disabled = false
        } else {
          this.if_college = false
          this.if_disabled = false
        }
      },
      set_input_teachers() { //添加教师：选定本院或非本院后开放后续输入框
        if (this.teachers_single.college == '1') {
          this.if_college = true
          this.if_disabled = false
        } else {
          this.if_college = false
          this.if_disabled = false
        }
      },
      set_members(item) { //添加成员：选定本院成员后将其信息固定在特定中转数组
        var item_2 = JSON.stringify(item)
        var item_3 = JSON.parse(item_2)
        console.log("item" + item_2)
        this.members_name_selected = item_3.stid
        this.members_single_2 = item_3
      },
      set_members_single() { //在函数中构造一个空函数压入成员的总数组
        var single = {}
        if (this.members_single.college == '2') {
          Object.keys(this.members_single).forEach(res => {
            single[res] = this.members_single[res]
          })
        } else {
          Object.keys(this.members_single_2).forEach(res => {
            single[res] = this.members_single_2[res]
          })
        }
        return single
      },
      set_teachers_single() { //在函数中构造一个空函数压入教师的总数组
        var single = {}
        if (this.teachers_single.college == '2') {
          Object.keys(this.teachers_single).forEach(res => {
            single[res] = this.teachers_single[res]
          })
        } else {
          Object.keys(this.teachers_single_2).forEach(res => {
            single[res] = this.teachers_single_2[res]
          })
        }
        return single
      },
      set_teachers(item) { //添加教师：选定本院教师后将其信息固定在特定中转数组
        var item_2 = JSON.stringify(item)
        var item_3 = JSON.parse(item_2)
        this.teachers_name_selected = item_3.stid
        this.teachers_single_2 = item_3
      },
      set_firstOrder(item, i) { //添加成员：指定第一负责人,分别在成果物表单指定（最终上传到服务器），在成员表单指定（显示在视图上）
        var item_2 = JSON.stringify(item)
        var item_3 = JSON.parse(item_2)
        this.form_achievements.user_id = item_3.user_id;
        Object.keys(this.members).forEach(res => {
          this.members[res].rank = ''
        })
        Vue.set(this.members[i], 'rank', '第一负责人')
        this.if_add_firstOrder = false
      },
      set_doc(fileObj) { //本地保存上传的支撑材料
        this.formdata = new FormData()
        this.formdata.append('file', fileObj.file)
      },
      set_doc_paper(fileObj) { //本地保存上传的论文凭据材料
        this.formdata_paper = new FormData()
        this.formdata_paper.append('file', fileObj.file)
      },
      set_projects_work_type() { //在选定项目名称后锁定作品类型
        var _this = this
        Object.keys(_this.projects).forEach(res => {
          if (_this.projects[res].name == _this.form_projects.name) {
            _this.form_projects.work_type = _this.projects[res].work_type;
          }
        })
      },
      set_paper_rank() { //选定论文级别的时候获取级别大小
        Object.keys(this.options_paper_level).forEach(res => {
          if (this.options_paper_level[res].name == this.form_paper.name) {
            this.form_paper.rank = this.options_paper_level[res].rank;
          }
        })
      },

      add_members() { //将选定的成员信息压入成员列表
        if (this.members_single.college == '1' && this.members_single.realName != '') {
          this.members.push(this.set_members_single())
        } else if (this.members_single.college == '2' && this.members_single.realName != '') {
          this.members.push(this.set_members_single())
        }
        this.visible_add_members = false
      },
      add_teachers() { //将选定的教师信息压入成员列表
        if (this.teachers_single.college == '1' && this.teachers_single.realName != '') {
          this.teachers.push(this.set_teachers_single())
        } else if (this.teachers_single.college == '2' && this.teachers_single.realName != '') {
          this.teachers.push(this.set_teachers_single())
        }
        this.visible_add_teachers = false
      },

      delete_members(i) { //删除成员卡片
        this.members.splice(i, 1)
      },
      delete_teachers(i) { //删除教师卡片
        this.teachers.splice(i, 1)
      },

      cleanAll_members() { //所有的添加成员页面关闭状态都在这里控制，需要仔细检查
        this.if_disabled = true
        this.if_college = true
        this.members_name_selected = ''
        Object.keys(this.members_single).forEach(res => {
          this.members_single[res] = ''
        })
        Object.keys(this.members_single_2).forEach(res => {
          this.members_single[res] = ''
        })
        Object.keys(this.members_selected).forEach(res => {
          this.members_selected[res] = ''
        })
      },
      cleanAll_teachers() { //所有的添加教师页面关闭状态都在这里控制，需要仔细检查
        this.if_disabled = true
        this.if_college = true
        this.teachers_name_selected = ''
        Object.keys(this.teachers_single).forEach(res => {
          this.teachers_single[res] = ''
        })
        Object.keys(this.teachers_single_2).forEach(res => {
          this.teachers_single[res] = ''
        })
        Object.keys(this.teachers_selected).forEach(res => {
          this.teachers_selected[res] = ''
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

<style>
</style>