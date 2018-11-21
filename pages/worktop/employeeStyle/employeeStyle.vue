<template>
	<view class="page">
		<search-view @searchFun="searchFun"></search-view>
		<scroll-view scroll-y @scrolltolower="loadMoreData" lower-threshold="0" style="height: calc(100% - 54px);">
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
				<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover">
					<navigator :url="'../notice_details/notice_details?type=3&id='+item.id" hover-class="">
					<view class="font14 uni-ellipsis bold">{{item.title}} </view>
			 	    <view class="uni-ellipsis-2 summary font14" v-if="item.description"><text class="c999">摘要：</text>{{item.description}}</view>
			 	    <div class="uni-flex c999 font12"><view class="uni-flex-item">作者：<text class="uni-badge uni-badge-warning">{{item.publisher}}</text></view><view>{{item.publishDate}}</view></div>
					</navigator>
				</view>
			</view>
		</view>
		
		<load-more :loadingType="loadingType" v-if="list.length>9"></load-more>
		</scroll-view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import searchView from "../../../components/search.vue"
	import loadMore from "../../../components/load-more.vue"
	
	export default {
		data() {
			return {
				list:[],
				overData:false,
				requestStatus:0,
				page:1,
				pageSize:10,
				loadingType:0,
				searchVal:''//搜索关键字
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		components:{
			searchView,
			loadMore
		},
		onLoad() {
			this.getList();
		},
		methods:{
			//获取列表
			getList(searchVal){
				if(searchVal){
					uni.showLoading({
						title:"数据加载中..."
					})
				}
				this.$ajax.post(this.$path.APPKNOLEDGEKNOLEDGELIST,{
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token,
					"keyword":searchVal||'',
					"knoType":"3",
					"page":this.page,
					"pageSize":this.pageSize
				},(res)=>{
					this.list = this.list.concat(res.data.data);
					this.loadingType = 0;
					if(res.data.total==0){
						this.requestStatus = 1;
					}else if(res.data.data.length<this.pageSize){
						this.loadingType = 2;
					}
					this.page++;
				},(error)=> {
					this.requestStatus = 2;
				});
			},
			searchFun(val){
				this.page=1;
				this.loadingType = 0;
				this.searchVal = val;
				this.list = [];
				this.getList(val);
			},
			//滚动到底部时触发
			loadMoreData(){
				if(this.loadingType==0){
					this.loadingType=1;
					this.getList(this.searchVal);
				}
			}
		}
	}
</script>

<style>
navigator{
	width: 100%;
	display: block;
}
.page{
	height: 100%;
}
.uni-list:before,
.uni-list:after{
	height: 0px;
}

</style>
