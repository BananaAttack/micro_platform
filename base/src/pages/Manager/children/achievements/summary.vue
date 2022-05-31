<template>
  <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
    <div style="width: 100%;min-width: 800px;">

      <div class="head" style="height: 50px;">
        <!-- <el-dropdown @command="set_export_type">
            <span class="el-dropdown-link" style="margin-top: -5px;color: gray;">
                导出格式
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">EXCEL格式</el-dropdown-item>
                <el-dropdown-item command="1">PDF模板</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> -->
        <el-button type="primary" icon="el-icon-download"
                   style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
                   @click="exprot_which">导出EXCEL
        </el-button>
        <div style="display: inline-block;float: right;">
         
            <el-button slot="trigger" type="primary" icon="el-icon-upload2"
                       style="margin-left: 0px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"@click="$router.push('/statistics/upload_achievements')">
              批量导入
            </el-button>
          <el-button type="primary" icon="el-icon-download"
                     style="margin-left: 20px;margin-top: 10px;height:30px;padding-top:8px;background-color: #409EFF;border: none;"
                     @click="exprot_models">下载导入模板
          </el-button>
        </div>
      </div>

<!--      <el-collapse accordion style="margin-top: 20px;">-->
<!--        <el-collapse-item style="padding-bottom: 0px;">-->
<!--          <template slot="title">-->
<!--            <p style="font-family: sans-serif;font-size: 1.1em;color: #8C939D;">多条件搜索</p>-->
<!--&lt;!&ndash;            <i class="el-icon-arrow-down " style="margin-left:10px"></i>&ndash;&gt;-->
<!--          </template>-->
<!--          <el-divider></el-divider>-->
<!--          <div class="choose"-->
<!--               style="margin-top: -5px;margin-bottom: -25px;padding-top: 20px;padding-bottom: 20px;">-->
<!--            <div class="achieve_list">-->
<!--              <div style="overflow: hidden; display: inline;margin-top: 10px;">-->
<!--                <div style="width: 100px;text-align: right;display: inline-block;">-->
<!--                  <span style="font-family: helvetica;color: #6B7F91;">成果物类型</span></div>-->
<!--                <el-checkbox-->
<!--                  style="display: inline;margin-left: 20px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;"-->
<!--                  :indeterminate="isInd.achieve_type" v-model="checkAll.achieve_type"-->
<!--                  @change="HandleCheckAll($event,'achieve_type')">全选-->
<!--                </el-checkbox>-->
<!--                <el-radio-group v-model="selected.achieve_type" style="display: inline-block;"-->
<!--                                   @change="HandleChecked($event,'achieve_type')"-->
<!--                                   v-for="(item,i) in options.achieve_type" :key="i">-->
<!--                  <el-radio :label="item"-->
<!--                               style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">-->
<!--                    {{ item }}-->
<!--                  </el-radio>-->
<!--                </el-radio-group>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="achieve_list" style="margin-top: 10px;">-->
<!--              <div style="overflow: hidden; display: inline">-->
<!--                <div style="width: 100px;text-align: right;display: inline-block;">-->
<!--                  <span style="font-family: helvetica;color: #6B7F91;">年份</span></div>-->
<!--                <el-checkbox-->
<!--                  style="display: inline;margin-left: 20px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;"-->
<!--                  :indeterminate="isInd.year" v-model="checkAll.year" @change="HandleCheckAll_year">全选-->
<!--                </el-checkbox>-->
<!--                <el-radio-group v-model="achieve_year_single" style="display: inline-block;"-->
<!--                                   @change="HandleChecked_year" v-for="(key,val) in options.year" :key="key">-->
<!--                  <el-radio :label="key"-->
<!--                               style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;" >-->
<!--                    {{ key }}-->
<!--                  </el-radio>-->
<!--                </el-radio-group>-->
<!--                <el-input size="mini" v-model="achieve_year_start" placeholder="请输入起始年份"-->
<!--                          oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @keyup.enter.native="set_years"-->
<!--                          @blur="set_years" maxlength="4" style="display: inline-block;width: 120px;">-->
<!--                </el-input>-->
<!--                <el-input size="mini" v-model="achieve_year_end" placeholder="请输入终止年份"-->
<!--                          oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @keyup.enter.native="set_years"-->
<!--                          @blur="set_years" maxlength="4" style="display: inline-block;width: 120px;">-->
<!--                </el-input>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="achieve_list" style="margin-top: 10px;">-->
<!--              <div style="overflow: hidden; display: inline">-->
<!--                <div style="width: 100px;text-align: right;display: inline-block;">-->
<!--                  <span style="font-family: helvetica;color: #6B7F91;">状态</span></div>-->
<!--                <el-radio v-model="selected.status" :label="5" @change="get_info()"-->
<!--                          style="display: inline;margin-left: 16px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">-->
<!--                  全选-->
<!--                </el-radio>-->
<!--                <el-radio-group v-model="selected.status" style="display: inline-block;"-->
<!--                                @change="get_info()">-->
<!--                  <el-radio :label="1"-->
<!--                            style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">-->
<!--                    完整-->
<!--                  </el-radio>-->
<!--                  <el-radio :label="4"-->
<!--                            style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">-->
<!--                    不完整-->
<!--                  </el-radio>-->
<!--                </el-radio-group>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="achieve_list" style="margin-top: 10px;">-->
<!--              <div style="overflow: hidden; display: inline">-->
<!--                <div style="width: 100px;text-align: right;display: inline-block;">-->
<!--                  <span style="font-family: helvetica;color: #6B7F91;">姓名</span></div>-->
<!--                <el-checkbox v-model="selected.user_id" label=""-->
<!--                             @change="selected.user_id=[],options.name='',get_info()"-->
<!--                             style="display: inline;margin-left: 20px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">-->
<!--                  全选-->
<!--                </el-checkbox>-->
<!--              </div>-->
<!--              <div style="display: inline; margin-left: 10px">-->
<!--                <el-input v-model="options.name" placeholder="请输入姓名" @input="get_student"-->
<!--                          @keyup.enter.native="get_student" size="mini" style="width: 120px">-->
<!--                </el-input>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="achieve_list" style="margin-top: 10px;">-->
<!--              <div style="overflow: hidden; display: inline">-->
<!--                <div style="width: 100px;text-align: right;display: inline-block;">-->
<!--                  <span style="font-family: helvetica;color: #6B7F91;">作品名</span></div>-->
<!--                <el-checkbox v-model="selected.keyWord" label=""-->
<!--                             @change="selected.keyWord='',options.keyWord='',get_info()"-->
<!--                             style="display: inline;margin-left: 20px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">-->
<!--                  全选-->
<!--                </el-checkbox>-->
<!--              </div>-->
<!--              <div style="display: inline; margin-left: 10px">-->
<!--                <el-input v-model="selected.keyWord" placeholder="请输入作品名" @input="get_info()"-->
<!--                          @keyup.enter.native="get_info()" @blur="get_info()" size="mini"-->
<!--                          style="width: 120px">-->
<!--                </el-input>-->
<!--              </div>-->
<!--            </div>-->

