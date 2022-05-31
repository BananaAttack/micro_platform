import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import htmlToPdf from '@/htmlToPdf';
import VueQr from 'vue-qr'

//引入single-spa设置
import './single-spa-config.js';
//路由守卫
import '@/routerGuard';

//接口TODO:将接口统一引入会增加首屏加载时间，有时间就将接口函数拆分，每个页面按需引入
import '../src/api/axios_config'
import api_query from '../src/api/ServerApi_query'
import api_login from '../src/api/ServerApi_login'
import api_opt from '../src/api/ServerApi_opt'
import api_achievement from '../src/api/ServerApi_achievement'
import api_user from '../src/api/ServerApi_user'
//样式
import '../src/assets/style/element.css'
//解决谷歌浏览器警报，触发原理暂不明了
import 'default-passive-events'
//echarts
import * as echarts from 'echarts';
Vue.use(htmlToPdf)
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

//Vue.prototype.$ajax = axios
//设置api为全局变量
//TODO:这样将所有api封装起来并不好，增加了首屏加载时间，需要优化，还是要各个页面按需加载，繁琐但是加载效率更高
Vue.prototype.$api_query = api_query.props;
Vue.prototype.$api_login = api_login.props;
Vue.prototype.$api_opt = api_opt.props;
Vue.prototype.$api_achievement = api_achievement.props;
Vue.prototype.$api_user = api_user.props;
Vue.prototype.$_ = require('lodash');



//接口公用地址，暂时此处和axios_config共存
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.withCredentials=false;
//将文件预览的地址存放在storage中
sessionStorage.setItem('view_url', 'http://124.222.44.159:8012/onlinePreview?url=');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
