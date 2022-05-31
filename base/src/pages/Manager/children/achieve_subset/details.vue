<template>
    <div>
        <div style="display: inline-block;">
            <i class="el-icon-back" style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
              @click="$router.back(-1)"></i>
            <p
              style="font-size: 24px;display: inline-block;margin-top: 0px;font-family: arial;color: #1f2f3d;font-weight: 400;">
              成果子集详情</p>
            </div>
        <div style="font-weight:bolder;font-size:18px;margin-top:20px">新增成果物<span v-if="uncollected_info.length!=0">({{uncollected_info.length}})</span></div>
        <div class="table">
              <el-table :data="uncollected_info" ref="new_info_export"  tooltip-effect="dark" stripe size="small" style="width: 100%; margin-top: 30px;min-width: 800px;margin-top:30px" @row-click="checkDetails"
                 border>
                 <el-table-column label="成果物类型"  prop="achieve_type" :formatter="if_null" show-overflow-tooltip width="150" align="center"> </el-table-column>
                 <el-table-column  label="作品名称"  prop="achieve_name" :formatter="if_null" show-overflow-tooltip  align="center">
                    <template slot-scope="scope">
                      <span @click="checkDetails(scope.row)"
                            style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="achieve_year"  label="年份" :formatter="if_null" show-overflow-tooltip width="150"  align="center"></el-table-column>
                <el-table-column  prop="username" label="第一作者" :formatter="if_null" show-overflow-tooltip align="center" width="150"></el-table-column>
                <el-table-column  label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click.stop=accept(scope.row)>接受</el-button>
                        <el-button  type="text" size="small"  @click.stop=reject(scope.row) style="color:red">拒绝</el-button>
                    </template>
                </el-table-column>

              </el-table>
        </div>

        <div style="font-weight:bolder;font-size:18px;margin-top:30px">子集成果物:</div>
        <div class="table">
            <el-table ref="info_export" :data="info" tooltip-effect="dark" stripe size="small" row-key="achieve_id"
                style="width: 100%; margin-top: 30px;min-width: 800px;margin-top:30px" @row-click="checkDetails"
                 border>
                <el-table-column prop="achieve_type" label="成果物类型" :formatter="if_null" show-overflow-tooltip width="150" align="center">
                </el-table-column>
                <el-table-column prop="achieve_name" label="作品名称" :formatter="if_null" show-overflow-tooltip  align="center">
                    <template slot-scope="scope">
                        <span @click="checkDetails(scope.row)"
                            style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="work_type" label="作品类型" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <span
                            style="width:300px;text-overflow: ellipsis;">{{scope.row.achieve_type === '荣誉'?scope.row.work_type:scope.row.work_type}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="achieve_year" label="年份" :formatter="if_null" show-overflow-tooltip width="150"  align="center"></el-table-column>
                <el-table-column prop="realName" label="第一作者" :formatter="if_null" show-overflow-tooltip align="center" width="150"></el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button @click="checkDetails(scope.row)" type="text" size="small">查看详情</el-button>
                        <el-button @click.stop="deleteItem(scope.row)" type="text" size="small" style="color:red">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination style="margin-top: 60px;" @size-change="selected.pageSize = $event,get_info()"
                    @current-change="get_info" :current-page.sync="selected.pageNum" :page-sizes="[30, 60, 100, 200]"
                    :page-size.sync="selected.pageSize" layout="total, sizes, prev, pager, next, jumper"
                    :total.sync="size_total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adminSummary',
        data() {
            return {
                achieveIds:[],//审核成果物ID
                uncollected_info:[],//未审核成果物
                info:[],//用idList获取的成果物列表
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
                id:this.$route.query.id,
                selected:{
                    idListOfAchievements:[],//根据id数据构建id数组
                    pageNum:0,
                    pageSize:30
                },

            }
        },
        methods: {
            reject(row){
          let id=parseInt(this.id)
               this.achieveIds[0]=row.achieve_id
            this.axios.put("http://124.222.44.159:8080/query/subcollection/examine?achieveIds="+this.achieveIds+"&id="+id+"&pass=false",
                   {
                    headers:{
                        Token: window.sessionStorage.getItem('Token')
                    }}
                ).then(res=>{
                    if(res.data.code===2000){
                        this.$message.success("审核成功")
                        this.get_uncollected_info()
                    }else{
                        this.$message("审核失败")
                        console.log(this.achieveIds)
                         console.log(id)
                         console.log(res)
                    }
                })
            },
            accept(row){
                let id=parseInt(this.id)
               this.achieveIds[0]=row.achieve_id
            this.axios.put("http://124.222.44.159:8080/query/subcollection/examine?achieveIds="+this.achieveIds+"&id="+id+"&pass=true",
                   {
                    headers:{
                        Token: window.sessionStorage.getItem('Token')
                    }}
                ).then(res=>{
                    if(res.data.code===2000){
                        this.$message.success("审核成功")
                        this.get_uncollected_info()
                    }else{
                        this.$message("审核失败")
                        console.log(this.achieveIds)
                         console.log(id)
                         console.log(res)
                    }
                })

            },
            get_uncollected_info(){
                let id=parseInt(this.id)
                 this.axios.get("http://124.222.44.159:8080/query/subcollection/uncollected",{
                     params:{
                         id:id
                     },
                    headers:{
                         Token: window.sessionStorage.getItem('Token')
                    }
               } ).then(res=>{
                    if(res.data.code===2000){
                        this.uncollected_info=res.data.data
                        console.log(res.data.data)
                        console.log(id)
                       
                    }
                })

            },
            deleteItem(row){
                let deleteForm={
                    competitions:[],
                    honors:[],
                    id:parseInt(this.id),
                    papers:[],
                    patents:[],
                    projects:[]
                }
                if(row.achieve_type==="论文"){
                    deleteForm.papers[0]=row.achieve_id
                }else if(row.achieve_type==="竞赛"){
                    deleteForm.competitions[0]=row.achieve_id
                }else if(row.achieve_type==="荣誉"){
                    deleteForm.honors[0]=row.achieve_id
                }else if(row.achieve_type==="知识产权"){
                     deleteForm.patents[0]=row.achieve_id
                }else if(row.achieve_type==="项目"){
                    deleteForm.projects[0]=row.achieve_id
                }
                this.axios.delete("http://124.222.44.159:8080//query/subcollection/item",{
                    data:deleteForm,
                    headers:{Token: window.sessionStorage.getItem('Token')}
                }).then(res=>{
                    if(res.data.code===2000){
                        this.$message.success("删除成功")
                          this.get_idList();
                          console.log(deleteForm)
                    }else{
                        this.$message("删除失败")
                    }
                })
                console.log(row)

            },
            async get_idList() {
                let res = await this.$api_achievement.admin_get_achieve_subset(this.id);
                let idData = res.data.data;
                this.selected.idListOfAchievements = JSON.parse(idData.idListOfCompetitionJsonStr).concat(JSON.parse(idData.idListOfHonorJsonStr),JSON.parse(idData.idListOfPaperJsonStr),JSON.parse(idData.idListOfPatentJsonStr),JSON.parse(idData.idListOfProjectJsonStr));
                this.get_info();
            },
            async get_info(){
                let res = await this.$api_query.admin_search_achievement_by_id(this.selected);
                this.info = res.data.list;
                this.size_total = res.data.total;
                console.log(this.info);
            },
            checkDetails(row,event) {
                //不让表格多选框触发行点击事件
                 if (event.className != "el-button--small"){
                      this.$router.push({
                        name: "achievements_achieve_details",
                        query: {
                            achieve_id: row.achieve_id,
                            type: row.achieve_type,
                        }
                    });
                 }
                   
            },
            //表格空白数据处理
            if_null(row, column, cellValue) {
                return cellValue || '暂缺'
            },

        },
        created() {
             this.get_uncollected_info()
            this.get_idList();
            
        },
    };
</script>

<style scoped>
</style>