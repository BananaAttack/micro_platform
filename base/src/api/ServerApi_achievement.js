import axios from 'axios'
import Vue from 'vue'
import axios_config from '../api/axios_config'

//从axios配置中获取BASE地址
const BASE = axios_config.BASE;

const ADMIN_EXPORT_ACHIEVE_SINGLE = BASE + '/query/adm/excel/achieve';
const ADMIN_IMPORT_ACHIEVE_SINGLE = BASE + '/achieve/batch';
const ADMIN_IMPORT_MODULE = BASE + '/opt/option/template';
const ADMIN_SEARCH_ACHIEVE = BASE + '/query/all/admin/pass/achieve';
const ADMIN_SEARCH_COMPETITION = BASE + '/query/all/competition';
const ADMIN_SEARCH_PAPER = BASE + '/query/all/paper';
const ADMIN_SEARCH_PATENT = BASE + '/query/all/patent';
const ADMIN_SEARCH_PROJECT = BASE + '/query/all/project';
const ADMIN_SEARCH_ACHIEVE_SINGLE = BASE + '/query/diff/achieve';

const ADMIN_GET_DOWNLOAD = BASE + '/download/url';
const ADMIN_DOWNLOAD = BASE + '/download/url';
const USER_GET_DOWNLOAD_PDF = BASE + '/pdf';
const MEHEHE = BASE + '/pdf/key'

const ALL_EXPORT_ACHIEVEMENT = BASE + '/query/excel/user/achievement';
const STU_SEARCH_ACHIEVEMENT = BASE + '/query/user/pass/achievement';

const ADMIN_SEATCH_ACHIEVE_SUBSET = BASE + '/query/subcollection/all';
const ADMIN_POST_ACHIEVE_SUBSET = BASE + '/query/subcollection';
const ADMIN_DELETE_ACHIEVE_SUBSET = BASE + '/query/subcollection';


const ADMIN_CHANGE_ACHIEVE_STATUS = BASE + '/achievement/changeStatus';


const ADMIN_DELETE_FULLY = BASE + '/achievement/delete';
const ADMIN_RECOVERY_ACHIEVE = BASE + '/achievement/recycle';

const USER_SEARCH_ACHIEVE_SINGLE = BASE + '/user/diff/achieve';
const USER_SEARCH_ACHIEVE_NOPASS_SINGLE = BASE + '/query/user/nopass/diff/achieve';




