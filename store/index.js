import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userInfo: ""
    },
    mutations: {
        getUserInfo(state,payload){
			state.userInfo = payload.userInfo
		}
    }
})

export default store
