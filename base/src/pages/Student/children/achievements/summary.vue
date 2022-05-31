<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
            <div class="head" style="margin-bottom: 20px;">
                <!-- <el-dropdown @command="set_export_type">
                    <span class="el-dropdown-link" style="margin-top: -5px;color: gray;">
                        导出格式
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">EXCEL格式</el-dropdown-item>
                        <el-dropdown-item command="1">PDF模板</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
                 <el-button type="primary"  icon="el-icon-tickets"
               :disabled="info_export.length==0" style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
               @click="visibel_create_report=true">生成认证报告
            </el-button>
                 <el-button type="primary"  icon="el-icon-document-copy"
                style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
                @click="show_report">认证报告管理
            </el-button>
                <el-button type="primary" icon="el-icon-download"
                :disabled="info_export.length==0"
                style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
                @click="exprot_which(0)">导出EXCEL
            </el-button>
            <el-button type="primary" icon="el-icon-download"
                style="margin-left: 10px;margin-top: 10px;height:30px;padding-top:8px;background-color: #4E6996;border: none;"
                @click="exprot_which(1)">导出PDF
            </el-button>
            </div>
              <el-dialog
             width="30%"
            :visible.sync="visibel_create_report"
            style="font-size:24px!important"
            >
              <template slot="title">
                   <div style="font-size:25px;font-weight:bolder">提示</div>
             </template>
           <div style="font-size:20px;margin-top:-30px">已选择{{info_export.length}}个成果物,是否确认生成认证报告?</div>
           <div slot="footer" class="dialog-footer" style="margin-top:-10px">
           <el-button type="primary" @click="cancel_report" >取消</el-button>
            <el-button type="primary" @click="create_report">确定</el-button>
            </div>
              </el-dialog>
                <el-dialog
             width="30%"
            :visible.sync="visibel_confirm_delete"
            style="font-size:24px!important"
            >
              <template slot="title">
                   <div style="font-size:25px;font-weight:bolder">提示</div>
             </template>
           <div style="font-size:20px;margin-top:-30px">是否删除该认证报告?</div>
           <div slot="footer" class="dialog-footer" style="margin-top:-10px">
           <el-button type="primary"  @click="visibel_confirm_delete = false"  >取消</el-button>
            <el-button type="primary" @click="delete_report()">确定</el-button>
           </div>
                </el-dialog>
                 <el-dialog
             width="50%"
            :visible.sync="visibel_confirm_create"
            style="font-size:24px!important"
            >
              <template slot="title">
                   <div style="font-size:25px;font-weight:bolder">生成成功</div>
             </template>
           <div style="font-size:18px;margin-top:-30px">报告验证码为：{{code}},点击确定查看认证报告</div>
           <div slot="footer" class="dialog-footer" style="margin-top:-10px">
           <el-button type="primary"  @click="visibel_confirm_create = false"  >取消</el-button>
            <el-button type="primary" @click.native="$router.push({name:'report',params:{id:code}})">确定</el-button>
           </div>
                </el-dialog>
             <el-dialog
             
             width="40%"
            :visible.sync="show_dialog"
            style="font-size:24px!important;"
            >
            <template slot="title">
                   <div style="font-size:25px;font-weight:bolder">我的认证报告</div>
             </template>
            <el-table
              :header-cell-style="{background:'#f6f7fb' ,border:'1px white solid',color:'black',padding:'5px',font:'15px'}"
              :data=au_report
              style="width:100%;margin-top:-20px;max-height:400px;overflow:auto"
              :cell-style="{padding:'0px'}"
              >
            <el-table-column
            label="报告验证码"
            prop="code"
            align="center"
            >
            </el-table-column>
             <el-table-column
            label="操作"
             align="center"
             width="250%">
            <template scope="scope">
                <el-button type="text" style="font-weight:bolder" @click="report_detail(scope.row)">
                    查看详情
                </el-button>
                 <el-button type="text" style="font-weight:bolder" @click=" visibel_confirm_delete=true;chosed_row=scope.row">
                    删除
                </el-button>
            </template>
            </el-table-column> 
            </el-table>
            </el-dialog>
            <div class="choose achieve_list">
                <div class="row_1" style="margin-top: 10px;" v-for="(item,i) in base_data" :key="i">
                    <div style="overflow: hidden; display: inline">
                        <div style="width: 100px;text-align: right;display: inline-block;">
                            <span style="font-family: helvetica;color: #6B7F91;">{{item.ch}}</span></div>
                        <el-checkbox
                            style="display: inline-block;margin-left: 20px;color: gray;font-weight: lighter;"
                            :indeterminate="isInd[item.en]" v-model="checkAll[item.en]"
                            @change="HandleCheckAll($event,item.en)">全选</el-checkbox>
                        <div v-if="item.en!=='achieve_year'" style="display: inline-block;">
                            <el-checkbox-group v-model="selected[item.en]" @change="HandleChecked($event,item.en)"
                                style="display: inline-block;" v-for="(item_2,i_2) in options[item.en]" :key="i_2">
                                <el-checkbox :label="item_2"
                                    style="display: inline-block;margin-right: 10px;color: gray;font-weight: lighter;">
                                    {{item_2}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div v-else style="display: inline-block;">
                            <el-checkbox-group v-model="Selected_achieve_year"
                                @change="HandleChecked($event,item.en,item_2)" style="display: inline-block;"
                                v-for="(item_2,i_2) in options[item.en]" :key="i_2">
                                <el-checkbox :label="item_2"
                                    style="display: inline-block;margin-right: 10px;color: gray;font-weight: lighter;">
                                    {{item_2}}
                                </el-checkbox>
                            </el-checkbox-group>
                            <el-input size="mini" v-model="achieve_year_input" placeholder="请输入年份"
                                oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @keyup.enter.native="set_years"
                                @blur="set_years" maxlength="4" style="display: inline-block;width: 120px;"> </el-input>
                        </div>
                    </div>
                </div>

                <div class="row_6" style="margin-top: 10px;">
                    <div style="overflow: hidden; display: inline">
                        <div style="width: 100px;text-align: right;display: inline-block;">
                            <span style="font-family: helvetica;color: #6B7F91;">姓名</span></div>
                        <!-- <el-checkbox v-model="selected.user_id" label=""
                            @change="selected.user_id=[],options.name='',get_info()"
                            style="display: inline;margin-left: 20px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                            全选
                        </el-checkbox> -->
                    </div>
                    <div style="display: inline; margin-left: 30px">
                        <el-input v-model="options.name" placeholder="请输入姓名" @input="get_student"
                            @keyup.enter.native="get_student" size="mini" style="width: 120px"></el-input>
                    </div>
                </div>
                <div class="row_4" style="margin-top: 10px;">
                    <div style="overflow: hidden; display: inline">
                        <div style="width: 100px;text-align: right;display: inline-block;">
                            <span style="font-family: helvetica;color: #6B7F91;">作品名</span></div>
                        <!-- <el-checkbox v-model="selected.keyWord" label=""
                            @change="selected.keyWord='',options.keyWord='',get_info()"
                            style="display: inline;margin-left: 20px;margin-right: 10px;font-family: helvetica;color: gray;font-weight: lighter;">
                            全选
                        </el-checkbox> -->
                    </div>
                    <div style="display: inline; margin-left: 30px">
                        <el-input v-model="selected.keyWord" placeholder="请输入作品名" @input="get_info()"
                            @keyup.enter.native="get_info()" @blur="get_info()" size="mini" style="width: 120px">
                        </el-input>
                    </div>
                </div>
            </div>

            <div class="table">
                <el-table ref="info_export" :data="info" stripe tooltip-effect="dark" size="small" row-key="achieve_id"
                    style="width: 100%; margin-top: 30px;cursor:pointer" @row-click="checkDetails"
                    @selection-change="info_export = $event" border>
                    <el-table-column type="selection" align="center" reserve-selection>
                    </el-table-column>
                    <el-table-column prop="achieve_type" label="成果物类型" :formatter="if_null" show-overflow-tooltip width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_name" label="作品名称" :formatter="if_null" show-overflow-tooltip width="300" align="center">
                        <!-- <template slot-scope="scope">
                            <span @click="checkDetails(scope.row)"
                                style="width:300px;text-overflow: ellipsis;cursor: pointer;">{{scope.row.achieve_name}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="work_type" label="作品类型" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="achieve_year" label="年份" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="realName" label="第一作者" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column prop="team_order" label="队内名次" :formatter="if_null" show-overflow-tooltip align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template slot-scope="scope">
                            <!-- <router-link :to="{ name: 'achievements_competition_details', params: { id: scope.row.achieve_id } }">查看详情</router-link> -->
                            <el-button @click="checkDetails(scope.row)" type="text" size="small">查看详情</el-button>
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
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapActions } from 'vuex'
    //const定义选项，防止选项更改
    //获取当前年份，构建年份选项
    const get_achieve_year = () => {
        let achieve_year = [];
        let date = new Date();
        let y = date.getFullYear();
        let i = 0;
        for (i; i < 5; i++) {
            achieve_year[i] = y;
            y -= 1;
        }
        //achieve_year[i] = y + "及以前";
        return achieve_year;
    };
    let achieve_year = get_achieve_year();
    const options_achieve_year = achieve_year;
    const options_achieve_type = ['竞赛', '项目', '论文', '荣誉', '知识产权'];
    //调用原生java库lodash，以便进行深拷贝
    const _ = require('lodash');
    export default {
        name: "stuSummary",
        data() {
            return {
                code:'',
                chosed_row:"",
                au_report:[],
                visibel_confirm_create:false,
                visibel_confirm_delete:false,
                visibel_delete_report:false,
               visibel_create_report:false,
                show_dialog:false,
                base_data: [{ //构建多选栏的数据
                    ch: '成果物类型',
                    en: 'achieve_type'
                },
                {
                    ch: '年份',
                    en: 'achieve_year'
                }],
                options: {
                    //将获取到的搜索项
                    achieve_type: options_achieve_type,
                    achieve_year: options_achieve_year,
                    name: ''
                },
                selected: {
                    //多条件查询存放选项
                    achieve_type: [],
                    achieve_year: [],
                    user_id: [],
                    keyWord: "",
                    size: 30,
                    start: '',
                },
                //多选控制
                checkAll: {
                    patent_type: false,
                    achieve_year: false,
                },
                isInd: {
                    patent_type: false,
                    achieve_year: false,
                },
                info: [], //获取到的表格数据
                info_export: [], //要导出的条目
                Selected_achieve_year: [],//存放已选年份，由于年份接口设计问题与selected分离
                achieve_year_input: "",//存放用户输入的年份，输入完添加到achieve_year数组中
                export_type: '0', //导出格式
                export_key: 'EXCEL', //导出格式名
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
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
        activated() {
            this.get_info();
        },
        methods: {
            //将vuex中的函数放出来,便于直接使用
            ...mapActions(['addRoute', 'removeAllRoute', 'removeRoute']),
           report_detail(row){
               this.$router.push({name:'report',params:{id:row.code}})

           },
           delete_report(){
                this.axios.delete('http://124.222.44.159:8080/certification',
                {
                    params:{
                        code:this.chosed_row.code
                    }
                },{
                    headers:{
                          Token: window.sessionStorage.getItem('Token')
                    }
                }).then(res=>{
                    if(res.data.code===2000){
                        this.$message.success("删除成功")
                        this.show_report()
                        console.log(res)
                        
                    }else{
                        console.log(res)
                    }
                })
                this.visibel_confirm_delete=false
           },
            cancel_report(){
                this.visibel_create_report=false

            },
            create_report(){
            console.log(this.info_export[0].achieve_id)
              let queryCertification={
                  competitions:[],
                  honors:[],
                  papers:[],
                  patents:[],
                  projects:[], 
                  userId:this.$store.getters.user_id,
                  isStu:true
              }
              for(var i=0;i<this.info_export.length;i++){
                  if(this.info_export[i].achieve_type=="竞赛"){
                       queryCertification.competitions.push(this.info_export[i].achieve_id)
                  }
                  else if(this.info_export[i].achieve_type=="项目"){
                      queryCertification.projects.push(this.info_export[i].achieve_id)
                  } else if(this.info_export[i].achieve_type=="论文"){
                      queryCertification.papers.push(this.info_export[i].achieve_id)
                  } else if(this.info_export[i].achieve_type=="荣誉"){
                       queryCertification.honors.push(this.info_export[i].achieve_id)
                  }else if(this.info_export[i].achieve_type=="知识产权"){
                       queryCertification.patents.push(this.info_export[i].achieve_id)
                  }
              }
              if(queryCertification.competitions.length==0){
                  queryCertification.competitions=null
              }
                if(queryCertification.honors.length==0){
                  queryCertification.honors=null
              }
                if(queryCertification.papers.length==0){
                  queryCertification.papers=null
              }
               if(queryCertification.patents.length==0){
                  queryCertification.patents=null
              }
               if(queryCertification.projects.length==0){
                  queryCertification.projects=null
              }
           
              
              this.axios.put("http://124.222.44.159:8080/certification/",
                  queryCertification
            ,
              {
                  headers:{
                       Token: window.sessionStorage.getItem('Token')
                  }
              }
              ).then(res=>{
                  if(res.data.code==2000){
                     this.code=res.data.data
                      this.visibel_create_report=false
                      this.visibel_confirm_create=true
                      console.log(res.data.data)
                 
                  }else{
                      console.log(res)

                  }
              })
            

            
                console.log(this.info_export)
                 console.log(this.$store.getters.user_id)
          
            
            
            },
          
            show_report(){
                this.show_dialog=true
                this.au_report=[]
                this.axios.get('http://124.222.44.159:8080/certification/all',{
                    params:{
                        userId:this.$store.getters.user_id
                    },
                    headers:{
                         Token: window.sessionStorage.getItem('Token')
                    }
                    

                }).then(res=>{
                    if(res.data.code===2000){
                       for(var i=0;i<res.data.data.length;i++){
                        let a={code:res.data.data[i]};
                        this.au_report.push(a)
                       }
                        console.log(res.data.data)
                        console.log(res.data.data.length)
                    }else{
                        console.log(res)

                    }
                })
            },
            async get_info() {
                
                if (this.Selected_achieve_year) {
                    let achieve_year_model = _.cloneDeep(this.Selected_achieve_year);
                    if (this.achieve_year_input.length == 4) {
                        achieve_year_model.push(Number(this.achieve_year_input));
                    }
                    achieve_year_model.sort();
                    /* if (typeof (achieve_year_model[0]) === 'string') {
                      let achieve_year = await this.set_yaer_past();
                      Vue.set(this.selected, "achieve_year", achieve_year)
                    } else {
                      Vue.set(this.selected, "achieve_year", this.Selected_achieve_year)
                    } */
                    Vue.set(this.selected, "achieve_year", achieve_year_model)
                }
                this.selected.start = this.current_page;
                console.log(this.selected)
                let res = await this.$api_query.user_search_achievement(this.selected);
                this.info = res.list;
                this.pages_total = res.pages;
                this.size_total = res.total;
                console.log(this.info)
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

            //根据导出格式选择下载函数
           async exprot_which(i) {
      if (i == 0) {
        let info = [];
        await this.set_download_opt(this.info_export).then(res => {
          info = res;
        });
        this.$api_query.user_export_achieve_all(info);
      } else {

        let res = await this.$api_achievement.MEHEHE(this.$store.getters.user_id);
        console.log(res)
        if (res.data.code === 2000) {
          let mehe = await this.$api_achievement.user_download_pdf(res.data.data);
          window.open(mehe.data.data);
        } else {
          this.$message.warning("下载pdf失败！");
        }
      }
    },
            //设置要下载的条目
            async set_download_opt(val) {
                let count = val.length;
                let download_opts = [];
                if (count !== 0 && !this.if_select_all) {
                    Object.keys(val).forEach(res => {
                        download_opts.push({ 'achieve_id': val[res].achieve_id, 'achieve_type': val[res].achieve_type });
                    })
                } /* else {
                    this.$message.error("请先选择要导出的条目！");
                } */
                return download_opts;
            },
            //构建“xx年以前”选项的数组，用于按年份搜索
            set_yaer_past() {
                let selected = _.cloneDeep(this.Selected_achieve_year);
                selected.sort();
                let option = options_achieve_year;
                let y = option[4] - 1;
                let last_achieve_year_10 = [];
                for (let i = 0; i < 10; i++) {
                    last_achieve_year_10[i] = y;
                    y -= 1;
                }
                selected.splice(0, 1);
                //数组拼接
                selected.push.apply(selected, last_achieve_year_10);
                return selected;
            },
            //多选控制
            HandleCheckAll(val, type) {
                console.log(val, type);
                let opt = [];
                Object.keys(this.options[type]).forEach(res => {
                    opt.push(this.options[type][res]);
                })
                console.log(opt);
                if (type === "award") {
                    this.selected[type] = val ? this.options[type] : [];
                } else if (type === 'achieve_year') {
                    //TODO:由于需求改变，年份的全选无法使所有年份选项高亮，否则只会选择这部分年份而无法做到全选，这是一个界面显示和实际逻辑的分离，可以做工作配合界面显示，但我现在没精力
                    this.Selected_achieve_year = val ? [] : [];
                    console.log(this.Selected_achieve_year);
                } else if (type === 'pro_schedule') {
                    this.selected[type] = val ? this.options.pro_schedule : [];
                    console.log(this.Selected_achieve_year);
                } else {
                    this.selected[type] = val ? opt : [];
                }
                console.log(this.selected[type])
                this.isInd[type] = false;
                this.get_info();
            },
            HandleChecked(value, type, item_2) {
                console.log(this.Selected_achieve_year);
                let checkedCount = value.length;
                this.checkAll[type] = checkedCount === this.options[type].length;
                this.isInd[type] = checkedCount > 0 && checkedCount < this.options[type].length;
                this.get_info();
            },

            checkDetails(row, event) {
                //查看详情
                //不让表格多选框触发行点击事件
                if (event.className != "el-table-column--selection") {
                    this.$router.push({
                        path: "achieve_details",
                        query: {
                            achieve_id: row.achieve_id,
                            type: row.achieve_type
                        }
                    });
                }
            },
            set_export_type(val) {
                switch (val) {
                    case '0':
                        this.export_key = "EXCEL";
                        break;
                    case '1':
                        this.export_key = "PDF";
                        break;
                }
                this.export_type = val;
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
    .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    /deep/ .choose .el-checkbox__inner {
        display: none;
    }
</style>
