<template>
	<view class="page">
		
		<time-view ref="vueTimes" @getSubmitShow="getSubmitShow" :currentText="currentDate" :activeDateList="labelDate" @getAjax="getLeaveStatistics" @selectTime="selectTime" :activeClass="activeClass"></time-view>
		<!-- segmentedControl-->
		<view class="tabs_head">
			<segmented-control ref="segmented" :values="['我的请假','我的考勤']" activeColor="#0093dd" @clickItem="onClickItem"></segmented-control>
		</view>
		<view class="tab_content">
			<view v-show="currentTab==0" class="">
				<view class="section">
					<accordion title="请假统计">
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-navigate">
									本月总共请假 {{leaveStatistics.qjleaveNumbers||'0'}} 次，销假 {{leaveStatistics.xjleaveNumbers||'0'}} 次，共计 {{leaveStatistics.totalTime||'0'}} 天
								</view>
							</view>
						</view>
					</accordion>
				</view>
				<view class="section">
					<accordion title="请假记录">
						<view class="uni-list">
							<view class="uni-list-cell" v-for="(item,index) in leaveStatistics.sysDayOffChildList" :key="index">
								<view class="uni-list-cell-navigate">
									<div class="flexItem mui-ellipsis">{{item.qsDateStr}}</div>
									<div class="time font14" v-if="item.djtype=='djxj'">销假({{item.dayOffTypeStr}})   {{item.hours}} 天</div>
									<div class="time font14" v-else>请假({{item.dayOffTypeStr}})    {{item.hours}} 天</div>
								</view>
							</view>
						</view>
					</accordion>
				</view>
			</view>
			<view v-show="currentTab==1" class="">
				<view class="section">
					<accordion title="考勤统计">
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-navigate">
									当月应出勤{{checkRecords.shouldDays||'0'}}天，实际出勤{{checkRecords.actualDays||'0'}}天，病假{{checkRecords.sickleaveDays||'0'}}天，事假{{checkRecords.casualleaveDays||'0'}}天，年假{{checkRecords.annualeaveDays||'0'}}天，产假{{checkRecords.maternityleaveDays||'0'}}天，其他带薪假{{checkRecords.otherleaveDays||'0'}}天
									<span v-if="checkRecords.confirmStatus==0" class="mui-badge  font12 mui-badge-success">待确认</span>
									<span v-if="checkRecords.confirmStatus==1" class="mui-badge  font12 mui-badge-warning">已确认</span>
								</view>
							</view>
						</view>
					</accordion>
				</view>
				<view class="section">
					<accordion title="考勤记录">
						<view class="uni-list">
							<view class="uni-list-cell" v-for="(item,index) in checkRecords.sysAttendanceChildList" :key="index">
								<view class="uni-list-cell-navigate">
									<div class="flexItem mui-ellipsis">{{dateTime.replace('-','年')}}月</div>
									<div class="time font14">应出勤{{item.attendanceDays}}&nbsp;&nbsp;&nbsp;&nbsp;实际出勤{{checkRecords.actualDays}}</div>
								</view>
							</view>
						</view>
					</accordion>
				</view>
			</view>
		</view>
		
		<date-picker ref="dtPicker" :dtMode="dtMode" v-if="showDtPicker" @hideDtPicker="hideDtPicker" @sureDtPicker="sureDtPicker"></date-picker>
		
	</view>
</template>

<script>
	import timeView from '@/components/vueTimes'
	import datePicker from '@/components/datePicker'
	import segmentedControl from '@/components/segmented-control'
	import accordion from '@/components/accordion'
	import { mapState, mapActions } from 'vuex'
	
