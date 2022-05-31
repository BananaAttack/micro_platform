<template>
  <div>

    <div>
      <el-table ref="multipleTable" :data="info" tooltip-effect="dark" style="width: 95%;margin-top: 30px;margin-left: 2.5%;"
        border>
        <el-table-column label="年份" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.year }}</template>
        </el-table-column>
        <el-table-column prop="sex" label="国际奖" width="150" align="center">
          <el-table-column prop="stu_class" label="一等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="二等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="三等奖" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="sex" label="国家奖" width="150" align="center">
          <el-table-column prop="stu_class" label="一等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="二等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="三等奖" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="sex" label="省级奖" width="150" align="center">
          <el-table-column prop="stu_class" label="一等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="二等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="三等奖" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="sex" label="省新苗" width="150" align="center">
          <el-table-column prop="stu_class" label="一等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="二等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="三等奖" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="sex" label="国创" width="150" align="center">
          <el-table-column prop="stu_class" label="一等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="二等奖" align="center">
          </el-table-column>
          <el-table-column prop="stu_class" label="三等奖" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="sex" label="论文" width="150" align="center">
        </el-table-column>
        <el-table-column prop="stid" label="知识产权" align="center">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openChangeStudent(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color:crimson"  @click="deleteStudent(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-count="pages_total" :current-page.sync="current_page"
        @current-change="getData" style="margin-top: 60px;margin-left: 35%;">
      </el-pagination>
    </div>

  </div>

</template>

<script>
  export default {
    name:"adminStuSummary",
    data() {
      return {
        info: [{
          year:'2019',
          stu_class:'1'
        },
        {
          year:'2018',
          stu_class:'1'
        },
        {
          year:'2017',
          stu_class:'1'
        },
        {
          year:'2016',
          stu_class:'1'
        },], //获取到的表格数据
        options: [{ //条件检索选项
            value: "stu_class",
            label: "班级"
          },
          {
            value: "realName",
            label: "姓名"
          },
          {
            value: "stid",
            label: "学号"
          },
          {
            value: "major",
            label: "专业"
          }
        ], //下拉框的选项
        options_class: [], //下拉框班级
        options_class_now: [], //经过专业选择后的班级列表
        options_major: [{
          value: "1",
          label: "软件工程"
        }, {
          value: "2",
          label: "计算机科学"
        }, {
          value: "3",
          label: "信息安全"
        }], //下拉框专业
        pages_total: 1, //表格最大页数
        current_page: 1, //表格当前页数
        class: '', //选择栏班级
        dialogFormVisible_modify: false, //修改学生信息表单的显示
        dialogFormVisible_add: false, //增加学生信息表单的显示
        dialogFormVisible_fail: false, //增加或者修改操作失败
        formLabelWidth: '150px', //dialog宽度
        select:{ //下拉框选择的值
          class_selected: '', //选择班级
          name_selected: '', //输入姓名
          stid_selected: '', //输入学号
          major_selected: '', //选择专业
        },
        type_selected: '', //选择的词条,附加在获取信息上做到条件搜索
        value_selected:'', //在下拉框的值确定到该变量上，便于搜索
        imageUrl: '', //存放图片地址,暂时未实现图片上传功能
        phone_right: true, //检测手机号码格式,默认正确
        email_right: true, //检测邮箱格式，默认正确
        form: { //存放修改或者添加的学生信息，每次关闭对话框都会清空
          stid: '',
          realName: '',
          sex: '',
          major: '',
          education: '',
          stu_class: '',
          birth: '',
          enter_year: '',
          phone: '',
          email: '',
          user_id: '', //用户id，仅用于修改信息时使用，不会显示在表格中
          photo: null, //暂时接口未要求
          index: null //存放当前表格位置，用于同步视图时的定位
        }
      }
    },
    methods: {
       getData() { //获取表格数据
         this.axios.get('/show/all/achieves?n=0&y=100', {
             headers: {
               'Token': this.$root.Token
             },
           })
           .then(response => {
             this.info = response.data.data.list
           })
           .catch(
             function(response) {
              console.log(response)
             });
       },

     

    },
    created() {
      this.getData()
    },
  }
</script>

<style>
</style>
