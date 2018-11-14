<template>
	<view class="page">
		<view class="searchBox">
			<input type="search" v-model="searchVal" />
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
				<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover">
					<navigator :url="'../notice_details/notice_details?type=2&id='+item.id" hover-class="">
					<view class="font14 uni-ellipsis bold">{{item.title}} </view>
			 	    <view class="uni-ellipsis-2 summary font14" v-if="item.description"><text class="c999">摘要：</text>{{item.description}}</view>
			 	    <div class="uni-flex c999 font12"><view class="uni-flex-item">作者：<text class="uni-badge uni-badge-warning">{{item.publisher}}</text></view><view>{{item.publishDate}}</view></div>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	
	export default {
		data() {
			return {
				list:[],
				overData:false,
				requestStatus:0,
				page:1,
				pageSize:10,
				searchVal:''//搜索关键字
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			this.getList();
		},
		methods:{
			//获取列表
			getList(){
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.APPKNOLEDGEKNOLEDGELIST,{
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token,
					"keyword":this.searchVal,
					"knoType":"2",
					"page":this.page,
					"pageSize":this.pageSize
				},(res)=>{
					this.list = this.list.concat(res.data.data);
					if(res.data.total==0){
						this.requestStatus = 1;
					}else if(res.data.data.length<this.pageSize){
						this.overData = true;
					}
					this.page++;
				},(error)=> {
					this.requestStatus = 2;
				});
			},
			searchFun(val){
				this.page=1;
				this.overData = false;
				this.searchVal = val;
				this.list = [];
				this.getList();
			},
			loadMoreList(){
				this.getList();
			}
		}
	}
</script>

<style>
navigator{
	width: 100%;
	display: block;
}
</style>
