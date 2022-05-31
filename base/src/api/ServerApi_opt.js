import axios from 'axios'
import Vue from 'vue'
import axios_config from '../api/axios_config'

//从axios配置中获取BASE地址
let BASE = axios_config.BASE;

let GET_ACHIEVE_INFO_LIST = BASE + '/opt/achieve/list';
let GET_ACHIEVE_WORK_TYPE = BASE + '/opt/cp/work/types';
let GET_ACHIEVE_ITEM = BASE + '/opt/option/items';
let POST_ACHIEVE_ITEM = BASE + '/opt/option/item';

let GET_COMPETITION_INFO = BASE + '/opt/competition/detail';
let GET_COMPETITION_PRIZE = BASE + '/opt/competition/prizes';
let GET_COMPETITION_TYPE = BASE + '/opt/competition/types';
let GET_COMPETITION_LEVEL = BASE + '/opt/option/distribution/level';
let GET_COMPETITION_PRIZE_GROUP = BASE + '/opt/option/distribution/prize/group';

let GET_HOST = BASE + '/opt/option/hosts';

let GET_PAPER_RANK = BASE + '/opt/option/paper/ranks';

let GET_PROJECT_INFO = BASE + '/opt/project/detail';

let GET_OPT_LEVEL = BASE + '/opt/option/distribution/level';
let POST_OPT_LEVEL = BASE + '/opt/option/distribution/level';






export default {
  name: "ServerApi_opt",
  props: {
    /**
     *获取竞赛奖项分布组列表
     */
    get_competition_prize_group: function () {
      return new Promise((resolve, reject) => {
        return axios.get(GET_COMPETITION_PRIZE_GROUP
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     *获取论文等级
     *@param type 论文类型
     */
    get_paper_rank: function (type) {
      return new Promise((resolve, reject) => {
        return axios.get(GET_PAPER_RANK, { params: { type: type } }
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
    * 管理员获取多个成果物类型的级别
    * @param type string，可选项如下
    * @param competition 
    * @param honor 
    * @param journal 
    * @param conference 
    */
    admin_get_optLevel: function (type) {
      return new Promise((resolve, reject) => {
        return axios.get(GET_OPT_LEVEL,
          { params: { type: type } }
        ).then(res => resolve(res))
      })
    },
    /**
    * 管理员获取多个成果物类型的级别
    * @param type string，可选项如下
    * @param competition 
    * @param honor 
    * @param journal 
    * @param conference 
    * @param levelList array,包含如下字段
    * @param name
    * @param rank
    */
    admin_post_optLevel: function (type, levelList) {
      return new Promise((resolve, reject) => {
        return axios.post(GET_OPT_LEVEL,
          { type: type, levelList: levelList }
        ).then(res => resolve(res))
      })
    },
    /**
    * 管理员获取配置项主办单位
    * @param info object，包含如下选项
    * @param name 
    * @param size  
    * @param start 
    */
    admin_get_host: function (info) {
      return new Promise((resolve, reject) => {
        return axios.get(GET_HOST,
          { params: info }
        ).then(res => resolve(res))
      })
    },
    /**
        * 管理员获得多个配置项
        * @param type string
        */
    admin_get_opt_item: function (type) {
      return new Promise((resolve, reject) => {
        return axios.get(GET_ACHIEVE_ITEM,
          { params: { type: type} }
        ).then(res => resolve(res))
      })
    },
    /**
    * 管理员添加多个配置项
    * @param type string
    * @param value  string
    */
    admin_post_opt_item: function (type, value) {
      return new Promise((resolve, reject) => {
        return axios.post(POST_ACHIEVE_ITEM,{},
          { params: { type: type, value: value } }
        ).then(res => resolve(res))
      })
    },


  },
}

