<template>
	<view class="page">
		<search-view @searchFun="searchFun"></search-view>
		<scroll-view scroll-y style="height: calc(100% - 104px);">
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
					<navigator :url="'../newForm/newForm?defId='+item.defId" class="uni-list-cell-navigate uni-navigate-right">
						<text>{{item.subject}}</text>
					</navigator>
				</view>
			</view>
		</scroll-view>
		<view class="nav uni-flex">
				<view class="uni-flex-item tc c0093dd">
					<icon class="uni-icon iconfont icon-xinjianwendang">&#xe62c;</icon>
					<view class="nav_text">新建申请</view>
				</view>
				<navigator class="uni-flex-item tc" url="../myApply/myApply">
					<icon class="uni-icon iconfont icon-wodeshenpi">&#xe60b;</icon>
					<view class="nav_text">我的审批</view>
				</navigator>
				<navigator class="uni-flex-item tc" url="../myDraft/myDraft">
					<icon class="uni-icon iconfont icon-shenqingxiugaishenpi">&#xe670;</icon>
					<view class="nav_text">我的草稿</view>
				</navigator>
				<navigator class="uni-flex-item tc" url="../mySubmit/mySubmit">
					<icon class="uni-icon iconfont icon-tijiao1">&#xe781;</icon>
					<view class="nav_text">已提交</view>
				</navigator>
			</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import searchView from "../../../components/search.vue"
	
	export default {
		data() {
			return {
				list:[],
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		components:{
			searchView
		},
		onLoad(){
			this.getList();
		},
		methods:{
			searchFun(val){
				debugger
				this.getList(val);
			},
			getList(searchVal){
				if(!searchVal){
					searchVal=''
				}
				// this.requestStatus = 0;
				this.$ajax.post(this.$path.APPROVELIST,{
					"loginName": this.userInfo.loginName,
					"token": this.userInfo.token,
					"subject": searchVal
				},(res)=>{
					//if(res.code=='0'){
						let ar=[],list = res.data.adList;
						for(let i=0;i<list.length;i++){
//							if(list[i].defId=='10000002910639'||list[i].defId=='10000005260798'||list[i].defId=='10000000555528'||list[i].defId=='10000000523263'){
//							if(list[i].defId=='10000002910639'||list[i].defId=='10000005260798'){//测试环境
							if(list[i].subject.indexOf('请假&销假')>-1||
							list[i].subject.indexOf('费用报销')>-1||
							list[i].subject.indexOf('出差费用申请')>-1
//							list[i].subject.indexOf('离职申请')>-1||
//							list[i].subject.indexOf('入职申请')>-1||
//							list[i].subject.indexOf('调动流程')>-1||
//							list[i].subject.indexOf('闲置处理')>-1||
//							list[i].subject.indexOf('客户调级')>-1
							){//测试环境
								//只开放请假流程
								ar.push(list[i]);
							}
						}
						this.list = ar;
						if(this.list.length==0){
							// this.requestStatus=1;
						}
					//}
				},(error)=> {
					// this.requestStatus = 2;
				    //mui.toast(error);
				});
			}
		}
	}
</script>

<style scoped>
.page{
	height:100%
}
.uni-list:before,
.uni-list:after{
	height: 0px;
}
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  background: #ffffff;
  z-index: 4;
  height: 50px;
  overflow: hidden;
  box-shadow: 0px -1px 1px rgba(221, 221, 221, 0.85);
  /*-webkit-box-shadow: 0 0 1px rgba(0,0,0,.85);
  box-shadow: 0 0 1px rgba(0,0,0,.85);*/
}
.nav .uni-icon {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  font-size: 24px;
  vertical-align: middle;
}
.nav .nav_text {
  font-size: 11px;
  margin-bottom: 0;
  line-height: 2;
}
</style>
