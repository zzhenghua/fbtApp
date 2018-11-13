<template>
	<view class="page">
		<time-view @getSubmitShow="getSubmitShow" :activeDateList="labelDate" @getAjax="getLeaveStatistics" :activeClass="activeClass"></time-view>
		
		<view class="">
			<button type="primary" class="mui-btn1 primary" size="mini" @tap="dtMode='year';showDtPicker=true">year</button>
			<button type="primary" class="mui-btn1 primary" size="mini" @tap="dtMode='month';showDtPicker=true">month</button>
			<button type="primary" class="mui-btn1 primary" size="mini" @tap="dtMode='date';showDtPicker=true">date</button>
			<button type="primary" class="mui-btn1 primary" size="mini" @tap="dtMode='hour';showDtPicker=true">hour</button>
			<button type="primary" class="mui-btn1 primary" size="mini" @tap="dtMode='minute';showDtPicker=true">minute</button>
			<button type="primary" class="mui-btn1 primary" size="mini" @tap="dtMode='second';showDtPicker=true">second</button>
		</view>
		<date-picker :dtMode="dtMode" v-if="showDtPicker" @hideDtPicker="hideDtPicker"></date-picker>
		
	</view>
</template>

<script>
	import timeView from '@/components/vueTimes'
	import datePicker from '@/components/datePicker'
	import { mapState, mapActions } from 'vuex'
	
// 	const birthdayPker = new mui.DtPicker({
// 		"type": "month",
// 		"beginYear": 1900,
// 		"endYear": 2030
// 	});
	let slider1;
	
	export default {
		data() {
			return {
				btnShow:false,//确认按钮
				requestStatus:0,
				dateTime:'',
				type:'qj',//默认请假(qj)  考勤:kq
				activeClass:'mui-badge-danger',
				leaveStatistics:{},//请假数据
				checkRecords:{},//考勤数据
				dtMode:'',
				showDtPicker:false
			};
		},
		computed:{
			...mapState(['userInfo']),
			labelDate(){
				let te = this.leaveStatistics.sysDayOffChildList,labelDate=[],filed='startDateStr';
				if(this.type=='kq'){
					te = this.checkRecords.attenedanceDayList;
					filed = 'date';
				}
				if(te){
					for(let i=0;i<te.length;i++){
						let a = te[i][filed].split(',');
						for(let v=0;v<a.length;v++){
							labelDate.push(a[v]);
						}
					}
				}
				return labelDate
			}
		},
		components: {
			timeView,
			datePicker
		},
		methods:{
			hideDtPicker(){
				setTimeout(()=>{
					this.showDtPicker = false;
				},500)
			},
			submiteForm:function(submiteBtn){
				let _this = this;
				let d = this.$refs[submiteBtn];
				let url = this.$path.APPROVECONFIRMLEAVE
				if(this.type=='kq'){
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
						if(this.type=='qj'){
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
				if(isChangeDate&&this.type=='kq'){
					return slider1.gotoItem(0);
				}
				let url = this.$path.APPROVELEAVESTATISTICS
				if(this.type=='kq'){
					url = this.$path.APPROVECHECKRECORDS
				}
				// this.$util.showWaiting();
				this.$ajax.post(url,{
					loginName:this.userInfo.loginName,
					yearmonth:date,//'2018-03'
				}).then((res)=>{
					//if(res.code=='0'){
						if(this.type=='kq'){
							this.checkRecords = res.data;
						}else{
							this.leaveStatistics = res.data;
						}
						
					//}
				}).catch((error)=> {
					this.requestStatus = 2;
				    //mui.toast(error);
				});
			},
			//确认请假/考勤
			comformLeave(){
				let url = this.$path.APPROVECONFIRMLEAVE
				if(this.type=='kq'){
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

</style>
