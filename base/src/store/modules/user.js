import api from '../../api/ServerApi_login'
const user = {
    state:{
        roles:'',
        user_id:'',
        token:''
    },

mutations: {
    SET_ROLE:(state,roles)=>{
        state.roles = roles
    },
    SET_ID:(state,user_id)=>{
        state.user_id = user_id
    },
    SET_TOKEN:(state,token)=>{
        state.token = token
    }
},
actions:{
    GET_INFO:({commit})=>{
        return new Promise((resolve,reject)=>{
            api.props.get_info().then(res=>{
                if(res.data.code === 2000){
                    commit('SET_ROLE',res.data.data.role);
                    commit('SET_ID',res.data.data.userId);
                    commit('SET_TOKEN',sessionStorage.getItem("Token"));
                    resolve(res.data.data);
                }else{
                    reject("获取用户数据失败，请重新登录");
                }
            }).catch(error=>{
                reject(error);
            })
        })
    }
}

}

export default user