// 	const birthdayPker = new mui.DtPicker({
// 		"type": "month",
// 		"beginYear": 1900,
// 		"endYear": 2030
// 	});
	let slider1;
	
	export default {
		data() {
			let d = new Date();
			let y = d.getFullYear();
			let m = d.getMonth()+1;
			return {
				btnShow:false,//确认按钮
				requestStatus:0,
				dateTime:'',
				type:'qj',//默认请假(qj)  考勤:kq
				activeClass:'uni-badge-danger',
				leaveStatistics:{},//请假数据
				checkRecords:{},//考勤数据
				
				dtMode:'',
				showDtPicker:false,
				currentDate: {
					year: y,
					month: m<10?('0'+m):m
				},
				currentTab:0//0:请假，1：考勤
			};
		},
		computed:{
			...mapState(['userInfo']),
			labelDate(){
				let te = this.leaveStatistics.sysDayOffChildList,labelDate=[],filed='startDateStr';
				if(this.currentTab=='1'){
					te = this.checkRecords.attenedanceDayList;
					filed = 'date';
				}
				if(te){
					for(let i=0;i<te.length;i++){
						let a = te[i][filed].split(',');
						if(this.currentTab=='0'){
							this.leaveStatistics.sysDayOffChildList[i].qsDateStr = te[i].qsDateStr.split(',')[0].replace('-','年').replace('-','月')+'日';
						}
						for(let v=0;v<a.length;v++){
							labelDate.push(a[v]);
						}
					}
				}
				// console.log('labelDate:'+labelDate)
				return labelDate
			}
		},
		components: {
			timeView,
			datePicker,
			segmentedControl,
			accordion
		},
		onLoad() {
			//vueTimes.vue组件已经执行此方法
			//this.getLeaveStatistics(this.currentDate.year+'-'+this.currentDate.month);
		},
		onBackPress() {
			if(this.showDtPicker) {
				this.hideDtPicker();
				return true;
			}
		},
		methods:{
			//选择日期
			selectTime(){
				this.dtMode='month';
				this.showDtPicker=true;
			},
			//取消
			hideDtPicker(){
				this.$refs.dtPicker.closeAnimate();
				setTimeout(()=>{
					this.showDtPicker = false;
				},200)
			},
			//确定
			sureDtPicker(value){
				this.currentDate.year = parseInt(value.split('-')[0]);//加parseInt，否则日历上颜色标记不上
				this.currentDate.month = parseInt(value.split('-')[1]);
				this.hideDtPicker();
				this.$refs.vueTimes.getMonthDay();
			},
			//点击tab
			onClickItem(index){
				this.currentTab = index;
				if(index==0){
					this.activeClass = 'uni-badge-danger'
				}else if(index==1){
					this.activeClass = 'active'
				}
				this.getLeaveStatistics(this.currentDate.year+'-'+(this.currentDate.month<10?('0'+this.currentDate.month):this.currentDate.month));
			},
			submiteForm:function(submiteBtn){
				let _this = this;
				let d = this.$refs[submiteBtn];
				let url = this.$path.APPROVECONFIRMLEAVE
				if(this.currentTab=='1'){
					url = this.$path.APPROVECONFIRMATTENDANCE
				}
				
				mui(d).button('loading');
				this.$ajax.post(url,{
					loginName:this.userInfo.loginName,
					yearmonth:this.dateTime,//'2018-03'
				}).then((res)=>{
					//if(res.code=='0'){
						this.getLeaveStatistics(this.dateTime);
//						setTimeout(function() {
//							mui(d).button('reset');
//						}.bind(d), 2000);
						mui.toast("确认成功",{ duration:'long', type:'div' });
						if(this.currentTab=='0'){
							slider1.gotoItem(1);
						}
					//}
				}).catch((error)=> {
					this.requestStatus = 2;
				    //mui.toast(error);
				});

			},
			getSubmitShow(status){
				this.btnShow = status;
			},
			//我的请假/考勤
			getLeaveStatistics(date,isChangeDate){
				this.dateTime = date;
				if(isChangeDate&&this.currentTab=='1'){
					// setTimeout(()=>{
						this.$refs.segmented.onClick(0);
						return ;
					// },100)
					// return slider1.gotoItem(0);
				}
				let url = this.$path.APPROVELEAVESTATISTICS
				if(this.currentTab=='1'){
					url = this.$path.APPROVECHECKRECORDS
				}
				uni.showLoading();
				this.$ajax.post(url,{
					loginName:this.userInfo.loginName,
					token:this.userInfo.token,
					yearmonth:date,//'2018-03'
				},(res)=>{
					//if(res.code=='0'){
						if(this.currentTab=='1'){
							this.checkRecords = res.data;
						}else{
							this.leaveStatistics = res.data;
						}
						
					//}
				},(error)=> {
					// this.requestStatus = 2;
				    //mui.toast(error);
				});
			},
			//确认请假/考勤
			comformLeave(){
				let url = this.$path.APPROVECONFIRMLEAVE
				if(this.currentTab=='1'){
					url = this.$path.APPROVECONFIRMATTENDANCE
				}
				this.$ajax.post(url,{
					loginName:this.userInfo.loginName,
					yearmonth:date,//'2018-03'
				}).then((res)=>{
					//if(res.code=='0'){
						mui.toast("确认成功",{ duration:'long', type:'div' });
					//}
				}).catch((error)=> {
					this.requestStatus = 2;
				    //mui.toast(error);
				});
			},
			checkQj(){
				if(this.leaveStatistics!=={}&&this.leaveStatistics.status==0){
					slider1.stopped = true;
					mui.confirm('请先确认请假后，再来确认考勤！','提示',['确定'],function(){
						slider1.stopped = false;
					},'div');
				}
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
