const components = {
    state:{
        catch_components:[]
    },

    actions:{
        //增加路由
        addRoute({
            commit,
            rootState
        },data){
            console.log("add");
            console.log(rootState.components.catch_components)
            const ArrList = rootState.components.catch_components;
            let common = false;
            ArrList.forEach(element => {
                if(element === data){
                    common = true;
                }
            });
            if(!common){
                ArrList.push(data)
            }
            commit('get_catch',ArrList);
        },
        //移除指定路由
        removeRoute({
            commit,
            rootState
        },data){
            console.log("delete");
            console.log(rootState.components.catch_components)
            const ArrList = rootState.keepAlive.catch_components;
            let index = null;
            ArrList.forEach((item,num)=>{
                if(item === data){
                    index = num;
                }
            })
            if(index){
                ArrList.splice(index,1);
            }
        },
        //移除所有路由
        removeAllRoute({
            commit,
            rootState
        },data){
            console.log("deleteAll");
            commit('get_catch',[]);
        }
    },

    mutations:{
        get_catch(state,data){
            state.catch_components = data;
        }
    }
}

export default components