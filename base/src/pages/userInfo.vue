<template>
    <div>
        <div class="header" >
            <div class="header">
                <i class="el-icon-back" style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
            @click="$router.back(-1)"></i>
                <p
                    style="font-size: 24px;display: inline-block;margin-top: -10px;font-family: arial;color: #1f2f3d;font-weight: 400;">
                    {{role==='stu'?'学生':'教师'}}详情</p>
                </div>

            <el-card class="box-card" v-if="role==='stu'" style="margin-top: 20px;min-width: 800px;overflow: hidden;width: 100%;">
                <div style="margin-left: 20px;display: inline-block;">
                    <img :src="user_info.picture" alt="" style="width: 100px;height: 140px;">
                </div>
                <div style="display: inline-block;vertical-align:top;">
                    <div style="margin-left: 30px;font-size: 18px;vertical-align:top;margin-top: 0px;font-size: 23px;width: 100%;">
                        <p style="display: inline;">{{user_info.realName || '暂缺'}}</p>
                        <p style="display: inline;margin-left: 30px;">{{user_info.sex || '暂缺'}}</p>
                    </div>
                    <div
                        style="display: inline-block;margin-left: 30px;vertical-align:top;margin-top: 20px;">
                        <div v-for="(item,i) in base_data_stu.left" :key="i" style="overflow: hidden;">
                            <div style="width: 100px;display: inline-block;font-weight: bold;">
                                <p>{{item.ch}}</p>
                            </div>
                            <p style="display: inline-block;margin-bottom: 5px;">
                                {{user_info[item.en] || '暂缺'}}</p>
                        </div>
                    </div>
                    <div
                        style="display: inline-block;margin-left: 100px;vertical-align:top;margin-top: 20px;">
                        <div v-for="(item,i) in base_data_stu.right" :key="i" style="overflow: hidden;">
                            <div style="width: 100px;display: inline-block;font-weight: bold;">
                                <p>{{item.ch}}</p>
                            </div>
                            <p style="display: inline-block;margin-bottom: 5px;">
                                {{user_info[item.en] || '暂缺'}}</p>
                        </div>
                    </div>
                </div>
                <div style="float: right;display: inline-block;margin-right: 30px;" >
                    <el-button type="primary" style="display: inline-block;width: 120px;" @click="openChangeUser()" v-if="ifModify">修改
                    </el-button>
                    <el-button type="primary" style="display: inline-block;width: 120px;" @click="downloadPdf()" v-if="( Number(n)!==2 && Number(n)!==1)&&(Number(user_id) === Number($store.getters.user_id) ||$store.getters.roles === 'admin')">导出PDF
                    </el-button>
                </div>
            </el-card>
            <el-card class="box-card" v-else style="margin-top: 20px;min-width: 800px;overflow: hidden;width: 100%;">
                <div style="margin-left: 20px;display: inline-block;">
                    <img :src="user_info.picture" alt="" style="width: 100px;height: 140px;">
                </div>
                <div style="display: inline-block;vertical-align:top;">
                    <div style="margin-left: 30px;font-size: 18px;vertical-align:top;margin-top: 0px;font-size: 23px;">
                        <p style="display: inline;">{{user_info.realName || '暂缺'}}</p>
                        <p style="display: inline;margin-left: 30px;">{{user_info.sex || '暂缺'}}</p>
                    </div>
                    <div
                        style="display: inline-block;margin-left: 30px;vertical-align:top;margin-top: 20px;">
                        <div v-for="(item,i) in base_data_tea.left" :key="i" style="overflow: hidden;">
                            <div style="width: 100px;display: inline-block;font-weight: bold;">
                                <p>{{item.ch}}</p>
                            </div>
                            <p style="display: inline-block;margin-bottom: 5px;">
                                {{user_info[item.en] || '暂缺'}}</p>
                        </div>
                    </div>
                    <div
                        style="display: inline-block;margin-left: 100px;vertical-align:top;margin-top: 20px;">
                        <div v-for="(item,i) in base_data_tea.right" :key="i" style="overflow: hidden;">
                            <div style="width: 100px;display: inline-block;font-weight: bold;">
                                <p>{{item.ch}}</p>
                            </div>
                            <p style="display: inline-block;margin-bottom: 5px;">
                                {{user_info[item.en] || '暂缺'}}</p>
                        </div>
                    </div>
                </div>
                
                <div style="float: right;display: inline-block;margin-right: 30px;">
                    <el-button type="primary" style="display: inline-block;width: 120px;" @click="openChangeUser()" v-if="ifModify">修改
                    </el-button>
                    <el-button type="primary" style="display: inline-block;width: 120px;" @click="downloadPdf()" v-if="( Number(n)!==2 && Number(n)!==1)&&(Number(user_id) === Number($store.getters.user_id) ||$store.getters.roles === 'admin')">导出PDF
                    </el-button>
                </div>
            </el-card>
            <el-card label="成果详情" class="box-card" style="margin-top: 20px;min-width: 700px;width: 100%;">

                <el-tabs type="border-card" v-model="selected_achieve_type" @tab-click="get_achievement" style="margin-top: 10px;">
                   <!--  <div v-for="item in table_type"> -->

                    
                    <el-tab-pane :label="item.ch" v-for="(item,i) in table_type" :key="i" :lazy="true"  :name="item.ch" style="margin-bottom: 30px;">
                <el-table :data="info" style="width: 100%;min-width: 600px;">
                    <el-table-column prop="achieve_type" width="150" show-overflow-tooltip label="成果物类型" align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_name" show-overflow-tooltip label="作品名称" align="center">
                        <template slot-scope="scope">
                            <span @click="checkDetails(scope.row)"
                                style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="work_type" width="150" show-overflow-tooltip label="作品类型" align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_year" width="150" show-overflow-tooltip label="年份" align="center">
                    </el-table-column>
                    <el-table-column prop="realName" width="150" show-overflow-tooltip label="第一作者" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="150" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <el-button @click="checkDetails(scope.row)" type="text" size="small">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination style="margin-top: 60px;" @size-change="selected.size = $event,get_achievement()"
                        @current-change="get_achievement" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
                        :page-size.sync="selected.size" layout="total, sizes, prev, pager, next, jumper"
                        :total.sync="size_total">
                    </el-pagination>
                </div>
            

            </el-tab-pane>
        <!-- </div> -->
        </el-tabs>

                <!-- <div>
                    <el-pagination style="margin-top: 60px;" @size-change="selected.size = $event,get_achievement()"
                        @current-change="get_achievement" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
                        :page-size.sync="selected.size" layout="total, sizes, prev, pager, next, jumper"
                        :total.sync="size_total">
                    </el-pagination>
                </div> -->
            </el-card>
        </div>

        <el-dialog title="修改学生身份信息" :visible.sync="visible_stu" width="600px" @close="cleanAll">
            <el-form :model="form_stu" label-width="150px">
                <el-form-item label="学号">
                    <el-input v-model="form_stu.stid" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form_stu.realName" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="form_stu.sex" label="男">男</el-radio>
                    <el-radio v-model="form_stu.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="专业">
                    <!-- 当选项改变，会对班级下拉框做一个筛选 -->
                    <el-radio v-model="form_stu.major" :label="item.name" v-for="(item,i) in options_major" :key="i"
                        @change="getClass">{{item.name}}</el-radio>
                </el-form-item>
                <el-form-item label="学生类型">
                    <el-radio v-model="form_stu.education" label="本科">本科</el-radio>
                    <el-radio v-model="form_stu.education" label="硕士">硕士</el-radio>
                    <el-radio v-model="form_stu.education" label="博士">博士</el-radio>
                </el-form-item>
                <el-form-item label="班级">
                    <!-- 当没有选专业，下拉框为总数据，选完专业后显示筛选过的数据 -->
                    <el-select v-model="form_stu.stu_class" placeholder="选择班级" style="width: 150px;">
                        <el-option v-for="item in options_class" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="form_stu.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="入学年份">
                    <el-date-picker v-model="form_stu.enter_year" type="year" placeholder="选择年" value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form_stu.phone" autocomplete="off" style="width: 200px;" @change="checkPhone">
                    </el-input>
                    <p style="float: right;margin-right: 230px;color: #DD6161;" v-if="!phone_right">手机号码格式不正确</p>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form_stu.email" autocomplete="off" style="width: 200px;" @change="checkEmail">
                    </el-input>
                    <p style="float: right;margin-right: 230px;color: #DD6161;" v-if="!email_right">邮箱地址格式不正确</p>
                </el-form-item>
                <el-form-item label="一寸照" :v-if="user_info.picture">
                    <img :src="user_info.picture" alt="" style="width: 100px;height: 140px;">
                </el-form-item>
                <el-form-item label="一寸照上传">
                    <el-upload class="avatar-uploader" :limit="1" ref='upload' action="#" :on-change="onChange"
                        :auto-upload="false" list-type="picture">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changeStudent()">确 定</el-button>
                <!-- info作为表格数据源同步到表格改动 -->
                <el-button @click="visible_stu = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改教师身份信息" :visible.sync="visible_tea" width="600px" @close="cleanAll">
            <el-form :model="form_tea" label-width="150px">
                <el-form-item label="工号">
                    <el-input v-model="form_tea.stid" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form_tea.realName" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="form_tea.sex" label="男">男</el-radio>
                    <el-radio v-model="form_tea.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="所属院系">
                    <el-select @change="set_value" v-model="form_tea.department" placeholder="选择所属院系"
                        style="width: 150px;">
                        <el-option v-for="item in options_department" :key="item.id" :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职称">
                    <el-radio v-model="form_tea.ranks" label="助教">助教</el-radio>
                    <el-radio v-model="form_tea.ranks" label="讲师">讲师</el-radio>
                    <el-radio v-model="form_tea.ranks" label="副教授">副教授</el-radio>
                    <el-radio v-model="form_tea.ranks" label="教授">教授</el-radio>
                </el-form-item>
                <el-form-item label="学历学位">
                    <el-radio v-model="form_tea.degree" label="本科">本科</el-radio>
                    <el-radio v-model="form_tea.degree" label="硕士">硕士</el-radio>
                    <el-radio v-model="form_tea.degree" label="博士">博士</el-radio>
                </el-form-item>
                <el-form-item label="学位专业">
                    <el-input v-model="form_tea.major" autocomplete="off" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker v-model="form_tea.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="入职年份">
                    <el-date-picker v-model="form_tea.entry_year" type="year" placeholder="选择年" value-format="yyyy">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form_tea.phone" autocomplete="off" style="width: 200px;" @change="checkPhone">
                    </el-input>
                    <p style="float: right;margin-right: 40px;color: #DD6161;" v-if="!phone_right">手机号码格式不正确</p>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form_tea.email" autocomplete="off" style="width: 200px;" @change="checkEmail">
                    </el-input>
                    <p style="float: right;margin-right: 40px;color: #DD6161;" v-if="!email_right">邮箱地址格式不正确</p>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible_tea = false">取 消</el-button>
                <el-button type="primary" @click="changeTeacher()">确 定</el-button>
                <!-- info作为表格数据源同步到表格改动 -->
            </div>
        </el-dialog>


        <!-- <div style="margin-top: 30px;margin-left: 60px;">
            <el-button type="primary" style="display: inline-block;width: 120px;" @click="openChangeUser()">修改
            </el-button>
        </div> -->


    </div>
