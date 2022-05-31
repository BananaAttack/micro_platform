<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
        <el-collapse accordion style="margin-top: 20px;">
            <el-collapse-item style="padding-bottom: 0px;">
                <template slot="title">
                    <p style="font-family: sans-serif;font-size: 1.1em;color: #8C939D;">多条件搜索</p>
                    <i class="el-icon-arrow-down " style="margin-left:10px"></i>
                </template>
                <el-divider></el-divider>
                <div class="choose achieve_list"
                    style="margin-top: -5px;margin-bottom: -25px;padding-top: 20px;padding-bottom: 20px;">
                    <div class="row_1">
                        <div style="overflow: hidden; display: inline;margin-left: 43px;margin-top: 10px;">
                            <p style="display: inline;font-family: helvetica;color: #6B7F91;">成果物类型</p>
                            <el-checkbox
                                style="display: inline;margin-left: 30px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;"
                                :indeterminate="isInd.achieve_type" v-model="checkAll.achieve_type"
                                @change="HandleCheckAll($event,'achieve_type')">全选</el-checkbox>
                            <el-checkbox-group v-model="selected.achieve_type" style="display: inline-block;"
                                @change="HandleChecked($event,'achieve_type')" v-for="(item,i) in options.achieve_type"
                                :key="i">
                                <el-checkbox :label="item"
                                    style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                                    {{item}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>

                    <div class="row_3" style="margin-top: 10px; margin-left: 82px">
                        <div style="overflow: hidden; display: inline">
                            <p style="display: inline;font-family: helvetica;color: #6B7F91;">年份</p>
                            <el-checkbox
                                style="display: inline;margin-left: 30px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;"
                                :indeterminate="isInd.year" v-model="checkAll.year" @change="HandleCheckAll_year">全选
                            </el-checkbox>
                            <el-checkbox-group v-model="achieve_year" style="display: inline-block;"
                                @change="HandleChecked_year" v-for="(key,val) in options.year" :key="key">
                                <el-checkbox :label="key"
                                    style="margin-left: 0px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                                    {{key}}</el-checkbox>
                            </el-checkbox-group>
                            <el-input size="mini" v-model="achieve_year_input" placeholder="请输入年份"
                                oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @keyup.enter.native="set_years"
                                @blur="set_years" maxlength="4" style="display: inline-block;width: 120px;"> </el-input>
                        </div>
                    </div>
                    <div class="row_6" style="margin-top: 10px; margin-left: 82px">
                        <div style="overflow: hidden; display: inline">
                            <p style="display: inline;font-family: helvetica;color: #6B7F91;">姓名</p>
                            <!-- <el-checkbox v-model="selected.user_id" label=""
                                @change="selected.user_id=[],options.name='',get_info()"
                                style="display: inline;margin-left: 30px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                                全选
                            </el-checkbox> -->
                        </div>
                        <div style="display: inline; margin-left: 40px">
                            <el-input v-model="options.name" placeholder="请输入姓名" @input="get_student"
                                @keyup.enter.native="get_student" onblur="get_info()" size="mini" style="width: 120px">
                            </el-input>
                        </div>
                    </div>
                    <div class="row_6" style="margin-top: 10px; margin-left: 70px">
                        <div style="overflow: hidden; display: inline">
                            <p style="display: inline;font-family: helvetica;color: #6B7F91;">作品名</p>
                            <!-- <el-checkbox v-model="selected.keyWord" label=""
                                @change="selected.keyWord='',options.keyWord='',get_info()"
                                style="display: inline;margin-left: 30px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                                全选
                            </el-checkbox> -->
                        </div>
                        <div style="display: inline; margin-left: 40px">
                            <el-input v-model="selected.keyWord" placeholder="请输入作品名" @input="get_info()"
                                @keyup.enter.native="get_info()" @blur="get_info()" size="mini" style="width: 120px">
                            </el-input>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>


        <div class="table">
            <el-table ref="info_export" :data="info" tooltip-effect="dark" stripe size="small" row-key="achieve_id"
                style="width: 100%; margin-top: 30px;min-width: 800px;cursor:pointer" border @row-click="checkDetails" >
                <el-table-column prop="achieve_type" label="成果物类型" :formatter="if_null" show-overflow-tooltip  align="center">
                </el-table-column>
                <el-table-column prop="achieve_name" label="作品名称" :formatter="if_null" show-overflow-tooltip  align="center">
                    <!-- <template slot-scope="scope">
                        <span @click="checkDetails(scope.row)"
                            style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="work_type" label="作品类型"  :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="achieve_year" label="年份" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="realName" label="第一作者" :formatter="if_null" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column label="操作" align="center"  width="180">
                    <template slot-scope="scope">
                        <el-button @click="checkDetails(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button class="delete" @click.stop="open_code_check(scope.row)" type="text" size="small" style="color: crimson;">彻底删除
                        </el-button>
                        <el-button @click.stop="recovery(scope.row.achieve_id)" type="text" size="small">恢复</el-button>
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

        <el-dialog title="确认删除" :visible.sync="visible_delete" width="400px" @close="cleanAll('code_check')">
            <el-form ref="code_check" :rules="rules" :model="code_check" label-width="80px">
                <el-form-item label="密码" prop="code">
                    <el-input v-model="code_check.code" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="check_code('code_check')">确 定</el-button>
                <!-- info作为表格数据源同步到表格改动 -->
                <el-button @click="visible_delete = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    //const定义选项，防止选项更改
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
    const options_achieve_type = ['竞赛', '项目', '荣誉', '论文','知识产权'];
    let year = get_year();
    const options_year = year;
    //调用原生js库lodash，以便进行深拷贝
    const _ = require('lodash');
    export default {
        name:"amdinRecycleBin",
        data() {
            return {
                options: {  //搜索栏选项
                    achieve_type: options_achieve_type,
                    year: options_year,
                    name: '',
                    keyWord: ''
                },
                selected: {//多条件查询存放选项
                    achieve_type: [],
                    achieve_year: [],
                    user_id: [],
                    keyWord: "",
                    size: 30,
                    start: '',
                    status: '-1'
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
                info_export: [], //要导出的条目
                achieve_year: [],//存放已选年份，由于年份接口设计问题与selected分离
                achieve_year_input: "",//存放用户输入的年份，输入完添加到achieve_year数组中
                info: [], //获取到的表格数据
                import_type: '0', //导入格式，默认为竞赛
                import_key: '竞赛', //导入按钮名字
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
                visible_delete: false, //"彻底删除"对话框状态
                code_check: {
                    code: "", //密码验证
                },
                rules: { //密码确认表单验证规则
                    code: [
                        { required: true, message: '请输入管理员密码', trigger: 'blur' }
                    ]
                },
                achieve_id_delete: "", //将要删除的成果物id
            }
        },
        methods: {
            //按条件查询
            async get_info() {
                //通过创建一个深拷贝数组，实现选项的键和值解耦，再排序便不会改变选项
                //将用户输入的年份压入年份搜索中
                let year_model = _.cloneDeep(this.achieve_year);
                if (this.achieve_year_input.length == 4) {
                    year_model.push(Number(this.achieve_year_input));
                    console.log(year_model);
                }
                year_model.sort();
                /* if (typeof (year_model[0]) === 'string') {
                    let year = await this.set_yaer_past();
                    Vue.set(this.selected, "achieve_year", year)
                } else {
                    Vue.set(this.selected, "achieve_year", year_model)
                } */
                Vue.set(this.selected, "achieve_year", year_model)
                console.log(year_model);
                this.selected.start = this.current_page;
                let res = await this.$api_query.admin_search_achieve(this.selected);
                this.info = res.list;
                this.pages_total = res.pages;
                this.size_total = res.total;
            },
            //根据学生搜索成果物
            async get_student() {
                if (this.options.name != '') {
                    let members_id = [];
                    let res = await this.$api_user.get_user_by_name(0, this.options.name);
                    Object.keys(res).forEach(res_2 => {
                        members_id.push(res[res_2].user_id);
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
            //多选控制
            HandleCheckAll(val, type) {
                let opt = [];
                Object.keys(this.options[type]).forEach(res => {
                    opt.push(this.options[type][res]);
                })
                this.selected[type] = val ? opt : [];
                console.log(this.selected[type]);
                this.isInd[type] = false;
                this.get_info();
            },
            HandleChecked(value, type) {
                let checkedCount = value.length;
                this.checkAll[type] = checkedCount === this.options[type].length;
                this.isInd[type] = checkedCount > 0 && checkedCount < this.options[type].length;
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
                console.log(this.achieve_year);
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

            open_code_check(data) {
                //打开确认删除对话框
                this.visible_delete = true;
                this.achieve_id_delete = data.achieve_id;
            },

            async check_code(formName) {
                //验证管理员密码
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.$api_login.check_code(this.$store.getters.user_id, this.code_check.code).then(res => {
                            if (res.code === 2000 && res.data) {
                                this.delete_fully();
                            } else if (res.code === 2000 && !res.data) {
                                this.$message.error('密码错误');
                            } else {
                                this.$message.error('连接出错');
                                this.visible_delete = false;
                            }
                        });
                    } else {
                        return false
                    }
                })
            },

            async delete_fully() {
                //彻底删除
                await this.$api_achievement.admin_delete_fully(this.achieve_id_delete).then(res => {
                    if (res.code == 2000) {
                        this.$message.success("彻底删除成功!");
                        this.visible_delete = false;
                        this.get_info();
                    } else {
                        this.$message.warning("彻底删除失败!");
                        this.visible_delete = false;
                    }
                });
            },

            async recovery(achieve_id) {
                //恢复数据
                await this.$api_achievement.admin_recovery_achieve(achieve_id).then(res => {
                    if (res.code == 2000) {
                        this.$message.success("恢复数据成功!");
                        this.get_info();
                    } else {
                        this.$message.warning("恢复数据失败!");
                        this.visible_delete = false;
                    }
                });
            },

            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },

            cleanAll(formName) {
                //关闭删除确认对话框 清除数据
                this.code_check.code = "";
                this.$refs[formName].resetFields();
            },

            checkDetails(row) {
                //查看详情
               /*  if (row.achieve_type == '竞赛') {
                    row.achieve_type = 'competition';
                } else if (row.achieve_type == '项目') {
                    row.achieve_type = 'projects';
                } else if (row.achieve_type == '论文') {
                    row.achieve_type = 'paper';
                } else if (row.achieve_type == '知识产权') {
                    row.achieve_type = 'patent';
                } */
                this.$router.push({
                    path: "/achievements/achieve_details",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type,
                        status: "recycle"
                    }
                });
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
        },
        created() {
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

    /deep/ .el-divider--horizontal {
        margin-top: 0px;
        margin-bottom: 5px;
    }

    /deep/ .delete .el-button--text !important {
        color: crimson;
    }
</style>