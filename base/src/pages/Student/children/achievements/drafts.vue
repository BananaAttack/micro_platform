<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
            <div class="head" style="margin-bottom: 20px;">
                <el-button type="primary" icon="el-icon-edit"
                    style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
                    @click="$router.push('/update/add')">添加成果物
                </el-button>
            </div>
            <div class="table">
                <el-table ref="info_export" :data="info" stripe tooltip-effect="dark" size="small" row-key="achieve_id"
                    style="width: 100%; margin-top: 30px;cursor:pointer" border @row-click="checkDetails" >
                    <el-table-column prop="achieve_type" label="成果物类型" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_name" label="作品名称" :formatter="if_null" show-overflow-tooltip align="center">
                        <!-- <template slot-scope="scope">
                            <span @click="checkDetails(scope.row)"
                                style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="work_type" label="作品类型" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_year" label="年份" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <!-- <el-table-column prop="realName" label="第一作者" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="team_order" label="队内名次" show-overflow-tooltip align="center"></el-table-column> -->
                    <el-table-column label="操作" align="center"  width="200">
                        <template slot-scope="scope">
                            <!-- <router-link :to="{ name: 'achievements_competition_details', params: { id: scope.row.achieve_id } }">查看详情</router-link> -->
                            <el-button @click.stop="checkDetails(scope.row)" type="text" size="mini">查看详情</el-button>
                            <el-button @click.stop="post(scope.row.achieve_id)" type="text" size="mini" style="color:darkslategray">提交审核</el-button>
                            <el-button @click.stop="open_delete(scope.row.achieve_id)" type="text" size="mini"
                                style="color:crimson">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
            <div>
                <el-pagination style="margin-top: 60px;" @size-change="size_total = $event,get_info()"
                    @current-change="get_info" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
                    :page-size.sync="size_total" layout="total, sizes, prev, pager, next, jumper"
                    :total.sync="size_total">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible_delete = false">取 消</el-button>
                <el-button type="primary" @click="delete_choosed">确 定</el-button>
            </span>
        </el-dialog>
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
                visible_delete:false
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
                let res = await this.$api_query.user_search_achievement_checking(this.user_id, this.size_total, this.current_page);
                this.info = res.list;
                this.pages_total = res.pages;
                this.size_total = res.total;
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
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },
            checkDetails(row) {
                this.$router.push({
                    path: "/update/achieve",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type,
                        id: this.user_id
                    }
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
                        if (response.data.code == 2000) {
                            this.$message.success("操作成功");
                            this.get_info();
                        } else {
                            this.$message.error("操作失败");
                        }
                        this.visible_delete = false;
                    })
                    .catch(function (response) {
                    });
            },
        },
        created() {
            this.get_info();
        },
    };
</script>

<style scoped lang="scss">
</style>