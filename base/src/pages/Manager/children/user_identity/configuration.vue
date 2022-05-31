<template>
  <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
    <div style="width: 100%;min-width: 800px;">
      <div class="header" style="margin-top: 10px;">

        <el-tabs type="border-card" style="margin-top: 10px;">
          <el-tab-pane label="班级等配置项" style="margin-left: 30px;margin-bottom: 30px;margin-top: 30px;">

            <div style="display: inline;margin-right: 30px;">
              所属院系
            </div>

            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i) in department"
                      :key="i" closable @close="open_delete('department',item.id)">
                {{ item.name }}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_department" v-model="department_input"
                        ref="saveTagInput" size="small" @keyup.enter.native="add_department"
                        @blur="add_department">
              </el-input>
              <el-button v-if="!visible_department" class="button-new-tag" size="small"
                         @click="showInput_department" style="margin-left: 20px;">+ 增加类型
              </el-button>
            </div>

            <div style="margin-bottom: 30px;margin-top: 30px;">
              <div style="display: inline;margin-right: 30px;">
                专业/班级
              </div>
              <el-button type="primary" style="height:30px;padding-top:8px;" @click="open_add_major">添加专业
              </el-button>
            </div>

            <div>
              <el-collapse v-model="major_now" v-for="(item,i) in major" :key="i" accordion
                           @change="get_class">
                <el-collapse-item :name="item.name">
                  <template slot="title">
                    {{ item.name }}<i style="float: right;" class="header-icon el-icon-delete"
                                      @click="open_delete('major',item.id)"></i>
                  </template>
                  <div>
                    <div v-for="(item2,i)  in clazz" :key="i"
                         style="width: 400px;margin-bottom: 10px;" class="patent">
                      <el-tag closable style="width: 400px;"
                              @close="open_delete('class',item2.id)">
                        {{ item2.name }}
                      </el-tag>
                    </div>
                    <el-tag style="width: 400px;margin-bottom: 10px;">
                      <div style="margin-left: 195px;" @click="open_add_class">+</div>
                    </el-tag>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>


            <!-- <div v-for="item in major">
<div style="width: 1000px;height: 40px;border-style: solid;border-color:#D9D9D9;border-width: 1.5px;border-bottom: 0;">
  <p style="margin-top: 11px;margin-left: 30px;display: inline-block;">{{item.name}}</p>
  <i class="el-icon-delete" style="margin-top: 11px;margin-right: 30px;float: right;" @click="open_delete('major',item.id)"></i>
</div>
</div>
<div style="width: 1000px;height: 40px;border-style: solid;border-color:#D9D9D9;border-width: 1.5px;">
<i class="el-icon-plus" style="margin-top: 11px;margin-left: 500px;" @click="open_add_major"></i>
</div> -->

            <el-dialog title="请输入专业名称" :visible.sync="dialogVisible_major" width="30%"
                       :before-close="handleClose_major">
              <el-input v-model="major_input" placeholder="请输入专业" @keyup.enter.native="add_major">
              </el-input>
              <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible_major = false">取 消</el-button>
                                <el-button type="primary" @click="add_major">确 定</el-button>
                            </span>
            </el-dialog>

            <el-dialog title="请填写班级信息" :visible.sync="dialogVisible_class" width="30%"
                       :before-close="handleClose_class">
              <!-- <div>
<p style="display: inline-block;">专业</p>
<el-select v-model="major_selected_mid" placeholder="请选择专业"
  style="display: inline-block;width: 200px;margin-left: 60px;">
  <el-option v-for="item in major" :key="item.id" :label="item.name" :value="item.name">
  </el-option>
</el-select>
</div>-->
              <div>
                <p style="display: inline-block;">班级名称</p>
                <div style="margin-top: 20px;display: inline-block;margin-left: 32px;">
                  <el-input v-model="class_input" placeholder="请输入班级" @keyup.enter.native="add_class">
                  </el-input>
                </div>
              </div>

              <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible_class = false">取 消</el-button>
                                <el-button type="primary" @click="add_class">确 定</el-button>
                            </span>
            </el-dialog>

          </el-tab-pane>

          <!-- <el-tab-pane label="班级" style="margin-left: 30px;margin-bottom: 30px;margin-top: 30px;">

<div v-for="item in clazz">
  <div style="width: 1000px;height: 40px;border-style: solid;border-color:#D9D9D9;border-width: 1.5px;border-bottom: 0;">
    <p style="margin-top: 11px;margin-left: 30px;display: inline-block;">{{item.name}}</p>
    <i class="el-icon-delete" style="margin-top: 11px;margin-right: 30px;float: right;" @click="open_delete('class',item.id)"></i>
  </div>
</div>
<div style="width: 1000px;height: 40px;border-style: solid;border-color:#D9D9D9;border-width: 1.5px;">
  <i class="el-icon-plus" style="margin-top: 11px;margin-left: 500px;" @click="open_add_class"></i>
</div>



</el-tab-pane>

<el-tab-pane label="所属院系" style="margin-left: 30px;margin-bottom: 30px;margin-top: 30px;">

<div v-for="item in department">
  <div style="width: 1000px;height: 40px;border-style: solid;border-color:#D9D9D9;border-width: 1.5px;border-bottom: 0;">
    <p style="margin-top: 11px;margin-left: 30px;display: inline-block;">{{item.name}}</p>
    <i class="el-icon-delete" style="margin-top: 11px;margin-right: 30px;float: right;" @click="open_delete('department',item.id)"></i>
  </div>
