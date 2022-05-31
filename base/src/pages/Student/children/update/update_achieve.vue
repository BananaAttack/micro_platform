<template>
    <div v-loading="if_loading">
        <div class="header">
            <i class="el-icon-back"
                style="margin-top: 20px;display: inline-block;margin-right: 20px;font-size: 26px;cursor: pointer;"
                @click="$router.back(-1)"></i>
            <p
                style="font-size: 24px;display: inline-block;margin-top: -10px;font-family: arial;color: #1f2f3d;font-weight: 400;">
                {{type_name}}详情修改</p>
        </div>


        <div v-if="achieve_type == '竞赛' && !if_members">
            <div style="margin-top: 30px;">
                <el-form width="500px">
                    <el-form-item label="作品名称" :label-width="formLabelWidth">
                        <el-input v-model="info.achieve_name" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="竞赛名称" :label-width="formLabelWidth">
                        <el-select v-model="info.competition_name" placeholder="选择竞赛名称" @change="set_competition"
                            style="width: 400px;">
                            <el-option v-for="item in competition" :key="item.id" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年份" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.year" disabled type="year" placeholder="选择年份" format="yyyy">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="公布获奖日期" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.award_date" type="date" placeholder="选择获奖日期" format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="作品类型" :label-width="formLabelWidth">
                        <el-select v-model="info.workType" @change="$forceUpdate()" placeholder="选择作品类型"
                            style="width: 400px;">
                            <el-option v-for="item in options_workType" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="获得奖项" :label-width="formLabelWidth">
                        <el-select v-model="info.award" @change="set_award_value" placeholder="选择奖项"
                            style="width: 400px;">
                            <el-option v-for="(id,val) in options_prize" :key="id" :label="val" :value="val">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="成果简介" :label-width="formLabelWidth" style="font-weight: bold;">
                        <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                            v-model="info.achieve_summary">
                        </el-input>
                        <span class="numLimit">{{this.info.achieve_summary.length}}/320</span>
                    </el-form-item>
                    <el-form-item label="上传支撑材料" :label-width="formLabelWidth">
                        <div style="display: inline-block;overflow: hidden;">
                            <p v-if="info.fileName" style="display: inline;">{{info.fileName}}</p>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览
                            </el-link>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file">下载
                            </el-link>
                            <p v-else style="display: inline;">暂无支撑材料</p>
                        </div>
                        <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc" multiple
                            :file-list="fileList">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="goNext" style="margin-top: 30px;margin-left: 300px;width: 120px;"
                    :loading="if_uploading">团队成员修改
                </el-button>
                <!-- <el-button class="back-el-button" type="primary" @click="goBack"
                    style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button> -->
            </div>

        </div>

        <div v-if="achieve_type == '项目'&& !if_members">
            <div style="margin-top: 30px;">
                <el-form width="500px">
                    <el-form-item label="作品名称" :label-width="formLabelWidth">
                        <el-input v-model="info.achieve_name" style="width: 400px;"></el-input>
                    </el-form-item>

                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-select v-model="info.name" placeholder="选择项目名称" style="width: 400px;"
                            @change="set_projects_work_type">
                            <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成进度" :label-width="formLabelWidth">
                        <el-radio v-model="info.pro_schedule" label="立项">立项</el-radio>
                        <el-radio v-model="info.pro_schedule" label="结题">结题</el-radio>
                    </el-form-item>
                    <el-form-item label="立项/结题时间" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.pro_date" type="date" placeholder="选择时间"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="成果简介" :label-width="formLabelWidth" style="font-weight: bold;">
                        <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                            v-model="info.achieve_summary">
                        </el-input>
                        <span class="numLimit">{{this.info.achieve_summary.length}}/320</span>
                    </el-form-item>
                    <el-form-item label="上传支撑材料" :label-width="formLabelWidth">
                        <div style="display: inline-block;overflow: hidden;">
                            <p v-if="info.fileName" style="display: inline;">{{info.fileName}}</p>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览
                            </el-link>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file">下载
                            </el-link>
                            <p v-else style="display: inline;">暂无支撑材料</p>
                        </div>
                        <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc" multiple
                            :file-list="fileList">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="goNext" style="margin-top: 30px;margin-left: 300px;width: 120px;"
                    :loading="if_uploading">团队成员修改
                </el-button>
            </div>

        </div>

        <div v-if="achieve_type == '论文'&& !if_members">
            <div style="margin-top: 30px;">
                <el-form width="500px">
                    <el-form-item label="作品名称" :label-width="formLabelWidth">
                        <el-input v-model="info.achieve_name" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="论文类型" :label-width="formLabelWidth">
                        <el-radio v-model="info.paper_type" label="期刊" @change="set_paper_level">期刊论文
                        </el-radio>
                        <el-radio v-model="info.paper_type" label="会议" @change="set_paper_level">会议论文
                        </el-radio>
                    </el-form-item>
                    <el-form-item label="期刊/会议名" :label-width="formLabelWidth">
                        <el-input v-model="info.conference_name" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.release_date" type="date" placeholder="选择时间"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="级别" :label-width="formLabelWidth">
                        <el-select v-model="info.name" placeholder="选择论文级别" style="width: 400px;"
                            @change="set_paper_rank">
                            <el-option v-for="item in options_paper_level" :key="item.name" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="成果简介" :label-width="formLabelWidth" style="font-weight: bold;">
                        <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                            v-model="info.achieve_summary">
                        </el-input>
                        <span class="numLimit">{{this.info.achieve_summary.length}}/320</span>
                    </el-form-item>
                    <el-form-item label="检索凭证" :label-width="formLabelWidth">
                        <div style="display: inline-block;overflow: hidden;">
                            <p v-if="info.retrieve" style="display: inline;">{{info.retrieveName}}</p>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file_paper">预览
                            </el-link>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file_paper">
                                下载</el-link>
                            <p v-else style="display: inline;">暂无检索凭证</p>
                        </div>
                        <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc_paper" multiple
                            :file-list="fileList_2">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="上传支撑材料" :label-width="formLabelWidth">
                        <div style="display: inline-block;overflow: hidden;">
                            <p v-if="info.fileName" style="display: inline;">{{info.fileName}}</p>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览
                            </el-link>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file">下载
                            </el-link>
                            <p v-else style="display: inline;">暂无支撑材料</p>
                        </div>
                        <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc" multiple
                            :file-list="fileList">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>

                </el-form>
                <el-button type="primary" @click="goNext" style="margin-top: 30px;margin-left: 300px;width: 120px;"
                    :loading="if_uploading">团队成员修改
                </el-button>
            </div>

        </div>

        <div v-if="achieve_type == '知识产权'&& !if_members">
            <div style="margin-top: 30px;">
                <el-form width="500px">
                    <el-form-item label="作品名称" :label-width="formLabelWidth">
                        <el-input v-model="info.achieve_name" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="知识产权号" :label-width="formLabelWidth">
                        <el-input v-model="info.patent_number" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="知识产权类型" :label-width="formLabelWidth">
                        <el-select v-model="info.patent_type" placeholder="选择知识产权类型" style="width: 400px;"
                            @change="set_paper_rank">
                            <el-option v-for="item in options_patent_type" :key="item.name" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请时间" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.apply_date" type="date" placeholder="选择时间"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发布时间" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.grant_date" type="date" placeholder="选择时间"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="成果简介" :label-width="formLabelWidth" style="font-weight: bold;">
                        <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                            v-model="info.achieve_summary">
                        </el-input>
                        <span class="numLimit">{{this.info.achieve_summary.length}}/320</span>
                    </el-form-item>
                    <el-form-item label="上传支撑材料" :label-width="formLabelWidth">
                        <div style="display: inline-block;overflow: hidden;">
                            <p v-if="info.fileName" style="display: inline;">{{info.fileName}}</p>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览
                            </el-link>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file">下载
                            </el-link>
                            <p v-else style="display: inline;">暂无支撑材料</p>
                        </div>
                        <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc" multiple
                            :file-list="fileList">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="goNext" style="margin-top: 30px;margin-left: 300px;width: 120px;"
                    :loading="if_uploading">团队成员修改
                </el-button>
            </div>

        </div>

        <div v-if="achieve_type === '荣誉'&& !if_members">
            <div style="margin-top: 30px;">
                <el-form width="500px">
                    <el-form-item label="作品名称" :label-width="formLabelWidth">
                        <el-input v-model="info.achieve_name" style="width: 400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="荣誉类型" :label-width="formLabelWidth">
                        <el-select v-model="info.honor_type" placeholder="选择荣誉类型" style="width: 400px;"
                            @change="set_paper_rank">
                            <el-option v-for="item in options_honor_type" :key="item.name" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="荣誉级别" :label-width="formLabelWidth">
                        <el-select v-model="info.honor_level" placeholder="选择荣誉级别" style="width: 400px;"
                            @change="set_paper_rank">
                            <el-option v-for="item in options_honor_level" :key="item.name" :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="获得日期" :label-width="formLabelWidth">
                        <el-date-picker v-model="info.honor_date" type="date" placeholder="选择时间"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="成果简介" :label-width="formLabelWidth" style="font-weight: bold;">
                        <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                            v-model="info.achieve_summary">
                        </el-input>
                        <span class="numLimit">{{!info.achieve_summary?0:info.achieve_summary.length}}/320</span>
                    </el-form-item>
                    <el-form-item label="上传支撑材料" :label-width="formLabelWidth">
                        <div style="display: inline-block;overflow: hidden;">
                            <p v-if="info.fileName" style="display: inline;">{{info.fileName}}</p>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="view_file">预览
                            </el-link>
                            <el-link type="primary" v-if="info.support_files !== null"
                                style="display: inline;margin-left: 25px;font-size: 16px;" @click="download_file">下载
                            </el-link>
                            <p v-else style="display: inline;">暂无支撑材料</p>
                        </div>
                        <el-upload class="upload-demo" action="" :limit="1" :http-request="set_doc" multiple
                            :file-list="fileList">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="goNext" style="width: 120px;margin-top: 30px;margin-left: 300px;"
                    :loading="if_uploading">团队成员修改
                </el-button>
                <!-- <el-button class="back-el-button" type="primary" @click="goBack"
                    style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button> -->
            </div>

        </div>



        <div v-if="if_members">
            <p style="font-size: 26px;margin-top: 30px;margin-left: 50px;">团队信息</p>
            <div style="margin-left: 150px;">
                <p style="font-size: 20px;margin-top: 30px;">团队成员</p>
                <div style="margin-top: 30px;margin-left: 120px;">

                    <draggable v-model="members" @update="datadragEnd" v-bind="{animation:200}">

                        <div class="drag-item" v-for="(item,i) in members" :key="i">
                            <div v-if="if_add_firstOrder"
                                style="width: 502px;height: 92px;position: absolute;background-color: #BBBBBB;opacity: 0.2;">
                                <img src="../../../../../static/click.png"
                                    style="width: 10%;margin-left: 50%;margin-top: 5%;"
                                    @click="set_firstOrder(item,i)" />
                            </div>
                            <el-card class="box-card" style="width: 500px;height: 90px;margin-bottom: 20px;">
                                <div style="float: right;margin-top: -10px;">
                                    <i class="el-icon-close" @click="delete_members(i,item)"></i>
                                </div>
                                <div
                                    style="border-style: solid;border-width: 2px;border-color: #D9D9D9; width: 50px;height: 50px;border-radius: 50%;">
                                    <p style="margin-left: 20px;margin-top: 13px;">{{i+1}}</p>
                                </div>

                                <div style="margin-left: 70px;margin-top: -55px;">
                                    <p style="display: inline-block;font-weight: bold;margin-bottom: 10px;">
                                        {{item.realName}}</p>
                                    <p
                                        style="display: inline-block;margin-left: 20px;font-size: 12px;margin-bottom: 10px;">
                                        {{item.rank}}</p>
                                </div>
                                <div style="margin-left: 70px;">
                                    <p style="display: inline-block;font-size: 12px;">{{item.ranks}}</p>
                                    <!-- <p style="display: inline-block;margin-left: 20px;font-size: 12px;">{{item.major}}</p> -->
                                </div>
                            </el-card>
                        </div>
                    </draggable>
                    <p style="color: crimson;margin-top: 30px;">提示：该顺序将影响小组内成员排名，可拖动顺序</p>
                    <div style="margin-top: 30px;">
                        <el-link type="primary" style="display: inline-block;" @click="visible_add_members = true">
                            +添加团队成员</el-link>
                    </div>

                </div>
            </div>

            <div style="margin-left: 150px;">
                <p style="font-size: 20px;margin-top: 30px;">指导教师</p>
                <div style="margin-top: 30px;margin-left: 120px;">


                    <draggable v-model="teachers" @update="datadragEnd" v-bind="{animation:200}">
                        <div class="drag-item" v-for="(item,i) in teachers" :key="i">
                            <el-card class="box-card" style="width: 500px;height: 90px;margin-bottom: 20px;">
                                <div style="float: right;margin-top: -10px;">
                                    <i class="el-icon-close" @click="delete_teachers(i)"></i>
                                </div>
                                <div
                                    style="border-style: solid;border-width: 2px;border-color: #D9D9D9; width: 50px;height: 50px;border-radius: 50%;">
                                    <p style="margin-left: 20px;margin-top: 13px;">{{i+1}}</p>
                                </div>

                                <div style="margin-left: 70px;margin-top: -55px;">
                                    <p style="display: inline-block;font-weight: bold;margin-bottom: 10px;">
                                        {{item.realName}}</p>
                                </div>
                                <div style="margin-left: 70px;">
                                    <p style="display: inline-block;font-size: 12px;">{{item.ranks}}</p>
                                </div>
                            </el-card>
                        </div>
                    </draggable>
                    <p style="color: crimson;margin-top: 30px;">提示：该顺序将影响小组内成员排名，可拖动顺序</p>
                    <div style="margin-top: 30px;">
                        <el-link type="primary" style="display: inline-block;" @click="visible_add_teachers = true">
                            +添加指导老师</el-link>
                    </div>

                </div>
            </div>

            <el-button type="primary" style="margin-left: 300px;margin-top: 30px;width: 120px;"
                @click="add_achievement">发送请求
            </el-button>
            <el-button class="back-el-button" type="primary" @click="goBack"
                style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button>
        </div>

        <el-dialog title="添加团队成员" :visible.sync="visible_add_members" width="600px" @open="cleanAll_members">
            <el-form @submit.native.prevent>
                <el-form-item label="学院" :label-width="formLabelWidth">
                    <el-radio v-model="members_single.n" label="0" @change="set_input_members">本院</el-radio>
                    <el-radio v-model="members_single.n" label="1" @change="set_input_members">非本院</el-radio>
                </el-form-item>
                <el-form-item label="真实姓名" v-if="if_college" :label-width="formLabelWidth">
                    <el-input v-model="members_single.realName" :disabled="if_disabled" style="width: 220px;"
                        @keyup.enter.native="get_student" @blur="get_student" @input="get_student"></el-input>
                    <div v-if="members_selected.length != 0 && members_selected[0].realName!= null"
                        style="height: 300px;overflow: auto;">
                        <div v-for="(item,index) in members_selected" :key="index">
                            <!-- 这部分的状态控制非常复杂，应该存在更优解 -->
                            <p style="font-size: 10px;display: inline-block;">
                                {{item.realName}}&nbsp;&nbsp;{{item.stid}}&nbsp;<i class="el-icon-phone" />
                                {{item.phone}}</p>
                            <el-link v-if="members_name_selected != item.stid" type="primary"
                                style="display: inline-block;font-size: 10px;margin-left: 10px;"
                                @click="set_members(item)">选择</el-link>
                            <i class="el-icon-circle-check" v-if="members_name_selected == item.stid"
                                style="color: chartreuse;margin-left: 10px;" />
                        </div>
                    </div>
                    <p v-if="members_selected.length == 0 && members_single.n != '' && members_single.realName != ''"
                        style="color: crimson;">未找到该学生</p>
                </el-form-item>
                <el-form-item label="真实姓名" v-if="members_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="members_single.realName" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="班级" v-if="members_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="members_single.stu_class" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="学号" v-if="members_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="members_single.stid" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" v-if="members_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="members_single.phone" style="width: 220px;"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add_members">确 定</el-button>
                <el-button @click="visible_add_members = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加指导老师" :visible.sync="visible_add_teachers" width="600px" @close="cleanAll_teachers">
            <el-form @submit.native.prevent>
                <el-form-item label="学院" :label-width="formLabelWidth">
                    <el-radio v-model="teachers_single.n" label="0" @change="set_input_teachers">本院</el-radio>
                    <el-radio v-model="teachers_single.n" label="1" @change="set_input_teachers">非本院
                    </el-radio>
                </el-form-item>
                <el-form-item label="真实姓名" v-if="if_college" :label-width="formLabelWidth">
                    <el-input v-model="teachers_single.realName" :disabled="if_disabled" style="width: 220px;"
                        @keyup.enter.native="get_teacher" @blur="get_teacher" @input="get_teacher"></el-input>
                    <div v-if="teachers_selected.length != 0 && teachers_selected[0].realName!= null"
                        style="height: 300px;overflow: auto;">
                        <div v-for="(item,index) in teachers_selected" :key="index">
                            <!-- 这部分的状态控制非常复杂，应该存在更优解 -->
                            <p style="font-size: 10px;display: inline-block;">
                                {{item.realName}}&nbsp;&nbsp;{{item.stid}}&nbsp;<i class="el-icon-phone" />
                                {{item.phone}}</p>
                            <el-link v-if="teachers_name_selected != item.stid" type="primary"
                                style="display: inline-block;font-size: 10px;margin-left: 10px;"
                                @click="set_teachers(item)">选择</el-link>
                            <i class="el-icon-circle-check" v-if="teachers_name_selected == item.stid"
                                style="color: chartreuse;margin-left: 10px;" />
                        </div>
                    </div>
                    <p v-if="teachers_selected.length == 0 && teachers_single.n != '' && teachers_single.realName != ''"
                        style="color: crimson;">未找到该教师</p>
                </el-form-item>
                <el-form-item label="真实姓名" v-if="teachers_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="teachers_single.realName" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="职称" v-if="teachers_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="teachers_single.ranks" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="院系" v-if="teachers_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="teachers_single.department" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" v-if="teachers_single.n == '1'" :label-width="formLabelWidth">
                    <el-input v-model="teachers_single.phone" style="width: 220px;"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add_teachers">确 定</el-button>
                <el-button @click="visible_add_teachers = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import Vue from 'vue';
    import {Base64} from 'js-base64';
    export default {
        name: "stuUpdateAchieve",
        components: {
            draggable
        },
        data() {
            return {
                achieve_id: '', //路径获取到的id
                achieve_type: '', //路径获取到的type
                user_id: '',
                type_name: '', //获取到的type转为中文
                info: [],
                formLabelWidth: '130px', //表单宽度
                if_members: false,
                if_college: true, //添加成员：判断是否是本院成员
                if_disabled: true, //添加成员：在未选定院系时禁止输入
                if_add_firstOrder: false, //添加成员：指定第一负责人
                if_loading: false, //上传时装填控制
                if_uploading: false,
                visible_add_members: false, //添加成员对话框
                visible_add_teachers: false, //添加老师对话框
                fileList: [], //上传的文件
                fileList_2: [], //上传的论文凭据
                competition: [], //获取到的竞赛列表
                competition_now: [], //在竞赛名称确定后，将该竞赛全部信息存入此数组
                projects: [], //项目名称列表
                projects_type: [], //获取到的项目作品列表
                options_prize: [], //奖项分布数据
                options_workType: [], //作品类型数据
                options_paper_level: [], //论文级别数据
                options_patent_type: [], //知识产权类型
                options_honor_type: [], //荣誉类型
                options_honor_level: [], //荣誉级别
                formdata: null, //上传的支撑材料暂存于此
                formdata_paper: null, //上传的论文凭据暂存于此
                members: [], //总成员信息数据
                members_single: { //单个成员信息，本院学生只用到realName
                    realName: '',
                    stu_class: '',
                    user_id: '',
                    stid: '',
                    phone: '',
                    n: '' //判断是否是本院学生
                },
                members_single_2: { //单个成员信息的中转信息，本院学生只用到realName
                    realName: '',
                    stu_class: '',
                    user_id: '',
                    stid: '',
                    phone: '',
                    team_order: '',
                },
                members_selected: [{}], //搜索到的该姓名学生列表,由于页面状态管理需要而在初始时设置一个空队列
                members_name_selected: '', //选择搜索到的学生列表中的学生，控制选择按钮
                teachers: [], //指导老师数据
                teachers_single: { //单个指导老师信息
                    realName: '',
                    phone: '',
                    ranks: '',
                    department: '',
                    n: '', //判断是否是本院教师
                },
                teachers_single_2: { //单个教师信息的中转信息，本院教师只用到realName
                    user_id: '',
                    realNmae: '',
                    stid: '',
                    phone: '',
                    ranks: '',
                    department: '',
                    team_order: '',
                },
                teachers_selected: [{}], //搜索到的该姓名教师列表,由于页面状态管理需要而在初始时设置一个空队列
                teachers_name_selected: '', //选择搜索到的教师列表中的教师，控制选择按钮
            }
        },
        methods: {
            check() {
                console.log(this.members)
            },

            goBack() {
                if (this.if_members) {
                    this.if_members = !this.if_members;
                } else {
                    this.$router.back(-1);
                }
            },

            async get_achievement() {
                if (this.achieve_type === "竞赛") {
                    await this.get_competition_single();
                } else if (this.achieve_type === "项目") {
                    await this.get_projects_single();
                } else if (this.achieve_type === "论文") {
                    await this.get_paper_single();
                } else if (this.achieve_type === "知识产权") {
                    await this.get_patent_single();
                } else if (this.achieve_type === "荣誉") {
                    await this.get_honor_single();
                }
                if (this.info.support_files) {
                    Vue.set(this.info, 'fileName', this.cut_fileName(this.info.support_files));
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
                        this.info.year = this.info.achieve_year.toString();
                        this.info.workType = this.info.work_type;
                        this.info.achieve_type = "竞赛";
                        this.info.type = 0;
                        this.info.rank = this.info.level_value;
                        this.info.competitionType = this.info.competition_type
                        this.members = this.info.students;
                        this.teachers = this.info.teachers;
                        Object.keys(this.members).forEach(res => {
                            if (this.members[res].user_id == this.info.user_id) {
                                this.members[res].rank = '第一负责人';
                            }
                        })

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
                        this.info.name = this.info.pro_name;
                        this.info.type = 1;
                        this.info.achieve_type = "项目";
                        this.members = this.info.students;
                        this.teachers = this.info.teachers;
                        this.set_projects_work_type();
                        this.get_projects();
                        Object.keys(this.members).forEach(res => {
                            if (this.members[res].user_id == this.info.user_id) {
                                this.members[res].rank = '第一负责人';
                            }
                        })

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
                        this.info.type = 2;
                        this.info.achieve_type = "论文";
                        this.info.name = this.info.paper_level;
                        this.info.rank = this.info.paper_level_value;
                        this.members = this.info.students;
                        this.teachers = this.info.teachers;
                        this.set_paper_rank();
                        this.set_paper_level();
                        Object.keys(this.members).forEach(res => {
                            if (this.members[res].user_id == this.info.user_id) {
                                this.members[res].rank = '第一负责人';
                            }
                        })

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
                        this.info.type = 3;
                        this.info.achieve_type = "知识产权";
                        this.members = this.info.students;
                        this.teachers = this.info.teachers;
                        this.get_patent_type();
                        Object.keys(this.members).forEach(res => {
                            if (this.members[res].user_id == this.info.user_id) {
                                this.members[res].rank = '第一负责人';
                            }
                        })

                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            async get_honor_single() {
                this.$api_achievement.user_search_achieve_nopass_single(this.achieve_id, 4).then(res => {
                    this.info = res;
                    this.info.type = 4;
                    this.info.achieve_type = "荣誉";
                    this.members = this.info.students;
                    this.teachers = this.info.teachers;
                    Object.keys(this.members).forEach(res => {
                        if (this.members[res].user_id === this.info.user_id) {
                            this.members[res].rank = '第一负责人';
                        }
                    })
                    this.get_honor_type();
                    this.get_honor_level();
                })
            },

            goNext() { //进入第二页
                let ready_to_go = true
                Object.keys(this.info).forEach(res => {
                    if (this.info[res] == '' && res != 'status' && res != 'support_files' && res != 'teachers' && res != 'students' && res != 'achieve_type' && res != 'type' && res != 'paper_level_value' && res != 'pno') {
                        ready_to_go = false
                        console.log(res)
                    }
                })
                if (ready_to_go == false) { //下一步前先验证表单完整性，先完成数据部分，支撑材料的验证之后再做
                    this.$message.error('请将表单填写完整');
                } else {
                    this.if_members = true;
                }
            },

            get_competition() { //获取竞赛信息数据
                var _this = this
                this.axios.get('/opt/achieve/list?choice=0&pageNum=0&pageSize=0', {
                    headers: {
                        'Token': this.Token
                    },
                })
                    .then(response => {
                        this.competition = response.data.data.list;

                        Object.keys(_this.competition).forEach(res => { //修改决赛时间的日期格式
                            _this.competition[res].finalDate = _this.competition[res].finalDate.substr(0, 10)
                        })
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            get_projects() { //获取项目名称数据
                var _this = this
                this.axios.get('/opt/achieve/list?choice=1&pageNum=0&pageSize=0', {
                    headers: {
                        'Token': this.Token
                    },
                })
                    .then(response => {
                        this.projects = response.data.data.list
                        /* Object.keys(_this.projects).forEach(res => { //修改决赛时间的日期格式
                          _this.projects[res].finalDate = _this.projects[res].finalDate.substr(0, 10)
                        }) */
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            get_project_type() { //获取项目作品类型数据
                this.axios.get('/opt/option/items?type=project_type', {
                    headers: {
                        'Token': this.Token
                    },
                })
                    .then(response => {
                        this.projects_type = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            get_journal_paper() { //获取期刊论文等级数据
                this.axios.get('/opt/option/paper/ranks?type=0', {
                    headers: {
                        'Token': this.Token
                    },
                })
                    .then(response => {
                        this.options_paper_level = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            get_conference_paper() { //获取会议论文等级数据
                this.axios.get('/opt/option/paper/ranks?type=1', {
                    headers: {
                        'Token': this.Token
                    },
                })
                    .then(response => {
                        this.options_paper_level = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            get_patent_type() { //获取知识产权类型
                this.axios.get('/opt/option/items?type=patent_type', {
                    headers: {
                        'Token': this.Token
                    },
                })
                    .then(response => {
                        this.options_patent_type = response.data.data
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            get_honor_type() {//获取荣誉类型
                this.$api_opt.admin_get_opt_item("honor_type").then(res => {
                    if (res.data.code === 2000) {
                        this.options_honor_type = res.data.data
                    }
                })
            },
            get_honor_level() { //获取荣誉级别
                this.$api_opt.admin_get_optLevel("honor").then(res => {
                    this.options_honor_level = res.data.data
                })
            },
            async get_student() { //搜索学生
                if (this.members_single.realName != '') {
                    this.members_selected = await this.$api_user.get_user_by_name_old(0, this.members_single.realName);
                } else {
                    this.members_selected = [];
                }
            },
            async get_teacher() { //搜索教师
                if (this.teachers_single.realName != '') {
                    this.teachers_selected = await this.$api_user.get_user_by_name_old(1, this.teachers_single.realName);
                } else {
                    this.teachers_selected = [];
                }
            },

            set_competition() { //上传竞赛：在竞赛名称确定后，将该竞赛的作品类型和获得奖项存入中转数组
                var _this = this
                Object.keys(_this.competition).forEach(res => { //从竞赛数组中拉出一组列表，将奖项和作品类型用分隔符隔开存到各自数组,同时保存等级和竞赛类型、年份
                    if (_this.competition[res].name == _this.info.competition_name) {
                        _this.options_prize = _this.competition[res].prizeRank
                        _this.options_workType = _this.competition[res].workType.split("/")
                        _this.info.rank = _this.competition[res].rank
                        _this.info.level = _this.competition[res].level
                        _this.info.competitionType = _this.competition[res].competitionType
                        _this.info.year = _this.competition[res].year.toString()
                        console.log(_this.options_workType);
                    }
                })

            },
            set_award_value() { //在选定竞赛的奖项后，同步获取其值
                Object.keys(this.options_prize).forEach(res => {
                    if (this.info.award == res) {
                        this.info.award_value = this.options_prize[res]
                    }
                })
            },
            set_paper_level() { //上传论文：在论文类型确定后，获取论文的级别
                if (this.info.paper_type == "期刊") {
                    this.get_journal_paper();
                } else {
                    this.get_conference_paper();
                }
                this.form_paper.name = '';
            },
            set_input_members() { //添加成员：选定本院或非本院后开放后续输入框
                if (this.members_single.n == '0') {
                    this.if_college = true
                    this.if_disabled = false
                } else {
                    this.if_college = false
                    this.if_disabled = false
                }
            },
            set_input_teachers() { //添加教师：选定本院或非本院后开放后续输入框
                if (this.teachers_single.n == '0') {
                    this.if_college = true
                    this.if_disabled = false
                } else {
                    this.if_college = false
                    this.if_disabled = false
                }
            },
            set_members(item) { //添加成员：选定本院成员后将其信息固定在特定中转数组
                var item_2 = JSON.stringify(item)
                var item_3 = JSON.parse(item_2)
                let ready_to_go = true;
                Object.keys(this.members).forEach(res => {
                    console.log(this.members[res].stid)
                    if (this.members[res].user_id == item_3.user_id) {
                        this.$message.error('已经添加该同学！');
                        ready_to_go = false;
                    }
                })
                if (ready_to_go) {
                    this.members_name_selected = item_3.stid
                    this.members_single_2 = item_3;
                    this.add_members();
                }
            },
            set_members_single() { //在函数中构造一个空函数压入成员的总数组
                var single = {}
                if (this.members_single.n == '1') {
                    Object.keys(this.members_single).forEach(res => {
                        single[res] = this.members_single[res]
                    })
                } else {
                    Object.keys(this.members_single_2).forEach(res => {
                        single[res] = this.members_single_2[res]
                    })
                }
                return single
            },
            set_teachers_single() { //在函数中构造一个空函数压入教师的总数组
                var single = {}
                if (this.teachers_single.n == '1') {
                    Object.keys(this.teachers_single).forEach(res => {
                        single[res] = this.teachers_single[res]
                    })
                } else {
                    Object.keys(this.teachers_single_2).forEach(res => {
                        single[res] = this.teachers_single_2[res]
                    })
                }
                return single
            },
            set_teachers(item) { //添加教师：选定本院教师后将其信息固定在特定中转数组
                var item_2 = JSON.stringify(item)
                var item_3 = JSON.parse(item_2)
                let ready_to_go = true;
                Object.keys(this.teachers).forEach(res => {
                    if (this.teachers[res].user_id == item_3.user_id) {
                        this.$message.error('已经添加该教师！');
                        ready_to_go = false;
                    }
                })
                if (ready_to_go) {
                    this.teachers_name_selected = item_3.stid
                    this.teachers_single_2 = item_3;
                    this.add_teachers();
                }
            },
            set_firstOrder(item, i) { //添加成员：指定第一负责人,分别在成果物表单指定（最终上传到服务器），在成员表单指定（显示在视图上）
                var item_2 = JSON.stringify(item)
                var item_3 = JSON.parse(item_2)
                this.info.user_id = item_3.user_id;
                Object.keys(this.members).forEach(res => {
                    this.members[res].rank = ''
                })
                Vue.set(this.members[i], 'rank', '第一负责人')
                this.if_add_firstOrder = false
            },
            set_doc(fileObj) { //本地保存上传的支撑材料
                this.if_uploading = true;
                this.formdata = new FormData()
                this.formdata.append('file', fileObj.file);
                this.axios.post('/support/upload?type=0', this.formdata, {
                    headers: {
                        'Token': this.Token,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                    .then(response => {
                        if (response.data.code == 2000) { //上传成功后将文件地址存在表单中
                            this.info.support_files = response.data.data;
                            this.if_uploading = false;
                        } else if (response.data.code != 2000) {
                            this.$message.error('上传失败');
                            this.if_uploading = false;
                        }
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            set_doc_paper(fileObj) { //本地保存上传的论文凭据材料
                this.if_uploading = true;
                this.formdata_paper = new FormData()
                this.formdata_paper.append('file', fileObj.file);
                this.axios.post('/support/upload?type=1', this.formdata_paper, {
                    headers: {
                        'Token': this.Token,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                    .then(response => {
                        if (response.data.code == 2000) { //上传成功后将文件地址存在表单中
                            this.info.retrieve = response.data.data;
                            this.if_uploading = false;
                        } else if (response.data.code != 2000) {
                            this.$message.error('上传失败');
                            this.if_uploading = false;
                        }
                    })
                    .catch(
                        function (response) {
                            console.log(response)
                        });
            },
            set_projects_work_type() { //在选定项目名称后锁定作品类型
                this.$forceUpdate();
                var _this = this
                Object.keys(_this.projects).forEach(res => {
                    if (_this.projects[res].name == _this.info.name) {
                        _this.info.project_type = _this.projects[res].project_type;
                    }
                })
            },
            set_paper_rank() { //选定论文级别的时候获取级别大小
                this.$forceUpdate();
                Object.keys(this.options_paper_level).forEach(res => {
                    if (this.options_paper_level[res].name == this.info.name) {
                        this.info.rank = this.options_paper_level[res].rank;
                    }
                })
            },

            exportData() { //下载支撑材料
                window.open(
                    this.info.support_files
                );
            },
            exportData_paper() { //下载论文凭据
                if (this.info.retrieve != null) {
                    window.open(
                        this.info.retrieve
                    );
                }
            },

            add_members() { //将选定的成员信息压入成员列表
                let ready_to_go = true;
                Object.keys(this.members_single).forEach(res => {
                    //为什么会有user_id?我在定义的时候并没有，也没有找到哪里附上了这个属性
                    if (this.members_single[res] == '' && res != 'user_id') {
                        console.log(res)
                        ready_to_go = false
                    }
                })
                if (this.members_single.n == '0' && this.members_single_2.realName != '' && this.members_single_2.realName != undefined) {
                    this.members.push(this.set_members_single())
                } else if (this.members_single.n == '1' && ready_to_go) {
                    this.members.push(this.set_members_single())
                }
                //压入成员列表后members_single没有清空，导致此处压入操作的状态控制没有生效
                Object.keys(this.members_single).forEach(res => {
                    this.members_single[res] = ''
                })
                Object.keys(this.members_single_2).forEach(res => {
                    this.members_single_2[res] = ''
                })
                this.visible_add_members = false
            },
            add_teachers() { //将选定的教师信息压入成员列表
                let ready_to_go = true;
                Object.keys(this.teachers_single).forEach(res => {
                    if (this.teachers_single[res] == '') {
                        console.log(res)
                        ready_to_go = false
                    }
                })
                if (this.teachers_single.n == '0' && this.teachers_single_2.realName != undefined && this.teachers_single_2.realName != '') {
                    this.teachers.push(this.set_teachers_single())
                } else if (this.teachers_single.n == '1' && ready_to_go) {
                    this.teachers.push(this.set_teachers_single())
                }
                Object.keys(this.teachers_single).forEach(res => {
                    this.teachers_single[res] = ''
                })
                Object.keys(this.teachers_single_2).forEach(res => {
                    this.teachers_single_2[res] = ''
                })
                this.visible_add_teachers = false
            },

            delete_members(i, item) { //删除成员卡片
                if (item.user_id == this.user_id) {
                    this.$message.error("本人不能删除")
                } else {
                    this.members.splice(i, 1)
                }
            },
            delete_teachers(i) { //删除教师卡片
                this.teachers.splice(i, 1)
            },

            cleanAll_members() { //所有的添加成员页面关闭状态都在这里控制，需要仔细检查
                this.if_disabled = true
                this.if_college = true
                this.members_name_selected = ''
                Object.keys(this.members_single).forEach(res => {
                    this.members_single[res] = ''
                })
                Object.keys(this.members_single_2).forEach(res => {
                    this.members_single_2[res] = ''
                })
                Object.keys(this.members_selected).forEach(res => {
                    this.members_selected[res] = ''
                })
            },
            cleanAll_teachers() { //所有的添加教师页面关闭状态都在这里控制，需要仔细检查
                this.if_disabled = true
                this.if_college = true
                this.teachers_name_selected = ''
                Object.keys(this.teachers_single).forEach(res => {
                    this.teachers_single[res] = ''
                })
                Object.keys(this.teachers_single_2).forEach(res => {
                    this.teachers_single_2[res] = ''
                })
                Object.keys(this.teachers_selected).forEach(res => {
                    this.teachers_selected[res] = ''
                })
            },

            async datadragEnd(evt) { //拖动组件视图更新时调用的函数
                console.log(this.members)
            },



            add_achievement() { //添加成果物，需要做好一个上传用表单，用表单上传后得到的id上传支撑材料
                this.if_loading = true;
                this.set_form()
            },
            set_form() { //由于上传表单过于复杂，需要通过次函数构建一个表单,根据成果物类型构建不同的表单
                if (this.info.user_id == '') {
                    this.$message.error("请为团队成员选择一位第一负责人")
                } else { //根据不同的成果类型构建不同表格
                    let count_1 = 1
                    let count_2 = 1
                    Object.keys(this.members).forEach(res => {
                        this.members[res].team_order = count_1;
                        count_1++;
                    })
                    Object.keys(this.teachers).forEach(res => {
                        this.teachers[res].team_order = count_2;
                        count_2++;
                    })
                    this.info.students = this.members;
                    this.info.teachers = this.teachers;
                    this.info.year = Number(this.info.year);
                    if (this.achieve_type == "竞赛") {
                        this.info.name = this.info.competition_name;
                    } else if (this.achieve_type == "项目") {
                        this.info.year = this.info.pro_date.substr(0, 4);;
                    } else if (this.achieve_type == "论文") {
                        this.info.year = this.info.release_date.substr(0, 4);;
                    } else if (this.achieve_type == "知识产权") {
                        this.info.year = this.info.grant_date.substr(0, 4);;
                    } else if (this.achieve_type === "荣誉") {
                        this.info.year = Number(this.info.honor_date.substr(0, 4));;
                    }
                }
                if (this.members.length != 0) {
                    this.info.level = this.info.competition_level;
                    this.axios.put('/diff/achieve/student/new', this.info, {
                        headers: {
                            'Token': this.Token
                        },
                    })
                        .then(response => {
                            if (response.data.code == 2000) {
                                this.$message.success("修改成功!");
                                this.if_loading = false;
                                this.$router.back(-2);
                                Object.keys(this.info).forEach(res => {
                                    this.info[res] = ''
                                })
                                this.members = [];
                                this.teachers = [];
                                this.achieve_id = '';
                            } else {
                                this.$message.error("修改失败!");
                                this.if_loading = false;
                            }
                        })
                        .catch(
                            function (response) {
                                console.log(response)
                            });
                } else {
                    this.$message.error('至少添加一位成员');
                    this.if_loading = false;
                }
            },
            //在线预览文件
            async view_file() {
                let url = await (this.$api_achievement.admin_get_download(this.info.support_files));
                window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
            },
            //下载支撑材料
            async download_file() {
                //await (this.$api_achievement.admin_download(this.info.support_files));
                let url = await (this.$api_achievement.admin_download(this.info.support_files));
                window.open(encodeURIComponent(url));
            },
            //在线预览检索凭证
            async view_file_paper() {
                let url = await (this.$api_achievement.admin_get_download(this.info.retrieve));
                window.open(sessionStorage.getItem('view_url') + encodeURIComponent(Base64.encode(url)));
            },
            //下载检索凭证
            async download_file_paper() {
                //await (this.$api_achievement.admin_download(this.info.retrieve));
                let url = await (this.$api_achievement.admin_download(this.info.retrieve));
                window.open(encodeURIComponent(url));
            },

            //切割文件名
            cut_fileName(fileName) {
                return fileName.split('A').slice(-1)[0];
            },
        },
        created() {
            this.achieve_id = this.$route.query.achieve_id;
            this.achieve_type = this.$route.query.type;
            this.user_id = this.$route.query.id;
            this.type_name = this.achieve_type;
            this.get_achievement();
        },
    }
</script>

<style>
</style>