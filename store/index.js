import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: "",//用户信息
		clockRange:{
			effective:null,//是否在打卡范围内
			activeIndex:''//打卡地址index
		}
    },
    mutations: {
        getUserInfo(state,payload){
			state.userInfo = payload.userInfo
		},
		setClockRange(state,payload){
			state.clockRange = payload.clockRange
		}
    }
})

export default store