<!--          </div>-->
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->
      <el-form :inline="true" :model="selected">
        <el-form-item size="small">
          <el-select placeholder="成果类型" v-model="selected.achieve_type"
                     @change="HandleChecked($event,'achieve_type')" style="width: 120px;">
            <el-option v-for="item in options['achieve_type']" :label="item.name? item.name : item"
                       :value="item.name? item.name : item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small"  >
          <el-date-picker
            v-model="achieve_year"
            type="monthrange"
            value-format="yyyy"
            @change="handleYear($event)"
            format="yyyy"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 200px;"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-input placeholder="搜索姓名" v-model="options.name" @change="get_student" size="small" style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="搜索作品名" v-model="selected.keyWord" @change="HandleChecked($event,'keyWord')" size="small" style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-popover
            placement="bottom"
            width="600"
            popper-class="me"
            close-delay="1000"
            trigger="hover"
            title="高级筛选">
            <el-form :inline="true">
              <el-form-item label="应用对象">
                <el-checkbox-group @change="judgeObject" v-model="ishost">
                  <el-checkbox label="1" >主持人</el-checkbox>
                  <el-checkbox label="2" >成员</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="完整度">
                <el-checkbox-group @change="judgestatus" v-model="iscomplete">
                  <el-checkbox label="1">完整</el-checkbox>
                  <el-checkbox label="2">不完整</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="所学专业">
                <el-select placeholder="所有专业" v-model="selected.major" @change="HandleChecked($event,'major')" >
                  <el-option v-for="item in options['majors']" :label="item.name" :value="item.name" ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在班级">
                <el-select placeholder="所有班级" v-model="selected.clazz" @change="HandleChecked($event,'clazz')">
                  <el-option v-for="i in options['classes']" :label="i.name" :value="i.name"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button slot="reference" size="small">
              <el-icon name="search"></el-icon>
            </el-button>
          </el-popover>
        </el-form-item>
      </el-form>

      <div class="table">
        <el-table ref="info_export" :data="info" tooltip-effect="dark" stripe size="small" row-key="achieve_id"
                  style="width: 100%; margin-top: 30px;min-width: 800px;cursor:pointer"
                  @selection-change="info_export = $event" @row-click="checkDetails" border>
          <el-table-column type="selection" align="center" reserve-selection>
          </el-table-column>
          <el-table-column prop="achieve_type" label="成果物类型" :formatter="if_null" show-overflow-tooltip width="150"
                           align="center">
          </el-table-column>
          <el-table-column prop="achieve_name" label="作品名称" :formatter="if_null" show-overflow-tooltip align="center">
            <!-- <template slot-scope="scope">
                <span @click="checkDetails(scope.row)"
                    style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="work_type" label="作品类型" :formatter="if_null" show-overflow-tooltip width="150"
                           align="center">
            <!-- <template slot-scope="scope">
            <span
                style="width:300px;text-overflow: ellipsis;">{{scope.row.achieve_type === '荣誉'?scope.row.work_type:scope.row.work_type}}</span>
        </template> -->
          </el-table-column>
          <el-table-column prop="achieve_year" label="年份" :formatter="if_null" show-overflow-tooltip width="150"
                           align="center">
          </el-table-column>
          <el-table-column prop="realName" label="第一作者" :formatter="if_null" show-overflow-tooltip width="200"
                           align="center">
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button @click="checkDetails(scope.row)" type="text" size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination style="margin-top: 60px;" @size-change="selected.size = $event,get_info()"
                       @current-change="get_info" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
                       :page-size.sync="selected.size" layout="total, sizes, prev, pager, next, jumper"
                       :total.sync="size_total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Vue from 'vue'

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
      ishost:["1","2"],       //是否主持人
      iscomplete:["1","2"],   //是否完整
      major:"",
      clazz:"",
      options: {  //搜索栏选项
        achieve_type: options_achieve_type,
        year: options_year,
        name: '',
        keyWord: '',
        majors:[],
        classes:[]
      },
      selected: {//多条件查询存放选项
        clazz:"",
        major:"",
        achieve_year_start:"",
        achieve_year_end:"",
        achieve_year_single:"",
        achieve_type: "",
        user_id: [],
        multiDisciplinary: 0,
        keyWord: "",
        size: 30,
        start: '',
        status: 0,
        object: 2,
        
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
        status: 0
      },
      isInd: {
        achieve_type: false,
        year: false,
      },
      info_export: [], //要导出的条目
      achieve_year: [],//存放已选年份，由于年份接口设计问题与selected分离
      achieve_year_input: "",//存放用户输入的年份，输入完添加到achieve_year数组中
      info: [], //获取到的表格数据
      export_type: '0', //导出格式,默认为excel
      export_key: 'EXCEL', //导出格式名
      import_type: '0', //导入格式，默认为竞赛
      import_key: '竞赛', //导入按钮名字
      pages_total: 1, //表格最大页数
      current_page: 1, //表格当前页数
      size_total: 1, //表格当前条目数
    }
  },
  //路由守卫，在跳往详情页时缓存页面
  beforeRouteLeave(to, form, next) {
    if (to.path == '/achievements/achieve_details') {
      this.addRoute('adminSummary');
    } else {
      this.removeAllRoute();
    }
    console.log("none");
    next()
  },
  activated() {
    console.log("activated")
    console.log(this.$store.getters.get_catch)
    // this.get_majors()
    this.get_info();
    console.log(this.selected.achieve_year)
  }, deactivated() {
    console.log("deactivated")
  },
  methods: {
    //将vuex中的函数放出来,便于直接使用
    ...mapActions(['addRoute', 'removeAllRoute', 'removeRoute']),
    //按条件查询
    async get_info() {
      this.selected.start = this.current_page;
      console.log(this.selected)
      let res = await this.$api_query.admin_search_achieve(this.selected);
      console.log("这是res",res)
      console.log(res)
      this.info = res.list;
      this.pages_total = res.pages;
      this.size_total = res.total;
    },
    get_class(val) {
      //获取竞赛作品类型数据
      this.axios
        .get("/opt/class/classes?major="+val, {
          headers: {
            Token: this.Token,
          },
        })
        .then((response) => {
          this.options.classes = response.data.data;
          this.HandleChecked(val,'')
        })
        .catch(function (response) {
        });
    },
    get_majors() {
      //获取竞赛作品类型数据
      this.axios
        .get("/opt/class/majors", {
          headers: {
            Token: this.Token,
          },
        })
        .then((response) => {
          this.options.majors = response.data.data;
          // console.log("major",response)
        })
        .catch(function (response) {
        });
    },
    //根据学生搜索成果物
    async get_student() {
      if (this.options.name != '') {
        let members_id = [];
        let res = await this.$api_user.get_user_by_name(this.options.name);
        Object.keys(res).forEach(res_2 => {
          members_id.push(res[res_2]);
        })
        if (members_id.length > 0) {
          this.selected.user_id = members_id;
        } else {
          this.selected.user_id = ['0'];
        }
        await this.get_info();
      } else {
        this.selected.user_id = [];
        await this.get_info();
      }
    },
    handleYear(value){
      this.selected.achieve_year_start=value[0]
      this.selected.achieve_year_end=value[1]
      console.log(this.selected)
      this.get_info()
    },
    //多选控制
    HandleCheckAll(val, type) {
      let opt = [];
      Object.keys(this.options[type]).forEach(res => {
        opt.push(this.options[type][res].name || this.options[type][res]);
      })
      if (type === "award") {
        this.selected[type] = val ? this.options[type] : "";
      } else if (type === 'achieve_year') {
        this.Selected_achieve_year = val ? options_achieve_year : [];
        console.log(this.Selected_achieve_year);
      } else if (type === 'pro_schedule') {
        this.selected[type] = val ? this.options.pro_schedule : "";
        console.log(this.Selected_achieve_year);
      } else {
        this.selected[type] =  "";
      }
      console.log("look here",this.selected)
      this.isInd[type] = false;
      this.get_info();
    },
    HandleChecked(value, type) {
      if(type === 'major'){
        this.axios
          .get("/opt/class/classes?major="+value, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.options.classes = response.data.data;
            this.checkAll[type] = this.selected[type] === ""
            this.isInd[type] = this.selected[type] === ""
            this.get_info();
          })
          .catch(function (response) {
          });
      }
      let checkedCount = value.length;
      this.checkAll[type] = checkedCount === this.options[type].length;
      this.isInd[type] = checkedCount > 0 && checkedCount < this.options[type].length;
      this.get_info();
    },
    //单选控制
    handleStatus() {
      this.get_info();
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
      this.get_info();
    },
    HandleChecked_year(value) {
      let checkedCount = value.length;
      this.checkAll.year = checkedCount === this.options.year.length;
      this.isInd.year = checkedCount > 0 && checkedCount < this.options.year.length;
      //console.log(this.achieve_year);
      this.achieve_year_start=""
      this.achieve_year_end=""
      this.get_info();
    },
    //构建“xx年以前”选项的数组，用于按年份搜索,现已废弃
    /* set_yaer_past() {
        let selected = _.cloneDeep(this.achieve_year);
        selected.sort();
        let option = options_year;
        let y = option[4] - 1;
        let last_year_10 = [];
        for (let i = 0; i < 10; i++) {
            last_year_10[i] = y;
            y -= 1;
        }
        selected.splice(0, 1);
        //数组拼接
        selected.push.apply(selected, last_year_10);
        return selected;
    }, */
    //根据导出格式选择下载函数
    async exprot_which() {

      // if (this.export_type == 0) {
      //     let info = [];
      //     await this.set_download_opt(this.info_export).then(res => {
      //         info = res;
      //     });
      //     this.$api_query.user_export_achieve_all(info);
      // } else {
      //
      // }
      console.log('mehehe');
      this.axios.get("/pdf", {
        userId: this.$store.getters.user_id,
      }).then(function (res) {
        console.log(res);
      })

    },
    //设置要下载的条目
    async set_download_opt(val) {
      let count = val.length;
      let download_opts = [];
      if (count !== 0 && !this.if_select_all) {
        Object.keys(val).forEach(res => {
          download_opts.push({'achieve_id': val[res].achieve_id, 'achieve_type': val[res].achieve_type});
        })
      } /* else {
                    this.$message.error("请先选择要导出的条目！");
                } */
      return download_opts;
    },

    set_import_type(val) {
      switch (val) {
        case '0':
          this.import_key = "竞赛";
          break;
        case '1':
          this.import_key = "项目";
          break;
        case '2':
          this.import_key = "论文";
          break;
        case '3':
          this.import_key = "知识产权";
          break;
        case '4':
          this.import_key = "荣誉";
          break;
      }
      this.import_type = val;
    },
