<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
            <div >
                <el-button type="primary" id="addproject" style="height:30px;padding-top:8px;"
                    @click="dialogFormVisible_add=true">添加项目信息</el-button>
                <el-button type="primary" id="download" style="margin-left: 20px;height:30px;padding-top:8px;"
                    @click="export_excel"><i class="el-icon-download el-icon--right"></i>导出</el-button>
            </div>

            <div>
                <el-table :data="prodata" tooltip-effect="dark" size="small" stripe border
                    style="width: 100%;margin-top: 10px;cursor:pointer" @row-click="checkDetail">
                    <el-table-column prop="name" label="项目名称" :formatter="if_null" show-overflow-tooltip width="280" align="center">
                    </el-table-column>
                    <el-table-column prop="project_type" label="项目类型" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="work_type" label="作品类型" :formatter="if_null" show-overflow-tooltip width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="year" label="年份" :formatter="if_null" show-overflow-tooltip align="center"></el-table-column>
                    <el-table-column prop="operation" label="操作" align="center"  width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click.stop="checkDetail(scope.row)">详情
                            </el-button>
                            <el-button type="text" size="small" style="color:crimson"
                                @click.stop="open_delete(scope.$index,scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-pagination background layout="prev, pager, next" :page-count="pages_total"
                    :current-page.sync="current_page" @current-change="getData" style="margin-top: 60px;">
                </el-pagination>
            </div>

            <!-- 添加项目信息 -->
            <el-dialog title="添加项目信息" :visible.sync="dialogFormVisible_add" width="600px" @close="cleanAll">
                <el-form :model="form">
                    <el-form-item label="项目类型" :label-width="formLabelWidth">
                        <el-select @change="nameCombine" v-model="form.project_type" placeholder="选择项目类型"
                            style="width: 150px;">
                            <el-option v-for="item in options_protype" :key="item.id" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年份" :label-width="formLabelWidth">
                        <el-date-picker @change="nameCombine" v-model="form.year" type="year" placeholder="选择年份"
                            value-format="yyyy">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" disabled autocomplete="off" style="width: 200px;"
                            placeholder="年份+项目类型"></el-input>
                    </el-form-item>
                    <el-form-item label="作品类型" :label-width="formLabelWidth">
                        <el-select v-model="form.work_type" multiple placeholder="选择作品类型" style="width: 150px;">
                            <el-option v-for="item in options_worktype" :key="item.id" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_add = false">取 消</el-button>
                    <el-button type="primary" @click="addproject">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="项目信息" :visible.sync="dialogFormVisible_detail" width="600px" @close="cleanAll">
                <el-form :model="form">
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" :disabled="noModify" autocomplete="off" style="width: 200px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目类型" :label-width="formLabelWidth">
                        <el-select v-model="form.project_type" :disabled="noModify" placeholder="选择项目类型"
                            style="width: 150px;">
                            <el-option v-for="item in options_protype" :key="item.id" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作品类型" :label-width="formLabelWidth">
                        <el-select v-model="form.work_type" multiple :disabled="noModify" placeholder="选择作品类型"
                            style="width: 150px;">
                            <el-option v-for="item in options_worktype" :key="item.id" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年份" :label-width="formLabelWidth">
                        <el-date-picker v-model="form.year" :disabled="noModify" type="year" placeholder="选择年份"
                            value-format="yyyy">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <el-button type="primary" style="margin-left: 400px;margin-top: -150px;" @click="toModify" v-if="noModify"
                    :disabled="!noModify">编辑
                </el-button>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="changeProject(prodata)" v-if="!noModify">确 定</el-button>
                    <!-- info作为表格数据源同步到表格改动 -->
                    <el-button @click="dialogFormVisible_detail = false" v-if="!noModify">取 消</el-button>
                </div>
            </el-dialog>
            <!-- <el-dialog title="项目信息详情" :visible.sync="dialogFormVisible_detail" width="30%">
      <el-button type="primary" style="margin-top: -30px; " class="modify" @click="openChangeProject()">编 辑</el-button>
      <div style="padding-left: 70px;">
      <div class="row_1" style="margin-top: 30px; margin-bottom: 10px;">
        <p style="display: inline">项目类型</p>
        <p style="display: inline;margin-left: 30px;">{{form.project_type}}</p>
      </div>
      <div class="row_2" style="margin-top: 30px;margin-bottom: 10px;">
        <p style="display: inline;margin-left: 32px;">年份</p>
        <p style="display: inline;margin-left: 30px;">{{form.year}}</p>
      </div>
      <div class="row_3" style="margin-top: 30px;margin-bottom: 10px;">
        <p style="display: inline">项目名称</p>
        <p style="display: inline;margin-left: 30px;">{{form.name}}</p>
      </div>
      <div class="row_4" style="margin-top: 30px;margin-bottom: 80px;">
        <p style="display: inline">作品类型</p>
        <p style="display: inline;margin-left: 30px;">{{form.work_type}}</p>
      </div>
      </div>
    </el-dialog>
    <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible_modify" width="600px" @close="cleanAll">
      <el-form :model="form">
        <el-form-item label="项目类型" :label-width="formLabelWidth">
          <el-select @change="nameCombine" v-model="form.project_type" placeholder="选择项目类型" style="width: 150px;">
            <el-option v-for="item in options_protype" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份" :label-width="formLabelWidth" style="margin: 27px;">
          <el-date-picker @change="nameCombine" v-model="form.year" type="year" placeholder="选择年份" value-format="yyyy">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"  disabled="true" autocomplete="off" style="width: 200px;" placeholder="年份+项目类型"></el-input>
        </el-form-item>
        <el-form-item label="作品类型" :label-width="formLabelWidth">
          <el-select v-model="form.work_type" placeholder="选择作品类型" style="width: 150px;">
            <el-option v-for="item in options_worktype" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_modify = false">取 消</el-button>
        <el-button type="primary" @click="changeProject(prodata)">确 定</el-button>
      </div>
    </el-dialog> -->
            <!-- 操作失败 -->
            <el-dialog title="操作失败" :visible.sync="dialogFormVisible_fail" width="30%">
                <p>您的操作失败了，请重试</p>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible_fail=false">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="确定要删除吗" :visible.sync="dialogVisible_delete" width="30%"
                :before-close="handleClose_delete">
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteProjects">确 定</el-button>
                    <el-button @click="dialogVisible_delete = false">取 消</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: "adminProjectItems",
        data() {
            return {
                prodata: [], //表格内数据
                options_protype: [],
                options_worktype: [],
                pages_total: 1,
                current_page: 1,
                pageSize: 30, //表格大小
                formLabelWidth: "150px",
                delete_id: '', //存储将要删除的项目id
                form: {
                    index: "",
                    id: "",
                    project_type: "",
                    name: "",
                    year: "",
                    work_type: []
                },
                dialogFormVisible_add: false, //增加信息表单的显示
                dialogFormVisible_fail: false, //增加或者修改操作失败
                dialogFormVisible_detail: false, //查看项目详情
                dialogVisible_delete: false, //确认删除对话框显示
                noModify: true, //竞赛信息编辑对话框锁定修改
            }
        },

        methods: {
            getData() { //获取表格数据   //dateStr.match
                this.axios.get('/opt/achieve/list', {
                    params: {
                        choice: 1,
                        pageNum: this.current_page,
                        pageSize: 30,
                    },

                })
                    .then(response => {
                        this.prodata = response.data.data.list
                        this.pages_total = response.data.data.pages
                        this.current_page = response.data.data.pageNum
                        // console.log(this.prodata)
                        Object.keys(this.prodata).forEach(res => {
                            this.prodata[res].year = this.prodata[res].year.toString()
                        })
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            cleanAll() { //在对话框关闭时清除所有数据
                Object.keys(this.form).forEach(res => {
                    this.form[res] = ''
                })
                this.noModify = true;
                this.getData()
            },
            getProtype() { //根据下拉选项获取项目类型
                this.axios.get('/opt/option/items', {
                    params: {
                        type: "project_type"
                    },

                })
                    .then(response => {
                        this.options_protype = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            getWorktype() { //根据下拉选项获取项目类型
                this.axios.get('/opt/option/items', {
                    params: {
                        type: "project_work_type"
                    },

                })
                    .then(response => {
                        this.options_worktype = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            addproject() {
                let ready_to_post = true
                Object.keys(this.form).forEach(res => {
                    if (this.form[res] == '' && res != "id" && res != "index") {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post) {
                    //如果是字符串，说明之前已经分割过，避免再次分割
                    if (typeof (this.form.work_type) != 'string') {
                        let param = '';
                        Object.keys(this.form.work_type).forEach(res => {
                            param = param + this.form.work_type[res] + '/';
                        })
                        //去掉末尾的/
                        this.form.work_type = param.slice(0, -1);
                    }
                    this.axios.post('/opt/project/detail', {
                        id: this.form.id,
                        name: this.form.name,
                        year: this.form.year,
                        project_type: this.form.project_type,
                        work_type: this.form.work_type,
                    }, {
                        headers: {
                            'Token': this.Token
                        },
                    })
                        .then(response => {
                            this.dialogFormVisible_add = false;
                            if (response.data.code == 2000) {
                                this.getData();
                                /* if (this.current_page == this.pages_total && this.info.length%4 != 0) { //index的条目数暂时未定
                                  this.info.push({
                                    id: this.form.id,
                                    name: this.form.name,
                                    project_type: this.form.project_type,
                                    work_type: this.form.work_type,
                                  });
                                }else if(this.current_page == this.pages_total && this.info.length%4 == 0){
                                  this.pages_total++
                                } */
                            } else {
                                this.dialogFormVisible_fail = true;
                            }
                        })
                        .catch(response => { });
                } else {
                    this.$message.error('表单填写有误');
                }
            },
            nameCombine() {
                this.form.name = this.form.year + "年" + this.form.project_type
            },
            checkDetail(rows) { //查看项目详情
                Object.keys(this.form).forEach(res => {
                    this.form[res] = rows[res]
                })
                this.form.work_type = rows.work_type.split('/')
                console.log(this.form.work_type);
                //this.form.index = index;
                this.form.year = this.form.year.toString()
                // this.form.id = rows.id
                // this.form.name = rows.name
                // this.form.project_type = rows.project_type
                // this.form.work_type = rows.work_type
                // this.form.year = rows.year
                this.dialogFormVisible_detail = true
            },
            openChangeProject(id) {
                this.dialogFormVisible_detail = false
                console.log(this.form)
                this.dialogFormVisible_modify = true
            },
            changeProject(rows) {
                let ready_to_post = true
                Object.keys(this.form).forEach(res => {
                    // if(this.form[res] == '' || this.form[res] == null){ 暂时没有完成添加图片功能，所以先不做null的检测
                    if ((this.form[res] == '' || this.form[res] == null) && res != 'id' && res != 'index') {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post) {
                    //如果是字符串，说明之前已经分割过，避免再次分割
                    if (typeof (this.form.work_type) != 'string') {
                        let param = '';
                        Object.keys(this.form.work_type).forEach(res => {
                            param = param + this.form.work_type[res] + '/';
                        })
                        //去掉末尾的/
                        this.form.work_type = param.slice(0, -1);
                    }
                    this.axios.put('/opt/project/detail', {
                        id: this.form.id,
                        name: this.form.name,
                        year: this.form.year,
                        project_type: this.form.project_type,
                        work_type: this.form.work_type,
                    }, {
                        headers: {
                            'Token': this.Token
                        },
                    })
                        .then(response => {
                            if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                                this.dialogFormVisible_detail = false;
                                this.getData()
                            } else {
                                this.dialogFormVisible_detail = false;
                                this.dialogFormVisible_fail = true;
                            }
                        })
                        .catch(response => { });
                } else {
                    this.$message.error('表单填写有误');
                }
            },
            toModify() { //打开修改页面修改权限
                this.noModify = false
            },

            open_delete(index, rows) { //打开确认删除对话框
                this.delete_id = rows.id
                this.dialogVisible_delete = true
            },
            deleteProjects() { //删除项目信息
                this.axios.delete('/opt/option/item?type=project_info&id=' + this.delete_id, {

                })
                    .then(response => {
                        this.getData()
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

            //导出excel
            export_excel() {
                this.axios.post('/opt/option/file?choice=1', this.selected, {

                    responseType: 'blob'
                })
                    .then(response => {
                        const link = document.createElement('a')
                        const blob = new Blob([response.data], {
                            type: 'application/vnd.ms-excel'
                        })
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
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },
        },
        created() {
            this.getData()
            this.getProtype()
            this.getWorktype()
        }
    }
</script>

<style>
    #addproject {
        margin: 15px 15px;
    }

    #pagecut {
        /* border: 1px #8C939D solid; */
        margin-left: 350px;
    }

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
</style>