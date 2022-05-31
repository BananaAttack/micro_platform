import axios from 'axios'
import Vue from 'vue'
import axios_config from '../api/axios_config'

//从axios配置中获取BASE地址
let BASE = axios_config.BASE;

let USER_EXPORT_ACHIEVE_ALL = BASE + '/query/excel/user/achievement';
let ADMIN_EXPORT_ACHIEVE_SINGLE = BASE + '/query/adm/excel/achieve';
let ADMIN_SEARCH_ACHIEVE = BASE + '/query/all/admin/pass/achieve';
let ADMIN_SEARCH_COMPETITION = BASE + '/query/all/competition';
let ADMIN_SEARCH_PAPER = BASE + '/query/all/paper';
let ADMIN_SEARCH_PATENT = BASE + '/query/all/patent';
let ADMIN_SEARCH_PROJECT = BASE + '/query/all/project';
let ADMIN_SEARCH_HONOR = BASE + '/query/all/honor';

let ADMIN_SEARCH_ACHIEVE_BY_ID = BASE + '/query/achieves';

let ADMIN_EXPORT_ACHIEVE_SUBSET = BASE + '/query/subcollection/file';

let USER_SEARCH_ACHIEVEMENT = BASE + '/query/user/pass/achievement';
let USER_SEARCH_OTHER_ACHIEVEMENT = BASE + '/query/other/user/pass/achievement';
let USER_SEARCH_ACHIEVE_NOPASS = BASE + '/query/user/nopass/achievement';
let USER_SEARCH_ACHIEVE_CHECKING = BASE + '/query/stu/achievement';



export default {
  name: "ServerApi_query",
  props: {
    set_export_excel(res) {
      const link = document.createElement('a')
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', `学生科技平台成果物导出.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    set_export_subset_excel(res,name) {
      const link = document.createElement('a')
      const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', `${name}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    /**
     * 所有角色导出总成果物excel报表
     * @param info 数组，每项包含以下参数
     * @param type 0竞赛/1项目/2论文/3知识产权
    * @param achieve_id_list 数组,只包含id，为数字
     */
    user_export_achieve_all: function (info) {
      axios.post(
        USER_EXPORT_ACHIEVE_ALL,
        info,
        { responseType: 'blob' }
      ).then(res => {
        //下载为excel
        //TODO 查看返回值状态码，以此判断是否执行
        this.set_export_excel(res);
      })
    },
        /**
     * 管理员导出成果子集
     * @param info list，包含如下字段
     * @param filename string
     * @param id int
     */
    admin_export_achieve_subset: function (filename,id) {
      //window.open(ADMIN_EXPORT_ACHIEVE_SUBSET+'?filename='+filename+'&id='+id);
      axios.get(
        ADMIN_EXPORT_ACHIEVE_SUBSET,
        //{filename:filename,id:id},
        {params:{filename:filename,id:id},responseType: 'arraybuffer' },
        //{ responseType: 'arraybuffer' }
      ).then(res => {
        //下载为excel
        this.set_export_subset_excel(res,filename);
      })
    },
    /**
     * 管理员导出各类“成果”excel报表
     * @param type 0竞赛/1项目/2论文/3知识产权/4荣誉
    * @param achieve_id_list 数组,只包含id，为数字
     */
    admin_export_achieve_single: function (type, achieve_id_list) {
      axios.post(
        ADMIN_EXPORT_ACHIEVE_SINGLE,
        { type: type, achieve_id_list: achieve_id_list },
        { responseType: 'blob' }
      ).then(res => {
        //下载为excel
        //TODO 查看返回值状态码，以此判断是否执行
        this.set_export_excel(res);
      })
    },
    /**
     * 管理员条件搜索所有成果物的概述
     * @param info object，包含如下属性
     * @param achieve_type 数组，多条件成果物类型
     * @param achieve_year 数组，多条件年份
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_achieve: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_ACHIEVE,
          info
        ).then(res => {resolve(res.data.data)
        
        console.log(res)})
      })
    },
    /**
     * 管理员按条件查询所有竞赛详情
     * @param info object，包含如下属性
     * @param achieve_year 数组
     * @param award 数组
     * @param competition_level 数组
     * @param competition_type 数组
     * @param work_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_competition: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_COMPETITION,
          info
        ).then(res => {
          resolve(res.data.data)
          console.log("look res",res.data)
        })
      })
    },
    /**
     * 管理员按条件查询所有论文详情
     * @param info object，包含如下属性
     * @param achieve_year 数组
     * @param paper_level 数组
     * @param paper_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_paper: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_PAPER,
          info
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员按条件查询所有知识产权详情
     * @param info object，包含如下属性
     * @param achieve_year 数组
     * @param patent_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_patent: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_PATENT,
          info
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员按条件查询所有项目详情
     * @param info object，包含如下属性
     * @param category 数组
     * @param pro_schedule 数组
     * @param work_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_project: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_PROJECT,
          info
        ).then(res => resolve(res.data.data))
      })
    },
    /**
 * 管理员按条件查询所有荣誉详情
 * @param info object，包含如下属性
 * @param achieve_year 数组
 * @param honor_level 数组 配置项
 * @param honor_type 数组 配置项
 * @param user_id 数组
 * @param keyWord string
 * @param start
 * @param size
 */
    admin_search_honor: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_HONOR,
          info
        ).then(res => resolve(res.data.data))
      })
    },
        /**
     * 管理员根据id列表查询成果物列表
     * @param info object，包含如下属性
     * @param idListOfAchievements array
     * @param pageNum int
     * @param pageSize int
     */
    admin_search_achievement_by_id: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_ACHIEVE_BY_ID,
          info
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 用户按条件查询所有成果物详情
     * @param info object，包含如下属性
     * @param achieve_type 数组，多条件成果物类型
     * @param achieve_year 数组，多条件年份
     * @param user_id 数组
     * @param size
     * @param start
     */
    user_search_achievement: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(USER_SEARCH_ACHIEVEMENT,
          info
        ).then(res => resolve(res.data.data))
      })
    },
     /**
     * 用户查询他人所有成果物详情
     * @param info object，包含如下属性
     * @param achieve_type 数组，多条件成果物类型
     * @param achieve_year 数组，多条件年份
     * @param user_id 数组
     * @param size
     * @param start
     */
    user_search_other_achievement: function (info) {
      return new Promise((resolve, reject) => {
        return axios.post(USER_SEARCH_OTHER_ACHIEVEMENT,
          info
        ).then(res => resolve(res.data.data))
      })
    },
    /**
    * 用户查询未审核成果物列表
    * @param user_id int
    * @param size int
    * @param start int
    */
    user_search_achievement_nopass: function (user_id, size, start) {
      return new Promise((resolve, reject) => {
        return axios.get(USER_SEARCH_ACHIEVE_NOPASS,
          { params: { user_id: user_id, size: size, start: start } }
        ).then(res => resolve(res.data.data))
      })
    },
    /**
    * 用户查询审核中成果物列表
    * @param user_id int
    * @param size int
    * @param start int
    */
   user_search_achievement_checking: function (user_id, size, start) {
    return new Promise((resolve, reject) => {
      return axios.get(USER_SEARCH_ACHIEVE_CHECKING,
        { params: { user_id: user_id, size: size, start: start } }
      ).then(res => resolve(res.data.data))
    })
  },


  },
}

