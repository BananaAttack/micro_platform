import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import basic from './modules/basic'
import components from './modules/components'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        user,
        basic,
        components
    },
    getters
})

export default store
