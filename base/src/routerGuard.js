import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { adminRouterMap, stuRouterMap, teaRouterMap } from './router'
import api_login from './api/ServerApi_login'

//路由白名单，不会被重定向
const whiteList = ['./login','./admin_login'];
//路由守卫，每次路由跳转前进行判断
router.beforeEach(async (to, from, next) => {
    //跳转进度条
    NProgress.start();
    //如果有token，说明已经登录
    if (sessionStorage.getItem("Token")) {
        if (store.getters.token) {
            //登录状态下，不做限制
            next();
            NProgress.done()
        } else {
            //未登录状态(刷新导致的sotre数据丢失)，需要重新构建路由
            if (to.path === '/login'||to.path==='/admin_login'||to.path==='/check_report'||to.path==='/mobile_check_report'||to.path==='/show_report') {
                next();
            }else {
                store.dispatch('GET_INFO').then(res => {
                    console.log(res);
                    switch (res.role) {
                        case "admin":
                            { router.addRoutes(adminRouterMap); }
                        case "student":
                            { router.addRoutes(stuRouterMap); }
                        case "teacher":
                            { router.addRoutes(teaRouterMap); }
                    }
                    next({ ...to, replace: true })
                }).catch(error => {
                    Message.error(error);
                    next({ path: '/login', replace: true })
                })
            }
        }
    } else {
        //未登录状态，所有请求重定向到登录页
        if (to.path === '/login'||to.path==='/admin_login'||to.path==='/check_report'||to.path==='/mobile_check_report'||to.path==='/show_report') {
            next();
        } else if(to.path === '/modify_password'){
          next()
        } else if(to.path === '/admin/modify_password'){
          next()
        }else {
            next({ path: '/login', replace: true })
        }
    }

})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