export default {
  name: "ServerApi_achievement",
  props: {

    /**
     * 管理员导出各类“成果”excel报表
     * @param type 0竞赛/1项目/2论文/3知识产权
    * @param achieve_id_list 数组,只包含id，为数字
     */
    admin_export_achieve_single: function (type, achieve_id_list) {
      axios.post(
        ADMIN_EXPORT_ACHIEVE_SINGLE,
        { type: type, achieve_id_list: achieve_id_list },
      ).then((res) => {
        //下载为excel
        //TODO 查看返回值状态码，以此判断是否执行
        const link = document.createElement('a')
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', `学生科技平台成果物导出.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    /**
     * 管理员下载各类“成果”excel导入模板
     */
    admin_import_module: function () {
      axios.post(
        ADMIN_IMPORT_MODULE,
        {}, { responseType: 'blob' }
      ).then((res) => {
        //下载为excel
        const link = document.createElement('a')
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', `学生科技平台成果物导入模板.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    /**
     * 管理员批量导入各类成果物
     * @param file 成果物excel
     */
    admin_import_achieve_single: function (file) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_IMPORT_ACHIEVE_SINGLE,
          file,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          },
        ).then(res => resolve(res.data.code))
      })
    },
    /**
     * 管理员条件搜索所有成果物的概述
     * @param selected object，包含如下属性
     * @param achieve_type 数组，多条件成果物类型
     * @param achieve_year 数组，多条件年份
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_achieve: function (selected) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_ACHIEVE,
          selected
        ).then(res => resolve(res.data.data))
      })
    },
    /**
 * 管理员查询单条成果物的详细信息
 * @param achieve_id int
 * @param type int,可选项为0-4
 * @param id int
 */
    admin_search_achieve_single: function (achieve_id, type, id) {
      return new Promise((resolve, reject) => {
        return axios.get(ADMIN_SEARCH_ACHIEVE_SINGLE,
          { params: { achieve_id: achieve_id, type: type, user_id: id } }
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员按条件查询所有竞赛详情
     * @param selected object，包含如下属性
     * @param achieve_year 数组
     * @param award 数组
     * @param competition_level 数组
     * @param competition_type 数组
     * @param work_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_competition: function (selected) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_COMPETITION,
          selected
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员按条件查询所有论文详情
     * @param selected object，包含如下属性
     * @param achieve_year 数组
     * @param paper_level 数组
     * @param paper_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_paper: function (selected) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_PAPER,
          selected
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员按条件查询所有知识产权详情
     * @param selected object，包含如下属性
     * @param achieve_year 数组
     * @param patent_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_patent: function (selected) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_PATENT,
          selected
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员按条件查询所有项目详情
     * @param selected object，包含如下属性
     * @param category 数组
     * @param pro_schedule 数组
     * @param work_type 数组
     * @param user_id 数组
     * @param size
     * @param start
     */
    admin_search_project: function (selected) {
      return new Promise((resolve, reject) => {
        return axios.post(ADMIN_SEARCH_PROJECT,
          selected
        ).then(res => resolve(res.data.data))
      })
    },

    /**
     * 管理员获取在线预览链接
     * @param fileName
     */
    admin_get_download: function (fileName) {
      return new Promise((resolve, reject) => {
        return axios.get(ADMIN_GET_DOWNLOAD + '?fileName=' + fileName,
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 管理员下载文件
     * @param fileName
     */
    admin_download: function (fileName) {
      return new Promise((resolve, reject) => {
        return axios.get(ADMIN_GET_DOWNLOAD + '?fileName=' + fileName,
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 所有角色下载个人信息pdf
     * @param userId
     */
    user_download_pdf: function (key) {
      return new Promise((resolve, reject) => {
         axios.get(USER_GET_DOWNLOAD_PDF,
          {params:{key:key}}
        ).then(res => resolve(res))
      })
    },
    MEHEHE: function (userId) {
      return new Promise((resolve, reject) => {
        axios.get(MEHEHE,
          {params:{userId:userId}}
        ).then(res => resolve(res))
      })
    },
    /*  admin_download: function (fileName) {
       return new Promise((resolve, reject) => {
         return axios.get(ADMIN_DOWNLOAD + '?fileName=' + fileName, {
           responseType: 'blob'
         }
         ).then(res => {
           var blob = res.data;
           // FileReader主要用于将文件内容读入内存
           var reader = new FileReader();
           reader.readAsDataURL(blob);
           // onload当读取操作成功完成时调用
           reader.onload = function (e) {
             var a = document.createElement('a');
             a.download = fileName;
             a.href = e.target.result;
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
           }
         })
       })
     }, */
    /**
 * 管理员彻底删除成果物
 * @param achieve_id 成果物id
 */
    admin_delete_fully: function (achieve_id) {
      return new Promise((resolve, reject) => {
        return axios.delete(ADMIN_DELETE_FULLY + '?achieve_id=' + achieve_id,
        ).then(res => resolve(res.data))
      })
    },
    /**
    * 管理员恢复一条成果物
    * @param achieve_id 成果物id
    */
    admin_recovery_achieve: function (achieve_id) {
      return new Promise((resolve, reject) => {
        return axios.get(ADMIN_RECOVERY_ACHIEVE + '?achieve_id=' + achieve_id,
        ).then(res => resolve(res.data))
      })
    },
    /**
    * 管理员查询成果子集列表
    * @param pageNum int
    * @param pageSize int
    */
   admin_search_achieve_subset: function (selected) {
    return new Promise((resolve, reject) => {
      return axios.get(ADMIN_SEATCH_ACHIEVE_SUBSET,
        {params:{pageNum:selected.start,pageSize:selected.size}}
      ).then(res => resolve(res.data.data))
    })
  },
  /**
    * 管理员创建成果子集列表
    * @param data list,包含一下数据
    * @param idListOfCompetition array[int]
    * @param idListOfHonor array[int]
    * @param idListOfPaper array[int]
    * @param idListOfPatent array[int]
    * @param idListOfProject array[int]
    * @param introduction string
    * @param name string
    */
   admin_post_achieve_subset: function (data) {
    return new Promise((resolve, reject) => {
      return axios.post(ADMIN_POST_ACHIEVE_SUBSET,data
      ).then(res => resolve(res))
    })
  },
  /**
    * 管理员根据id获取成果子集
    * @param id int
    */
   admin_get_achieve_subset: function (subsestId) {
    return new Promise((resolve, reject) => {
      return axios.get(ADMIN_DELETE_ACHIEVE_SUBSET,{params:{id:subsestId}}
      ).then(res => resolve(res))
    })
  },
   /**
    * 管理员删除一条成果子集
    * @param id int
    */
   admin_delete_achieve_subset: function (id) {
    return new Promise((resolve, reject) => {
      return axios.delete(ADMIN_DELETE_ACHIEVE_SUBSET,{params:{id:id}}
      ).then(res => resolve(res))
    })
  },
  /**
    * 管理员修改成果物状态
    * @param achieve_id  int
    * @param choice  false 取消标记/true 标记不完整
    */
   admin_change_achieve_status: function (achieve_id,choice) {
    return new Promise((resolve, reject) => {
      return axios.get(ADMIN_CHANGE_ACHIEVE_STATUS,{params:{achieve_id:achieve_id,choice:choice}}
      ).then(res => resolve(res))
    })
  },



    /**
    * 用户查询单条成果物的详细信息
    * @param achieve_id int
    * @param type int,可选项为0-4
    * @param id int
    */
    user_search_achieve_single: function (achieve_id, type, id) {
      return new Promise((resolve, reject) => {
        return axios.get(USER_SEARCH_ACHIEVE_SINGLE,
          { params: { achieve_id: achieve_id, type: type, user_id: id } }
        ).then(res => resolve(res.data.data))
      })
    },
        /**
    * 用户查询单条未审核通过的成果物的详细信息
    * @param achieve_id int
    * @param type int,可选项为0-4
    */
   user_search_achieve_nopass_single: function (achieve_id, type) {
    return new Promise((resolve, reject) => {
      return axios.get(USER_SEARCH_ACHIEVE_NOPASS_SINGLE,
        { params: { achieve_id: achieve_id, type: type } }
      ).then(res => resolve(res.data.data))
    })
  },


  },
}

