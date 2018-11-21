<template>
	<view class="page">
		<view class="tabs_head">
			<segmented-control ref="segmented" :values="['我的请假','我的考勤']" activeColor="#0093dd" @clickItem="onClickItem"></segmented-control>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import segmentedControl from '@/components/segmented-control'
	
	export default {
		data() {
			return {
				activeClass:'uni-badge-danger',
				currentTab:0//0:请假，1：考勤
			};
		},
		components:{
			segmentedControl
		},
		methods:{
			//点击tab
			onClickItem(index){
				this.currentTab = index;
				if(index==0){
					this.activeClass = 'uni-badge-danger'
				}else if(index==1){
					this.activeClass = 'active'
				}
				// this.getLeaveStatistics(this.currentDate.year+'-'+(this.currentDate.month<10?('0'+this.currentDate.month):this.currentDate.month));
			
			}
		}
	}
</script>

<style>
.tabs_head{
	background: #FFFFFF;
	width: 80%;
	margin: 30upx auto;
	border-radius: 20upx;
}
</style>
