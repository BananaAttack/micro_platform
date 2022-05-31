import axios from 'axios'

//配置接口地址
const BASE = process.env.BASE_API
//const BASE = 'http://bilidown.com:8080'
//const BASE = 'http://10.21.30.253:8080'
//const BASE = 'http://139.196.224.125:8080'

axios.defaults.withCredentials = false
//设置拦截器，在每个请求头中加入Token
axios.interceptors.request.use(
    config => {
        if (sessionStorage.getItem('Token')) {
        config.headers['Token'] = sessionStorage.getItem('Token');
    }
        return config;
    },
    error => {
        console.log()
        return Promise.reject(error)
    }
)
export default{
    name:'axios_config',
    //暴露出接口地址，给各个接口文件调用
    BASE:BASE
}