<template>
  <div v-loading="if_loading">
    <div style="margin-top: 30px;margin-left: 50px;">

      <div style="width: 800px;">
        <el-steps :active="active" finish-status="success">
          <el-step title="添加成果物"></el-step>
          <el-step title="填写成果物信息"></el-step>
          <el-step title="添加成员信息"></el-step>
        </el-steps>
      </div>

      <div v-if="if_achievements">
        <p style="font-size: 30px;margin-top: 30px;display: inline-block;">成果物信息</p>
        <div style="margin-top: 30px;">
          <el-form width="500px">
            <el-form-item label="作品名称" :label-width="formLabelWidth">
              <el-input v-model="form_achievements.achieve_name" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="成果类型" :label-width="formLabelWidth" >
              <el-radio-group  v-model="form_achievements.achieve_type" @change="handleChange">
              <el-radio  label="竞赛" >竞赛</el-radio>
              <el-radio label="项目" >项目</el-radio>
              <el-radio  label="论文" >论文</el-radio>
              <el-radio  label="荣誉" >荣誉</el-radio>
              <el-radio  label="知识产权" >知识产权</el-radio>
           </el-radio-group>
            </el-form-item>
            <el-form-item label="成果简介" :label-width="formLabelWidth" style="font-weight: bold;">
              <el-input type="textarea" :rows="7" maxlength="320" resize="none" style="width: 600px;"
                v-model="form_achievements.achieve_summary" :placeholder=placeholder>
              </el-input>
              <span class="numLimit">{{form_achievements.achieve_summary.length}}/320</span>
            </el-form-item>
            <el-form-item label="上传支撑材料" :label-width="formLabelWidth">
              <el-upload class="upload-demo"  action="" :limit="1" :http-request="set_doc" multiple
                :file-list="fileList">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goNext" style="margin-top: 30px;margin-left: 30px;width: 120px;" :loading="if_uploading">下一步</el-button>
          <el-button class="back-el-button" type="primary" @click="$router.back(-1)"
            style="width: 120px;margin-top: 30px;margin-left: 30px;background-color: #fff;border: #4E6996 solid 1px;color:#4E6996">
            返回</el-button>
        </div>

      </div>

      <div v-if="if_competition">
        <p style="font-size: 30px;margin-top: 30px;display: inline-block;">竞赛信息</p>
        <div style="margin-top: 30px;">
          <el-form width="500px">
            <el-form-item label="竞赛名称" :label-width="formLabelWidth">
              <el-select v-model="form_competition.name" placeholder="选择竞赛名称" @change="set_competition"
                style="width: 400px;">
                <el-option v-for="item in competition" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作品类型" :label-width="formLabelWidth">
              <el-select v-model="form_competition.workType" placeholder="选择作品类型" style="width: 400px;">
                <el-option v-for="item in options_workType" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年份" :label-width="formLabelWidth">
              <el-date-picker v-model="form_competition.year" disabled type="year" placeholder="选择年份" format="yyyy">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="公布获奖日期" :label-width="formLabelWidth">
              <el-date-picker v-model="form_competition.award_date" type="date" placeholder="选择获奖日期" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="获得奖项" :label-width="formLabelWidth">
              <el-select v-model="form_competition.award" @change="set_award_value" placeholder="选择奖项" style="width: 400px;">
                <el-option v-for="(id,val) in options_prize" :key="id" :label="val" :value="val">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goNext_members" style="margin-top: 30px;margin-left: 30px;width: 120px;">下一步</el-button>
          <el-button class="back-el-button" type="primary" @click="goBack"
            style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button>
        </div>

      </div>

      <div v-if="if_projects">
        <p style="font-size: 30px;margin-top: 30px;display: inline-block;">项目信息</p>
        <div style="margin-top: 30px;">
          <el-form width="500px">
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-select v-model="form_projects.name" placeholder="选择项目名称" style="width: 400px;" @change="set_projects_work_type">
                <el-option v-for="item in projects" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作品类型" :label-width="formLabelWidth">
              <el-select v-model="form_projects.work_type" placeholder="选择作品类型" style="width: 400px;">
                <el-option v-for="item in projects_type" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="完成进度" :label-width="formLabelWidth">
              <el-radio v-model="form_projects.pro_schedule" label="立项">立项</el-radio>
              <el-radio v-model="form_projects.pro_schedule" label="结题">结题</el-radio>
            </el-form-item>
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form_projects.pro_date" type="date" placeholder="选择时间" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goNext_members" style="margin-top: 30px;margin-left: 30px;width: 120px;">下一步</el-button>
          <el-button class="back-el-button" type="primary" @click="goBack"
            style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button>
        </div>

      </div>

      <div v-if="if_paper">
        <p style="font-size: 30px;margin-top: 30px;display: inline-block;">论文信息</p>
        <div style="margin-top: 30px;">
          <el-form width="500px">
            <el-form-item label="发布时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form_paper.release_date" type="date" placeholder="选择时间" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="论文类型" :label-width="formLabelWidth">
              <el-radio v-model="form_paper.paper_type" label="期刊" @change="set_paper_level">期刊论文</el-radio>
              <el-radio v-model="form_paper.paper_type" label="会议" @change="set_paper_level">会议论文</el-radio>
            </el-form-item>
            <el-form-item label="期刊/会议名" :label-width="formLabelWidth">
              <el-input v-model="form_paper.conference_name" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="级别" :label-width="formLabelWidth">
              <el-select v-model="form_paper.name" placeholder="选择论文级别" style="width: 400px;" @change="set_paper_rank">
                <el-option v-for="item in options_paper_level" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检索凭证" :label-width="formLabelWidth">
              <el-upload class="upload-demo"  action="" :limit="1" :http-request="set_doc_paper" multiple
              :file-list="fileList_2">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goNext_members" style="margin-top: 30px;margin-left: 30px;width: 120px;" :loading="if_uploading">下一步</el-button>
          <el-button class="back-el-button" type="primary" @click="goBack"
            style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button>
        </div>

      </div>

      <div v-if="if_patent">
        <p style="font-size: 30px;margin-top: 30px;display: inline-block;">知识产权信息</p>
        <div style="margin-top: 30px;">
          <el-form width="500px">
            <el-form-item label="知识产权号" :label-width="formLabelWidth">
              <el-input v-model="form_patent.patent_number" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="知识产权类型" :label-width="formLabelWidth">
              <el-select v-model="form_patent.patent_type" placeholder="选择知识产权类型" style="width: 400px;" @change="set_paper_rank">
                <el-option v-for="item in options_patent_type" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form_patent.apply_date" type="date" placeholder="选择时间" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发布时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form_patent.grant_date" type="date" placeholder="选择时间" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goNext_members" style="margin-top: 30px;margin-left: 30px;width: 120px;">下一步</el-button>
          <el-button class="back-el-button" type="primary" @click="goBack"
            style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button>
        </div>

      </div>

      <div v-if="if_honor">
        <div>
        <p style="font-size: 24px;margin-top: 30px;display: inline-block;font-family: arial;color: #1f2f3d;font-weight: 400;">荣誉信息</p>
        </div>
        <div style="margin-top: 30px;">
          <el-form width="500px">
            <el-form-item label="荣誉类型" :label-width="formLabelWidth"style="font-weight: bold;">
              <el-select v-model="form_honor.honor_type" placeholder="选择荣誉类型" style="width: 400px;" @change="set_paper_rank">
                <el-option v-for="item in options_honor_type" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="荣誉级别" :label-width="formLabelWidth"style="font-weight: bold;">
              <el-select v-model="form_honor.honor_level" placeholder="选择荣誉级别" style="width: 400px;" @change="set_paper_rank">
                <el-option v-for="item in options_honor_level" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="获得时间" :label-width="formLabelWidth"style="font-weight: bold;">
              <el-date-picker v-model="form_honor.honor_date" type="date" placeholder="选择时间" value-format="yyyy-MM-dd"style="width:400px">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="goNext_members" style="width: 120px;margin-top: 30px;margin-left: 30px;">下一步</el-button>
          <el-button class="back-el-button" type="primary" @click="goBack" style="width: 120px;margin-top: 30px;margin-left: 30px;">返回</el-button>
        </div>

      </div>



      <div v-if="if_members">
        <p style="font-size: 30px;margin-top: 30px;display: inline-block;">团队信息</p>
        <div style="margin-left: 100px;">
          <p style="font-size: 20px;margin-top: 30px;">团队成员</p>
          <div style="margin-top: 30px;margin-left: 120px;">

            <draggable v-model="members" @update="datadragEnd" v-bind="{animation:200}">

              <div class="drag-item" v-for="(item,i) in members" :key="i">
                <div v-if="if_add_firstOrder" style="width: 502px;height: 92px;position: absolute;background-color: #BBBBBB;opacity: 0.2;">
                  <img src="../../../../../static/click.png" style="width: 10%;margin-left: 50%;margin-top: 5%;" @click="set_firstOrder(item,i)" />
                </div>
                <el-card class="box-card" style="width: 500px;height: 90px;margin-bottom: 20px;">
                  <div style="float: right;margin-top: -10px;">
                    <i class="el-icon-close" @click="delete_members(i,item)"></i>
                  </div>
                  <div style="border-style: solid;border-width: 2px;border-color: #D9D9D9; width: 50px;height: 50px;border-radius: 50%;">
                    <p style="margin-left: 20px;margin-top: 13px;">{{i+1}}</p>
                  </div>

                  <div style="margin-left: 70px;margin-top: -55px;">
                    <p style="display: inline-block;font-weight: bold;margin-bottom: 10px;">{{item.realName}}</p>
                    <p style="display: inline-block;margin-left: 20px;font-size: 12px;margin-bottom: 10px;">{{item.rank}}</p>
                  </div>
                  <div style="margin-left: 70px;">
                    <p style="display: inline-block;font-size: 12px;">{{item.stid}}</p>
                    <!-- <p style="display: inline-block;margin-left: 20px;font-size: 12px;">{{item.major}}</p> -->
                  </div>
                </el-card>
              </div>
            </draggable>
            <p style="color: crimson;margin-top: 30px;">提示：该顺序将影响小组内成员排名，可拖动顺序</p>
            <div style="margin-top: 30px;">
              <el-link type="primary" style="display: inline-block;" @click="visible_add_members = true">+添加团队成员</el-link>
            </div>

          </div>
        </div>

        <div style="margin-left: 100px;">
          <p style="font-size: 20px;margin-top: 30px;">指导教师</p>
          <div style="margin-top: 30px;margin-left: 120px;">
            <draggable v-model="teachers" @update="datadragEnd" v-bind="{animation:200}">
              <div class="drag-item" v-for="(item,i) in teachers" :key="i">
                <el-card class="box-card" style="width: 500px;height: 90px;margin-bottom: 20px;">
                  <div style="float: right;margin-top: -10px;">
                    <i class="el-icon-close" @click="delete_teachers(i)"></i>
                  </div>
                  <div style="border-style: solid;border-width: 2px;border-color: #D9D9D9; width: 50px;height: 50px;border-radius: 50%;">
                    <p style="margin-left: 20px;margin-top: 13px;">{{i+1}}</p>
                  </div>

                  <div style="margin-left: 70px;margin-top: -55px;">
                    <p style="display: inline-block;font-weight: bold;margin-bottom: 10px;">{{item.realName}}</p>
                  </div>
                  <div style="margin-left: 70px;">
                    <p style="display: inline-block;font-size: 12px;">{{item.stid}}</p>
                  </div>
                </el-card>
              </div>
            </draggable>
            <p style="color: crimson;margin-top: 30px;">提示：该顺序将影响小组内成员排名，可拖动顺序</p>
            <div style="margin-top: 30px;">
              <el-link type="primary" style="display: inline-block;" @click="visible_add_teachers = true">+添加指导老师</el-link>
            </div>

          </div>
        </div>

        <el-button type="primary" style="margin-left: 300px;margin-top: 30px;width: 120px;" @click="add_achievement">发送请求</el-button>
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
              @keyup.enter.native="get_student" @blur="get_student"  @input="get_student"></el-input>
              <div v-if="members_selected.length != 0 && members_selected[0].realName!= null" style="height: 100%;max-height: 300px;overflow: auto;width: 80%;border-width: 1px;border-style: solid;border-color:darkgray;margin-top: 5px;padding: 5px;">
            <div v-for="(item,index) in members_selected" :key="index" style="height: 100%;">
              <!-- 这部分的状态控制非常复杂，应该存在更优解 -->
              <!-- <p style="font-size: 10px;display: inline-block;">{{item.realName}}&nbsp;&nbsp;{{item.stid}}&nbsp;<i class="el-icon-phone" />
                {{item.phone}}</p>
              <el-link v-if="members_name_selected != item.stid" type="primary" style="display: inline-block;font-size: 10px;margin-left: 10px;"
                @click="set_members(item)">选择</el-link>
              <i class="el-icon-circle-check" v-if="members_name_selected === item.stid" style="color: chartreuse;margin-left: 10px;" /> -->
              <div style="font-size: 10px;margin-left: 3px;display: inline;overflow:hidden;">
                <div style="display: inline-block;width: 80px;text-align: left;"><p style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;width: 80px;">{{item.realName}}</p></div>
                <div style="display: inline-block;width: 80px;text-align: left;"><p style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{item.stid}}</p></div>
                <div style="display: inline-block;width: 100px;text-align: left;vertical-align:top;"><i class="el-icon-phone" v-if="item.phone" style="display: inline;" /><p style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;display: inline;" v-if="item.phone">{{item.phone}}</p></div>
                <div style="display: inline-block;width: 50px;float: right;">
                <el-link v-if="members_name_selected != item.stid" type="primary" style="display: inline;font-size: 10px;margin-left: 10px;"
                @click="set_members(item)">选择</el-link>
              <i class="el-icon-circle-check" v-if="members_name_selected == item.stid" style="color: chartreuse;margin-left: 10px;display: inline;" /></div>
              </div>
            </div>
            </div>
            <p v-if="members_selected.length === 0 && members_single.n != '' && members_single.realName != ''"
              style="color: crimson;">未找到该学生</p>
          </el-form-item>
          <el-form-item label="真实姓名" v-if="members_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="members_single.realName" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="班级" v-if="members_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="members_single.stu_class" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="学号" v-if="members_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="members_single.stid" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="手机号" v-if="members_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="members_single.phone" style="width: 220px;"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_members">确 定</el-button>
          <el-button @click="visible_add_members = false">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog title="" :visible.sync="visible_add_teachers" width="600px" @open="cleanAll_teachers">
        <el-form @submit.native.prevent>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-radio v-model="teachers_single.n" label="0" @change="set_input_teachers">本院</el-radio>
            <el-radio v-model="teachers_single.n" label="1" @change="set_input_teachers">非本院</el-radio>
          </el-form-item>
          <el-form-item label="真实姓名" v-if="if_college" :label-width="formLabelWidth">
            <el-input v-model="teachers_single.realName" :disabled="if_disabled" style="width: 220px;"
              @keyup.enter.native="get_teacher" @blur="get_teacher"  @input="get_teacher"></el-input>
              <div v-if="teachers_selected.length != 0 && teachers_selected[0].realName!= null" style="height: 100%;max-height: 300px;overflow: auto;width: 80%;border-width: 1px;border-style: solid;border-color:darkgray;margin-top: 5px;padding: 5px;">
            <div v-for="(item,index) in teachers_selected" :key="index" >
              <!-- 这部分的状态控制非常复杂，应该存在更优解 -->
              <!-- <p style="font-size: 10px;display: inline-block;">{{item.realName}}&nbsp;&nbsp;{{item.stid}}&nbsp;<i class="el-icon-phone" />
                {{item.phone}}</p>
              <el-link v-if="teachers_name_selected != item.stid" type="primary" style="display: inline-block;font-size: 10px;margin-left: 10px;"
                @click="set_teachers(item)">选择</el-link>
              <i class="el-icon-circle-check" v-if="teachers_name_selected === item.stid" style="color: chartreuse;margin-left: 10px;" /> -->
              <div style="font-size: 10px;margin-left: 3px;display: inline;height: 100%;overflow:hidden;">
                <div style="display: inline-block;width: 80px;text-align: left;"><p style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;width: 80px;">{{item.realName}}</p></div>
                <div style="display: inline-block;width: 80px;text-align: left;"><p style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{item.stid}}</p></div>
                <div style="display: inline-block;width: 100px;text-align: left;vertical-align:top;"><i class="el-icon-phone" v-if="item.phone" style="display: inline;" /><p style="overflow: hidden;white-space: nowrap;text-overflow:ellipsis;display: inline;" v-if="item.phone">{{item.phone}}</p></div>
                <div style="display: inline-block;width: 50px;float: right;">
                <el-link v-if="members_name_selected != item.stid" type="primary" style="display: inline;font-size: 10px;margin-left: 10px;"
                @click="set_teachers(item)">选择</el-link>
              <i class="el-icon-circle-check" v-if="members_name_selected == item.stid" style="color: chartreuse;margin-left: 10px;display: inline;" /></div>
              </div>
            </div>
            </div>
            <p v-if="teachers_selected.length === 0 && teachers_single.n != '' && teachers_single.realName != ''"
              style="color: crimson;">未找到该教师</p>
          </el-form-item>
          <el-form-item label="真实姓名" v-if="teachers_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="teachers_single.realName" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="职称" v-if="teachers_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="teachers_single.ranks" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="院系" v-if="teachers_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="teachers_single.department" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="手机号" v-if="teachers_single.n === '1'" :label-width="formLabelWidth">
            <el-input v-model="teachers_single.phone" style="width: 220px;"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add_teachers">确 定</el-button>
          <el-button @click="visible_add_teachers = false">取 消</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import Vue from 'vue'
  export default {
    name:"stuUpdateAdd",
    components: {
      draggable
    },
    data() {
      return {
        placeholder:'',
        user_id: this.$store.getters.user_id,
        active: 0, //导航栏指示器
        formLabelWidth: '100px', //表单宽度
        if_achievements: true, //不同成果物表单
        if_competition: false,
        if_projects: false,
        if_paper: false,
        if_patent: false,
        if_honor: false,
        if_members: false,
        if_loading:false, //上传时状态控制
        if_uploading:false,
        if_college: true, //添加成员：判断是否是本院成员
        if_disabled: true, //添加成员：在未选定院系时禁止输入
        if_add_firstOrder: false, //添加成员：指定第一负责人
        visible_add_members: false, //添加成员对话框
        visible_add_teachers: false, //添加老师对话框
        form_achievements: { //成果物公共数据
          achieve_name: '',
          achieve_type: '',
          achieve_summary: '',
          support_files: '',
          user_id: '' //指定第一负责人
        },
        form_competition: { //竞赛数据
          name: '',
          rank: '',
          competitionType: '',
          workType: '',
          award_date: '',
          award: '',
          award_value: '',
          year:'',
          level:'',
        },
        form_projects: { //项目数据
          name: '',
          pro_schedule: '',
          work_type:'',
          project_type:'',
          pro_date: '',
          year:'',
          pno:''
        },
        form_paper: { //论文数据
          release_date: '',
          paper_type: '',
          conference_name: '',
          name: '',
          rank:'',
          year:'',
          retrieve: null
        },
        form_patent: { //知识产权数据
          patent_type:'',
          patent_number:'',
          apply_date:'',
          grant_date:'',
          year:''
        },
        form_honor: { //荣誉数据
          honor_type: '',
          honor_level: '',
          honor_date: '',
          year:'',
        },
        fileList: [], //上传的文件
        fileList_2: [], //上传的论文凭据
        competition: [], //获取到的竞赛列表
        competition_now: [], //在竞赛名称确定后，将该竞赛全部信息存入此数组
        projects:[], //项目名称列表
        projects_type: [], //获取到的项目作品列表
        options_prize: [], //奖项分布数据
        options_workType: [], //作品类型数据
        options_paper_level: [], //论文级别数据
        options_patent_type:[], //知识产权类型
        options_honor_type:[], //荣誉类型
        options_honor_level:[], //荣誉级别
        formdata:null, //上传的支撑材料暂存于此
        formdata_paper:null, //上传的论文凭据暂存于此
        achieve_id:'', //上传成果物表单后返回的表单id
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
      handleChange(val){
        console.log(val)
        if(val=='竞赛'){
          this.placeholder="请输入作品概要介绍或赛事介绍"
        }else if(val=="项目"){
          this.placeholder="请输入作品概要介绍"
        }else if(val=="论文")
        {
          this.placeholder="请输入论文概要"
        }else if(val=="荣誉"){
           this.placeholder="请输入荣誉的颁发单位及时间"
        }else if(val==="知识产权"){
          this.placeholder="请输入专利的概要内容"
        }else{
          this.placeholder=""
        }
      },
      check(){
        console.log(this.members)
      },

      goBack(){
        if(this.if_members === true){
          this.if_members = false;
          if(this.form_achievements.achieve_type === "竞赛"){
            this.if_achievements = false;
              this.if_competition = true;
              this.if_paper = false;
              this.if_patent = false;
              this.if_projects = false;
            this.if_members = false;
            this.if_honor = false;
          }else if(this.form_achievements.achieve_type === "项目"){
            this.if_achievements = false;
              this.if_competition = false;
              this.if_paper = false;
              this.if_patent = false;
              this.if_projects = true;
            this.if_members = false;
            this.if_honor = false;
          }else if(this.form_achievements.achieve_type === "论文"){
            this.if_achievements = false;
              this.if_competition = false;
              this.if_paper = true;
              this.if_patent = false;
              this.if_projects = false;
            this.if_members = false;
            this.if_honor = false;
          }else if(this.form_achievements.achieve_type === "知识产权"){
            this.if_achievements = false;
              this.if_competition = false;
              this.if_paper = false;
              this.if_patent = true;
              this.if_projects = false;
            this.if_members = false;
            this.if_honor = false;
          }else if (this.form_achievements.achieve_type == '荣誉') {
            this.if_achievements = false;
              this.if_competition = false;
              this.if_paper = false;
              this.if_patent = false;
              this.if_projects = false;
            this.if_members = false;
            this.if_honor = true;
          }
        }else if(this.if_members===false && this.if_achievements === false){
          this.if_competition = false;
          this.if_projects = false;
          this.if_paper = false;
          this.if_patent = false;
          this.if_honor = false;
          this.if_achievements = true;
        }
      },

      goNext() { //进入第二页
      console.log(this.form_achievements)
        let ready_to_go = true
        Object.keys(this.form_achievements).forEach(res => {
          if (this.form_achievements[res] === '' && res != 'user_id' && res != 'support_files') {
            ready_to_go = false
            console.log(res)
          }
        })
        if (ready_to_go === false) { //下一步前先验证表单完整性，先完成数据部分，支撑材料的验证之后再做
          this.$message.error('请将表单填写完整');
        } else if (this.form_achievements.achieve_type === "竞赛") {
          this.get_competition()
          this.if_achievements = false,
            this.if_competition = true,
            this.if_paper = false,
            this.if_patent = false,
            this.if_projects = false
            console.log(this.form_competition)
          if (this.active++ > 2) this.active = 0;
        } else if (this.form_achievements.achieve_type === "项目") {
          this.get_projects();
          this.if_achievements = false,
            this.if_competition = false,
            this.if_paper = false,
            this.if_patent = false,
            this.if_projects = true
          if (this.active++ > 2) this.active = 0;
        } else if (this.form_achievements.achieve_type === "论文") {
          this.if_achievements = false,
            this.if_competition = false,
            this.if_paper = true,
            this.if_patent = false,
            this.if_projects = false
          if (this.active++ > 2) this.active = 0;
        } else if (this.form_achievements.achieve_type === "知识产权") {
          this.get_patent_type();
          this.if_achievements = false,
            this.if_competition = false,
            this.if_paper = false,
            this.if_patent = true,
            this.if_projects = false
          if (this.active++ > 2) this.active = 0;
        }else if (this.form_achievements.achieve_type == "荣誉") {
          this.get_honor_type();
          this.get_honor_level();
          this.if_achievements = false;
            this.if_competition = false;
            this.if_paper = false;
            this.if_patent = false;
            this.if_projects = false;
            this.if_honor = true;
          if (this.active++ > 2) this.active = 0;
        }
      },

      goNext_members() { //进入第三页
        let ready_to_go = true
        if (this.form_achievements.achieve_type === "竞赛") {
          Object.keys(this.form_competition).forEach(res => {
            if (this.form_competition[res] === '') {
              ready_to_go = false
              console.log(res)
            }
          })
        } else if (this.form_achievements.achieve_type === "项目") {
          this.form_projects.year = Number(this.form_projects.pro_date.substr(0,4));
          Object.keys(this.form_projects).forEach(res => {
            if (this.form_projects[res] === '' && res != 'pno') {
              console.log(res)
              ready_to_go = false
            }
          })
        } else if (this.form_achievements.achieve_type === "论文") {
          this.form_paper.year = Number(this.form_paper.release_date.substr(0,4));
          Object.keys(this.form_paper).forEach(res => {
            if (this.form_paper[res] === '') {
              console.log(res)
              ready_to_go = false
            }else if(this.formdata_paper === null){
            ready_to_go = false
          }
          })
        } else if (this.form_achievements.achieve_type === "知识产权") {
          this.form_patent.year = Number(this.form_patent.grant_date.substr(0,4));
          Object.keys(this.form_patent).forEach(res => {
            if (this.form_patent[res] === '') {
              console.log(res)
              ready_to_go = false
            }
          })
        }else if (this.form_achievements.achieve_type == "荣誉") {
          this.form_honor.year = this.form_honor.honor_date.substr(0,4);
          Object.keys(this.form_honor).forEach(res => {
            if (this.form_honor[res] == '') {
              console.log(res)
              ready_to_go = false
            }
          })
        } 

        if (ready_to_go === false) { //下一步前先验证表单完整性，先完成数据部分，支撑材料的验证之后再做
          this.$message.error('请将表单填写完整');
        } else {
          this.get_mine();
          this.if_achievements = false,
            this.if_competition = false,
            this.if_paper = false,
            this.if_patent = false,
            this.if_projects = false,
            this.if_honor = false,
            this.if_members = true
          if (this.active++ > 2) this.active = 0;
        }
      },

      get_competition() { //获取竞赛信息数据
        var _this = this
        this.axios.get('/opt/achieve/list?choice=0&pageNum=0&pageSize=0', {
            
          })
          .then(response => {
            this.competition = response.data.data.list
            Object.keys(_this.competition).forEach(res => { //修改决赛时间的日期格式
              _this.competition[res].finalDate = _this.competition[res].finalDate.substr(0, 10)
            })
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      get_projects() { //获取项目名称数据
        var _this = this
        this.axios.get('/opt/achieve/list?choice=1&pageNum=0&pageSize=0', {
            
          })
          .then(response => {
            this.projects = response.data.data.list
            /* Object.keys(_this.projects).forEach(res => { //修改决赛时间的日期格式
              _this.projects[res].finalDate = _this.projects[res].finalDate.substr(0, 10)
            }) */
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      /* get_project_type() { //获取项目作品类型数据
        this.axios.get('/opt/option/items?type=project_type', {
            
          })
          .then(response => {
            this.projects_type = response.data.data
          })
          .catch(
            function(response) {
              console.log(response)
            });
      }, */
      get_journal_paper() { //获取期刊论文等级数据
        this.$api_opt.admin_get_optLevel("journal").then(res => {
          this.options_paper_level = res.data.data
        })
      },
      get_conference_paper() { //获取会议论文等级数据
        this.$api_opt.admin_get_optLevel("conference").then(res => {
          this.options_paper_level = res.data.data
        })
      },
      get_patent_type() { //获取知识产权类型
        this.axios.get('/opt/option/items?type=patent_type', {
            
          })
          .then(response => {
            this.options_patent_type = response.data.data
          })
          .catch(
            function(response) {
              console.log(response)
            });
      },
      get_mine() { //搜索本人信息
        let user_id = this.$store.getters.user_id;
        this.axios.get('/user/stu/info?user_id=' + user_id, {
          
        })
          .then(response => {
            if(response.data.code===2000){
              let ready_to_go = true;
              Object.keys(this.members).forEach(res =>{
                if(this.members[res].stid === mine.stid){
                  ready_to_go = false;
                }
              })
              //如果之前没有本人信息，则压入本人信息，否则则说明该学生返回后再进入成员页面，防止二次压入
              if(ready_to_go){
                let mine = response.data.data;
                delete mine.stu_class;
                this.members.push(mine);
                Vue.set(mine, 'rank', '第一负责人')
              }
            }
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_honor_type(){//获取荣誉类型
        this.$api_opt.admin_get_opt_item("honor_type").then(res=>{
          if(res.data.code===2000){
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
        this.form_competition.workType = ''
        var _this = this
        Object.keys(_this.competition).forEach(res => { //从竞赛数组中拉出一组列表，将奖项和作品类型用分隔符隔开存到各自数组,同时保存等级和竞赛类型、年份
          if (_this.competition[res].name === _this.form_competition.name) {
            _this.options_prize = _this.competition[res].prizeRank
            _this.options_workType = _this.competition[res].workType.split("/")
            _this.form_competition.rank = _this.competition[res].rank
            _this.form_competition.level = _this.competition[res].level
            _this.form_competition.competitionType = _this.competition[res].competitionType
            _this.form_competition.year = _this.competition[res].year.toString();
          }
        })
      },
      set_award_value(){ //在选定竞赛的奖项后，同步获取其值
        Object.keys(this.options_prize).forEach(res => {
          if(this.form_competition.award === res){
            this.form_competition.award_value = this.options_prize[res]
          }
        })
      },
      set_paper_level() { //上传论文：在论文类型确定后，获取论文的级别
        if(this.form_paper.paper_type ==="期刊"){
          this.get_journal_paper();
        }else{
          this.get_conference_paper();
        }
        this.form_paper.name = '';
      },
      set_input_members() { //添加成员：选定本院或非本院后开放后续输入框
        if (this.members_single.n === '0') {
          this.if_college = true
          this.if_disabled = false
        } else {
          this.if_college = false
          this.if_disabled = false
        }
      },
      set_input_teachers() { //添加教师：选定本院或非本院后开放后续输入框
        if (this.teachers_single.n === '0') {
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
          if (this.members[res].stid === item_3.stid) {
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
      set_members_single(){ //在函数中构造一个空函数压入成员的总数组
        var single = {}
        if(this.members_single.n === '1'){
          Object.keys(this.members_single).forEach(res => {
          single[res] = this.members_single[res]
        })
        }else{
          Object.keys(this.members_single_2).forEach(res => {
          single[res] = this.members_single_2[res]
        })
        }
        return single
      },
      set_teachers_single(){ //在函数中构造一个空函数压入教师的总数组
        var single = {}
        if(this.teachers_single.n === '1'){
          Object.keys(this.teachers_single).forEach(res => {
          single[res] = this.teachers_single[res]
        })
        }else{
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
          if (this.teachers[res].user_id === item_3.user_id) {
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
        this.form_achievements.user_id = item_3.user_id;
        Object.keys(this.members).forEach(res => {
          this.members[res].rank = ''
        })
        Vue.set(this.members[i], 'rank', '第一负责人')
        this.if_add_firstOrder = false
      },
      set_doc(fileObj){ //本地保存上传的支撑材料
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
            if (response.data.code === 2000) { //上传成功后将文件地址存在表单中
              this.form_achievements.support_files = response.data.data;
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
      set_doc_paper(fileObj){ //本地保存上传的论文凭据材料
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
            if (response.data.code === 2000) { //上传成功后将文件地址存在表单中
              this.form_paper.retrieve = response.data.data;
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
        this.form_projects.work_type = '';
        Object.keys(this.projects).forEach(res => {
          if (this.projects[res].name === this.form_projects.name) {
            this.projects_type = this.projects[res].work_type.split("/");
            this.form_projects.project_type = this.projects[res].project_type;
          }
        })
      },
      set_paper_rank(){ //选定论文级别的时候获取级别大小
        Object.keys(this.options_paper_level).forEach(res => { 
          if (this.options_paper_level[res].name === this.form_paper.name) {
            this.form_paper.rank = this.options_paper_level[res].rank;
          }
        })
      },

      add_members() { //将选定的成员信息压入成员列表
        let ready_to_go = true;
        Object.keys(this.members_single).forEach(res => {
          //为什么会有user_id?我在定义的时候并没有，也没有找到哪里附上了这个属性
          if (this.members_single[res] === '' && res != 'user_id' && res != 'team_order') {
            console.log(res)
            ready_to_go = false
          }
        })
        if (this.members_single.n === '0' && this.members_single_2.realName != '' && this.members_single_2.realName != undefined) {
          this.members.push(this.set_members_single())
        } else if (this.members_single.n === '1' && ready_to_go) {
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
          if (this.teachers_single[res] === '') {
            console.log(res)
            ready_to_go = false
          }
        })
        console.log(this.teachers_single_2.realName);
        if (this.teachers_single.n === '0' && this.teachers_single_2.realName != undefined && this.teachers_single_2.realName != '') {
          this.teachers.push(this.set_teachers_single())
        } else if (this.teachers_single.n === '1' && ready_to_go) {
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

      delete_members(i,item) { //删除成员卡片
        if(item.user_id === this.user_id){
          this.$message.error("本人不能删除")
        }else{
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
          this.members_single[res] = ''
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
        let ready_to_go =false;
        Object.keys(this.members).forEach(res =>{
          if(this.members[res].user_id == this.user_id){
            ready_to_go = true;
          }
        })
        if(ready_to_go){
          this.if_loading = true;
        this.set_form()
        }else{
          this.$message.error("团队成员需包含自己")
        }
      },
      set_form() { //由于上传表单过于复杂，需要通过次函数构建一个表单,根据成果物类型构建不同的表单
      let form = {}
          Object.keys(this.form_achievements).forEach(res => {
            Vue.set(form, res, this.form_achievements[res])
          })
          if (this.form_achievements.achieve_type === '竞赛') {
            Object.keys(this.form_competition).forEach(res => {
              Vue.set(form, res, this.form_competition[res])
            })
            Vue.set(form, 'type', 0)
          } else if (this.form_achievements.achieve_type === '项目') {
            Object.keys(this.form_projects).forEach(res => {
              Vue.set(form, res, this.form_projects[res])
            })
            Vue.set(form, 'type', 1)
          } else if (this.form_achievements.achieve_type === '论文') {
            Object.keys(this.form_paper).forEach(res => {
              Vue.set(form, res, this.form_paper[res])
            })
            Vue.set(form, 'type', 2)
          } else if (this.form_achievements.achieve_type === '知识产权') {
            Object.keys(this.form_patent).forEach(res => {
              Vue.set(form, res, this.form_patent[res])
            })
            Vue.set(form, 'type', 3)
          }else if (this.form_achievements.achieve_type == "荣誉") {
            Object.keys(this.form_honor).forEach(res => {
              Vue.set(form, res, this.form_honor[res])
            })
            Vue.set(form, 'type', 4)
          }
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
          Vue.set(form,"students",this.members)
          Vue.set(form,"teachers",this.teachers)
          Vue.set(form, "user_id", this.user_id)
        console.log(form)
        this.axios.post('/diff/achieve/student/new', form,{
              headers: {
                'Token': this.Token
              },
            })
            .then(response => {
              if(response.data.code ===2000){
              this.$message.success("上传成功!");
                this.if_loading = false;
                this.$router.back(-1)
                if (this.active++ > 1) this.active = 0;
                Object.keys(this.form_achievements).forEach(res => {
                  this.form_achievements[res] = ''
                })
                Object.keys(this.form_competition).forEach(res => {
                  this.form_competition[res] = ''
                })
                Object.keys(this.form_projects).forEach(res => {
                  this.form_projects[res] = ''
                })
                Object.keys(this.form_patent).forEach(res => {
                  this.form_patent[res] = ''
                })
                this.members = [];
                this.teachers = [];
                this.achieve_id = '';
              }else{
                this.$message.error('上传失败！');
                this.if_loading = false;
              }
            })
            .catch(
              function(response) {
                console.log(response)
              });
        },
    },
     
  
    created() {
    },
  }
</script>

<style>
</style>
