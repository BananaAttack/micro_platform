<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
            <div class="table">
                <el-table ref="info_export" :data="info" tooltip-effect="dark" size="small" row-key="achieve_id"
                    style="width: 100%; margin-top: 30px;cursor:pointer" border @row-click="checkDetails">
                    <el-table-column prop="achieve_type" label="成果物类型" :formatter="if_null" show-overflow-tooltip  align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_name" label="作品名称" :formatter="if_null" show-overflow-tooltip align="center">
                        <!-- <template slot-scope="scope">
                            <span @click="checkDetails(scope.row.achieve_type)"
                                style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="work_type" label="作品类型" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_year" label="年份" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="stayts_name" label="状态" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <!-- <el-table-column prop="realName" label="第一负责人" show-overflow-tooltip align="center"></el-table-column> -->
                    <!-- <el-table-column prop="team_order" label="队内名次" show-overflow-tooltip width="100" align="center"></el-table-column> -->
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <!-- <router-link :to="{ name: 'achievements_competition_details', params: { id: scope.row.achieve_id } }">查看详情</router-link> -->
                            <!-- <el-button @click.stop="checkDetails(scope.row)" type="text" v-if="scope.row.stayts_name !== '审核中'"
                                size="mini">修改</el-button> -->
                                <el-button @click.stop="checkDetails(scope.row)" type="text"
                                size="mini">查看详情</el-button>
                            <!-- <el-button @click.stop="post(scope.row.achieve_id)" :disabled="scope.row.stayts_name == '审核中'"
                                type="text" size="mini" style="color:darkslategray">{{scope.row.now}}</el-button> -->
                            <el-button @click.stop="open_delete(scope.row.achieve_id)" type="text" size="mini"
                                style="color:crimson">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-pagination style="margin-top: 60px;" stripe @size-change="size_total = $event,get_info()"
                    @current-change="get_info" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
                    :page-size.sync="size_total" layout="total, sizes, prev, pager, next, jumper"
                    :total.sync="size_total">
                </el-pagination>
            </div>
            <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible_delete = false">取 消</el-button>
                    <el-button type="primary" @click="delete_choosed">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions } from 'vuex'
    const _ = require('lodash');
    export default {
        name: "stuSummary",
        data() {
            return {
                info: [], //获取到的表格数据
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 30, //表格当前条目数
                user_id: this.$store.getters.user_id, //用户id
                visible_delete: false,
                delete_id: '',
                if_end: false,
                show: false
            }
        },
        //路由守卫，在跳往详情页时缓存页面
        beforeRouteLeave(to, form, next) {
            console.log(to.path)
            if (to.path == '/achievements/achieve_details') {
                this.addRoute('stuSummary');
            } else {
                this.removeAllRoute();
            }
            next()
        },
        methods: {
            //将vuex中的函数放出来,便于直接使用
            ...mapActions(['addRoute', 'removeAllRoute', 'removeRoute']),
            async get_info() {
                let res = await this.$api_query.user_search_achievement_nopass(this.user_id, this.size_total, this.current_page);
                this.info = res.list;
                this.pages_total = res.pages;
                this.size_total = res.total;
                Object.keys(this.info).forEach(res => {
                    if (this.info[res].status == 0) {
                        this.info[res].now = "提交审核";
                        this.info[res].btn_type = "primary";
                        this.info[res].stayts_name = "未提交";
                        console.log("yes1");
                    } else if (this.info[res].status == 1 || this.info[res].status == 3) {
                        this.info[res].now = "审核中"
                        this.info[res].btn_type = "info"
                        this.info[res].stayts_name = "审核中";
                        console.log("yes2");
                    } else if (this.info[res].status == 2) {
                        this.info[res].stayts_name = "审核未通过";
                        this.info[res].now = "提交审核";
                        this.info[res].btn_type = "primary";
                        console.log("yes3");
                    }
                })
                /* if (this.info) {
                    Object.keys(this.info).forEach(res => {
                        this.info[res].writer = this.info[res].students[0].realName;
                    })
                } */
            },
            async get_student() { //搜索学生
                if (this.options.name != '') {
                    let members_id = [];
                    let res = await this.$api_user.get_user_by_name(this.options.name);
                    Object.keys(res).forEach(res_2 => {
                        members_id.push(res[res_2]);
                    })
                    this.selected.user_id = members_id;
                    this.get_info();
                } else {
                    this.selected.user_id = [];
                    this.get_info();
                }
            },
            checkDetails(row) {
                this.$router.push({
                    path: "/stu_mailbox/mailbox_details",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type,
                        status:row.status
                    }
                });
               /* if(row.stayts_name !== '审核中'){
                if(row.status !== 3 && row.status !== 1 ){
                    this.$router.push({
                    path: "/update/achieve",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type,
                        id: this.user_id
                    }
                });
                }else{
                    this.$message.warning("审核中成果物无法修改");
                }
            }else{
                this.$router.push({
                    path: "/stu_mailbox/mailbox_details",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type
                    }
                });
            } */
                
            },
            open_delete(id) {
                this.visible_delete = true;
                this.delete_id = id;
            },
            delete_choosed() {
                this.axios
                    .delete("/achievement/new?achieve_id=" + this.delete_id, {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.getData();
                        this.visible_delete = false;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            post(id) {
                this.axios
                    .put("/achievement/admin/notice?achieve_id=" + id, {}, {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        if (response.data.code == 2000) {
                            this.$message.success("操作成功");
                            this.get_info();
                        } else {
                            this.$message.error("操作失败");
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },
        },
        created() {
            this.get_info();
        },
    };
</script>

<style scoped lang="scss">
</style>