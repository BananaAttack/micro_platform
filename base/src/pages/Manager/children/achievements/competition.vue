<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <div style="width: 100%; min-width: 800px">
      <div class="head" style="margin-bottom: 20px">
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
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          style="
            /*margin-left: 10px;*/
            margin-top: 10px;
            height: 30px;
            padding-top: 8px;
            border: none;
          "
          :disabled="exportEnable"
          @click="exprot_which"
        >导出EXCEL
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="
            margin-left: 10px;
            margin-top: 10px;
            height: 30px;
            padding-top: 8px;
            border: none;
          "
          size="small"
          :disabled="addSetEnable"
          @click="addSet"
        >添加到成果子集
        </el-button>
      </div>

      <!--      <el-collapse accordion style="margin-top: 30px">-->
      <!--        <el-collapse-item>-->
      <!--          <template slot="title">-->
      <!--            <p style="font-family: sans-serif; font-size: 1.1em; color: #8c939d">-->
      <!--              多条件搜索-->
      <!--            </p>-->
      <!--            <i class="el-icon-arrow-down" style="margin-left: 10px"></i>-->
      <!--          </template>-->
      <!--          <el-divider></el-divider>-->

      <!--          <div class="choose">-->
      <!--            <div-->
      <!--              class="achieve_list"-->
      <!--              style="margin-top: 10px"-->
      <!--              v-for="(item, i) in base_data"-->
      <!--              :key="i"-->
      <!--            >-->
      <!--              <div style="overflow: hidden; display: inline; overflow: hidden">-->
      <!--                <div-->
      <!--                  style="-->
      <!--                    width: 100px;-->
      <!--                    text-align: right;-->
      <!--                    display: inline-block;-->
      <!--                    float: left;-->
      <!--                    margin-right: 20px;-->
      <!--                  "-->
      <!--                >-->
      <!--                  <span style="font-family: helvetica; color: #6b7f91">{{-->
      <!--                      item.ch-->
      <!--                    }}</span>-->
      <!--                </div>-->
      <!--                <div-->
      <!--                  v-if="item.en !== 'achieve_year'"-->
      <!--                  style="display: inline-block; max-width: 800px"-->
      <!--                >-->
      <!--                  <el-checkbox-->
      <!--                    style="-->
      <!--                      display: inline;-->
      <!--                      margin-right: 10px;-->
      <!--                      color: gray;-->
      <!--                      font-weight: lighter;"-->
      <!--                    :indeterminate="isInd[item.en]"-->
      <!--                    v-model="checkAll[item.en]"-->
      <!--                    @change="HandleCheckAll($event, item.en)">-->
      <!--                    全选-->
      <!--                  </el-checkbox>-->
      <!--                  <el-radio-group-->
      <!--                    v-model="selected[item.en]"-->
      <!--                    @change="HandleChecked($event, item.en)"-->
      <!--                    style="display: inline-block"-->
      <!--                    v-for="(item_2, i_2) in options[item.en]"-->
      <!--                    :key="i_2"-->
      <!--                  >-->
      <!--                    <el-radio-->
      <!--                      :label="item_2.name || item_2"-->
      <!--                      :style="'margin-left: 0px; margin-right: 10px; font-weight: lighter;color:'+mycolor+';'"-->
      <!--                    >-->
      <!--                      {{ item_2.name || item_2 }}-->
      <!--                    </el-radio>-->
      <!--                  </el-radio-group>-->
      <!--                </div>-->
      <!--                <div v-else class="achieve_list" style="display: inline-block">-->
      <!--                  <el-checkbox-->
      <!--                    style="-->
      <!--                      display: inline;-->
      <!--                      margin-right: 10px;-->
      <!--                      color: gray;-->
      <!--                      font-weight: lighter;-->
      <!--                    "-->
      <!--                    :indeterminate="isInd[item.en]"-->
      <!--                    v-model="checkAll[item.en]"-->
      <!--                    @change="HandleCheckAll($event, item.en)"-->
      <!--                  >-->
      <!--                    全选-->
      <!--                  </el-checkbox-->
      <!--                  >-->
      <!--                  <el-radio-group-->
      <!--                    v-model="achieve_year_single"-->
      <!--                    @change="HandleChecked($event, item.en, item_2)"-->
      <!--                    style="display: inline-block"-->
      <!--                    v-for="(item_2, i_2) in options[item.en]"-->
      <!--                    :key="i_2"-->
      <!--                  >-->
      <!--                    <el-radio-->
      <!--                      :label="item_2"-->
      <!--                      style="-->
      <!--                        margin-left: 0px;-->
      <!--                        margin-right: 10px;-->
      <!--                        color: gray;-->
      <!--                        font-weight: lighter;-->
      <!--                      "-->
      <!--                    >{{ item_2 }}-->
      <!--                    </el-radio>-->
      <!--                  </el-radio-group>-->
      <!--                  <el-input-->
      <!--                    size="mini"-->
      <!--                    v-model="achieve_year_start"-->
      <!--                    placeholder="请输入起始年份"-->
      <!--                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"-->
      <!--                    @keyup.enter.native="set_years"-->
      <!--                    @blur="set_years"-->
      <!--                    maxlength="4"-->
      <!--                    style="display: inline-block; width: 120px"-->
      <!--                  >-->
      <!--                  </el-input>-->
      <!--                  <el-input-->
      <!--                    size="mini"-->
      <!--                    v-model="achieve_year_end"-->
      <!--                    placeholder="请输入终止年份"-->
      <!--                    oninput="value=value.replace(/^\.+|[^\d.]/g,'')"-->
      <!--                    @keyup.enter.native="set_years"-->
      <!--                    @blur="set_years"-->
      <!--                    maxlength="4"-->
      <!--                    style="display: inline-block; width: 120px"-->
      <!--                  >-->
      <!--                  </el-input>-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="achieve_list" style="margin-top: 10px">-->
      <!--              <div style="overflow: hidden; display: inline">-->
      <!--                <div-->
      <!--                  style="width: 100px; text-align: right; display: inline-block"-->
      <!--                >-->
      <!--                  <span style="font-family: helvetica; color: #6b7f91"-->
      <!--                  >状态</span-->
      <!--                  >-->
      <!--                </div>-->
      <!--                <el-radio-->
      <!--                  v-model="selected.status"-->
      <!--                  :label="5"-->
      <!--                  @change="get_info()"-->
      <!--                  style="-->
      <!--                    display: inline;-->
      <!--                    margin-left: 12px;-->
      <!--                    margin-right: 10px;-->
      <!--                    font-family: helvetica;-->
      <!--                    color: gray;-->
      <!--                    font-weight: lighter;-->
      <!--                  "-->
      <!--                >-->
      <!--                  全选-->
      <!--                </el-radio>-->
      <!--                <el-radio-group-->
      <!--                  v-model="selected.status"-->
      <!--                  style="display: inline-block"-->
      <!--                  @change="get_info()"-->
      <!--                >-->
      <!--                  <el-radio-->
      <!--                    :label="1"-->
      <!--                    style="-->
      <!--                      margin-left: 0px;-->
      <!--                      margin-right: 10px;-->
      <!--                      font-family: helvetica;-->
      <!--                      color: gray;-->
      <!--                      font-weight: lighter;-->
      <!--                    "-->
      <!--                  >完整-->
      <!--                  </el-radio-->
      <!--                  >-->
      <!--                  <el-radio-->
      <!--                    :label="4"-->
      <!--                    style="-->
      <!--                      margin-left: 0px;-->
      <!--                      margin-right: 10px;-->
      <!--                      font-family: helvetica;-->
      <!--                      color: gray;-->
      <!--                      font-weight: lighter;-->
      <!--                    "-->
      <!--                  >不完整-->
      <!--                  </el-radio-->
      <!--                  >-->
      <!--                </el-radio-group>-->
      <!--              </div>-->
      <!--            </div>-->

      <!--            <div class="achieve_list" style="margin-top: 10px">-->
      <!--              <div style="overflow: hidden; display: inline">-->
      <!--                <div-->
      <!--                  style="-->
      <!--                    width: 100px;-->
      <!--                    text-align: right;-->
      <!--                    display: inline-block;-->
      <!--                    float: left;-->
      <!--                    margin-right: 20px;-->
      <!--                  "-->
      <!--                >-->
      <!--                  <span style="font-family: helvetica; color: #6b7f91"-->
      <!--                  >姓名</span-->
      <!--                  >-->
      <!--                </div>-->
      <!--                &lt;!&ndash; <p style="display: inline;margin-right: 6px;color: #6B7F91;">姓名</p> &ndash;&gt;-->
      <!--                &lt;!&ndash; <el-checkbox v-model="selected.user_id" label=""-->
      <!--                  @change="selected.user_id=[],options.name='',get_info()"-->
      <!--                  style="display: inline;margin-right: 10px;color: gray;font-weight: lighter;">全选-->
      <!--                </el-checkbox> &ndash;&gt;-->
      <!--              </div>-->
      <!--              <div style="display: inline; margin-left: 10px">-->
      <!--                <el-input-->
      <!--                  v-model="options.name"-->
      <!--                  placeholder="请输入姓名"-->
      <!--                  @input="get_student"-->
      <!--                  @keyup.enter.native="get_student"-->
      <!--                  size="mini"-->
      <!--                  style="width: 100px"-->
      <!--                ></el-input>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="achieve_list" style="margin-top: 10px">-->
      <!--              <div style="overflow: hidden; display: inline">-->
      <!--                <div-->
      <!--                  style="-->
      <!--                    width: 100px;-->
      <!--                    text-align: right;-->
      <!--                    display: inline-block;-->
      <!--                    float: left;-->
      <!--                    margin-right: 20px;-->
      <!--                  "-->
      <!--                >-->
      <!--                  <span style="font-family: helvetica; color: #6b7f91"-->
      <!--                  >作品名</span-->
      <!--                  >-->
      <!--                </div>-->
      <!--                &lt;!&ndash; <p style="display: inline;font-family: helvetica;margin-right: 6px;color: #6B7F91;">作品名</p> &ndash;&gt;-->
      <!--                &lt;!&ndash; <el-checkbox v-model="selected.keyWord" label=""-->
      <!--                  @change="selected.keyWord='',options.keyWord='',get_info()"-->
      <!--                  style="display: inline;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;font-weight: lighter;">-->
      <!--                  全选-->
      <!--                </el-checkbox> &ndash;&gt;-->
      <!--              </div>-->
      <!--              <div style="display: inline; margin-left: 10px">-->
      <!--                <el-input-->
      <!--                  v-model="selected.keyWord"-->
      <!--                  placeholder="请输入作品名"-->
      <!--                  @input="get_info()"-->
      <!--                  @keyup.enter.native="get_info()"-->
      <!--                  size="mini"-->
      <!--                  style="width: 100px"-->
      <!--                ></el-input>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </el-collapse-item>-->
      <!--      </el-collapse>-->
      <!--      <senior_search :options="options" :selected="selected" :base_data="base_data" ></senior_search>-->
      <el-form :inline="true" :model="selected">
        <el-form-item v-for="formitem in base_data" v-if="formitem.en" size="small">
          <el-select :placeholder="formitem.ch" v-model="selected[formitem.en]" v-if="formitem.en !== 'achieve_year'"
                     @change="HandleChecked($event, formitem.en)" style="width: 120px;">
            <el-option v-for="item in options[formitem.en]" :label="item.name? item.name : item"
                       :value="item.name? item.name : item"></el-option>
          </el-select>
          <el-date-picker
            v-else
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
          <el-input placeholder="搜索姓名" v-model="options.name" @change="get_student" size="small"
                    style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="搜索作品名" v-model="selected.keyWord" @change="HandleChecked($event,)" size="small"
                    style="width: 120px;"></el-input>
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
                <el-select placeholder="所有专业" v-model="selected.major" @change="HandleChecked($event,'major')">
                  <el-option v-for="item in options['majors']" :label="item.name" :value="item.name"></el-option>
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
        <el-table
          ref="info_export"
          :data="info"
          tooltip-effect="dark"
          stripe
          size="small"
          row-key="achieve_id"
          @row-click="checkDetails"
          style="
            width: 100%;
            /*margin-top: 30px;*/
            min-width: 800px;
            cursor: pointer;
          "
          @selection-change="selectionChange"
          border
        >
          <el-table-column type="selection" align="center" reserve-selection>
          </el-table-column>
          <el-table-column
            prop="competition_name"
            label="竞赛名称"
            :formatter="if_null"
            show-overflow-tooltip
            width="250"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="achieve_name"
            label="作品名称"
            :formatter="if_null"
            show-overflow-tooltip
            width="300"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="work_type"
            label="作品类型"
            :formatter="if_null"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="achieve_year"
            label="年份"
            :formatter="if_null"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="competition_level"
            label="竞赛级别"
            :formatter="if_null"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="award"
            label="获得奖项"
            :formatter="if_null"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="writer"
            label="第一作者"
            :formatter="if_null"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <!-- <router-link :to="{ name: 'achievements_competition_details', params: { id: scope.row.achieve_id } }">查看详情</router-link> -->
              <el-button
                @click="checkDetails(scope.row)"
                type="text"
                size="small"
              >查看详情
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          style="margin-top: 60px"
          @size-change="(selected.size = $event), get_info()"
          @current-change="get_info"
          :current-page.sync="current_page"
          :page-sizes="[30, 60, 100, 200]"
          :page-size.sync="selected.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total.sync="size_total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="请选择要添加的成果子集"
      :visible.sync="addSetDialog"
      width="40%">
      <el-select style="width: 100%" v-model="value" placeholder="请选择成果子集">
        <el-option>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSet">确 定</el-button>
        <el-button @click="addSetDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";
