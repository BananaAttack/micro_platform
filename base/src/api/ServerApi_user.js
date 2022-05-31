import axios from 'axios'
import Vue from 'vue'
import axios_config from '../api/axios_config'

//从axios配置中获取BASE地址
let BASE = axios_config.BASE;

let GET_USER_BY_NAME = BASE + '/user/all/id';
let GET_USER_BY_NAME_OLD = BASE + '/user/id';
let GET_STU_BY_ID = BASE + '/user/stu/info';
let GET_TEA_BY_ID = BASE + '/user/teacher/info';



export default {
  name: "ServerApi_user",
  props: {

    /**
     * 根据用户名查询用户信息
    * @param user_name 
     */
    get_user_by_name: function (user_name) {
      return new Promise((resolve, reject) => {
        axios.get(
        GET_USER_BY_NAME,
          { params: { user_name: user_name }},
        ).then(res => resolve(res.data.data))
      })
    },
        /**
     * 根据用户名查询用户信息,用于成果物添加
     * @param choice 0学生/1老师
    * @param user_name 
     */
         get_user_by_name_old: function (choice, user_name) {
          return new Promise((resolve, reject) => {
            axios.get(
            GET_USER_BY_NAME_OLD,
              { params: { choice: choice, user_name: user_name }},
            ).then(res => resolve(res.data.data))
          })
        },
    /**
     * 根据id查询学生信息
    * @param user_id 
    * @param n 0本院 1外院
     */
    get_stu_by_id: function (n,user_id) {
      return new Promise((resolve, reject) => {
        axios.get(GET_STU_BY_ID,{params:{n:n,user_id:user_id}}
        ).then(res => resolve(res.data.data))
      })
    },
    /**
     * 根据id查询教师信息
    * @param user_id 
    * @param n 0本院 1外院
     */
    get_tea_by_id: function (n,user_id) {
      return new Promise((resolve, reject) => {
        axios.get(GET_TEA_BY_ID,{params:{n:n,user_id:user_id}}
        ).then(res => resolve(res.data.data))
      })
    },

  },
}

