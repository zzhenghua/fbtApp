<template>
	<view class="page">
		<view style="background: #FFFFFF;">
			<segmented-control ref="segmented" :values="tabs" activeColor="#0093dd" @clickItem="onClickItem" styleType="text"></segmented-control>
		</view>
		<block v-for="(item,index) in tabs" :key="index" v-if="currentTab==index" >
			<search-view @searchFun="searchFun"></search-view>
			<scroll-view scroll-y style="height: calc(100% - 95px);">
				<view class="uni-list">
					<view class="uni-list-cell" v-for="(item,index2) in list" :key="index2">
						<navigator class="uni-list-cell-navigate uni-navigate-right" :url="'../apply_details/apply_details?types=myApply'+index+'&taskId='+item.taskId+'&runId='+item.runId">
							<view class="">
								<view class="uni-ellipsis-2 normal font16">{{item.subject}}</view>
								<view class="c999">{{item.processName}}</view>
								<view>
									<text v-if="index==0" class="label font12 uni-badge-success">待处理</text>
									<text v-if="index==1" class="label font12 uni-badge-warning">已处理</text>
									<text v-if="index==2" class="label font12 uni-badge-purple">抄送我</text>
								</view>
								<text class="createTime c999">{{item.createTime||item.createtime}}</text>
							</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</block>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import segmentedControl from '@/components/segmented-control'
	import searchView from "../../../components/search.vue"
	export default {
		data() {
			return {
				list1:[],
				list2:[],
				list3:[],
				type:'dcl',//默认：待处理
				searchText:'',//搜索关键字
				requestStatus:0,
				list1page:0,
				list2page:0,
				list3page:0,
				pageSize:10,
				
				tabs:["待处理","已处理","抄送我"],
				currentTab:0
			}
		},
		computed:{
			...mapState([
			    'userInfo'
			]),
			list(){
				return this['list'+(this.currentTab+1)]
			}
		},
		components: {
			segmentedControl,
			searchView
		},
		onLoad() {
			this.currentTab = 0;
			setTimeout(()=>{
				this.getList();
			},300)
		},
		methods:{
			//点击tab
			onClickItem(index){
				this.currentTab = index;
				this.searchText = '';
				/* if(index==0){
				}else if(index==1){
				}else if(index==2){
				} */
				this.getList();
			},
			getList(isSearch){
				// searchObj = {}
				// this.searchText = searchObj?searchObj.text:{};
				let path = this.$path.APPROVEPENDING;
				let list = 'list1';
				if(this.currentTab==1){
					path = this.$path.APPROVEPROCESSED;
					list = 'list2';
				}else if(this.currentTab==2){
					path = this.$path.APPROVECOPYTO;
					list = 'list3';
				}
				//初始化
				/* if(searchObj){
					if(searchObj.isSearch){
						this[list+'page']=0;
						this.$refs[list].overData = false;
					}else{
						this[list+'page']++;
					}
				} */
				this.$ajax.post(path,{
					loginName:this.userInfo.loginName,
					token:this.userInfo.token,
					subject:this.searchText,
					page:this[list+'page'],
					pageSize:this.pageSize
				},(res)=>{
					if(isSearch){
						this[list] = res.data.adList;
					}else{
						this[list] = this[list].concat(res.data.adList);
					}
					if(this[list].length==0){
						uni.showToast({
							icon:"none",
							title:"暂无相关数据"
						})
					}
					
					/* if(res.data.adList.length==0){
					}else{
						if(this[list].length==res.data.count){
							this.$refs[list].overData = true;
						}
					} */
				},(error)=> {
					// this.requestStatus = 2;
				    //mui.toast(error);
				});
			},
			initAllVal(){
				this[list] = [];
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
