<template>
    <div>
        <div class="card" v-for="(item,i) in info" :key="i" style="margin-left: 30px;margin-top: 30px;display: inline-block;">
        <el-card class="box-card" style="width: 430px;" shadow="hover">
            <div class="ribbon">
                <p style="text-align: center;color: darkred;">{{item.achieve_type}}</p>
            </div>
            <div slot="header" class="clearfix">
                <p style="width: 300px;height: 50px;display: inline-block;">{{item.achieve_name}}</p>
                <el-button style="float: right; padding: 3px 0;display: inline-block;" type="text" :disabled="item.status == 1 || item.status == 3" @click="open_delete(item.achieve_id)">删除</el-button>
                <el-button style="float: right; padding: 3px 0;display: inline-block;" type="text"  :disabled="item.status == 1 || item.status == 3" @click="checkDetails(item.achieve_id,item.achieve_type)">编辑/</el-button>
            </div>
            <div style=" margin-bottom: 18px;">
                <div>
                    <p style="font-weight: bold;font-size: 14px; display: inline-block;">状态:</p>
                    <p style="font-size: 14px; display: inline-block;">{{item.stayts_name}}</p>
                </div>
                <div>
                <p style="font-weight: bold;font-size: 14px; display: inline-block;">作品类型:</p>
                <p style="font-size: 14px; display: inline-block;">{{item.work_type}}</p>
                </div>
                <p style="font-weight: bold;font-size: 14px; display: inline-block;">简介:</p>
                <p style="display: inline-block;display: -webkit-box;font-size: 14px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;height: 40px;">{{item.achieve_summary}}</p>
                <el-button :type="item.btn_type" style="margin-top: 10px;margin-left: 150px;" @click="post(item.achieve_id)" :disabled="item.now == '审核中'">{{item.now}}</el-button>
            </div>
            <div></div>
        </el-card>
        </div>
        <el-card class="box-card" v-if="show" style="width: 430px;height: 315px;;background-color:#F0F0F0;display: inline-block;margin-left: 30px;margin-top: 30px;" shadow="hover">
        <i class="el-icon-circle-plus-outline" @click="$router.push('add')" style="font-size: 80px;opacity: 0.3;margin-left: 150px;margin-top: 100px;"></i>
        </el-card>
        <el-pagination background layout="prev, pager, next" :page-count="pages_total" :current-page.sync="current_page"
            @current-change="getData" style="margin-top: 60px; margin-left: 35%">
        </el-pagination>
        <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible_delete = false">取 消</el-button>
                <el-button type="primary" @click="delete_choosed">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:"stuUpdateIndex",
        data() {
            return {
                user_id: this.$store.getters.user_id,
                info:[],
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                visible_delete:false,
                delete_id:'',
                if_end:false,
                show:false
        }
    },
        methods: {
           getData() {
                //按条件查询
                //当且仅当目前页面6个成果物排满且为最后一页，新增一页，只有一个新增按钮
                    this.info = [];
                    if(this.if_end && this.current_page != this.pages_total){
                        this.if_end = false;
                    }
                    if(!this.if_end){
                this.axios
                    .get("/query/user/nopass/achievement?user_id="+ this.user_id+"&size=6"+"&start="+this.current_page, {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.info = response.data.data.list;
                        Object.keys(this.info).forEach(res =>{
                            if(this.info[res].status == 0){
                                this.info[res].now = "提交审核";
                                this.info[res].btn_type="primary";
                                this.info[res].stayts_name = "未提交";
                            }else if (this.info[res].status == 1 || this.info[res].status == 3 ) {
                                this.info[res].now = "审核中"
                                this.info[res].btn_type = "info"
                                this.info[res].stayts_name = "审核中";
                            } else if (this.info[res].status == 2) {
                                this.info[res].stayts_name = "审核未通过";
                                this.info[res].now = "提交审核";
                                this.info[res].btn_type = "primary";
                            }
                        })
                        this.pages_total = response.data.data.pages;
                        if(this.info.length == 6 && this.current_page == this.pages_total){
                            this.pages_total++;
                            this.if_end = true;
                            this.show = false;
                        }else if(this.info.length == 6 && this.current_page != this.pages_total){
                            this.if_end = false;
                            this.show = false;
                        }else if(this.info.length != 6){
                            this.if_end = false;
                            this.show = true;
                        }
                        /* else if(this.info.length != 6){
                            this.if_end = true;
                        } */
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
                }else{
                    this.show = true;
                }
            },
            open_delete(id){
                this.visible_delete = true;
                this.delete_id = id;
            },
            delete_choosed(){
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
                    .put("/achievement/admin/notice?achieve_id=" + id,{}, {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        if(response.data.code == 2000){
                            this.$message.success("操作成功");
                        }else {
                            this.$message.error("操作失败");
                        }
                        this.getData();
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            checkDetails(id,type) {
                //查看详情
                if (type == '竞赛') {
                    type = 'competition';
                } else if (type == '项目') {
                    type = 'projects';
                } else if (type == '论文') {
                    type = 'paper';
                } else if (type == '知识产权') {
                    type = 'patent';
                }
                this.$router.push({
                    path: "achieve",
                    query: {
                        achieve_id: id,
                        type: type,
                        id:this.user_id
                    }
                });
            },
        },
        created() {
            this.getData();
        },
    };
</script>

<style scoped lang="scss">
    .ribbon{
        width: 70px;
        height: 20px;
        background-color:darkgrey;
        position: relative;
        top: -100px;
        left: -40px;
        -webkit-transform: rotate(-50deg);
        -moz-transform: rotate(-50deg);
    }
    .el-card__body {
        padding-bottom: 0px;
    }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>