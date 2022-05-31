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
                    v-model="select.name_selected" placeholder="搜索姓名" style="width: 150px;margin-left: 20px;">
                </el-input>
                <el-input v-if="type_selected == 'stid'" @change="set_value" @keyup.enter.native="getData"
                    v-model="select.stid_selected" placeholder="搜索学号" style="width: 150px;margin-left: 20px;">
                </el-input>
                <el-autocomplete class="inline-input" v-if="type_selected == 'stu_class'" v-model="select.class_selected" value-key="name" :fetch-suggestions="querySearch_class"
                    placeholder="请输入班级" @select="set_value"  @change="set_value" @keyup.enter.native="getData"></el-autocomplete>
                <!-- <el-select v-if="type_selected == 'stu_class'" @change="set_value" v-model="select.class_selected"
                    placeholder="选择班级" style="width: 150px;">
                    <el-option v-for="item in options_class" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select> -->
                <!-- <el-autocomplete v-if="type_selected == 'major'" v-model="editForm.host" value-key="name"
                    :fetch-suggestions="get_host" placeholder="请输入主办单位" style="width: 300px;" @select="handleSelect"
                    :select-when-unmatched="false" :debounce="300">
                </el-autocomplete> -->
                <el-autocomplete class="inline-input" v-if="type_selected == 'major'" v-model="select.major_selected" value-key="name" :fetch-suggestions="querySearch_major"
                    placeholder="请输入专业" @select="set_value"  @change="set_value" @keyup.enter.native="getData"></el-autocomplete>
                <!-- <el-select v-if="type_selected == 'major'" @change="set_value" v-model="select.major_selected"
                    placeholder="选择专业" style="width: 150px;">
                    <el-option v-for="item in options_major" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select> -->
                <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;height:30px;padding-top:8px;"
                    @click="getData"></el-button>
                <el-button type="primary" icon="el-icon-close" style="margin-left: 20px;height:30px;padding-top:8px;"
                    @click="cleanSelected"></el-button>
                <el-button type="primary" style="margin-left: 150px;height:30px;padding-top:8px;"
                    @click="dialogFormVisible_add=true">添加学生</el-button>
                <el-upload ref="upload_stu" style="margin-left: 20px;display: inline-block;" class="upload-demo"
                    action="" :limit="1" :http-request="set_doc" multiple :file-list="fileList_student"
                    :show-file-list="false" :on-success="clean_stu_doc">
                    <el-button type="primary" style="height:30px;padding-top:8px;">批量增加</el-button>
                </el-upload>
            </div>


            <div>
                <el-table ref="multipleTable" :data="info" size="small" stripe tooltip-effect="dark"
                    style="width: 100%;margin-top: 30px;cursor:pointer" border @row-click="checkDetails">
                    <el-table-column label="姓名" prop="realName" :formatter="if_null" show-overflow-tooltip width="150" align="center">
                        <!-- <template slot-scope="scope">
                            <span @click="checkDetails(scope.row,'stu')"
                                style="width:150px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.realName}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" :formatter="if_null" show-overflow-tooltip width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="stid" label="学号" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="stu_class" label="班级" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="birth" label="出生日期" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="enter_year" label="入校年份" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="major" label="专业" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="education" label="学生类型" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click.stop="checkDetails(scope.row)">查看详情</el-button>
                            <el-button type="text" size="small" style="color:crimson"
                                @click.stop="open_deleteStudent(scope.$index,scope.row)">删除
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


            <el-dialog title="添加学生身份信息" :visible.sync="dialogFormVisible_add" width="600px" @close="cleanAll">
                <el-form :model="form">
                    <el-form-item label="学号" :label-width="formLabelWidth">
                        <el-input v-model="form.stid" autocomplete="off" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.realName" autocomplete="off" style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-radio v-model="form.sex" label="男">男</el-radio>
                        <el-radio v-model="form.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="专业" :label-width="formLabelWidth">
                        <!-- 当选项改变，会对班级下拉框做一个筛选 -->
                        <el-radio v-model="form.major" :label="item.name" v-for="(item,i) in options_major" :key="i"
                            @change="getClass">{{item.name}}</el-radio>
                    </el-form-item>
                    <el-form-item label="学生类型" :label-width="formLabelWidth">
                        <el-radio v-model="form.education" label="本科">本科</el-radio>
                        <el-radio v-model="form.education" label="硕士">硕士</el-radio>
                        <el-radio v-model="form.education" label="博士">博士</el-radio>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth">
                        <!-- 当没有选专业，下拉框为总数据，选完专业后显示筛选过的数据 -->
                        <el-select v-model="form.stu_class" placeholder="选择班级" style="width: 150px;">
                            <el-option v-for="item in options_class" :key="item.id" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" :label-width="formLabelWidth">
                        <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="入学年份" :label-width="formLabelWidth">
                        <el-date-picker v-model="form.enter_year" type="year" placeholder="选择年" value-format="yyyy">
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
                    <el-button type="primary" @click="addStudent()">确 定</el-button>
                    <el-button @click="dialogFormVisible_add = false">取 消</el-button>
                </div>
            </el-dialog>

            <el-dialog title="操作失败" :visible.sync="dialogFormVisible_fail" width="30%">
                <p>您的操作失败了，请重试</p>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible_fail=false">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="确定要删除吗" :visible.sync="dialogVisible_delete" width="30%"
                :before-close="handleClose_delete">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_delete = false">取 消</el-button>
                    <el-button type="primary" @click="deleteStudent">确 定</el-button>
                </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "adminStu",
        data() {
            return {
                info: [], //获取到的表格数据
                options: [{ //条件检索选项
                    value: "stu_class",
                    label: "班级"
                }, {
                    value: "realName",
                    label: "姓名"
                }, {
                    value: "stid",
                    label: "学号"
                }, {
                    value: "major",
                    label: "专业"
                }], //下拉框的选项
                options_class: [], //下拉框班级
                options_major: [], //下拉框专业
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
                size: 30, //当前一页条目数
                class: '', //选择栏班级
                dialogFormVisible_modify: false, //修改学生信息表单的显示
                dialogFormVisible_add: false, //增加学生信息表单的显示
                dialogFormVisible_fail: false, //增加或者修改操作失败
                dialogVisible_delete: false, //确认删除对话框显示
                delete_student: '', //确认删除的学生id
                formLabelWidth: '150px', //dialog宽度
                select: { //下拉框选择的值
                    class_selected: '', //选择班级
                    name_selected: '', //输入姓名
                    stid_selected: '', //输入学号
                    major_selected: '', //选择专业
                },
                type_selected: '', //选择的词条,附加在获取信息上做到条件搜索
                value_selected: '', //在下拉框的值确定到该变量上，便于搜索
                imageUrl: '', //存放图片地址
                formData: null, //存放图片的formdata
                phone_right: true, //检测手机号码格式,默认正确
                email_right: true, //检测邮箱格式，默认正确
                fileList_student: [], //批量添加学生存放文件处
                form: { //存放修改或者添加的学生信息，每次关闭对话框都会清空
                    stid: '',
                    realName: '',
                    sex: '',
                    major: 'all',
                    education: '',
                    stu_class: '',
                    birth: '',
                    enter_year: '',
                    phone: '',
                    email: '',
                    picture: '',
                    user_id: '', //用户id，仅用于修改信息时使用，不会显示在表格中
                    index: '' //存放当前表格位置，用于同步视图时的定位
                },
            }
        },
        //路由守卫，在跳往详情页时缓存页面
        beforeRouteLeave(to, form, next) {
            console.log(to.path);
            if (to.path == '/user_info') {
                this.addRoute('adminStu');
            } else {
                this.removeAllRoute();
            }
            next()
        },
        activated() {
            this.getData();
        },
        methods: {
            //将vuex中的函数放出来,便于直接使用
            ...mapActions(['addRoute', 'removeAllRoute', 'removeRoute']),
            getData() { //获取表格数据   //dateStr.match
                this.axios.get('/users/stu/info/', {
                    params: {
                        start: this.current_page,
                        size: this.size,
                        type_name: this.type_selected,
                        type_value: this.value_selected,
                    },
                })
                    .then(response => {
                        this.info = response.data.data.list
                        Object.keys(this.info).forEach(res => {
                            this.info[res].enter_year = this.info[res].enter_year.toString();
                        })
                        this.pages_total = response.data.data.pages;
                        this.size_total = response.data.data.total;
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },

            addStudent() { //添加学生信息,先判断手机号和密码是否空和信息是否填写完整
                let ready_to_post = true
                Object.keys(this.form).forEach(res => {
                    if (this.form[res] == '' && res != "user_id" && res != "picture" && res != "index") {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post && this.phone_right && this.email_right) {
                    this.axios.post('/user/stu/info', {
                        stid: this.form.stid,
                        realName: this.form.realName,
                        sex: this.form.sex,
                        major: this.form.major,
                        education: this.form.education,
                        stu_class: this.form.stu_class,
                        birth: this.form.birth,
                        enter_year: this.form.enter_year,
                        phone: this.form.phone,
                        email: this.form.email,
                    }, {

                    })
                        .then(response => {
                            this.dialogFormVisible_add = false;
                            if (response.data.code == 2000) {
                                /* if (this.current_page == this.pages_total && this.info.length%10 != 0) { //index的条目数暂时未定
                                  this.info.push({
                                    stid: this.form.stid,
                                    realName: this.form.realName,
                                    sex: this.form.sex,
                                    major: this.form.major,
                                    education: this.form.education,
                                    stu_class: this.form.stu_class,
                                    birth: this.form.birth,
                                    enter_year: this.form.enter_year,
                                    phone: this.form.phone,
                                    email: this.form.email,
                                    user_id: this.form.user_id
                                  });
                                }else if(this.current_page == this.pages_total && this.info.length%4 == 0){
                                  this.pages_total++
                                } */
                                this.getData();
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


            openChangeStudent(index, rows) { //修改学生信息
                Object.keys(this.form).forEach(res => { //将列表项的值附到form上用于预先的显示 ,采用foreach优化代码
                    this.form[res] = rows[res]
                })
                this.getClass();
                this.form.stu_class = rows.stu_class;
                this.form.index = index //index为行数
                this.dialogFormVisible_modify = true //将修改的对话框打开
            },

            changeStudent(rows) { //修改学生信息
                let ready_to_post = true
                Object.keys(this.form).forEach(res => {
                    // if(this.form[res] == '' || this.form[res] == null){ 暂时没有完成添加图片功能，所以先不做null的检测
                    if (this.form[res] == '' && res != 'index') {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post && this.phone_right && this.email_right) {
                    this.axios.put('/user/stu/info', {
                        stid: this.form.stid,
                        realName: this.form.realName,
                        sex: this.form.sex,
                        major: this.form.major,
                        education: this.form.education,
                        stu_class: this.form.stu_class,
                        birth: this.form.birth,
                        enter_year: this.form.enter_year,
                        phone: this.form.phone,
                        email: this.form.email,
                        user_id: this.form.user_id
                    }, {})
                        .then(response => {
                            if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                                this.add_img();
                                this.dialogFormVisible_modify = false;
                                //this.getData()
                            } else {
                                this.dialogFormVisible_modify = false;
                                this.dialogFormVisible_fail = true;
                            }
                        })
                        .catch(response => { });
                } else {
                    this.$message.error('表单填写有误');
                }
            },

            open_deleteStudent(index, rows) { //打开确认删除对话框
                this.delete_student = rows.user_id
                this.dialogVisible_delete = true
            },

            deleteStudent() { //删除学生信息
                this.axios.delete('/user/info?user_id=' + this.delete_student, {

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
                this.delete_student = ''
            },

            getClass() { //根据下拉选项获取班级信息
                this.form.stu_class = '';
                this.axios.get('/opt/class/classes?major=' + this.form.major, {

                })
                    .then(response => {
                        this.options_class = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },

            getMajor() { //根据下拉选项获取班级信息
                this.axios.get('/opt/option/items?type=major', {

                })
                    .then(response => {
                        this.options_major = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },

            querySearch_major(queryString, cb) {
                var opt = this.options_major;
                var results = queryString ? opt.filter(this.createFilter(queryString)) : opt;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            querySearch_class(queryString, cb) {
                var opt = this.options_class;
                var results = queryString ? opt.filter(this.createFilter(queryString)) : opt;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (opt) => {
                    return (opt.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            cleanAll() { //在对话框关闭时清除所有数据
                Object.keys(this.form).forEach(res => {
                    this.form[res] = ''
                })
                this.imageUrl = null; //上传图片的预览地址清空
                this.$refs.upload.clearFiles();
                this.getData()
            },
            clean_stu_doc() { //批量上传之后清除缓存的文件
                this.$refs.upload_stu.clearFiles();
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },

            add_img() { //修改学生信息成功后上传头像
                this.axios.post('/user/picture?user_id=' + this.form.user_id,
                    this.formData, {
                    headers: {
                        'Token': this.Token
                    },
                }).then(response => {
                    this.getData();
                    this.formData = null;
                })
            },
            set_doc(fileObj) { //批量导入学生
                let formdata = new FormData();
                formdata.append('file', fileObj.file);
                this.axios.post('/batch/stu',
                    formdata, {
                    headers: {
                        'Token': this.Token
                    },
                }).then(response => {
                    this.getData();
                    this.$refs.upload_stu.clearFiles();
                })
            },
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },
            checkDetails(row) {
                this.$router.push({
                    path: '/user_info',
                    query: {
                        user_id: row.user_id,
                        role: 'stu',
                        modify: true
                    }
                })
            },

        },
        created() {
            this.getData();
            this.getClass();
            this.getMajor();
        },
    }
</script>

<style scoped lang="scss">

</style>