</template>

<script>
    const _ = require('lodash');
    import Vue from 'vue';
    export default {
        data() {
            return {
                info: [],
                table_type:[
                    {ch:"竞赛",en:"competition"},
                    {ch:"项目",en:"project"},
                    {ch:"论文",en:"paper"},
                    {ch:"荣誉",en:"honor"},
                    {ch:"知识产权",en:"patent"},
                ],
                user_info: {},
                user_id: this.$route.query.user_id,
                role: this.$route.query.role,
                ifModify:this.$route.query.modify,//是否可以修改个人信息
                n:this.$route.query.n, //本院还是外院
                visible_delete: false,
                visible_stu: false,
                visible_tea: false,
                form_stu: {},
                form_tea: {},
                options_class: [],
                options_major: [],
                options_department: [],
                type_selected: '', //选择的词条,附加在获取信息上做到条件搜索
                value_selected: '', //在下拉框的值确定到该变量上，便于搜索
                imageUrl: '', //存放图片地址
                formData: null, //存放图片的formdata
                phone_right: true, //检测手机号码格式,默认正确
                email_right: true, //检测邮箱格式，默认正确
                select: { //下拉框选择的值
                    rank_selected: '', //选择职称
                    name_selected: '', //输入姓名
                    stid_selected: '', //输入工号
                    department_selected: '', //选择所属院系
                    entry_year_selected: '' //入职年份
                },
                selected: {//多条件查询存放选项
                    size: 30,
                    start: 1,
                    achieve_type: [],
                    achieve_year: [],
                    user_id: [{originId: Number(this.$route.query.user_id), identity: 0}],
                },
                selected_achieve_type:"竞赛",
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
                base_data_stu: {
                    left: [
                        {
                            ch: "学号",
                            en: "stid"
                        }, {
                            ch: "专业",
                            en: "major"
                        }, {
                            ch: "出生日期",
                            en: "birth"
                        }],
                    right: [{
                        ch: "学生类型",
                        en: "education"
                    }, {
                        ch: "班级",
                        en: "stu_class"
                    }, {
                        ch: "手机号",
                        en: "phone"
                    }]
                },
                base_data_tea: {
                    left: [
                        {
                            ch: "工号",
                            en: "stid"
                        }, {
                            ch: "所属院系",
                            en: "department"
                        }, {
                            ch: "入职年份",
                            en: "entry_year"
                        }],
                    right: [{
                        ch: "职称",
                        en: "ranks"
                    }, {
                        ch: "邮箱",
                        en: "email"
                    }, {
                        ch: "手机号",
                        en: "phone"
                    }]
                },
            }
        },
        methods: {
            check() {
                this.$forceUpdate()
                console.log(this.form_competition.workType)
            },
            goNext() {
                this.$router.push({
                    path: "achieve_details/modify_achieve",
                    query: {
                        achieve_id: this.achieve_id,
                        type: this.achieve_type
                    }
                });
            },

            async get_user_info() {
                if(!this.n){
                    this.n = 0;
                }
                console.log(this.n);
                if (this.role === "stu") {
                    this.user_info = await this.$api_user.get_stu_by_id(this.n,this.user_id);
                    this.getClass();
                    this.getMajor();
                } else {
                    this.user_info = await this.$api_user.get_tea_by_id(this.n,this.user_id);
                    this.getCollege();
                }
                if (!this.user_info.picture) {
                    this.user_info.picture = require("../../static/timg.jpg")
                }
            },
            async get_achievement() {
                let arr = [];
                arr.push(this.selected_achieve_type);
                this.selected.achieve_type = arr;
                if(!this.n){
                    this.n = 0;
                }
                this.selected.start = this.current_page;
                this.selected.user_id[0].identity = Number(this.n);
                let res = (await this.$api_query.user_search_other_achievement(this.selected));
                this.info = res.list
                this.pages_total = res.pages;
                this.size_total = res.total;
            },
            getClass() { //根据下拉选项获取班级信息
                this.axios.get('/opt/class/classes?major=' + this.user_info.major, {

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

            checkDetails(row) {
                this.$router.push({
                    path: '/achievements/achieve_details',
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type
                    }
                })
            },


            cleanAll() { //在对话框关闭时清除所有数据
                /* Object.keys(this.form).forEach(res => {
                    this.form[res] = ''
                })
                this.imageUrl = null; //上传图片的预览地址清空
                this.$refs.upload.clearFiles();
                this.getData() */
            },
            clean_stu_doc() { //批量上传之后清除缓存的文件
                this.$refs.upload_stu.clearFiles();
            },

            openChangeUser() { //打开修改用户信息对话框
                if (this.role === "stu") {
                    this.form_stu = this.$_.cloneDeep(this.user_info);
                    this.form_stu.enter_year = this.form_stu.enter_year.toString();
                    this.visible_stu = true //将修改的对话框打开
                } else {
                    this.form_tea = this.$_.cloneDeep(this.user_info);
                    this.form_tea.entry_year = this.form_tea.entry_year.toString();
                    this.visible_tea = true //将修改的对话框打开
                }

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
            onChange(file, fileList) { //修改学生信息——上传照片
                this.formData = new FormData()
                this.formData.append('file', file.raw)
            },
            changeStudent(rows) { //修改学生信息
                let ready_to_post = true
                Object.keys(this.form_stu).forEach(res => {
                    if ((this.form_stu[res] == '' || this.form_stu[res] == null) && res != 'index') {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post && this.phone_right && this.email_right) {
                    this.axios.put('/user/stu/info',
                        this.form_stu)
                        .then(response => {
                            if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                                console.log(2000)
                                this.add_img();
                                this.visible_stu = false;
                            } else {
                                this.visible_stu = false;
                                this.$message.error('修改失败！');
                            }
                        })
                        .catch(response => { });
                } else {
                    this.$message.error('表单填写有误');
                }
            },
            changeTeacher(rows) { //修改教师信息
                let ready_to_post = true
                Object.keys(this.form_tea).forEach(res => {
                    // if(this.form_tea[res] == '' || this.form_tea[res] == null){ 暂时没有完成添加图片功能，所以先不做null的检测
                    if ((this.form_tea[res] == '' || this.form_tea[res] == null) && res != 'index') {
                        ready_to_post = false
                        console.log(res)
                    }
                })
                if (ready_to_post && this.phone_right && this.email_right) {
                    this.axios.put('/user/teacher/info', this.form_tea)
                        .then(response => {
                            if (response.data.code == 2000) { //先将改动同步更新到视图中，再关闭对话框，关闭会触发清除数据函数
                                this.get_user_info();
                                this.visible_tea = false;
                            } else {
                                this.visible_tea = false;
                                this.$message.error('修改失败！');
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

            add_img() { //修改学生信息成功后上传头像
                this.axios.post('/user/picture?user_id=' + this.form_stu.user_id,
                    this.formData, {
                    headers: {
                        'Token': this.Token
                    },
                }).then(response => {
                    this.get_user_info();
                    this.formData = null;
                })
            },
            async downloadPdf(){
                let res = await this.$api_achievement.user_download_pdf(this.user_id);
                if(res.data.code===2000){
                    window.open(res.data.data);
                }else{
                    this.$message.warning("下载pdf失败！");
                }
            },

        },
        created() {
            this.get_user_info();
            this.get_achievement();
            /* this.getMajor();
            this.getClass(); */
        },
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 90%;
    }

    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    /deep/.avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>