<template>
    <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
        <div style="width: 100%;min-width: 800px;">
    <div class="header" style="margin-top: 10px;">

      <el-tabs type="border-card" v-model="nowTab" @tab-click="getData" style="margin-top: 10px;">

        <el-tab-pane label="竞赛" :lazy="true" name="competition" style="margin-left: 80px;margin-bottom: 30px;">

          <div style="margin-top: 30px;">

            <div style="display: inline;margin-right: 30px;">
              竞赛类型
            </div>

            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i) in competition_type" :key="i"
                closable @close="open_delete('competition_type',item.id)">
                {{item.name}}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_competition_type" v-model="input.competition_type"
                ref="saveTagInput" size="small" @keyup.enter.native="add_competition_type" @blur="add_competition_type">
              </el-input>
              <el-button v-if="!visible_competition_type" class="button-new-tag" size="small"
                @click="showInput_competition_type" style="margin-left: 20px;">+ 增加类型</el-button>
            </div>

          </div>

          <div>

            <div style="display: inline-block;margin-top: 30px;margin-right: 30px;margin-left: -32px;">
              竞赛作品类型
            </div>

            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i)  in competition_work_type" :key="i"
                closable @close="open_delete('competition_work_type',item.id)">
                {{item.name}}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_competition_work_type" v-model="input.competition_work_type"
                ref="saveTagInput" size="small" @keyup.enter.native="add_competition_work_type"
                @blur="add_competition_work_type">
              </el-input>
              <el-button v-if="!visible_competition_work_type" class="button-new-tag" size="small"
                @click="showInput_competition_work_type" style="margin-left: 20px;">+ 增加类型</el-button>
            </div>
          </div>

          <div>
            <p style="display: inline-block;margin-top: 30px;margin-right: 30px;margin-left: -32px;">奖项分布方式</p>
            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i)  in prizes" :key="i" closable
                @close="open_delete_prizes(item)">
                {{item}}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_prizes" v-model="input.prizes" ref="saveTagInput"
                size="small" @keyup.enter.native="add_prizes" @blur="add_prizes">
              </el-input>
              <el-button v-if="!visible_prizes" class="button-new-tag" size="small" @click="showInput_prizes"
                style="margin-left: 20px;">+
                增加类型</el-button>
            </div>
          </div>

          <p style="color: crimson;margin-left: 100px;">请以【/】左斜杠分割开每一项，顺序将影响奖项分值及后续评分</p>


          <div style="display: inline-block;margin-top: 30px;margin-right: 30px;">
            竞赛级别
          </div>
          <div style="margin-top: -25px;margin-left: 120px;">
            <draggable v-model="level_form.competition" v-bind="{animation:200}">
              <div class="drag-item" v-for="(item,i) in level_form.competition" :key="i" style="margin-top: 10px;">
                <el-card class="box-card" style="width: 700px;height: 40px;margin-bottom: 0px;padding: 0;">
                  <div style="margin-top: -10px;">
                    <p style="display: inline-block;">{{item.name}}</p>
                    <div style="display: inline-block;float: right;">
                      <i class="el-icon-edit" @click="open_modify_competition_level(item.name,i)"></i>
                      <i class="el-icon-close" @click="delete_all_level(i)"></i>
                    </div>
                  </div>
                </el-card>
              </div>
            </draggable>
            <el-card class="box-card"
              style="width: 700px;height: 40px;margin-bottom: 20px;padding: 0;margin-top: 10px;">
              <div style="margin-top: -15px;">
                <p style="font-size: 25px;text-align: center;" @click="visible_competition_level = true">+</p>
              </div>
            </el-card>
          </div>
          <p style="color: crimson;margin-bottom: 10px;margin-left: 100px;">提示：顺序可拖动，将影响级别分值及后续评分，添加完后需点击保存</p>
          <el-button type="primary" style="margin-left: 43%;margin-top: 30px;" @click="add_all_level">保存竞赛级别
          </el-button>

        <el-dialog title="添加竞赛级别" :visible.sync="visible_competition_level" width="30%">
          <el-input v-model="form_competition_level_single.name" @keyup.enter.native="add_competition_level_local">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_competition_level = false">取 消</el-button>
            <el-button type="primary" @click="add_competition_level_local">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="修改竞赛级别分布" :visible.sync="visible_modify_competition_level" width="30%">
          <el-input v-model="input.competition_level" @keyup.enter.native="modify_competition_level"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_modify_competition_level = false">取 消</el-button>
            <el-button type="primary" @click="modify_competition_level">确 定</el-button>
          </span>
        </el-dialog>

        </el-tab-pane>

        <!-- -------------------------------------------------------------------------------------------------------------------- -->
        <el-tab-pane label="项目" :lazy="true" name="projects" style="margin-left: 80px;margin-bottom: 30px;">

          <div>
            <p style="display: inline-block;margin-top: 30px;margin-right: 30px;">项目类型</p>
            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i)  in project_type" :key="i" closable
                @close="open_delete('project_type',item.id)">
                {{item.name}}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_project_type" v-model="input.project_type"
                ref="saveTagInput" size="small" @keyup.enter.native="add_project_type" @blur="add_project_type">
              </el-input>
              <el-button v-if="!visible_project_type" class="button-new-tag" size="small"
                @click="showInput_project_type" style="margin-left: 20px;">+ 增加类型</el-button>
            </div>
          </div>

          <div>
            <p style="display: inline-block;margin-top: 30px;margin-right: 30px;margin-left: -32px;">项目作品类型</p>
            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i)  in project_work_type" :key="i"
                closable @close="open_delete('project_work_type',item.id)">
                {{item.name}}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_project_work_type" v-model="input.project_work_type"
                ref="saveTagInput" size="small" @keyup.enter.native="add_project_work_type"
                @blur="add_project_work_type">
              </el-input>
              <el-button v-if="!visible_project_work_type" class="button-new-tag" size="small"
                @click="showInput_project_work_type" style="margin-left: 20px;">+
                增加类型</el-button>
            </div>
          </div>

        </el-tab-pane>

        <!-- -------------------------------------------------------------------------------------------------------------------- -->


        <el-tab-pane label="荣誉" :lazy="true" name="honor"
          style="margin-left: 80px;margin-bottom: 30px;margin-top: 20px;">

          <div>
            <p style="display: inline-block;margin-top: 30px;margin-right: 30px;">荣誉类型</p>
            <div style="width: 80%;margin-top: -25px;margin-left: 100px;">
              <el-tag style="margin-left: 20px;margin-bottom: 20px;" v-for="(item,i)  in honor_type" :key="i" closable
                @close="open_delete('honor_type',item.id)">
                {{item.name}}
              </el-tag>
              <el-input class="input-new-tag" v-if="visible_honor_type" v-model="input.honor_type"
                ref="saveTagInput" size="small" @keyup.enter.native="add_honor_type" @blur="add_honor_type">
              </el-input>
              <el-button v-if="!visible_honor_type" class="button-new-tag" size="small"
                @click="showInput_honor_type" style="margin-left: 20px;">+ 增加类型</el-button>
            </div>
          </div>

          <div>
            <div style="display: inline-block;margin-top: 30px;margin-right: 30px;">
              荣誉级别
            </div>
            <div style="margin-top: -25px;margin-left: 120px;">
              <draggable v-model="level_form.honor" v-bind="{animation:200}">
                <div class="drag-item" v-for="(item,i) in level_form.honor" :key="i" style="margin-top: 10px;">
                  <el-card class="box-card" style="width: 700px;height: 40px;margin-bottom: 0px;padding: 0;">
                    <div style="margin-top: -10px;">
                      <p style="display: inline-block;">{{item.name}}</p>
                      <div style="display: inline-block;float: right;">
                        <i class="el-icon-edit" @click="open_modify_honor_level(item.name,i)"></i>
                        <i class="el-icon-close" @click="delete_all_level(i)"></i>
                      </div>
                    </div>
                  </el-card>
                </div>
              </draggable>
              <el-card class="box-card"
                style="width: 700px;height: 40px;margin-bottom: 20px;padding: 0;margin-top: 10px;">
                <div style="margin-top: -15px;">
                  <p style="font-size: 25px;text-align: center;" @click="visible_honor_level = true">+</p>
                </div>
              </el-card>
            </div>
            <p style="color: crimson;margin-bottom: 10px;margin-left: 100px;">提示：顺序可拖动，将影响级别分值及后续评分，添加完后需点击保存</p>
            <el-button type="primary" style="margin-left: 43%;margin-top: 30px;" @click="add_all_level">保存荣誉级别
            </el-button>
  
          <el-dialog title="添加荣誉级别" :visible.sync="visible_honor_level" width="30%">
            <el-input v-model="form_honor_level_single.name" @keyup.enter.native="add_honor_level_local">
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="visible_honor_level = false">取 消</el-button>
              <el-button type="primary" @click="add_honor_level_local">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="修改荣誉级别分布" :visible.sync="visible_modify_honor_level" width="30%">
            <el-input v-model="input.honor_level" @keyup.enter.native="modify_honor_level"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="visible_modify_competition_level = false">取 消</el-button>
              <el-button type="primary" @click="modify_competition_level">确 定</el-button>
            </span>
          </el-dialog>
          </div>


        </el-tab-pane>
        <el-dialog title="添加知识产权类型" :visible.sync="visible_patent_type" width="30%" :closed="handleClose_delete">
          <el-input v-model="input.patent_type" @keyup.enter.native="add_patent_type"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_patent_type = false">取 消</el-button>
            <el-button type="primary" @click="add_patent_type">确 定</el-button>
          </span>
        </el-dialog>

        <!-- -------------------------------------------------------------------------------------------------------------------- -->

        <el-tab-pane label="知识产权类型" :lazy="true" name="patent"
          style="margin-left: 80px;margin-bottom: 30px;margin-top: 20px;">

          <div>
            <p style="margin-top: 0px;margin-left: 0px;font-size: 25px;margin-bottom: 30px;">知识产权类型</p>
            <div v-for="(item,i)  in patent_type" :key="i" style="width: 400px;margin-bottom: 10px;" class="patent">
              <el-tag closable style="width: 400px;" @close="open_delete('patent_type',item.id)">
                {{item.name}}
              </el-tag>
            </div>
            <el-tag style="width: 400px;margin-bottom: 10px;">
              <div style="margin-left: 195px;" @click="visible_patent_type = true">+</div>
            </el-tag>
          </div>


        </el-tab-pane>
        <el-dialog title="添加知识产权类型" :visible.sync="visible_patent_type" width="30%" :closed="handleClose_delete">
          <el-input v-model="input.patent_type" @keyup.enter.native="add_patent_type"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_patent_type = false">取 消</el-button>
            <el-button type="primary" @click="add_patent_type">确 定</el-button>
          </span>
        </el-dialog>

        <!-- -------------------------------------------------------------------------------------------------------------------- -->


        <el-tab-pane label="主办单位" :lazy="true" name="host" style="margin-left: 80px;margin-bottom: 30px;">

          <div>
            <p style="margin-top: 0px;margin-left: 0px;font-size: 25px;margin-bottom: 30px;">主办单位</p>
            
            <div class="row_6" style="margin-top: 10px; margin-left: 0px;margin-bottom: 10px;">
              <div style="display: inline;">
                <el-input v-model="selected.name" placeholder="请输入需要搜索的名称" @input="getData"
                    @keyup.enter.native="getData" size="mini" style="width: 160px">
                </el-input>
            </div>
              <div style="overflow: hidden; display: inline;margin-left: 20px;cursor: pointer;" @click="selected.name='',getData()">
                  <p style="display: inline;font-family: helvetica;color: #6B7F91;">取消</p>
              </div>
              
              
          </div>
            <div v-for="(item,i)  in host" :key="i" style="width: 400px;margin-bottom: 10px;" class="patent">
              <el-tag closable style="width: 800px;" @close="open_delete('host',item.id)">
                <!-- TODO:超出的条目鼠标移上去应该显示全部的文字 -->
                <p style="width: 760px;text-overflow:ellipsis;overflow:hidden;display: inline-block;">{{item.name}}</p>
              </el-tag>
            </div>
            <el-tag style="width: 800px;margin-bottom: 10px;">
              <div style="margin-left: 400px" @click="visible_host = true">+</div>
            </el-tag>
          </div>

          <el-pagination style="margin-top: 60px; margin-left: 20%" @size-change="selected.size = $event,getData()"
          @current-change="getData" :current-page.sync="current_page" :page-sizes="[30, 60, 100, 200]"
          :page-size.sync="selected.size" layout="total, sizes, prev, pager, next, jumper"
          :total.sync="size_total">
      </el-pagination>

        </el-tab-pane>
        <el-dialog title="添加主办单位" :visible.sync="visible_host" width="30%" :before-close="handleClose_delete" @close="visible_host = false">
          <el-input v-model="input.host" @keyup.enter.native="add_host"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_host = false">取 消</el-button>
            <el-button type="primary" @click="add_host">确 定</el-button>
          </span>
        </el-dialog>

        <!-- -------------------------------------------------------------------------------------------------------------------- -->

        <el-tab-pane label="期刊论文级别" :lazy="true" name="journal" style="margin-left: 80px;margin-bottom: 30px;">
          <p style="color: crimson;margin-bottom: 10px;">提示：顺序可拖动，将影响级别分值及后续评分</p>
          <div style="margin-top: 20px;">
            <draggable v-model="level_form.journal" v-bind ="{animation:200}">
              <div class="drag-item" v-for="(item,i) in level_form.journal" :key="i" style="margin-top: 10px;">
                <el-card class="box-card" style="width: 700px;height: 40px;margin-bottom: 0px;padding: 0;">
                  <div style="margin-top: -10px;">
                    <p style="display: inline-block;">{{item.name}}</p>
                    <div style="display: inline-block;float: right;">
                      <!-- <i class="el-icon-edit" @click="open_modify_journal_paper(item.name,i)"></i> -->
                      <i class="el-icon-close" @click="delete_all_level(i)"></i>
                    </div>
                  </div>
                </el-card>
              </div>
            </draggable>
            <el-card class="box-card"
              style="width: 700px;height: 40px;margin-bottom: 20px;padding: 0;margin-top: 10px;">
              <div style="margin-top: -15px;">
                <p style="font-size: 25px;text-align: center;" @click="visible_journal_paper = true">+</p>
              </div>
            </el-card>
          </div>
          <el-button type="primary" style="margin-left: 31%;margin-top: 30px;" @click="add_all_level">保存</el-button>
        </el-tab-pane>

        <el-dialog title="添加期刊论文级别" :visible.sync="visible_journal_paper" width="30%">
          <el-input v-model="form_journal_paper_single.name" @keyup.enter.native="add_journal_paper_local"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_journal_paper = false">取 消</el-button>
            <el-button type="primary" @click="add_journal_paper_local">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="修改期刊论文级别" :visible.sync="visible_modify_journal_paper" width="30%">
          <el-input v-model="input.journal_paper" @keyup.enter.native="modify_journal_paper"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_modify_journal_paper = false">取 消</el-button>
            <el-button type="primary" @click="modify_journal_paper">确 定</el-button>
          </span>
        </el-dialog>

        <!-- -------------------------------------------------------------------------------------------------------------------- -->

        <el-tab-pane label="会议论文级别" :lazy="true" name="conference" style="margin-left: 80px;margin-bottom: 30px;">
          <p style="color: crimson;margin-bottom: 10px;">提示：顺序可拖动，将影响级别分值及后续评分</p>
          <div style="margin-top: 20px;">
            <draggable v-model="level_form.conference" v-bind="{animation:200}">
              <div class="drag-item" v-for="(item,i) in level_form.conference" :key="i" style="margin-top: 10px;">
                <el-card class="box-card" style="width: 700px;height: 40px;margin-bottom: 0px;padding: 0;">
                  <div style="margin-top: -10px;">
                    <p style="display: inline-block;">{{item.name}}</p>
                    <div style="display: inline-block;float: right;">
                      <!-- <i class="el-icon-edit" @click="open_modify_conference_paper(item.name,i)"></i> -->
                      <i class="el-icon-close" @click="delete_all_level(i)"></i>
                    </div>
                  </div>
                </el-card>
              </div>
            </draggable>
            <el-card class="box-card"
              style="width: 700px;height: 40px;margin-bottom: 20px;padding: 0;margin-top: 10px;">
              <div style="margin-top: -15px;">
                <p style="font-size: 25px;text-align: center;" @click="visible_conference_paper = true">+</p>
              </div>
            </el-card>
          </div>
          <el-button type="primary" style="margin-left: 31%;margin-top: 30px;" @click="add_all_level">保存
          </el-button>

        </el-tab-pane>

        <el-dialog title="添加会议论文级别" :visible.sync="visible_conference_paper" width="30%">
          <el-input v-model="form_conference_paper_single.name" @keyup.enter.native="add_conference_paper_local">
          </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_conference_paper = false">取 消</el-button>
            <el-button type="primary" @click="add_conference_paper_local">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="修改会议论文级别" :visible.sync="visible_modify_conference_paper" width="30%">
          <el-input v-model="input.conference_paper" @keyup.enter.native="modify_conference_paper"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible_modify_conference_paper = false">取 消</el-button>
            <el-button type="primary" @click="modify_conference_paper">确 定</el-button>
          </span>
        </el-dialog>

      </el-tabs>

      <!-- -------------------------------------------------------------------------------------------------------------------- -->

      <el-dialog title="确定要删除吗" :visible.sync="visible_delete" width="30%" :before-close="handleClose_delete">
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible_delete = false">取 消</el-button>
          <el-button type="primary" @click="delete_choosed">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除奖项分布单独使用一个对话框 -->
      <el-dialog title="确定要删除吗" :visible.sync="visible_delete_prizes" width="30%" :before-close="handleClose_delete">
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible_delete_prizes = false">取 消</el-button>
          <el-button type="primary" @click="delete_prizes">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: "admin_addItem",
    components: {
      draggable
    },
    data() {
      return {
        competition_type: [], //竞赛类型
        competition_work_type: [], //竞赛作品类型
        prizes: [], //奖项分布
        project_type: [], //项目类型
        project_work_type: [], //项目作品类型
        patent_type: [], //知识产权类型
        honor_type: [], //荣誉类型
        level_form:{
          journal:[],
          conference:[],
          honor:[],
          competition:[],
        },
        host: [], //主办单位
        visible_competition_type: false, //增加竞赛类型输入框
        visible_competition_work_type: false, //增加竞赛作品类型输入框
        visible_prizes: false, //增加奖项分布输入框
        visible_project_type: false, //增加项目类型输入框
        visible_project_work_type: false, //增加项目作品类型输入框
        visible_honor_type: false, //增加荣誉类型输入框
        visible_honor_level:false,//增加荣誉级别输入框
        visible_modify_honor_level: false, //修改荣誉等级对话框
        visible_host: false, //增加主办单位输入框
        visible_delete: false, //确认删除对话框
        visible_delete_prizes: false, //奖项分布确认删除对话框
        visible_patent_type: false, //增加知识产权类型对话框
        visible_journal_paper: false, //增加期刊论文等级对话框
        visible_modify_journal_paper: false, //修改期刊论文等级对话框
        visible_conference_paper: false, //增加会议论文等级对话框
        visible_modify_conference_paper: false, //修改会议论文等级对话框
        visible_competition_level: false, //增加竞赛级别对话框
        visible_modify_competition_level: false, //修改会议论文级别对话框
        delete_type: '', //所选的删除类型
        delete_id: '', //所选的删除项的id
        nowTab: 'competition',
        input: {
          competition_type: '', //输入的竞赛类型
          competition_work_type: '', //输入的竞赛作品类型
          prizes: '', //输入的奖项分布类型
          project_type: '', //输入的项目类型
          project_work_type: '', //输入的项目作品类型
          patent_type: '', //输入的知识产权类型
          journal_paper: '', //输入的期刊论文等级
          conference_paper: '', //输入的会议论文等级
          host: '', //输入的主办单位
          competition_level: '', //输入竞赛级别
          honor_type:'',//输入的荣誉类型
          honor_level:'',//输入的荣誉级别
          index: '', //该输入项对应数据列表中的位置
        },
        //TODO:添加级别的操作可以简化
        form_journal_paper_single: { //单个期刊论文等级表单，用以附加到总表单中
          name: '',
          rank: '',
        },
        form_conference_paper_single: { //单个会议论文等级表单，用以附加到总表单中
          name: '',
          rank: '',
        },
        form_competition_level_single: { //单个竞赛级别表单，用以附加到总表单中
          name: '',
          rank: ''
        },
        form_honor_level_single: { //单个荣誉级别表单，用以附加到总表单中
          name: '',
          rank: ''
        },
        selected: {//主办单位多条件查询存放选项
                    name: '',
                    size: 30,
                    start: 0,
                },
                pages_total: 1, //表格最大页数
                current_page: 1, //表格当前页数
                size_total: 1, //表格当前条目数
      }
    },
    methods: {
      get_competition_type() { //获取竞赛类型数据
        this.axios.get('/opt/option/items?type=competition_type', {

        })
          .then(response => {
            this.competition_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_competition_work_type() { //获取竞赛作品类型数据
        this.axios.get('/opt/option/items?type=competition_work_type', {

        })
          .then(response => {
            this.competition_work_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_prizes() { //获取奖项分布
        this.axios.get('/opt/option/distribution/prize/group', {

        })
          .then(response => {
            this.prizes = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_project_type() { //获取项目作品数据
        this.axios.get('/opt/option/items?type=project_type', {

        })
          .then(response => {
            this.project_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_project_work_type() { //获取项目作品类型数据
        this.axios.get('/opt/option/items?type=project_work_type', {
        })
          .then(response => {
            this.project_work_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_patent_type() { //获取知识产权类型数据
        this.axios.get('/opt/option/items?type=patent_type', {
        })
          .then(response => {
            this.patent_type = response.data.data
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      get_host() { //获取主办单位数据
        this.selected.start = this.current_page;
        this.$api_opt.admin_get_host(this.selected).then(res=>{
          if(res.data.code===2000){
            this.host = res.data.data.list;
                this.pages_total = res.data.data.pages;
                this.size_total = res.data.data.total;
          }
        })
      },
      get_honor_type(){//获取荣誉类型
        this.$api_opt.admin_get_opt_item("honor_type").then(res=>{
          if(res.data.code===2000){
            this.honor_type = res.data.data;
          }
        })
      },
      get_opt_level() { //获取多个成果物类别的级别数据
        this.$api_opt.admin_get_optLevel(this.nowTab).then(res => {
          this.level_form[this.nowTab] = res.data.data
        })
      },
      post_opt_level() { //保存多个成果物类别的级别数据
        this.$api_opt.admin_post_optLevel(this.nowTab,this.level_form[this.nowTab]).then(res => {
          if (res.data.code == 2000) {
              this.$message.success('保存成功');
              this.getData()
            } else {
              this.$message.error('保存失败');
            }
        })
      },

      //根据标签获取数据
      getData() {
        switch (this.nowTab) {
          case 'competition':
            this.get_competition_type();
            this.get_competition_work_type();
            this.get_prizes();
            this.get_opt_level();
            break;
          case 'projects':
            this.get_project_type();
            this.get_project_work_type();
            break;
          case 'patent':
            this.get_patent_type();
            break;
          case 'host':
            this.get_host();
            break;
          case 'honor':
            this.get_honor_type();
            this.get_opt_level();
          case 'journal':
            this.get_opt_level();
            break;
          case 'conference':
            this.get_opt_level();
            break;
        }
      },

      add_competition_type() { //增加竞赛类别
        if (this.input.competition_type != '') {
          this.axios.post('/opt/option/item?type=competition_type&value=' + this.input.competition_type, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              this.get_competition_type()
              this.input.competition_type = ''
              this.visible_competition_type = false
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_competition_type = false
        }
      },

      add_competition_work_type() { //增加竞赛作品类别
        if (this.input.competition_work_type != '') {
          this.axios.post('/opt/option/item?type=competition_work_type&value=' + this.input.competition_work_type, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              this.get_competition_work_type()
              this.input.competition_work_type = ''
              this.visible_competition_work_type = false
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_competition_work_type = false
        }
      },
      add_prizes() { //增加奖项分布
        if (this.input.prizes != '') {
          this.axios.post('/opt/option/distribution/prize?prizeDistributionStr=' + this.input.prizes, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              this.get_prizes()
              this.input.prizes = ''
              this.visible_prizes = false
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_prizes = false
        }
      },
      add_project_type() { //增加项目类型
        if (this.input.project_type != '') {
          this.axios.post('/opt/option/item?type=project_type&value=' + this.input.project_type, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              this.get_project_type()
              this.input.project_type = ''
              this.visible_project_type = false
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_project_type = false
        }
      },
      add_project_work_type() { //增加项目作品类型
        if (this.input.project_work_type != '') {
          this.axios.post('/opt/option/item?type=project_work_type&value=' + this.input.project_work_type, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              this.get_project_work_type()
              this.input.project_work_type = ''
              this.visible_project_work_type = false
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_project_work_type = false
        }
      },
      add_honor_type(){//增加荣誉类型
        if (this.input.honor_type != '') {
        this.$api_opt.admin_post_opt_item("honor_type",this.input.honor_type).then(res=>{
          this.getData()
              this.input.honor_type = ''
              this.visible_honor_type = false
        })
        }
      },
      add_patent_type() { //增加知识产权类型
        if (this.input.patent_type != '') {
          this.axios.post('/opt/option/item?type=patent_type&value=' + this.input.patent_type, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              if (response.data.code == 2000) {
                this.$message.success('保存成功');
                this.get_patent_type()
                this.input.project_patent_type = ''
                this.visible_patent_type = false;
              } else {
                this.$message.error('保存失败');
              }
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_patent_type = false
        }
      },
      add_host() { //增加主办单位
        if (this.input.host != '') {
          this.axios.post('/opt/option/item?type=host&value=' + this.input.host, {}, {
            headers: {
              'Token': this.Token,
            },
          })
            .then(response => {
              if (response.data.code == 2000) {
                this.$message.success('保存成功');
                this.get_host()
                this.input.host = ''
                this.visible_host = false;
              } else {
                this.$message.error('保存失败');
              }
            })
            .catch(
              function (response) {
                console.log(response)
              });
        } else {
          this.visible_host = false
        }
      },
      add_journal_paper_local() { //在本地添加期刊论文等级
        this.level_form.journal.push(this.form_journal_paper_single)
        this.visible_journal_paper = false
        this.form_journal_paper_single = {
          'name': '',
          'rank': '',
        }
      },
      add_conference_paper_local() { //在本地添加会议论文等级
        this.level_form.conference.push(this.form_conference_paper_single)
        this.visible_conference_paper = false
        this.form_conference_paper_single = {
          'name': '',
          'rank': '',
        }
      },
      add_competition_level_local() { //在本地添加竞赛级别
        this.level_form.competition.push(this.form_competition_level_single)
        this.visible_competition_level = false
        this.form_competition_level_single = {
          'name': '',
          'rank': '',
        }
      },
      add_honor_level_local() { //在本地添加荣誉级别
        this.level_form.honor.push(this.form_honor_level_single)
        this.visible_honor_level = false
        this.form_honor_level_single = {
          'name': '',
          'rank': '',
        }
      },
      add_all_level() { //增加多个成果物类别的等级
        let count = 1
        Object.keys(this.level_form[this.nowTab]).forEach(res => {
          this.level_form[this.nowTab][res].rank = count
          count++
        })
        this.post_opt_level();
      },

      open_delete(type, id) { //打开删除确认对话框，奖项分布另用一个函数
        this.visible_delete = true
        this.delete_type = type
        this.delete_id = id
      },
      open_delete_prizes(id) { //打开奖项分布删除确认对话框
        this.visible_delete_prizes = true
        this.delete_id = id
      },
      open_modify_journal_paper(name, i) { //打开本地修改期刊论文类型对话框
        this.input.level_form.journal = name
        this.visible_modify_journal_paper = true
        this.input.index = i
      },
      open_modify_conference_paper(name, i) { //打开本地修改会议论文类型对话框
        this.input.conference_paper = name
        this.visible_modify_conference_paper = true
        this.input.index = i
      },
      open_modify_competition_level(name, i) { //打开本地修改竞赛级别对话框
        this.input.competition_level = name
        this.visible_modify_competition_level = true
        this.input.index = i
      },
      open_modify_honor_level(name, i) { //打开本地修改荣誉级别对话框
        this.input.honor_level = name
        this.visible_modify_honor_level = true
        this.input.index = i
      },

      modify_journal_paper() { //本地修改期刊论文类型
        this.level_form.journal[this.input.index].name = this.input.journal_paper
        this.visible_modify_journal_paper = false
        this.input.journal_paper = ''
      },
      modify_conference_paper() { //本地修改会议论文类型
        this.level_form.conference[this.input.index].name = this.input.conference_paper
        this.visible_modify_conference_paper = false
        this.input.conference_paper = ''
      },
      modify_competition_level() { //本地修改竞赛级别
        this.level_form.competition[this.input.index].name = this.input.competition_level
        this.visible_modify_competition_level = false
        this.input.competition_level = ''
      },
      modify_honor_level() { //本地修改荣誉级别
        this.level_form.honor[this.input.index].name = this.input.honor_level
        this.visible_modify_honor_level = false
        this.input.honor_level = ''
      },

      delete_choosed() { //删除所选项，奖项分布另用一个函数
        //TODO:传递删除的选项
        this.axios.delete('/opt/option/item?type=' + this.delete_type + '&id=' + this.delete_id, {
          headers: {
            'Token': this.Token,
          },
        })
          .then(response => {
            this.getData()
            this.visible_delete = false
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      delete_prizes() { //删除奖项分布
        this.axios.delete('/opt/option/distribution/prize?prizeDistributionStr=' + this.delete_id, {
          headers: {
            'Token': this.Token,
          },
        })
          .then(response => {
            this.get_prizes()
            this.visible_delete_prizes = false
          })
          .catch(
            function (response) {
              console.log(response)
            });
      },
      delete_all_level(i) { //本地删除多个成果物类别的等级
        this.level_form[this.nowTab].splice(i, 1)
      },

      handleClose_delete() { //关闭确认删除对话框清除数据，防止污染
        Object.keys(this.input).forEach(res => {
          this.input[res] = ''
        })
        console.log(this.input)
      },

      showInput_competition_type() { //点击增加类型后，产生新的输入框
        this.visible_competition_type = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showInput_competition_work_type() {
        this.visible_competition_work_type = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showInput_project_type() {
        this.visible_project_type = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showInput_project_work_type() {
        this.visible_project_work_type = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showInput_prizes() {
        this.visible_prizes = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showInput_honor_type() {
        this.visible_honor_type = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

    },
    created() {
      this.getData();
    },
  }
</script>

<style scoped lang="scss">
  /deep/.input-new-tag {
    width: 90px;
    margin-left: 20px;
    /* vertical-align: bottom; */
  }

  /deep/ .patent>.el-tag .el-icon-close {
    float: right;
    top: 5px
  }
  /deep/ .el-checkbox__inner {
        display: none;
    }
</style>