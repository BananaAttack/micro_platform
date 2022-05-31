<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
        <div style="margin-top: 10px;">
            <el-select v-model="type_selected" placeholder="选择检索项" style="width: 150px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <!-- 根据检索项不同，会出现不同搜索框 -->
            <el-input v-if="type_selected == 'realName'" @change="set_value" @keyup.enter.native="getData"
                v-model="select.name_selected" placeholder="搜索姓名" style="width: 150px;margin-left: 20px;"></el-input>
            <el-input v-if="type_selected == 'stid'" @change="set_value" @keyup.enter.native="getData"
                v-model="select.stid_selected" placeholder="搜索工号" style="width: 150px;margin-left: 20px;"></el-input>
            <!-- <el-select v-if="type_selected == 'department'" @change="set_value" v-model="select.department_selected"
                placeholder="选择所属院系" style="width: 150px;">
                <el-option v-for="item in options_department" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
            </el-select> -->
            <el-autocomplete class="inline-input" v-if="type_selected == 'department'" v-model="select.department_selected" value-key="name" :fetch-suggestions="querySearch_department"
                    placeholder="请输入所属院系" @select="set_value" @change="set_value" @keyup.enter.native="getData"></el-autocomplete>
            <el-select v-if="type_selected == 'ranks'" @change="set_value" v-model="select.ranks_selected"
                placeholder="选择职称" style="width: 150px;">
                <el-option v-for="item in options_ranks" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
            </el-select>
            <!-- <el-autocomplete class="inline-input" v-if="type_selected == 'ranks'" v-model="select.ranks_selected" value-key="name" :fetch-suggestions="querySearch_ranks"
                    placeholder="请输入职称" @select="set_value"></el-autocomplete> -->
            <el-date-picker v-if="type_selected == 'entry_year'" @change="set_value"
                v-model="select.entry_year_selected" type="year" placeholder="选择入职年份" value-format="yyyy">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;height:30px;padding-top:8px;"
                @click="getData"></el-button>
            <el-button type="primary" icon="el-icon-close" style="margin-left: 20px;height:30px;padding-top:8px;"
                @click="cleanSelected"></el-button>
            <el-button type="primary" style="margin-left: 150px;height:30px;padding-top:8px;"
                @click="dialogFormVisible_add=true">增加教师</el-button>
            <el-upload ref="upload_tea" style="margin-left: 20px;display: inline-block;" class="upload-demo" action=""
                :limit="1" :http-request="set_doc" multiple :file-list="fileList_teacher" :show-file-list="false"
                :on-success="clean_tea_doc">
                <el-button type="primary" style="height:30px;padding-top:8px;">批量增加</el-button>
            </el-upload>
        </div>

        <div>
            <el-table ref="multipleTable" :data="info" size="small" tooltip-effect="dark"
                style="width: 100%;margin-top: 30px;cursor:pointer" border @row-click="checkDetails">
                <el-table-column label="姓名" prop="realName" :formatter="if_null" width="150" show-overflow-tooltip align="center">
                    <!-- <template slot-scope="scope">
                        <span @click="checkDetails(scope.row,'tea')"
                            style="width:150px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.realName}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="sex" label="性别" :formatter="if_null" show-overflow-tooltip width="150" align="center">
                </el-table-column>
                <el-table-column prop="stid" label="工号" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="department" label="所属院系" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="ranks" label="职称" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="birth" label="出生年月" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="entry_year" label="入职年份" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column label="操作" align="center"  width="150">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click.stop="checkDetails(scope.row)">查看详情</el-button>
                        <el-button type="text" size="small" style="color:crimson" @click.stop="open_deleteTeacher(scope.$index,scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>
        <div>
            <el-pagination style="margin-top: 60px;" @size-change="size = $event,getData()"
            @current-change="getData()" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
            :page-size.sync="size" layout="total, sizes, prev, pager, next, jumper" :total.sync="size_total">
        </el-pagination>
        </div>


        <el-dialog title="添加教师信息" :visible.sync="dialogFormVisible_add" width="600px" @close="cleanAll">
            <el-form :model="form">
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="form.stid" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.realName" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="form.sex" label="男">男</el-radio>
                    <el-radio v-model="form.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="所属院系" :label-width="formLabelWidth">
                    <el-select @change="set_value" v-model="form.department" placeholder="选择所属院系" style="width: 150px;">
                        <el-option v-for="item in options_department" :key="item.id" :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称" :label-width="formLabelWidth">
                    <el-radio v-model="form.ranks" label="助教">助教</el-radio>
                    <el-radio v-model="form.ranks" label="讲师">讲师</el-radio>
                    <el-radio v-model="form.ranks" label="副教授">副教授</el-radio>
                    <el-radio v-model="form.ranks" label="教授">教授</el-radio>
                </el-form-item>
                <el-form-item label="学历学位" :label-width="formLabelWidth">
                    <el-radio v-model="form.degree" label="本科">本科</el-radio>
                    <el-radio v-model="form.degree" label="硕士">硕士</el-radio>
                    <el-radio v-model="form.degree" label="博士">博士</el-radio>
                </el-form-item>
                <el-form-item label="学位专业" :label-width="formLabelWidth">
                    <el-input v-model="form.major" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="入职年份" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.entry_year" type="year" placeholder="选择年" value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off" style="width: 200px;" @change="checkPhone">
                    </el-input>
                    <p style="float: right;margin-right: 40px;color: #DD6161;" v-if="!phone_right">手机号码格式不正确</p>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off" style="width: 200px;" @change="checkEmail">
                    </el-input>
                    <p style="float: right;margin-right: 40px;color: #DD6161;" v-if="!email_right">邮箱地址格式不正确</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addTeacher()">确 定</el-button>
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
                <el-button type="primary" @click="deleteTeacher">确 定</el-button>
                <el-button @click="dialogVisible_delete = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "amdinTea",
        data() {
            return {

                info: [], //获取到的表格数据
                options: [{ //条件检索选项
                    value: "realName",
                    label: "姓名"
                }, {
                    value: "stid",
                    label: "工号"
                }, {
                    value: "department",
                    label: "所属院系"
                }, {
                    value: "ranks",
                    label: "职称"
                }, {
                    value: "entry_year",
                    label: "入职年份"
                }],
                options_department: [],
                options_class: [], //下拉框班级
                options_class_now: [], //经过专业选择后的班级列表
                options_ranks: [{ //下拉框职称
                    value: "1",
                    label: "助教"
                }, {
                    value: "2",
                    label: "讲师"
                }, {
                    value: "3",
                    label: "副教授"
                }, {
                    value: "4",
                    label: "教授"
                }],
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
                size: 30, //当前一页条目数
                class: '', //选择栏班级
                dialogFormVisible_modify: false, //修改学生信息表单的显示
                dialogFormVisible_add: false, //增加学生信息表单的显示
                dialogFormVisible_fail: false, //增加或者修改操作失败
                dialogVisible_delete: false, //确认删除对话框显示
                delete_teacher: '', //确认删除的教师id
                formLabelWidth: '150px', //dialog宽度
                select: { //下拉框选择的值
                    rank_selected: '', //选择职称
                    name_selected: '', //输入姓名
                    stid_selected: '', //输入工号
                    department_selected: '', //选择所属院系
                    entry_year_selected: '' //入职年份
                },
                type_selected: '', //选择的词条,附加在获取信息上做到条件搜索
                value_selected: '', //在下拉框的值确定到该变量上，便于搜索
                imageUrl: '', //存放图片地址,暂时未实现图片上传功能
                phone_right: true, //检测手机号码格式,默认正确
                email_right: true, //检测邮箱格式，默认正确
                fileList_teacher: [], //批量添加教师存放文件处
                form: { //存放修改或者添加的学教师信息，每次关闭对话框都会清空
                    stid: '',
                    realName: '',
                    sex: '',
                    department: '',
                    ranks: '',
                    degree: '',
                    major: '',
                    birth: '',
                    entry_year: '',
                    phone: '',
                    email: '',
                    user_id: '', //用户id，仅用于修改信息时使用，不会显示在表格中
                    photo: '', //暂时接口未要求
                    index: '' //存放当前表格位置，用于同步视图时的定位
                }
            }
        },
        //路由守卫，在跳往详情页时缓存页面
        beforeRouteLeave(to, form, next) {
            if (to.path == '/user_info') {
                this.addRoute('amdinTea');
            } else {
                this.removeAllRoute();
            }
            next()
        },
        activated(){
            this.getData();
        },
        methods: {
            //将vuex中的函数放出来,便于直接使用
            ...mapActions(['addRoute', 'removeAllRoute', 'removeRoute']),
            getData() { //获取表格数据
                this.axios.get('/users/teacher/info', {
                    params: {
                        start: this.current_page,
                        size: this.size,
                        type_name: this.type_selected,
                        type_value: this.value_selected
                    },

                })
                    .then(response => {
                        this.info = response.data.data.list
                        Object.keys(this.info).forEach(res => {
                            this.info[res].entry_year = this.info[res].entry_year.toString();
                        })
                        this.pages_total = response.data.data.pages;
                        this.size_total = response.data.data.total;
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },

            addTeacher() { //添加教师信息,先判断手机号和密码是否空和信息是否填写完整
                let ready_to_post = true
                Object.keys(this.form).forEach(res => {
                    if (this.form[res] == '' && res != "user_id" && res != "photo" && res != "index") {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post && this.phone_right && this.email_right) {
                    this.axios.post('/user/teacher/info', {
                        stid: this.form.stid,
                        realName: this.form.realName,
                        sex: this.form.sex,
                        major: this.form.major,
                        department: this.form.department,
                        degree: this.form.degree,
                        ranks: this.form.ranks,
                        birth: this.form.birth,
                        entry_year: this.form.entry_year,
                        phone: this.form.phone,
                        email: this.form.email,
                    }, {

                    })
                        .then(response => {
                            this.dialogFormVisible_add = false;
                            if (response.data.code == 2000) {
                                if (this.current_page == this.pages_total && this.info.length % 4 != 0) {
                                    this.info.push({
                                        stid: this.form.stid,
                                        realName: this.form.realName,
                                        sex: this.form.sex,
                                        major: this.form.major,
                                        department: this.form.department,
                                        degree: this.form.degree,
                                        ranks: this.form.ranks,
                                        birth: this.form.birth,
                                        entry_year: this.form.entry_year,
                                        phone: this.form.phone,
                                        email: this.form.email,
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
            },

            set_value() { //条件搜索确定值的时候，将值固定到一个变量，用于搜索
                Object.keys(this.select).forEach(res => {
                    if (this.select[res] != '') {
                        this.value_selected = this.select[res]
                    }
                })
            },

            cleanSelected() { //清除已经选定的搜索条件,再次搜索
                Object.keys(this.select).forEach(res => {
                    this.select[res] = ''
                })
                this.type_selected = ''
                this.value_selected = ''
                this.getData()
            },

            checkPhone() { //检测手机号码格式是否正确
                if (!(/^1[3456789]\d{9}$/.test(this.form.phone))) {
                    this.phone_right = false
                } else {
                    this.phone_right = true
                }
            },

            checkEmail() { //检测邮箱格式是否正确
                if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.form.email))) {
                    this.email_right = false
                } else {
                    this.email_right = true
                }
            },




            open_deleteTeacher(index, rows) { //打开确认删除对话框
                this.delete_teacher = rows.user_id
                this.dialogVisible_delete = true
            },

            deleteTeacher() { //删除教师信息
                this.axios.delete('/user/info?user_id=' + this.delete_teacher, {

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
                this.delete_teacher = ''
            },


            getCollege() { //根据下拉选项获取所属院系信息
                this.axios.get('/opt/option/items?type=department', {

                })
                    .then(response => {
                        this.options_department = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },

            classFilter() { //过滤班级信息
                let search = this.form.major.substr(0, 1)
                this.options_class_now = this.options_class.filter(item => {
                    if ((item.stu_class.indexOf(search) != -1)) {
                        return item;
                    }
                })
            },

            cleanAll() { //在对话框关闭时清除所有数据
                Object.keys(this.form).forEach(res => {
                    this.form[res] = ''
                })
                this.options_class_now = this.options_class //将筛选后的班级下拉框还原为总下拉框
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            set_doc(fileObj) { //批量导入教师
                let formdata = new FormData();
                formdata.append('file', fileObj.file);
                this.axios.post('/batch/tea',
                    formdata, {
                    headers: {
                        'Token': this.Token
                    },
                }).then(response => {
                    this.getData();
                    this.$refs.upload_tea.clearFiles();
                })
            },
            clean_tea_doc() { //批量上传之后清除缓存的文件
                this.$refs.upload_tea.clearFiles();
            },
            checkDetails(row) {
                this.$router.push({
                    path: '/user_info',
                    query: {
                        user_id: row.user_id,
                        role: 'tea',
                        modify:true
                    }
                })
            },

            querySearch_department(queryString, cb) {
                var opt = this.options_department;
                var results = queryString ? opt.filter(this.createFilter(queryString)) : opt;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (opt) => {
                    return (opt.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },

        },
        created() {
            this.getData()
            this.getCollege()
            //this.options_class_now = this.options_class //在未经专业选择时，班级下拉框保持一致
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
</style>