import senior_search from "../items/senior_search";
//const定义选项，防止选项更改
//获取当前年份，构建年份选项
const get_achieve_year = () => {
  let achieve_year = [];
  let date = new Date();
  let y = date.getFullYear();
  let i = 0;
  for (i; i < 5; i++) {
    achieve_year[i] = y;
    y -= 1;
  }
  //achieve_year[i] = y + "及以前";
  return achieve_year;
};
let achieve_year = get_achieve_year();
const options_achieve_year = achieve_year;
//调用原生java库lodash，以便进行深拷贝
const _ = require("lodash");
export default {
  name: "adminCompetition",
  components: {senior_search},
  data() {
    return {
      ishost:["1","2"],       //是否主持人
      iscomplete:["1","2"],   //是否完整
      value: "",
      visible: false,
      achieve_year: null,
      mycolor: 'grey',
      exportEnable: true,
      addSetEnable: true,
      addSetDialog: false,
      base_data: [
        {
          //构建多选栏的数据
          ch: "竞赛类型",
          en: "competition_type",
        },
        {
          ch: "作品类型",
          en: "work_type",
        },
        {
          ch: "年份",
          en: "achieve_year",
        },
        {
          ch: "获得奖项",
          en: "award",
        },
        {
          ch: "竞赛级别",
          en: "competition_level",
        },
      ],
      options: {
        //获取到的搜索项
        competition_type: [],
        work_type: [],
        achieve_year: options_achieve_year,
        award: [],
        competition_level: [],
        keyWord: "",
        name: "",
        majors: [],
        classes: []
      },
      selected: {
        //多条件查询存放选项
        achieve_year_start: "",
        achieve_year_end: "",
        achieve_year_single: "",
        competition_type: "",       //竞赛类型
        work_type: "",              //作品类型
        award: "",                  //获得奖项
        competition_level: "",      //竞赛级别
        user_id: [],
        keyWord: "",                //作品名
        start: 1,
        size: 10,
        major: "",
        clazz: "",
        object: 2,
      },

      //多选控制
      checkAll: {
        competition_type: false,
        work_type: false,
        achieve_year: false,
        competition_level: false,
        award: false,
      },
      isInd: {
        competition_type: false,
        work_type: false,
        achieve_year: false,
        competition_level: false,
        award: false,
      },
      info_export: [], //要导出的条目
      Selected_achieve_year: [], //存放已选年份，由于年份接口设计问题与selected分离
      achieve_year_input: "", //存放用户输入的年份，输入完添加到achieve_year数组中
      info: [], //获取到的表格数据
      export_type: "0", //导出格式
      export_key: "EXCEL", //导出格式名
      pages_total: 1, //表格最大页数
      current_page: 1, //表格当前页数
      size_total: 1, //表格当前条目数
    };
  },
  //路由守卫，在跳往详情页时缓存页面
  beforeRouteLeave(to, form, next) {
    if (to.path == "/achievements/achieve_details") {
      this.addRoute("adminCompetition");
    } else {
      this.removeAllRoute();
    }
    next();
  },
  activated() {
    this.get_info();
  },
  methods: {
    //将vuex中的函数放出来,便于直接使用
    ...mapActions(["addRoute", "removeAllRoute", "removeRoute"]),
    initselected(type_value) {
      this.selected = {
        //多条件查询存放选项
        major: "",
        clazz: "",
        achieve_year_start: "",
        achieve_year_end: "",
        achieve_year_single: "",
        competition_type: type_value,       //竞赛类型
        work_type: "",              //作品类型
        award: "",                  //获得奖项
        competition_level: "",      //竞赛级别
        user_id: [],
        keyWord: "",                //作品名
        start: 1,
        size: 30,
        object: 2,
      }
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
    handleYear(value){
      this.selected.achieve_year_start=value[0]
      this.selected.achieve_year_end=value[1]
      console.log(this.selected)
      this.get_info()
    },
    get_competition_type() {
      //获取竞赛类型数据
      this.axios
        .get("/opt/option/items?type=competition_type", {
          headers: {
            Token: this.Token,
          },
        })
        .then((response) => {
          this.options.competition_type = response.data.data;
        })
        .catch(function (response) {
        });
    },
    selectionChange(val) { //选择项有改变时 修改上方按钮
      this.info_export = val
      if (val.length != 0) {
        this.exportEnable = false;
        this.addSetEnable = false;
      } else {
        this.exportEnable = true;
        this.addSetEnable = true;
      }
    },
    addSet() {
      //TODO 添加到成果子集接口
      this.addSetDialog = true
    },
    get_competition_work_type() {
      //获取竞赛作品类型数据
      this.axios
        .get("/opt/option/items?type=competition_work_type", {
          headers: {
            Token: this.Token,
          },
        })
        .then((response) => {
          this.options.work_type = response.data.data;
        })
        .catch(function (response) {
        });
    },
    async get_prizes() {
      let res = await this.$api_opt.get_competition_prize_group();
      let award = [];
      Object.keys(res).forEach((res_2) => {
        let option = res[res_2].split("/");
        Object.keys(option).forEach((res_3) => {
          award.push(option[res_3]);
        });
      });
      //数组去重，奖项存在重复项
      this.options.award = Array.from(new Set(award));
    },
    get_competition_level() {
      //获取竞赛级别数据
      this.$api_opt.admin_get_optLevel("competition").then((res) => {
        this.options.competition_level = res.data.data;
      });
    },
    //按条件查询
    async get_info() {
      this.selected.start = this.current_page;
      console.log("这是selected", this.selected);
      let res = await this.$api_query.admin_search_competition(this.selected);
      this.info = res.list;
      this.pages_total = res.pages;
      this.size_total = res.total;
      if (this.info) {
        Object.keys(this.info).forEach((res) => {
          this.info[res].writer = this.info[res].students[0].realName;
        });
      }

    },
    async get_student() {
      //搜索学生
      if (this.options.name != "") {
        let members_id = [];
        let res = await this.$api_user.get_user_by_name(this.options.name);
        Object.keys(res).forEach((res_2) => {
          members_id.push(res[res_2]);
        });
        if (members_id.length > 0) {
          this.selected.user_id = members_id;
        } else {
          this.selected.user_id = [];
        }
        await this.get_info();
      } else {
        this.selected.user_id = [];
        this.get_info();
      }
    },
    get_class(val) {
      //获取竞赛作品类型数据
      this.axios
        .get("/opt/class/classes?major=" + val, {
          headers: {
            Token: this.Token,
          },
        })
        .then((response) => {
          this.options.classes = response.data.data;
          this.HandleChecked(val, '')
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
    get_data() {
      //获取表格数据
      this.get_competition_type();
      this.get_competition_work_type();
      this.get_prizes();
      this.get_competition_level();
      this.get_majors();
      this.get_info();
    },

    //根据导出格式选择下载函数
    async exprot_which() {
      if (this.export_type == 0) {
        let info = [];
        await this.set_download_opt(this.info_export).then((res) => {
          info = res;
        });
        this.$api_query.admin_export_achieve_single(0, info);
      }
    },
    //设置要下载的条目
    async set_download_opt(val) {
      let count = val.length;
      let download_opts = [];
      if (count !== 0 && !this.if_select_all) {
        Object.keys(val).forEach((res) => {
          download_opts.push(val[res].achieve_id);
        });
      } /* else {
          this.$message.error("请先选择要导出的条目!");
        } */
      return download_opts;
    },
    //构建“xx年以前”选项的数组，用于按年份搜索
    set_yaer_past() {
      let selected = _.cloneDeep(this.Selected_achieve_year);
      selected.sort();
      let option = options_achieve_year;
      let y = option[4] - 1;
      let last_achieve_year_10 = [];
      for (let i = 0; i < 10; i++) {
        last_achieve_year_10[i] = y;
        y -= 1;
      }
      selected.splice(0, 1);
      //数组拼接
      selected.push.apply(selected, last_achieve_year_10);
      return selected;
    },
    //多选控制
    HandleCheckAll(val, type) {
      let opt = [];
      Object.keys(this.options[type]).forEach((res) => {
        opt.push(this.options[type][res].name);
      });
      if (type === "award") {
        // this.selected[type] = val ? this.options[type] : [];
        this.selected[type] = ""
      } else if (type === "achieve_year") {
        this.Selected_achieve_year = val ? options_achieve_year : [];
        //console.log(this.Selected_achieve_year);
      } else if (type === "competition_type") {
        // this.selected[type] = val ? opt : [];
        this.selected[type] = ""
        this.get_competition_work_type()
      } else {
        this.selected[type] = ""
      }
      this.isInd[type] = false;
      this.get_info();
    },
    //type是数据的类型，包括竞赛类型、作品类型这些
    //value就是他的具体选了啥
    HandleChecked(value, type, item_2) {
      if (type === "competition_type") {
        this.initselected(value)
        let mytype = type.slice(0, -5)
        this.axios
          .get("/opt/option/getTypeByProductType?productType=" + value + "&type=" + mytype, {
            headers: {
              Token: this.Token,
            },
          })
          .then((response) => {
            this.options.work_type = response.data.data;
            this.checkAll[type] = this.selected[type] === ""
            this.isInd[type] = this.selected[type] === ""
            this.get_info();
            // console.log(response)
          })
          .catch(function (response) {
          });
      } else if (type === "major") {
        this.axios
          .get("/opt/class/classes?major=" + value, {
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
      } else {
        this.checkAll[type] = this.selected[type] === ""
        this.isInd[type] = this.selected[type] === ""
        this.get_info();
      }

    },

    set_export_type(val) {
      switch (val) {
        case "0":
          this.export_key = "EXCEL";
          break;
        case "1":
          this.export_key = "PDF";
          break;
      }
      this.export_type = val;
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
      this.get_info();
    },

    //表格空白数据处理
    if_null(row, column, cellValue) {
      return cellValue || "暂缺";
    },

    checkDetails(row, event) {
      //查看详情
      //不让表格多选框触发行点击事件
      if (event.className != "el-table-column--selection") {
        this.$router.push({
          path: "achieve_details",
          query: {
            achieve_id: row.achieve_id,
            type: "竞赛",
          },
        });
      }
    },
  },
  created() {
    this.get_data();
  },
};
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

/deep/ .choose .el-checkbox__inner {
  display: none;
}

/deep/ .el-divider--horizontal {
  margin-top: 0px;
  margin-bottom: 5px;
}

/deep/ .el-radio__inner {
  display: none;
}

.me {
  border-radius: 50%;
  width: 2000px;
}

</style>
