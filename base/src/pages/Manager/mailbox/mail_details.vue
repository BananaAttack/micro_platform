<template>
    <div>
        <div class="header">
            <div style="display: inline-block;">
                <i class="el-icon-back"
                    style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
                    @click="$router.back(-1)"></i>
                <p
                    style="font-size: 24px;display: inline-block;margin-top: 0px;font-family: arial;color: #1f2f3d;font-weight: 400;">
                    {{type_name}}详情</p>
            </div>

            <el-tabs type="border-card" style="margin-top: 30px;">
                <el-tab-pane v-if="achieve_type == '竞赛'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">

                    <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
                    </div>
                    <div class="row_2" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">竞赛名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.competition_name}}</p>
                    </div>
                    <div class="row_3" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">竞赛类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.competition_type}}</p>
                    </div>
                    <div class="row_4" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.work_type}}</p>
                    </div>
                    <div class="row_5" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 32px;font-weight: bold;">年份</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
                    </div>
                    <div class="row_6" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: -32px;font-weight: bold;">公布获奖日期</p>
                        <p style="display: inline;margin-left: 30px;">{{info.award_date}}</p>
                    </div>
                    <div class="row_7" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">竞赛级别</p>
                        <p style="display: inline;margin-left: 30px;">{{info.competition_level}}</p>
                    </div>
                    <div class="row_8" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">获得奖项</p>
                        <p style="display: inline;margin-left: 30px;">{{info.award}}</p>
                    </div>
                    <div class="row_9" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">成果简介</p>
                        <span
                            style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</span>
                    </div>
                    <div class="row_10" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">支撑材料</p>
                        <!-- <el-link type="primary"
                            style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
                            @click="exportData">下载</el-link> -->
                        <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
                    </div>

                </el-tab-pane>
                <el-tab-pane v-if="achieve_type == '项目'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">

                    <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">项目名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.pro_name}}</p>
                    </div>
                    <div class="row_2" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">项目类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.category}}</p>
                    </div>
                    <div class="row_3" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
                    </div>
                    <div class="row_4" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.work_type}}</p>
                    </div>
                    <div class="row_5" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 32px;font-weight: bold;">年份</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
                    </div>
                    <div class="row_6" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">完成进度</p>
                        <p style="display: inline;margin-left: 30px;">{{info.pro_schedule}}</p>
                    </div>
                    <div class="row_7" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: -38px;font-weight: bold;">立项/结题时间</p>
                        <p style="display: inline;margin-left: 30px;">{{info.pro_date}}</p>
                    </div>
                    <div class="row_8" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">成果简介</p>
                        <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
                    </div>
                    <div class="row_10" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">支撑材料</p>
                        <!-- <el-link type="primary" v-if="info.support_files !== null"
                                    style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
                        <el-link type="primary"
                            style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
                            @click="exportData">下载</el-link> -->
                        <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
                    </div>

                </el-tab-pane>
                <el-tab-pane v-if="achieve_type == '论文'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">

                    <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
                    </div>
                    <div class="row_2" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">论文类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.paper_type}}</p>
                    </div>
                    <div class="row_3" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: -22px;font-weight: bold;">期刊/会议名</p>
                        <p style="display: inline;margin-left: 30px;">{{info.conference_name}}</p>
                    </div>
                    <div class="row_4" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 32px;font-weight: bold;">年份</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
                    </div>
                    <div class="row_5" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">发布日期</p>
                        <p style="display: inline;margin-left: 30px;">{{info.release_date}}</p>
                    </div>
                    <div class="row_6" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 32px;font-weight: bold;">级别</p>
                        <p style="display: inline;margin-left: 30px;">{{info.paper_level}}</p>
                    </div>
                    <div class="row_7" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">成果简介</p>
                        <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
                    </div>
                    <div class="row_10" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">检索凭证</p>
                        <!-- <el-link type="primary"
                            style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
                            @click="exportData_paper">下载</el-link> -->
                        <p v-if="info.retrieve" style="display: inline;margin-left: 30px;">{{info.retrieveName}}</p>
                        <el-link type="primary" v-if="info.support_files !== null"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file_paper">预览
                        </el-link>
                        <el-link type="primary" v-if="info.support_files !== null"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file_paper">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无检索凭证</p>
                    </div>
                    <div class="row_10" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">支撑材料</p>
                        <!-- <el-link type="primary"
                            style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
                            @click="exportData">下载</el-link> -->
                        <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
                    </div>

                </el-tab-pane>
                <el-tab-pane v-if="achieve_type == '知识产权'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">

                    <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
                    </div>
                    <div class="row_2" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">知识产权类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.patent_type}}</p>
                    </div>
                    <div class="row_3" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 32px;font-weight: bold;">年份</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
                    </div>
                    <div class="row_4" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 16px;font-weight: bold;">知识产权号</p>
                        <p style="display: inline;margin-left: 30px;">{{info.patent_number}}</p>
                    </div>
                    <div class="row_5" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: -32px;font-weight: bold;">申请时间</p>
                        <p style="display: inline;margin-left: 30px;">{{info.apply_date}}</p>
                    </div>
                    <div class="row_6" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: -32px;font-weight: bold;">授权时间</p>
                        <p style="display: inline;margin-left: 30px;">{{info.grant_date}}</p>
                    </div>
                    <div class="row_7" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">成果简介</p>
                        <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
                    </div>
                    <div class="row_10" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">支撑材料</p>
                        <!-- <el-link type="primary"
                            style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
                            @click="exportData">下载</el-link> -->
                        <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
                    </div>

                </el-tab-pane>
                <el-tab-pane v-if="achieve_type == '荣誉'" label="成果物详情" style="margin-left: 80px;margin-bottom: 30px;">

                    <div class="row_1" style="margin-top: 30px;margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">作品名称</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_name}}</p>
                    </div>
                    <div class="row_2" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">荣誉类型</p>
                        <p style="display: inline;margin-left: 30px;">{{info.honor_type}}</p>
                    </div>
                    <div class="row_3" style="margin-bottom: 10px;">
                        <p style="display: inline;margin-left: 32px;font-weight: bold;">年份</p>
                        <p style="display: inline;margin-left: 30px;">{{info.achieve_year}}</p>
                    </div>
                    <div class="row_4" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">获得日期</p>
                        <p style="display: inline;margin-left: 30px;">{{info.honor_date}}</p>
                    </div>
                    <div class="row_5" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">荣誉级别</p>
                        <p style="display: inline;margin-left: 30px;">{{info.honor_level}}</p>
                    </div>
                    <div class="row_7" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">成果简介</p>
                        <p style="display: inline-block;margin-left: 30px;width: 600px;">{{info.achieve_summary}}</p>
                    </div>
                    <div class="row_10" style="margin-bottom: 10px;">
                        <p style="display: inline;font-weight: bold;">支撑材料</p>
                        <!-- <el-link type="primary"
                            style="display: inline;margin-left: 30px;font-size:16px;margin-top: -3px;"
                            @click="exportData">下载</el-link> -->
                        <p v-if="info.fileName" style="display: inline;margin-left: 30px;">{{info.fileName}}</p>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览</el-link>
                        <el-link type="primary" v-if="info.support_files"
                            style="display: inline;margin-left: 25px;font-size: 16px;" @click="exportData">下载
                        </el-link>
                        <p v-else style="display: inline;margin-left: 30px;">暂无支撑材料</p>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="团队详情" style="margin-left: 80px;margin-bottom: 30px;">

                    <div class="members">
                        <p style="margin-top: 30px;margin-bottom: 30px;font-weight: bold;">成员信息:</p>
                        <div v-for="(item,i) in info.students" :key="i" style="display: inline-block;">
                            <div class="card" @click="checkDetails(item,'stu')"
                                style="width: 180px;height: 40px;border-style: solid;border-radius: 10px;border-width:1px;border-color: #D9D9D9;margin-right: 30px;margin-bottom: 20px;cursor: pointer;">
                                <div class="card_order"
                                    style="display: inline-block;width: 20px;height: 20px;border-style: solid;border-radius: 50%;border-width:1px;border-color: #D9D9D9;margin-top: 8px;margin-left: 10px;">
                                    <p style="margin-left: 5px;">{{i+1}}</p>
                                </div>
                                <p style="display: inline;font-size: 15px;">{{item.realName}}</p>
                                <p style="display: inline;font-size: 12px;">{{item.ranks}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="teachers">
                        <p style="margin-top: 30px;margin-bottom: 30px;font-weight: bold;">指导老师:</p>
                        <div v-for="(item,i) in info.teachers" :key="i" style="display: inline-block;">
                            <div class="card" @click="checkDetails(item,'tea')"
                                style="width: 180px;height: 40px;border-style: solid;border-radius: 10px;border-width:1px;border-color: #D9D9D9;margin-right: 30px;margin-bottom: 20px;cursor: pointer;">
                                <div class="card_order"
                                    style="display: inline-block;width: 20px;height: 20px;border-style: solid;border-radius: 50%;border-width:1px;border-color: #D9D9D9;margin-top: 8px;margin-left: 10px;">
                                    <p style="margin-left: 5px;">{{i+1}}</p>
                                </div>
                                <p style="display: inline;font-size: 15px;">{{item.realName}}</p>
                                <p style="display: inline;font-size: 12px;">{{item.ranks}}</p>
                            </div>
                        </div>
                    </div>

                </el-tab-pane>
            </el-tabs>
            <el-card class="box-card" style="margin-top: 30px;">
                <div style="margin-top: 30px;margin-left: 30px;">
                    <p style="margin-bottom: 3px;">给予评价：</p>
                    <el-input type="textarea" :rows="4" style="margin-bottom: 10px;" placeholder="请输入内容"
                        v-model="comments">
                    </el-input>
                    <el-button type="primary" style="display: inline-block;" @click="pass">
                        <p v-if="status == 1">审批通过</p>
                        <p v-if="status == 3">同意修改</p>
                    </el-button>
                    <el-button style="display: inline-block;margin-left: 30px;" @click="not_pass">
                        <p v-if="status == 1">不通过</p>
                        <p v-if="status == 3">不同意修改</p>
                    </el-button>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Base64} from 'js-base64';
    export default {
        name: "adminMailDetails",
        data() {
            return {
                achieve_id: '', //从上个页面传来的id
                achieve_type: '', //上个页面传来的类型
                status: '',
                type_name: '', //获取到的type转为中文
                type_id: '',//获取到的type转为数字
                info: [],
                visible_delete: false,
                comments: ''//评论
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
            async get_achievement() {
                if (this.achieve_type == "竞赛") {
                    await this.get_competition_single();
                } else if (this.achieve_type == "项目") {
                    await this.get_projects_single();
                } else if (this.achieve_type == "论文") {
                    await this.get_paper_single();
                } else if (this.achieve_type == "知识产权") {
                    await this.get_patent_single();
                } else if (this.achieve_type == "荣誉") {
                    await this.get_honor_single();
                }
                if (this.info.support_files) {
                    console.log(this.info.support_files);
                    Vue.set(this.info, 'fileName', this.cut_fileName(this.info.support_files));
                    console.log(this.info.fileName);
                }
                if (this.info.retrieve) {
                    Vue.set(this.info, 'retrieveName', this.cut_fileName(this.info.retrieve));
                }
            },

            async get_competition_single() {
                await this.axios
                    .get("/query/user/nopass/diff/achieve?achieve_id=" + this.achieve_id + "&type=0", {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.info = response.data.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            async get_projects_single() {
                await this.axios
                    .get("/query/user/nopass/diff/achieve?achieve_id=" + this.achieve_id + "&type=1", {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.info = response.data.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            async get_paper_single() {
                await this.axios
                    .get("/query/user/nopass/diff/achieve?achieve_id=" + this.achieve_id + "&type=2", {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.info = response.data.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            async get_patent_single() {
                await this.axios
                    .get("/query/user/nopass/diff/achieve?achieve_id=" + this.achieve_id + "&type=3", {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.info = response.data.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            async get_honor_single() {
                await this.axios
                    .get("/query/user/nopass/diff/achieve?achieve_id=" + this.achieve_id + "&type=4", {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        this.info = response.data.data;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            async exportData() { //下载支撑材料
                /* window.open(
                    this.info.support_files
                ); */
                let url = await (this.$api_achievement.admin_download(this.info.support_files));
                window.open(url);
            },
            //在线预览文件
            async view_file() {
                let url = await (this.$api_achievement.admin_get_download(this.info.support_files));
                window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
            },
            /* exportData_paper() { //下载支撑材料
                window.open(
                    this.info.retrieve
                );
            }, */
            //在线预览论文凭证
            async view_file_paper() {
                let url = await (this.$api_achievement.admin_get_download(this.info.retrieve));
                window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
            },
            //下载论文凭证
            async download_file_paper() {
                // await (this.$api_achievement.admin_download(this.info.retrieve));
                let url = await (this.$api_achievement.admin_download(this.info.retrieve));
                window.open(url);
            },
            pass() {
                this.axios
                    .put("/diff/achieve/check/success?achieve_id=" + this.achieve_id + "&type=" + this.type_id, {}, {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        if (response.data.code == 2000) {
                            this.$message.success("操作成功");
                            this.$router.back(-1);
                        }
                        else {
                            this.$message.error("操作失败");
                        }

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            not_pass() {
                this.axios
                    .put("/achievement/check/fail?achieve_id=" + this.achieve_id + "&comments=" + this.comments, {}, {
                        headers: {
                            Token: this.Token,
                        },
                    })
                    .then((response) => {
                        if (response.data.code == 2000) {
                            this.$message.success("操作成功");
                            this.$router.back(-1);
                        }
                        else {
                            this.$message.error("操作失败");
                        }

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //切割文件名
            cut_fileName(fileName) {
                return fileName.split('A').slice(-1)[0];
            },
            checkDetails(row, role) {
                if (role === "tea" && row.n === 1) {
                    row.n = 2
                }
                this.$router.push({
                    path: '/user_info',
                    query: {
                        user_id: row.user_id,
                        role: role,
                        n: row.n
                    }
                })
            },


        },
        created() {
            this.achieve_id = this.$route.query.achieve_id;
            this.achieve_type = this.$route.query.type;
            this.status = this.$route.query.status;
            this.type_name = this.achieve_type;
            if (this.achieve_type == "竞赛") {
                this.type_id = 0;
            } else if (this.achieve_type == "项目") {
                this.type_id = 1;
            } else if (this.achieve_type == "论文") {
                this.type_id = 2;
            } else if (this.achieve_type == "知识产权") {
                this.type_id = 3;
            } else if (this.achieve_type == "荣誉") {
                this.type_id = 4;
            }
            this.get_achievement();
            //this.get_competition();
        },
    }
</script>

<style>
</style>