</div>
<div style="width: 1000px;height: 40px;border-style: solid;border-color:#D9D9D9;border-width: 1.5px;">
  <i class="el-icon-plus" style="margin-top: 11px;margin-left: 500px;" @click="open_add_department"></i>
</div>

<el-dialog
  title="请输入院系名称"
  :visible.sync="dialogVisible_department"
  width="30%"
  :before-close="handleClose_department">
  <el-input v-model="department_input" placeholder="请输入院系"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_department = false">取 消</el-button>
    <el-button type="primary" @click="add_department">确 定</el-button>
  </span>
</el-dialog>

</el-tab-pane> -->

        </el-tabs>

        <el-dialog title="确定要删除吗" :visible.sync="dialogVisible_delete" width="30%"
                   :before-close="handleClose_delete">
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible_delete = false">取 消</el-button>
                        <el-button type="primary" @click="delete_choosed">确 定</el-button>
                    </span>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "amdinUserConfig",
  data() {
    return {

      clazz: [], //班级列表
      major: [], //专业列表
      department: [], //学院列表
      dialogVisible_major: false,
      dialogVisible_class: false,
      dialogVisible_department: false,
      dialogVisible_delete: false,
      visible_department: false,
      delete_type: '', //需要删除的配置项的类型
      delete_id: '', //需要删除的配置项的id
      major_input: '', //输入的专业
      class_input: '', //输入的班级
      department_input: '', //输入的院系
      major_selected: 'all', //班级页选择的专业
      major_selected_mid: '', //班级页选择的专业的中转，确保选择栏文字能显示
      major_now: '', //当前折叠面板中展示的专业
    }
  },
  methods: {
    get_major() { //获取专业数据
      this.axios.get('/opt/option/items?type=major', {})
        .then(response => {
          this.major = response.data.data
        })
        .catch(
          function (response) {
            console.log(response)
          });
    },

    get_class() { //获取班级数据
      this.axios.get('/opt/class/classes?major=' + this.major_now, {})
        .then(response => {
          this.clazz = response.data.data
        })
        .catch(
          function (response) {
            console.log(response)
          });
    },

    get_department() { //获取班级数据
      this.axios.get('/opt/option/items?type=department', {})
        .then(response => {
          this.department = response.data.data
        })
        .catch(
          function (response) {
            console.log(response)
          });
    },

    getData() { //根据标签页获取不同数据
      //this.get_class()
      this.get_major()
      this.get_department()
    },


    open_add_major() { //打开新增专业对话框
      this.dialogVisible_major = true
    },
    open_add_class() { //打开新增班级对话框
      this.dialogVisible_class = true
    },
    open_add_department() { //打开新增院系对话框
      this.dialogVisible_department = true
    },
    open_delete(type, id) { //打开删除确认对话框
      this.dialogVisible_delete = true
      this.delete_type = type
      this.delete_id = id
      console.log(type)
    },

    add_major() { //新增专业
      this.axios.post('/opt/option/item?type=major&value=' + this.major_input, {}, {
        headers: {
          'Token': this.Token,
        },
      })
        .then(response => {
          this.get_major()
        })
        .catch(
          function (response) {
            console.log(response)
          });
      this.dialogVisible_major = false
    },
    add_class() { //新增班级,暂时遇到问题
      this.axios.post('/opt/class/class', {
        'major': this.major_now,
        'name': this.class_input
      }, {
        headers: {
          'Token': this.Token,
        },
      })
        .then(response => {
          this.get_class()
        })
        .catch(
          function (response) {
            departmentconsole.log(response)
          });
      this.dialogVisible_class = false
    },
    add_department() { //新增院系
      if (this.department_input != '') {
        this.axios.post('/opt/option/item?type=department&value=' + this.department_input, {}, {
          headers: {
            'Token': this.Token,
          },
        })
          .then(response => {
            this.get_department();
            this.department_input = '';
            this.visible_department = false;
          })
          .catch(
            function (response) {
              console.log(response)
            });
      } else {
        this.visible_department = false;
      }
    },

    delete_choosed() { //删除所选项
      this.axios.delete('/opt/option/item?type=' + this.delete_type + '&id=' + this.delete_id, {
        headers: {
          'Token': this.token
        },
      })
        .then(response => {
          this.getData();
          this.get_class();
          this.dialogVisible_delete = false
        })
        .catch(
          function (response) {
            console.log(response)
          });
      this.dialogVisible_department = false
    },

    handleClose_major() { //关闭新增专业对话框的时候清空数据
      this.major_input = ''
    },
    handleClose_class() { //关闭新增班级对话框的时候清空数据
      this.class_input = ''
    },
    handleClose_department() { //关闭新增院系对话框的时候清空数据
      this.department_input = ''
    },
    handleClose_delete() { //关闭新增院系对话框的时候清空数据
      this.department_input = ''
    },

    showInput_department() { //点击增加类型后，产生新的输入框
      this.visible_department = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
/deep/ .input-new-tag {
  width: 90px;
  margin-left: 20px;
  /* vertical-align: bottom; */
}

/deep/ .patent > .el-tag .el-icon-close {
  float: right;
  top: 5px
}
</style>
