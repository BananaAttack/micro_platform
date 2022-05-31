import axios from 'axios'
import Vue from 'vue'
import axios_config from '../api/axios_config'

//从axios配置中获取BASE地址
let BASE = axios_config.BASE;

let LOGIN = BASE + '/user/login';
let CHECK_CODE = BASE + '/amdin/check';
let GET_INFO = BASE + '/token/Info';




export default {
  name: "ServerApi_login",
  props: {

    /**
     * 用户登录
     * @param username 用户名
    * @param password 用户密码
     */
    login: function (username, password) {
      axios.post(
        LOGIN,
        { username: username, password: password },
      ).then((res) => {
        this.$store.commit('SET_TOKEN',res.data.data.token);
        this.$store.commit('SET_ROLE',res.data.data.role);
        this.$store.commit('SET_ID',res.data.data.user_id);
        /* this.$store.commit('SET_URL','http://114.116.224.187:8012/onlinePreview?url='); */
      })
    },
    /**
     * 通过token获取用户id和角色
     */
    get_info: function () {
      return axios.get(
        GET_INFO,
        {}
      )
    },
    /**
     * 验证管理员密码，用于回收站彻底删除的认证
     * @param userId  用户id
    * @param password 用户密码
     */
    check_code: function (userId, password) {
      return axios.get(
        CHECK_CODE,
       {params:
        { userId: userId, password: password }
      },
      ).then((res) => {
        return res.data;
      })
    },



  },
}

