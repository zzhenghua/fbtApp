<template>
	<view class="page">
		<search-view @searchFun="searchFun"></search-view>
		<scroll-view scroll-y style="height: calc(100% - 54px);">
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item,index2) in list1" :key="index2">
					<navigator class="uni-list-cell-navigate uni-navigate-right" url="">
						<view class="">
							<view class="uni-ellipsis-2 normal font16">{{item.subject}}</view>
							<view class="c999">{{item.processName}}</view>
							<text class="createTime c999">{{item.createTime||item.createtime}}</text>
						</view>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import searchView from "../../../components/search.vue"
	export default {
		data() {
			return {
				list1:[],
				requestStatus:0,
				searchText:'',
				page:0,
				pageSize:10
			};
		},
		computed:{
			...mapState([
			    'userInfo'
			])
		},
		components: {
			searchView
		},
		onLoad() {
			this.getList();
		},
		methods:{
			getList(isSearch){
				//初始化
				
				this.$ajax.post(this.$path.LEAVEFLOWMYDRAFT,{
					loginName:this.userInfo.loginName,
					token:this.userInfo.token,
					subject:this.searchText,
					page:this.page,
					pageSize:this.pageSize
				},(res)=>{
					//if(res.code=='0'){
						if(isSearch){
							this.list1 = res.data.results;
						}else{
							this.list1 = this.list1.concat(res.data.results);
						}
						if(this.list1.length==0){
							uni.showToast({
								icon:"none",
								title:"暂无相关数据"
							})
							// this.requestStatus = 1;
						}else{
// 							if(this.list1.length==res.data.totalCounts){
// 								this.$refs.list1.overData = true;
// 							}
						}
					//}
				},(error)=> {
					// this.requestStatus = 2;
				    //mui.toast(error);
				});
			},
			//删除
			deleteDraft(params){
				let _this = this;
				mui.confirm('删除后无法恢复，你确定要删除吗？','温馨提示',['取消','确定'],function(e){
					mui.swipeoutClose(params.el.parentNode.parentNode);
					if(e.index==1){
						_this.$ajax.post(_this.$path.LEAVEFLOWDELMYDRAFT,{
							loginName:_this.userInfo.loginName,
							runId:params.runId
						}).then((res)=>{
							mui.toast('删除成功');
							_this.list1.splice(params.index,1);
							_this.requestStatus = 1;
							
						}).catch((error)=> {
						});
					}
					
				},'div');
				
			},
			searchFun(val){
				this.searchText = val;
				this.getList(true);
			}
		}
	}
</script>

<style>
.page{
	height: 100%;
}
.uni-list:before,
.uni-list:after{
	height: 0px;
}
</style>
