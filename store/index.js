import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: ""//用户信息
    },
    mutations: {
        getUserInfo(state,payload){
			state.userInfo = payload.userInfo
		}
    }
})

export default store
