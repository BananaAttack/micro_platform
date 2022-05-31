<template>
    <div>
        <div style="margin-top: 10px;background-color: white;">
            <p style="font-size: 30px;display: inline-block;margin-left: 30px;">收到邮件（{{mail.length}}）</p>
        </div>
        <el-divider></el-divider>
        <div class="table">
            <el-table :data="mail" tooltip-effect="dark"
                style="width: 95%;margin-top: 30px;margin-left: 2.5%;">
                <el-table-column prop="user_name" label="第一作者" align="center">
                </el-table-column>
                <el-table-column label="作品名称" prop="achieve_name" width="350" align="center">
                </el-table-column>
                <el-table-column prop="achieve_type" label="成果物类型" width="250" align="center">
                </el-table-column>
                <!-- <el-table-column prop="work_type" label="成果物平台" align="center">
                </el-table-column> -->
                <el-table-column prop="now" label="状态" align="center">
                </el-table-column>
                
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="checkDetails(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="confirmDetails(scope.row)">确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :page-count="pages_total" :current-page.sync="current_page"
                @current-change="getData" style="margin-top: 60px;margin-left: 35%;">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name:"stuMailbox",
        data() {
            return {
                user_id: this.$store.getters.user_id,
                info:{
                    name:'王小明'
                },
                mail:[],
                pages_total:1,
                current_page:1
            }
        },
        methods: {
           goBack() {
                this.$router.push('/');
                /* this.Token = '';
                this.user_id = '';
                this.role = ''; */
            },
            getData(){
                this.axios
                    .get("/query/stu/achievement?user_id="+this.user_id+"&size=10&start="+this.current_page, {
                    })
                    .then((response) => {
                        this.mail = response.data.data.list;
                        Object.keys(this.mail).forEach(res =>{
                            if(this.mail[res].status == 3){
                                this.mail[res].now = "修改申请";
                            }else{
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
                this.$router.push({
                    path: "/stu_mailbox/mailbox_details",
                    query: {
                        achieve_id: row.achieve_id,
                        type: row.achieve_type,
                        status:row.status
                    }
                });
            },
            confirmDetails(row) {
                //确认详情
                this.axios
                    .put("/confirm/achieve?user_id=" + this.user_id + "&achieve_id=" + row.achieve_id,{}, {
                    })
                    .then((response) => {
                        this.getData();
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<style>
</style>