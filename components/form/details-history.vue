<template>
	<view class="page">
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in list2" :key="index">
				<view class="uni-list-cell-navigate">
					<view class="">
						<view class="uni-ellipsis font16 bold">{{item.taskName}}</view>
						<view class="uni-flex">意见：<view class="uni-flex-item" style="word-wrap: break-word;word-break: break-all">{{item.opinion}}</view></view>
						<view>状态：
							<rich-text :nodes="item.status" style="display: inline-block;" :class="item.class"></rich-text>
						</view>
						<view>开始时间：{{item.startTime}}</view>
						<view>执行人：{{item.exeFullName}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		props:{
			taskId:{
				type:String,
				default:''
			},
			runId:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				list:[]
			}
		},
		computed:{
			...mapState(['userInfo']),
			list2(){
				let list = this.$util.copyArr(this.list);
				for(let i=0;i<list.length;i++){
					list[i].status = list[i].status.replace(/font/g,'span')
					if(list[i].status.indexOf('red')>-1){
						list[i].class = 'red'
					}else if(list[i].status.indexOf('green')>-1){
						list[i].class = 'green'
					}else if(list[i].status.indexOf('brown')>-1){
						list[i].class = 'brown'
					}
				}
				return list
			}
		},
		components:{
		},
		created(){
			if(this.taskId=="undefined"){
				this.taskId = ""
			}
			this.getHistory();
		},
	  methods:{
	  	getHistory(){
	  		
	  		this.$ajax.post(this.$path.APPROVETASKOPINIONS,{
	  			loginName:this.userInfo.loginName,
	  			token:this.userInfo.token,
				runId: this.runId||"",
				taskId: this.taskId||""
			},(res)=>{
				this.list = res.data.adList.reverse();
			},(error)=> {
			});
	  	}

	  }
	}
</script>

<style scoped>
	input[type=search]{
		margin-bottom: 0;
		background: #FFFFFF;
	}
	.mui-search.mui-active:before{
		top: 24px;
	}
	.label{
		padding: 3px 6px;
		border-radius: 4px;
	}
	.mui-navigate-right:after, .mui-push-right:after{
		font-size: 22px;
	}
	.mui-table-view-cell h4{
		line-height: 1.2;
	}
	.red{
		color: red;
	}
	.green{
		color: green;
	}
	.brown{
		color: brown;
	}
</style>