<template>
  <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
    <div style="width: 100%;min-width: 800px;">
      <div style="margin-top: 10px;">
        <el-button type="primary" style="height:30px;padding-top:8px;" @click="dialogFormVisible_add=true">增加竞赛信息
        </el-button>
        <el-button type="primary" icon="el-icon-download" style="margin-left: 20px;height:30px;padding-top:8px;"
          @click="export_excel">导出</el-button>
      </div>

      <div>
        <el-table ref="multipleTable" :data="competition" stripe tooltip-effect="dark" size="small"
          style="width:100%;margin-top: 30px;cursor:pointer" @row-click="openChangeCompetition" border>
          <el-table-column label="竞赛名称" :formatter="if_null" show-overflow-tooltip width="250" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column prop="competitionType" :formatter="if_null" show-overflow-tooltip label="竞赛类型" width="150" align="center">
          </el-table-column>
          <el-table-column prop="workType" :formatter="if_null" show-overflow-tooltip label="作品类型" align="center">
          </el-table-column>
          <el-table-column prop="year" :formatter="if_null" show-overflow-tooltip label="年份" align="center">
          </el-table-column>
          <el-table-column prop="finalDate" :formatter="if_null" show-overflow-tooltip label="决赛时间" align="center">
          </el-table-column>
          <el-table-column prop="host" :formatter="if_null" show-overflow-tooltip label="主办单位" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.stop="openChangeCompetition(scope.row)">详情</el-button>
              <el-button type="text" size="small" style="color:crimson" @click.stop="open_delete(scope.$index,scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div>
        <el-pagination background layout="prev, pager, next" :page-count="pages_total" :current-page.sync="current_page"
          @current-change="get_competition" style="margin-top: 60px;">
        </el-pagination>
      </div>

      <!-- 修改和增加如果公用一个对话框怕有状态控制的问题，先使用两个不同对话框 -->
      <el-dialog title="竞赛信息" :visible.sync="dialogFormVisible_modify" width="600px" @close="cleanAll">
        <el-form :model="editForm" :rules="formRules" ref="editForm">
          <el-form-item label="竞赛名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" :disabled="noModify" autocomplete="off" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="竞赛类型" :label-width="formLabelWidth">
            <el-select v-model="editForm.competitionType" :disabled="noModify" placeholder="选择竞赛类型" style="width: 300px;">
              <el-option v-for="item in options_competitionType" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作品类型" :label-width="formLabelWidth">
            <el-select v-model="editForm.workType" multiple @change="check" :disabled="noModify" placeholder="选择作品类型"
              style="width: 300px;">
              <el-option v-for="item in options_workType" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" :label-width="formLabelWidth">
            <el-date-picker v-model="editForm.year" :disabled="noModify" type="year" placeholder="选择年份" value-format="yyyy" style="width: 300px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="决赛时间" :label-width="formLabelWidth">
            <el-date-picker v-model="editForm.finalDate" :disabled="noModify" type="date" placeholder="选择决赛时间" style="width: 300px;"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="竞赛级别" :label-width="formLabelWidth">
            <el-select v-model="editForm.level" :disabled="noModify" placeholder="选择竞赛级别" style="width: 300px;">
              <el-option v-for="item in options_level" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖项分布" :label-width="formLabelWidth">
            <el-select v-model="editForm.prizeDistribution" :disabled="noModify" placeholder="选择奖项分布" style="width: 300px;">
              <el-option v-for="item in options_prize" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主办单位" :label-width="formLabelWidth" prop="host">
            <!-- <el-input v-model="form.host" :disabled="noModify" autocomplete="off" style="width: 200px;"></el-input> -->
            <!-- <el-select v-model="editForm.host" :disabled="noModify" placeholder="选择主办单位" style="width: 150px;">
              <el-option v-for="item in options_host" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select> -->
            <el-autocomplete v-model="editForm.host" :disabled="noModify" value-key="name" :fetch-suggestions="get_host" placeholder="请输入主办单位"
              style="width: 300px;" @select="handleSelect" @change="hostChanged()" :select-when-unmatched="false" :debounce="300">
            </el-autocomplete>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="margin-right: 40px;float: right;" @click="toModify" v-if="noModify"
          :disabled="!noModify">编辑</el-button>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changeCompetition(competition)" v-if="!noModify">确 定</el-button>
          <!-- info作为表格数据源同步到表格改动 -->
          <el-button @click="dialogFormVisible_modify = false" v-if="!noModify">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加竞赛信息" :visible.sync="dialogFormVisible_add" width="600px" @close="cleanAll">
        <el-form :model="editForm" :rules="formRules" ref="editForm">
          <el-form-item label="竞赛名称" :label-width="formLabelWidth">
            <el-input v-model="editForm.name" autocomplete="off" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="竞赛类型" :label-width="formLabelWidth">
            <el-select v-model="editForm.competitionType" placeholder="选择竞赛类型" style="width: 300px;">
              <el-option v-for="item in options_competitionType" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作品类型" :label-width="formLabelWidth">
            <el-select v-model="editForm.workType" multiple placeholder="选择作品类型" multiple style="width: 300px;">
              <el-option v-for="item in options_workType" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年份" :label-width="formLabelWidth">
            <el-date-picker v-model="editForm.year" type="year" placeholder="选择年份" value-format="yyyy" style="width:300px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="决赛时间" :label-width="formLabelWidth">
            <el-date-picker v-model="editForm.finalDate" type="month" placeholder="选择决赛时间" value-format="yyyy-MM-dd"
              style="width:300px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="竞赛级别" :label-width="formLabelWidth">
            <el-select v-model="editForm.level" placeholder="选择竞赛级别" style="width: 300px;">
              <el-option v-for="item in options_level" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖项分布" :label-width="formLabelWidth">
            <el-select v-model="editForm.prizeDistribution" placeholder="选择奖项分布" style="width: 300px;">
              <el-option v-for="item in options_prize" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主办单位" :label-width="formLabelWidth" prop="host">
            <!-- <el-input v-model="form.host" autocomplete="off" style="width: 200px;"></el-input> -->
            <!-- <el-select v-model="form.host" placeholder="选择主办单位" style="width: 300px;">
              <el-option v-for="(item,i) in options_host" :key="i" :label="item.name" :value="item.name">
              </el-option>
            </el-select> -->
            <el-autocomplete v-model="editForm.host" value-key="name" :fetch-suggestions="get_host" placeholder="请输入主办单位"
              style="width: 300px;" @select="handleSelect" :select-when-unmatched="false" :debounce="300">
            </el-autocomplete>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addCompetiton()">确 定</el-button>
          <el-button @click="dialogFormVisible_add = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="操作失败" :visible.sync="dialogFormVisible_fail" width="30%">
        <p>您的操作失败了，请重试</p>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible_fail=false">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="确定要删除吗" :visible.sync="dialogVisible_delete" width="30%" :before-close="handleClose_delete">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteCompetition">确 定</el-button>
          <el-button @click="dialogVisible_delete = false">取 消</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  export default {
    name: "adminCompetitionItems",
    data() {
      const validateHost = (rule, value, callback) => {
        if (!this.ifSelectHost && this.ifChangeHost) {
          callback(new Error('请选择一个主办单位！'))
        } else {
          callback()
        }
      }
      return {
        competition: [], //竞赛信息数据
        options_competitionType: [], //竞赛类型数据
        options_workType: [], //作品类型数据
        options_level: [], //竞赛级别数据
        options_prize: [], //奖项分布数据
        options_host: [], //主办单位数据
        editForm: {
          name: '',
          competitionType: '',
          workType: [],
          year: '',
          finalDate: '',
          level: '',
          prizeDistribution: '',
          host: '',
          id: ''
        }, //暂存的中转数据
        pages_total: 1, //表格最大页数
        current_page: 1, //表格当前页数
        pageSize: 30, //表格大小
        formLabelWidth: '150px', //dialog宽度
        delete_id: '', //存储将要删除的竞赛id
        dialogFormVisible_modify: false, //修改竞赛信息表单的显示
        dialogFormVisible_add: false, //增加竞赛信息表单的显示
        dialogFormVisible_fail: false, //增加或者修改操作失败
        dialogVisible_delete: false, //确认删除对话框显示
        noModify: true, //竞赛信息编辑对话框锁定修改
        formRules: { //添加竞赛和修改竞赛 主办单位的控制
          host: [
            { trigger: 'blur,change', message: '请选择一个主办单位！', validator: validateHost },
          ]
        },
        ifSelectHost: null,
        ifChangeHost:false
      }
    },
    methods: {
      check() {
        console.log(this.editForm.workType);
      },
      get_competition() { //获取竞赛信息数据
        var _this = this
        this.axios.get('/opt/achieve/list?choice=0&pageNum=' + this.current_page + '&pageSize=' + this.pageSize, {
          /*  */
        })
          .then(response => {
            this.competition = response.data.data.list
            this.pages_total = response.data.data.pages
            Object.keys(_this.competition).forEach(res => { //修改决赛时间的日期格式
              _this.competition[res].finalDate = _this.competition[res].finalDate.substr(0, 10)
            })
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },

      get_competition_type() { //获取竞赛类型数据
        this.axios.get('/opt/option/items?type=competition_type', {

        })
          .then(response => {
            this.options_competitionType = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_competition_work_type() { //获取竞赛作品类型数据
        this.axios.get('/opt/option/items?type=competition_work_type', {

        })
          .then(response => {
            this.options_workType = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_prizes() { //获取奖项分布
        this.axios.get('/opt/option/distribution/prize/group', {

        })
          .then(response => {
            this.options_prize = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_level() { //获取竞赛级别
        this.$api_opt.admin_get_optLevel('competition').then(res => {
          this.options_level = res.data.data
        })
      },
      async get_host(queryString, cb) { //获取主办单位
        /* this.axios.get('/opt/option/items?type=host', {

        })
          .then(response => {
            this.options_host = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            }); */

        let selected = {
          name: queryString,
          start: 0,
          size: 0
        }
        let data = [];
        await this.$api_opt.admin_get_host(selected).then(res => {
          if (res.data.code === 2000) {
            data = res.data.data.list;
          }
          cb(data);
        })
      },
      handleSelect(item) {
        this.ifSelectHost = item.id;
        console.log("select");
        console.log(this.ifSelectHost)
      },

      getData() {
        this.get_competition_type()
        this.get_competition_work_type()
        this.get_prizes()
        this.get_level()
        //this.get_host()
      },

      openChangeCompetition(rows) { //打开修改竞赛信息对话框
        Object.keys(this.editForm).forEach(res => { //将列表项的值附到form上用于预先的显示 ,采用foreach优化代码
          this.editForm[res] = rows[res]
          this.editForm.year = this.editForm.year.toString()
        })
        this.editForm.workType = rows.workType.split('/')
        //this.getData()
        //this.editForm.index = index //index为行数
        this.dialogFormVisible_modify = true //将修改的对话框打开
      },

      toModify() { //打开修改页面修改权限
        this.noModify = false;
      },
      //修改竞赛信息
      changeCompetition(rows) {
        this.$refs.editForm.validate(valid => {
          if (valid) {
        //将作品类型数组转为字符串
        let ready_to_post = true
        Object.keys(this.editForm).forEach(res => {
          if ((this.editForm[res] == '' || this.editForm[res] == null) && res != 'index') {
            ready_to_post = false
            console.log(res)
          }
        })
        console.log();
        if (ready_to_post) {
          //如果是字符串，说明之前已经分割过，避免再次分割
          if (typeof (this.editForm.workType) != 'string') {
            let param = '';
            Object.keys(this.editForm.workType).forEach(res => {
              param = param + this.editForm.workType[res] + '/';
            })
            //去掉末尾的/
            this.editForm.workType = param.slice(0, -1);
          }
          this.axios.put('/opt/competition/detail', {
            competitionType: this.editForm.competitionType,
            finalDate: this.editForm.finalDate,
            host: this.editForm.host,
            id: this.editForm.id,
            level: this.editForm.level,
            name: this.editForm.name,
            prizeDistribution: this.editForm.prizeDistribution,
            workType: this.editForm.workType,
            year: Number(this.editForm.year),
          }, {

          })
            .then(response => {
              if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                // Object.keys(rows[this.editForm.index]).forEach(res=>{ //rows为传入的表格数据源,采用foreach优化代码
                //   rows[this.editForm.index][res] = this.editForm[res]
                // })
                this.dialogFormVisible_modify = false;
                this.get_competition()
              } else {
                this.dialogFormVisible_modify = false;
                this.dialogFormVisible_fail = true;
              }
            })
            .catch(response => { });
        } else {
          this.$message.error('表单填写有误');
        }
      }
    })
      },
      hostChanged(val){
        this.ifChangeHost = true;
      },
      addCompetiton() { //添加竞赛信息
        //TODO:这边的控制可以全部使用el的表单验证
        this.$refs.editForm.validate(valid => {
          if (valid) {
        let ready_to_post = true;
        Object.keys(this.editForm).forEach(res => {
          if (this.editForm[res] == '' && res != "id" && res != "index") {
            ready_to_post = false
            console.log(res)
          }
        })
        if (ready_to_post) {
          //将作品类型数组转为字符串
          let param = '';
          Object.keys(this.editForm.workType).forEach(res => {
            param = param + this.editForm.workType[res] + '/';
          })
          this.editForm.workType = param.slice(0, -1);
          this.axios.post('/opt/competition/detail', {
            competitionType: this.editForm.competitionType,
            finalDate: this.editForm.finalDate,
            host: this.editForm.host,
            level: this.editForm.level,
            name: this.editForm.name,
            prizeDistribution: this.editForm.prizeDistribution,
            workType: this.editForm.workType,
            year: this.editForm.year,
          }, {

          })
            .then(response => {
              this.dialogFormVisible_add = false;
              if (response.data.code == 2000) {
                if (this.current_page == this.pages_total && this.info.length % 4 != 0) {
                  this.info.push({
                    competitionType: this.editForm.competitionType,
                    finalDate: this.editForm.finalDate,
                    host: this.editForm.host,
                    level: this.editForm.level,
                    name: this.editForm.name,
                    prizeDistribution: this.editForm.prizeDistribution,
                    workType: this.editForm.workType,
                    year: this.editForm.year,
                  });
                } else if (this.current_page == this.pages_total && this.info.length % 4 == 0) {
                  this.pages_total++
                }
              } else {
                this.dialogFormVisible_fail = true;
              }
            })
            .catch(response => { });
        } else {
          this.$message.error('表单填写有误');
        }
      }
    })
      },

      cleanAll() { //在对话框关闭时清除所有数据
        Object.keys(this.editForm).forEach(res => {
          this.editForm[res] = ''
        })
        this.get_competition()
        this.noModify = true;
        this.ifChangeHost = false;
        this.$refs.editForm.resetFields();
      },

      open_delete(index, rows) { //打开确认删除对话框
        this.delete_id = rows.id
        this.dialogVisible_delete = true
      },
      deleteCompetition() { //删除竞赛信息
        this.axios.delete('/opt/option/item?type=competition_info&id=' + this.delete_id, {

        })
          .then(response => {
            this.get_competition()
            this.dialogVisible_delete = false
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },

      handleClose_delete() { //关闭确认删除对话框的时候清空数据
        this.delete_id = ''
      },
      //表格空白数据处理
      if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },

      //导出excel
      export_excel() {
        this.axios.post('/opt/option/file?choice=0', this.selected, {

          responseType: 'blob'
        })
          .then(response => {
            const link = document.createElement('a')
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            link.setAttribute('download', `学生科技平台条目导出.xlsx`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },

    },
    created() {
      this.get_competition()
      this.getData()
    },
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-select-dropdown {
    max-width: 400px;
  }

  .el-select-dropdown__item {
    max-width: 400px;
    overflow: visible;
  }
</style>
