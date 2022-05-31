<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
        <div class="head" style="margin-bottom: 20px;">
            <el-button type="primary" icon="el-icon-upload2"
                style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
                @click="$router.push('add')">添加成果子集
            </el-button>
        </div>

        <div class="table">
            <el-table ref="info_export" :data="info" tooltip-effect="dark" stripe size="small" row-key="achieve_id"
                style="width: 100%; margin-top: 30px;min-width: 800px;cursor: pointer;" @row-click="checkDetails"
                @selection-change="info_export = $event" border>
                <!-- <el-table-column type="selection" align="center" reserve-selection>
                </el-table-column> -->
                <el-table-column prop="name" label="成果子集名称" :formatter="if_null" show-overflow-tooltip align="center" style="cursor: pointer;" >
                    <!-- <template slot-scope="scope">
                            <span @click="checkDetails(scope.row)"
                                style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.name}}</span>
                        </template> -->
                </el-table-column>
                <el-table-column prop="introduction" label="简介" :formatter="if_null" show-overflow-tooltip align="center">
                    <!-- <template slot-scope="scope">
                        <span @click="checkDetails(scope.row)"
                            style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.introduction}}</span>
                    </template> -->
                </el-table-column>
                 <el-table-column label="标签" :formatter="if_null" show-overflow-tooltip align="center">
                     <template slot-scope="scope">
                         <el-tag size="small" v-for="(item,key) in JSON.parse(scope.row.strListOfTagJsonStr)" :key="key">{{item}}</el-tag>
                     </template>
                </el-table-column>
                <!-- <el-table-column prop="work_type" label="添加时间" show-overflow-tooltip align="center">
                </el-table-column> -->
                <el-table-column label="包含" :formatter="if_null" show-overflow-tooltip width="250" align="center">
                    <template slot-scope="scope">
                        <!-- <span>{{scope.row.name}}</span> -->
                        <!-- <div style="display: inline;cursor: pointer;" @click="checkDetails(scope.row)"> -->
                        <span
                            v-if="scope.row.idListOfCompetitionJsonStr&&JSON.parse(scope.row.idListOfCompetitionJsonStr).length>0">竞赛{{JSON.parse(scope.row.idListOfCompetitionJsonStr).length}}</span>
                        <span
                            v-if="scope.row.idListOfProjectJsonStr&&JSON.parse(scope.row.idListOfProjectJsonStr).length>0">项目{{JSON.parse(scope.row.idListOfProjectJsonStr).length}}</span>
                        <span
                            v-if="scope.row.idListOfPaperJsonStr&&JSON.parse(scope.row.idListOfPaperJsonStr).length>0">论文{{JSON.parse(scope.row.idListOfPaperJsonStr).length}}</span>
                        <span
                            v-if="scope.row.idListOfHonorJsonStr&&JSON.parse(scope.row.idListOfHonorJsonStr).length>0">荣誉{{JSON.parse(scope.row.idListOfHonorJsonStr).length}}</span>
                        <span
                            v-if="scope.row.idListOfPatentJsonStr&&JSON.parse(scope.row.idListOfPatentJsonStr).length>0">知识产权{{JSON.parse(scope.row.idListOfPatentJsonStr).length}}</span>
                        <!-- </div> -->
                        </template>
                </el-table-column>
                <el-table-column label="操作" width="220px" align="center">
                    <template slot-scope="scope">
                        <el-button @click.stop='updateTag(scope.row)' type="text" size="small" >修改标签</el-button>
                        <el-button @click.stop="checkDetails(scope.row)" type="text" size="small">详情</el-button>
                        <el-button @click.stop="download(scope.row)" type="text" size="small">下载</el-button>
                        <el-button @click.stop="deltete_id=scope.row.id;visible_delete=true" type="text" style="color:crimson" size="small">删除</el-button>
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

        <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%">
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible_delete = false">取 消</el-button>
                <el-button type="primary" @click="delete_choosed()">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog :visible.sync="visible_update" title="修改标签" width="40%" height=40%>
             <el-tag
                 v-for="(tag,key) in update_tag"
                 :key="key"
                 closable
                @close="handleClose(tag)"
                    >
                 {{tag}}
             </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                >
                </el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+添加标签</el-button>

            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="update()">确认修改</el-button>
            </span>
        </el-dialog>
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'adminSubset',
        data() {
            return {
                selected_row:'',
                inputVisible:false,
                inputValue:'',
                visible_update:false,
                update_tag:[],//标签修改
                info: [], //获取到的表格数据
                selected: {//多条件查询存放选项
                    size: 30,
                    start: '',
                },
                visible_delete: false,
                deltete_id:null,
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
            }
        },
        methods: {
             handleInputConfirm() {
             let inputValue = this.inputValue;
                  if (inputValue) {
          this.update_tag.push(inputValue);
              }
                 this.inputVisible = false;
                  this.inputValue = '';

    },
            showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
             this.$refs.saveTagInput.$refs.input.focus();
            });
         },
             handleClose(tag) {
               this.update_tag.splice(this.update_tag.indexOf(tag), 1)
            },
             update(){
                this.visible_update=false
                this.axios.post("http://124.222.44.159:8080/query/subcollection/updateTag?id="+this.selected_row+"&tagList="+this.update_tag,{},{
                    headers:{
                        Token: window.sessionStorage.getItem('Token')
                    }
                }).then(res=>{
                    if(res.data.code===2000){
                        this.$message("修改成功")
                        this.get_info()
                    }else{
                        this.$message("修改失败")
                        console.log(res.data)
                    }
                })

            },
            updateTag(row){
                this.visible_update=true
                this.update_tag=JSON.parse(row.strListOfTagJsonStr)
                console.log(this.update_tag)
                this.selected_row=row.id


            },
            async get_info() {
                this.selected.start = this.current_page;
                let res = await this.$api_achievement.admin_search_achieve_subset(this.selected);
                this.info = res.list;
                this.pages_total = res.pages;
                this.size_total = res.total;
                console.log(this.info)
            },
            checkDetails(row) {
                this.$router.push({
                    path: "details",
                    query: {
                        id: row.id,
                    }
                });
            },
            delete_choosed() {
                this.$api_achievement.admin_delete_achieve_subset(this.deltete_id).then(res=>{
                    if(res.data.code === 2000){
                        this.$message.success("删除成功!");
                        this.get_info();
                    }else{
                        this.$message.error("删除失败!");
                    }
                    this.visible_delete = false;
                })
            },
            download(row){
                this.$api_query.admin_export_achieve_subset(row.name,row.id);
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

<style scoped>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
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
</style>
