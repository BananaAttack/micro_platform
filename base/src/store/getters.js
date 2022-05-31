const getters = {
    roles: state => state.user.roles,
    user_id: state => state.user.user_id,
    view_url: state => state.basic.view_url,
    copyRight: state => state.basic.copyRight,
    token: state => state.user.token,
    get_catch: state=> state.components.catch_components
}
export default getters