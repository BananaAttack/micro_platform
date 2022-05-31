<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
            <div style="background-color: white;">
                <p
                    style="font-size: 23px;font-family: arial;display: inline-block;margin-left: 30px;margin-bottom: 0px;margin-top: 10px;">
                    收到请求（{{mail.length}}）</p>
            </div>
            <el-divider></el-divider>
            <div class="table">
                <el-table :data="mail" tooltip-effect="dark" style="width: 100%;cursor:pointer" @row-click="checkDetails" >
                    <el-table-column prop="user_name" label="第一作者" :formatter="if_null" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="作品名称" prop="achieve_name"  :formatter="if_null" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="achieve_type" label="成果物类型"  :formatter="if_null" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column prop="work_type" label="成果物平台" align="center">
                </el-table-column> -->
                    <el-table-column prop="now" label="状态" :formatter="if_null" align="center" show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column label="操作" align="center"  width="120">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="checkDetails(scope.row)">处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
            <div>
                <el-pagination background layout="prev, pager, next" :page-count="pages_total"
                    :current-page.sync="current_page" @current-change="getData" style="margin-top: 60px;">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "adminMailbox",
        data() {
            return {
                info: {
                    name: '王小明'
                },
                mail: [],
                pages_total: 1,
                current_page: 1
            }
        },
        methods: {
            goBack() {
                this.$router.push('/');
                /* this.Token = '';
                this.user_id = '';
                this.role = ''; */
            },
            getData() {
                this.axios
                    .get("/query/adm/achievement", {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.mail = response.data.data.list;
                        Object.keys(this.mail).forEach(res => {
                            if (this.mail[res].status == 3) {
                                this.mail[res].now = "修改申请";
                            } else {
                                this.mail[res].now = "成果物审批";
                            }
                        })
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
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
                    path: "/mailbox/mailbox_details",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type,
                        status: row.status
                    }
                });
            },
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<style>
</style>