//是否主持人
    judgeObject() {

      if (this.ishost.length === 2) {
        this.selected.object = 2;
        this.get_info()
      } else if (this.ishost.length === 1 && this.ishost[0] === "1") {
        this.selected.object = 0;           //object=0代表是主持人，object=1代表是参与者
        this.get_info()
      } else if (this.ishost.length === 1 && this.ishost[0] === "2") {
        this.selected.object = 1;
        this.get_info()
      }else{
        //donothing
      }
    },
    //是否完整
    judgestatus() {
      if (this.iscomplete.length === 2) {
        this.selected.status = 2;
        this.get_info()
      } else if (this.iscomplete.length === 1 && this.iscomplete[0] === "1") {
        this.selected.status = 0;           //status=0完整，=-1不完整
        this.get_info()
      } else if (this.iscomplete.length === 1 && this.iscomplete[0] === "2") {
        this.selected.status = -1;
        this.get_info()
      }else{//表示两个都没勾选
        this.selected.status = 1;
        this.get_info()
      }
      console.log("memememememememememeiweituierwtui",this.selected.object);
    },
    import_witch(fileObj) {
      let formData = null;
      formData = new FormData();
      console.log(fileObj.file);
      formData.append('file', fileObj.file)
      console.log(formData);
      this.$api_achievement.admin_import_achieve_single(formData).then((res) => {
          if (res === 2000) {
            this.$message.success("导入成功！");
          }
          this.get_info();
          this.$refs.import.clearFiles();
        }

        );
    },
    exprot_models() {
      let choice = Number(this.import_type)
      this.$api_achievement.admin_import_module();
    },
    set_export_type(val) {
      switch (val) {
        case '0':
          this.export_key = "EXCEL";
          break;
        case '1':
          this.export_key = "PDF";
          break;
      }
      this.export_type = val;
    },

    checkDetails(row, event) {
      //不让表格多选框触发行点击事件
      if (event.className != "el-table-column--selection") {
        this.$router.push({
          path: "achieve_details",
          query: {
            achieve_id: row.achieve_id,
            type: row.achieve_type,
          }
        });
      }
    },
    set_years(e) {
      //判断用户输入年份是否符合格式
      //将限制数字输入得到的输入结果赋值给v-model绑定的数据，v-model的性质决定了需要这一步
      this.achieve_year_single=0
      this.achieve_year_input = e.target.value;
      if (this.achieve_year_input.length != 0) {
        if (this.achieve_year_input.length != 4) {
          this.achieve_year_input = "";
          this.$message.warning("年份数据格式不正确");
        }
      }
      this.get_info();
    },
    //表格空白数据处理
    if_null(row, column, cellValue) {
      return cellValue || '暂缺'
    },

  },
  created() {
    this.get_majors()
    this.get_info();
  },
};
</script>

<style scoped>
/deep/ .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

/deep/ .el-icon-arrow-down {
  font-size: 12px;
}

/deep/ .choose .el-checkbox__inner {
  display: none;
}

/deep/ .el-radio__inner {
  display: none;
}

/deep/ .el-divider--horizontal {
  margin-top: 0px;
  margin-bottom: 5px;
}
</style>
