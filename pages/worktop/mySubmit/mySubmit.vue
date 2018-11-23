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
							<view>
								<text v-if="item.status==0" class="label font12 uni-badge-danger">挂起状态</text>
								<text v-else-if="item.status==1" class="label font12 uni-badge-success">运行中</text>
								<text v-else-if="item.status==2" class="label font12 uni-badge-warning">已结束</text>
								<text v-else-if="item.status==3" class="label font12 uni-badge-danger">人工终止</text>
								<text v-else-if="item.status==4" class="label font12 uni-badge-danger">草稿状态</text>
								<text v-else-if="item.status==5" class="label font12 uni-badge-danger">已撤销</text>
								<text v-else-if="item.status==6" class="label font12 uni-badge-danger">已驳回</text>
								<text v-else-if="item.status==7" class="label font12 uni-badge-danger">已追回</text>
								<text v-else class="label font12 uni-badge-danger">逻辑删除</text>
							</view>
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
				
				this.$ajax.post(this.$path.APPROVEMYREQUEST,{
					loginName:this.userInfo.loginName,
					token:this.userInfo.token,
					subject:this.searchText,
					page:this.page,
					pageSize:this.pageSize
				},(res)=>{
					//if(res.code=='0'){
						if(isSearch){
							this.list1 = res.data.adList;
						}else{
							this.list1 = this.list1.concat(res.data.adList);
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
.label{
    padding: 3px 6px;
    border-radius: 4px;
}
.uni-list:before,
.uni-list:after{
	height: 0px;
}
</style>
