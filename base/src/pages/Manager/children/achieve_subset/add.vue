<template>
  <div>
    <div class="header">
      <i class="el-icon-back" style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
         @click="$router.back(-1)"></i>
      <p
        style="font-size: 24px;display: inline-block;margin-top: -10px;font-family: arial;color: #1f2f3d;font-weight: 400;">
        成果物子集信息</p>
    </div>

    <el-form width="500px;" style="margin-top: 30px;">
      <el-form-item label="成果子集名称" :label-width="formLabelWidth" style="font-weight: bold;">
        <el-input v-model="form.name" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="子集简介" :label-width="formLabelWidth" style="font-weight: bold;">
        <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                  v-model="form.summary">
        </el-input>
        <span class="numLimit">{{this.form.summary.length}}/320</span>
      </el-form-item>
      <el-form-item label="子集标签" :label-width="formLabelWidth" style="font-weight: bold;">
        <el-tag v-for="(item,key) in form.taglist" :key="key"
                @close="handleClose(tag)"

        >{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput" v-if="form.taglist.length<5">+添加标签</el-button>
        <span style="position:relative; left:20px"  >{{form.taglist.length}}/5</span>



      </el-form-item>
    </el-form>

    <el-collapse accordion style="margin-top: 20px;margin-left: 35px;">
      <el-collapse-item style="padding-bottom: 0px;">
        <template slot="title">
          <p style="font-family: sans-serif;font-size: 1.1em;color: #8C939D;">成果物搜索</p>
          <i class="el-icon-arrow-down " style="margin-left:10px"></i>
        </template>
        <el-divider></el-divider>
        <div class="choose"
             style="margin-top: -5px;margin-bottom: -25px;padding-top: 20px;padding-bottom: 20px;">
          <div class="achieve_list">
            <div style="overflow: hidden; display: inline;margin-left: 43px;margin-top: 10px;">
              <p style="display: inline;font-family: helvetica;color: #6B7F91;">成果物类型</p>
              <el-checkbox
                style="display: inline;margin-left: 30px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;"
                :indeterminate="isInd.achieve_type" v-model="checkAll.achieve_type"
                label="全选"
                @change="HandleCheckAll($event,'achieve_type')">全选</el-checkbox>
              <el-radio-group v-model="selected_search.achieve_type" style="display: inline-block;"
                                 @change="HandleChecked($event,'achieve_type')" v-for="(item,i) in options.achieve_type"
                                 :key="i">
                <el-radio :label="item"
                             style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                  {{item}}</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div class="achieve_list" style="margin-top: 10px; margin-left: 82px">
            <div style="overflow: hidden; display: inline">
              <p style="display: inline;font-family: helvetica;color: #6B7F91;">年份</p>
              <el-checkbox
                style="display: inline;margin-left: 30px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;"
                :indeterminate="isInd.year" v-model="checkAll.year" @change="HandleCheckAll_year">全选
              </el-checkbox>
              <el-radio-group v-model="achieve_year_single" style="display: inline-block;"
                                 @change="HandleChecked_year" v-for="(key,val) in options.year" :key="key">
                <el-radio :label="key"
                             style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                  {{key}}</el-radio>
              </el-radio-group>
              <el-input size="mini" v-model="achieve_year_start" placeholder="请输入起始年份"
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @keyup.enter.native="set_years"
                        @blur="set_years" maxlength="4" style="display: inline-block;width: 120px;"> </el-input>
            </div>
                  <el-input
                    size="mini"
                    v-model="achieve_year_end"
                    placeholder="请输入终止年份"
                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                    @keyup.enter.native="set_years"
                    @blur="set_years"
                    maxlength="4"
                    style="display: inline-block; width: 120px"
                  >
                  </el-input>
          </div>
          <div class="achieve_list" style="margin-top: 10px; margin-left: 82px">
            <div style="overflow: hidden; display: inline">
              <p style="display: inline;font-family: helvetica;color: #6B7F91;">姓名</p>
            </div>
            <div style="display: inline; margin-left: 20px">
              <el-input v-model="options.name" placeholder="请输入姓名" @input="get_student"
                        @keyup.enter.native="get_student" size="mini" style="width: 100px">
              </el-input>
            </div>
          </div>
          <div class="achieve_list" style="margin-top: 10px; margin-left: 70px">
            <div style="overflow: hidden; display: inline">
              <p style="display: inline;font-family: helvetica;color: #6B7F91;">作品名</p>
            </div>
            <div style="display: inline; margin-left: 20px">
              <el-input v-model="selected_search.keyWord" placeholder="请输入姓名" @input="get_info_search()"
                        @keyup.enter.native="get_info_search()" @blur="get_info_search()" size="mini"
                        style="width: 100px">
              </el-input>
            </div>
          </div>
        </div>
        <div class="table_search">
          <el-table ref="info_export" :data="info_search" tooltip-effect="dark" stripe size="small"
                    row-key="achieve_id" style="width: 95%; margin-top: 30px; margin-left: 2.5%;min-width: 800px;"
                    border>
            <el-table-column prop="achieve_type" label="成果物类型" show-overflow-tooltip width="150"
                             align="center">
            </el-table-column>
            <el-table-column prop="achieve_name" label="作品名称" show-overflow-tooltip width="300"
                             align="center">
              <!-- <template slot-scope="scope">
                  <span @click="checkDetails(scope.row)"
                      style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="work_type" label="作品类型" show-overflow-tooltip align="center">
              <!-- <template slot-scope="scope">
                  <span
                      style="width:300px;text-overflow: ellipsis;">{{scope.row.achieve_type === '荣誉'?scope.row.work_type:scope.row.work_type}}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="achieve_year" label="年份" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="realName" label="第一作者" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="add_local(scope.row)" type="text" size="small">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 60px; margin-left: 33%"
                         @size-change="selected_search.size = $event,get_info_search()"
                         @current-change="get_info_search()" :current-page.sync="current_page_search"
                         :page-sizes="[10, 20, 40, 60]" :page-size.sync="selected_search.size"
                         layout="total, sizes, prev, pager, next, jumper" :total.sync="size_total_search">
          </el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="table_add">
      <el-table ref="info_export" :data="info_add_copy" tooltip-effect="dark" stripe size="small"
                row-key="achieve_id" style="width: 95%; margin-top: 30px; margin-left: 2.5%;min-width: 800px;" border>
        <el-table-column prop="achieve_type" label="成果物类型" show-overflow-tooltip width="150" align="center">
        </el-table-column>
        <el-table-column prop="achieve_name" label="作品名称" show-overflow-tooltip width="300" align="center">
          <template slot-scope="scope">
                        <span @click="checkDetails(scope.row)"
                              style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="work_type" label="作品类型" show-overflow-tooltip align="center">
          <!-- <template slot-scope="scope">
              <span
                  style="width:300px;text-overflow: ellipsis;">{{scope.row.achieve_type === '荣誉'?scope.row.work_type:scope.row.work_type}}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="achieve_year" label="年份" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="realName" label="第一作者" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="checkDetails(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 60px; margin-left: 35%" @size-change="selected.size = $event"
                     @current-change="handleCurrentChange" :current-page.sync="current_page_add" :page-sizes="[3, 6, 10, 30]"
                     :page-size.sync="selected.size" layout="total, sizes, prev, pager, next, jumper"
                     :total.sync="info_add.length">
      </el-pagination>
    </div>
    <el-button type="primary" @click="add" style="margin-left: 45%;margin-top: 30px;">添加成果子集</el-button>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'

//获取当前年份，构建年份选项
const get_year = () => {
  let year = [];
  let date = new Date();
  let y = date.getFullYear();
  let i = 0;
  for (i; i < 5; i++) {
    year[i] = y;
    y -= 1;
  }
  //year[i] = y + "及以前";
  return year;
};
const options_achieve_type = ['竞赛', '项目', '论文', '荣誉', '知识产权'];
let year = get_year();
const options_year = year;
//调用原生js库lodash，以便进行深拷贝
const _ = require('lodash');
export default {
  name: 'adminSummary',
  data() {
    return {
      achieve_year_single:'',
      achieve_year_start:'',
      achieve_year_end:'',
      inputVisible:false,
      inputValue:'',
      formLabelWidth: '150px',
      info: [], //获取到的表格数据
      selected: {//多条件查询存放选项
        size: 3,
        start: '',
      },
      pages_total_add: 1, //表格最大页数
      current_page_add: 1, //表格当前页数
      size_total_add: 3, //表格当前条目数
      form: {
        name: '',
        summary: '',
        taglist:[]
      },
      info_search: [],
      info_add: [],
      info_add_copy: [],
      options: {  //搜索栏选项
        achieve_type: options_achieve_type,
        year: options_year,
        name: '',
        keyWord: ''
      },
      selected_search: {//多条件查询存放选项
        achieve_type: "",
        achieve_year: "",
        user_id: [],
        keyWord: "",
        size: 10,
        start: '',
      },
      selected_control: {
        checkAll_achieve_type: false, //多选的控制
        isInd_achieve_type: true,
        checkAll_year: false,
        isInd_year: true
      },
      //多选控制
      checkAll: {
        achieve_type: false,
        year: false,
      },
      isInd: {
        achieve_type: false,
        year: false,
      },
      achieve_year: [],//存放已选年份，由于年份接口设计问题与selected分离
      achieve_year_input: "",//存放用户输入的年份，输入完添加到achieve_year数组中
      pages_total_search: 1, //表格最大页数
      current_page_search: 1, //表格当前页数
      size_total_search: 1, //表格当前条目数
    }
  },

  methods: {
    handleClose(tag) {
      this.form.taglist.splice(this.form.taglist.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.taglist.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';

    },
    /*  async get_info() {
         this.selected.start = this.current_page_add;
         let res = await this.$api_achievement.admin_search_achieve_subset(this.selected);
         this.info = res.list;
         this.pages_total = res.pages;
         this.size_total_add = res.total;
     }, */
    checkDetails(row) {
      this.$router.push({
        path: "achieve_details",
        query: {
          achieve_id: row.achieve_id,
          type: row.achieve_type
        }
      });
    },
    //按条件查询
    async get_info_search() {
      Vue.set(this.selected_search, "achieve_year_single", this.achieve_year_single);
        Vue.set(this.selected_search, "achieve_year_start", this.achieve_year_start);
        Vue.set(this.selected_search, "achieve_year_end", this.achieve_year_end);
      //通过创建一个深拷贝数组，实现选项的键和值解耦，再排序便不会改变选项
      //将用户输入的年份压入年份搜索中
      let year_model = _.cloneDeep(this.achieve_year);
      if (this.achieve_year_input.length == 4) {
        year_model.push(Number(this.achieve_year_input));
      }
      year_model.sort();
      /* if (typeof (year_model[0]) === 'string') {
          let year = await this.set_yaer_past();
          Vue.set(this.selected, "achieve_year", year)
      } else {
          Vue.set(this.selected, "achieve_year", year_model)
      } */
      Vue.set(this.selected_search, "achieve_year", year_model)
      this.selected_search.start = this.current_page_search;
      let res = await this.$api_query.admin_search_achieve(this.selected_search);
      console.log(this.selected_search)
      this.info_search = res.list;
      this.pages_total = res.pages;
      this.size_total_search = res.total;
    },
    //根据学生搜索成果物
    async get_student() {
      if (this.options.name !== '') {
        let members_id = [];
        let res = await this.$api_user.get_user_by_name(this.options.name);
        Object.keys(res).forEach(res_2 => {
          members_id.push(res[res_2]);
        })
        if (members_id.length > 0) {
          this.selected_search.user_id = members_id;
        } else {
          this.selected_search.user_id = ['0'];
        }
        await this.get_info_search();
      } else {
        this.selected_search.user_id = [];
        await this.get_info_search();
      }
    },
    //多选控制
    HandleCheckAll(val, type) {
      let opt = [];
      Object.keys(this.options[type]).forEach(res => {
        opt.push(this.options[type][res]);
      })
     // this.selected_search[type] = val ? opt : [];
      //console.log(this.selected[type]);
      if(type==="achieve_type"){
        this.selected_search[type]=""
      }else if(type="achive_year"){
       this.Selected_achieve_year = val ? options_achieve_year : [];}
      this.isInd[type] = false;
      this.get_info_search();
    },
    HandleChecked(value, type) {
      console.log(value)
        let checkedCount = value.length;
        this.checkAll[type] =  this.selected_search[type]===""
        this.isInd[type]=this.selected_search[type]===""
      this.get_info_search();
 
    },
    //多选控制,年份控制特殊，另开函数
    HandleCheckAll_year(val) {

      if (val) {
        this.achieve_year = options_year;
      } else {
        this.achieve_year = [];
        this.achieve_year_input = "";
      }
      //this.achieve_year = val ? options_year : [];
      this.isInd.year = false;
      this.get_info_search();
    },
    HandleChecked_year(value) {
      let checkedCount = value.length;
      this.checkAll.year = checkedCount === this.options.year.length;
      this.isInd.year = checkedCount > 0 && checkedCount < this.options.year.length;
      //console.log(this.achieve_year);
      this.get_info_search();
    },
    set_years(e) {
      //判断用户输入年份是否符合格式
      //将限制数字输入得到的输入结果赋值给v-model绑定的数据，v-model的性质决定了需要这一步
      this.achieve_year_input = e.target.value;
      if (this.achieve_year_input.length != 0) {
        if (this.achieve_year_input.length != 4) {
          this.achieve_year_input = "";
          this.$message.warning("年份数据格式不正确");
        }
      }
      this.get_info_search();
    },
    add_local(data) {
      let flag = 0;
      this.info_add.forEach(res => {
        if (res.achieve_id === data.achieve_id) {
          flag = 1;
          this.$message.warning("请不要重复添加");
          return;
        }
      })
      if (!flag) {
        this.info_add.push(data);
        this.info_add_copy = this.currentChangePage(this.size_total_add, this.current_page_add);
        this.pages_total_add = Math.ceil(Number(this.info_add.length) / Number(this.size_total_add));
        console.log(this.pages_total_add);
      }
    },
    handleSizeChange(pageSize) {
      this.size_total_add = pageSize;
      this.info_add_copy = this.currentChangePage(pageSize, this.current_page_add);
    },
    handleCurrentChange(currentPage) {
      this.current_page_add = currentPage;
      this.info_add_copy = this.currentChangePage(this.size_total_add, currentPage);
    },
    //分页方法
    currentChangePage(size, current) {
      const tablePush = [];
      this.info_add.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      })
      return tablePush;
    },
    add() {
      if (this.form.name !== '' && this.form.summary !== "") {
        let postForm = {};
        let idListOfCompetition = [];
        let idListOfHonor = [];
        let idListOfPaper = [];
        let idListOfPatent = [];
        let idListOfProject = [];
        this.info_add.forEach(res => {
          switch (res.achieve_type) {
            case '竞赛':
              idListOfCompetition.push(res.achieve_id);
              break;
            case '项目':
              idListOfProject.push(res.achieve_id);
              break;
            case '知识产权':
              idListOfPatent.push(res.achieve_id);
              break;
            case '论文':
              idListOfPaper.push(res.achieve_id);
              break;
            case '荣誉':
              idListOfHonor.push(res.achieve_id);
              break;
          }
        })
        Vue.set(postForm,'idListOfCompetition',idListOfCompetition);
        Vue.set(postForm,'idListOfProject',idListOfProject);
        Vue.set(postForm,'idListOfPatent',idListOfPatent);
        Vue.set(postForm,'idListOfPaper',idListOfPaper);
        Vue.set(postForm,'idListOfHonor',idListOfHonor);
        Vue.set(postForm,'introduction',this.form.summary);
        Vue.set(postForm,'name',this.form.name);
        Vue.set(postForm,'strListOfTag',this.form.taglist)
        console.log(postForm);
        this.$api_achievement.admin_post_achieve_subset(postForm).then(res => {
          if (res.data.code == 2000) {
            this.$message.success("添加成功!");
            this.$router.back(-1);
          }
        })
      } else {
        this.$message.warning("请将表单填写完整");
      }
    },

  },
  created() {
    //this.get_info();
    this.get_info_search();
  },
};
</script>

<style  scoped lang="scss">
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

/deep/ .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

/deep/ .el-icon-arrow-down {
  font-size: 12px;
}
/deep/ .el-radio__inner {
  display: none;
}
/deep/  .el-checkbox__inner {
  display: none;
}

/deep/ .el-divider--horizontal {
  margin-top: 0px;
  margin-bottom: 5px;
}
</style>
