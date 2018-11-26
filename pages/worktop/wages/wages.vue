<template>
	<view class="page">
		<view class="" style="padding: 15px 0;">
			<view class="tabs_head">
				<segmented-control ref="segmented" :values="tabs" activeColor="#0093dd" @clickItem="onClickItem"></segmented-control>
			</view>
		</view>
		<view class="tab_content" style="height: calc(100% - 70px);" v-if="currentTab==0">
		<scroll-view scroll-y style="height: 100%;background: #ffffff;">
			<view class="formBox" v-if="currentWages&&currentWages.name">
				<view class="uni-flex">
					<view class="uni-flex-item lable tr">姓名</view>
					<view class="uni-flex-item inputText"><text>{{currentWages.name}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>工号</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.empNo}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>薪酬年月</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.yearMouthDate}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>入职日期</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.entryDate}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>转正日期</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.revisednDate}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>离职日期</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.dimissionDate}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>基本工资标准</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.basicAllo}}</text></view>
				</view>
				<view class="uni-flex" v-if="currentWages.stanAllo>0">
					<view class="uni-flex-item lable tr"><text>外派津贴标准</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.stanAllo}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr" v-if="currentWages.stanAllo>0"><text>岗位津贴标准</text></view>
					<view class="uni-flex-item lable tr" v-else><text>绩效工资标准</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.postAllo}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>事假天数</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.casualleaveDays}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>病假天数</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.sickleaveDays}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>产假天数</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.maternityLeave}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>年假天数</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.annualeaveDays}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>实际出勤天数</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.actualDays}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>基本工资</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.basicWage}}</text></view>
				</view>
				<view class="uni-flex" v-if="currentWages.stanAllo>0">
					<view class="uni-flex-item lable tr"><text>外派津贴</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.expatriateSubsidy}}</text></view>
				</view>
				 <view class="uni-flex">
					<view class="uni-flex-item lable tr" v-if="currentWages.stanAllo>0"><text>岗位津贴</text></view>
					<view class="uni-flex-item lable tr" v-else><text>绩效工资</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.jobSubsidy}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>其他补扣/补发</text></view>
					<view class="uni-flex-item inputText"><text class="red">{{currentWages.otherDeduct}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>应发合计</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.actualSend}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>社保个人部分</text></view>
					<view class="uni-flex-item inputText"><text class="red">{{currentWages.socialCountPersonal}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>公积金个人部分</text></view>
					<view class="uni-flex-item inputText"><text class="red">{{currentWages.housingFundPersonal}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>个人所得税</text></view>
					<view class="uni-flex-item inputText"><text class="red">{{currentWages.inviewidualTaxes}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text>税后补扣/补发</text></view>
					<view class="uni-flex-item inputText"><text class="red">{{currentWages.afterTaxDeduct}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text class="bold">实发工资</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.actualWage}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text class="bold">10号发放</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.sendOfTen}}</text></view>
				</view>
				<view class="uni-flex">
					<view class="uni-flex-item lable tr"><text class="bold">20号发放</text></view>
					<view class="uni-flex-item inputText"><text>{{currentWages.sendOfTwenty}}</text></view>
				</view>
				<view class="uni-flex flex">
					<view class="uni-flex-item lable tr"><text>备注</text></view>
					<view class="uni-flex-item inputText"><text style="color: #999999;">{{currentWages.ductContent}}</text></view>
				</view>
				<view class="uni-content-padded tc">
					<view class="font12 c999" style="padding-bottom: 10px;">提示：有任何疑问，请发起沟通。<text @click="showBox" class="c0093dd">马上沟通</text></view>
				</view>
			</view>
			</scroll-view>
		</view>
		<view class="tab_content" style="height: calc(100% - 70px);" v-if="currentTab==1">
			<view class="head uni-flex cred">
				<view class="uni-flex-item">
					<icon class="uni-icon iconfont">&#xe669;</icon>
					{{selectedDate||'请选择年月'}}
				</view>
				<button type="primary" class="primary mui-btn1" @click="selectYear">年月选择</button>
			</view>
			<scroll-view scroll-y style="height: calc(100% - 54px);background: #ffffff;">
				<view class="formBox"  v-if="dateWages&&dateWages.empNo">
					<!--<view class="tc">转正申请表</view>-->
					<!--<view class="uni-flex">
						<view class="uni-flex-item lable tr">表名</view>
						<view class="uni-flex-item inputText">转正申请表</view>
					</view>-->
					<view class="uni-flex">
						<view class="uni-flex-item lable tr">姓名</view>
						<view class="uni-flex-item inputText"><text>{{dateWages.name}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>工号</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.empNo}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>薪酬年月</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.yearMouthDate}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>入职日期</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.entryDate}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>转正日期</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.revisednDate}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>离职日期</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.dimissionDate}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>基本工资标准</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.basicAllo}}</text></view>
					</view>
					<view class="uni-flex" v-if="dateWages.stanAllo>0">
						<view class="uni-flex-item lable tr"><text>外派津贴标准</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.stanAllo}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr" v-if="dateWages.stanAllo>0"><text>岗位津贴标准</text></view>
						<view class="uni-flex-item lable tr" v-else><text>绩效工资标准</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.postAllo}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>事假天数</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.casualleaveDays}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>病假天数</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.sickleaveDays}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>产假天数</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.maternityLeave}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>年假天数</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.annualeaveDays}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>实际出勤天数</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.actualDays}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>基本工资</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.basicWage}}</text></view>
					</view>
					<view class="uni-flex" v-if="dateWages.stanAllo>0">
						<view class="uni-flex-item lable tr"><text>外派津贴</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.expatriateSubsidy}}</text></view>
					</view>
					 <view class="uni-flex">
						<view class="uni-flex-item lable tr" v-if="dateWages.stanAllo>0"><text>岗位津贴</text></view>
						<view class="uni-flex-item lable tr" v-else><text>绩效工资</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.jobSubsidy}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>其他补扣/补发</text></view>
						<view class="uni-flex-item inputText"><text class="red">{{dateWages.otherDeduct}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>应发合计</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.actualSend}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>社保个人部分</text></view>
						<view class="uni-flex-item inputText"><text class="red">{{dateWages.socialCountPersonal}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>公积金个人部分</text></view>
						<view class="uni-flex-item inputText"><text class="red">{{dateWages.housingFundPersonal}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>个人所得税</text></view>
						<view class="uni-flex-item inputText"><text class="red">{{dateWages.individualTaxes}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text>税后补扣/补发</text></view>
						<view class="uni-flex-item inputText"><text class="red">{{dateWages.afterTaxDeduct}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text class="bold">实发工资</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.actualWage}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text class="bold">10号发放</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.sendOfTen}}</text></view>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item lable tr"><text class="bold">20号发放</text></view>
						<view class="uni-flex-item inputText"><text>{{dateWages.sendOfTwenty}}</text></view>
					</view>
					<view class="uni-flex flex">
						<view class="uni-flex-item lable tr"><text>备注</text></view>
						<view class="uni-flex-item inputText"><text style="color: #999999;">{{dateWages.ductContent}}</text></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="tab_content pr" style="height: calc(100% - 70px);" v-if="currentTab==2">
			<view class="head uni-flex cred">
				<view class="uni-flex-item">
					<icon class="uni-icon iconfont">&#xe669;</icon>
					{{selectAnswerDate||'全部'}}
				</view>
				<button type="primary" class="primary mui-btn1" @click="selectYear">年月选择</button>
			</view>
			<scroll-view scroll-y style="height: calc(100% - 54px);background: #ffffff;">
				<view class="uni-list">
					<view class="uni-list-cell" v-for="(item,index) in problemList" :key="index" hover-class="uni-list-cell-hover" @click="showAnswerDetails(item.id)">
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="">
								<view class="">
									<text class="bold">问题：</text>
									<text>{{item.description}}</text>
								</view>
								<view class="uni-flex c999">
									<text class="uni-badge uni-bage-default font12">{{item.payYearMonth}}</text>
									<text class="uni-flex-item tr font12">{{item.createTime}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<answer-details ref="answerComponents" v-if="showDetails" :detailsData="detailsData" :scrollIntoView="scrollIntoView"  @answerText="answerText" @backList="backList"></answer-details>					
		</view>
		<date-picker ref="dtPicker" dtMode="month" :showDtPicker="showDtPicker" :defaultTime="defaultTime" @hideDtPicker="hideDtPicker" @sureDtPicker="sureDtPicker"></date-picker>
		
		<popup-confirm v-if="isShowBox" :title="popTitle" :showPopup="isShowBox" :btns="btns"  @buttonEvents="btnEvents">
			<view class=""  style="width: 500upx;padding: 0 10upx 10upx;">
				<textarea class="textarea" name="textarea" v-model.trim="question" rows="5" cols="" :placeholder="tips"></textarea>
			</view>
		</popup-confirm>
		
		
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import segmentedControl from '@/components/segmented-control'
	import datePicker from "../../../components/datePicker.vue"
	import answerDetails from "../../../components/answerDetails.vue"
	import popupConfirm from "../../../components/popup-confirm.vue"
	
	export default {
		data() {
			return {
				currentDate:'',
				currentWages:{},
				dateWages:{},
				selectedDate:'',
				selectAnswerDate:'',
				
				problemList:[],
				question:'',
				popTitle:'提交问题',
				tips:"请详细描述您对薪资的疑问，预计3个工作日内答复。",
				btns:[{
						text:'取消',
						tclass:''//绑定class
					},{
						text:'提交',
						tclass:'c0093dd'//绑定class
					}],
				showDetails:false,//显示沟通详情
				isShowBox:false,//沟通输入框
				detailsData:{},
				page:0,
				pageSize:100,
				problemId:'',//保存问题id
				
				tabs:["当月薪资","历史查询","历史沟通"],
				currentTab:0,
				showDtPicker:false,
				defaultTime:'',
				scrollIntoView:''
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		components:{
			segmentedControl,
			datePicker,
			answerDetails,
			popupConfirm
		},
		onLoad() {
			this.currentTab = 0;
			setTimeout(()=>{
				this.getWagesInfo();
			},300)
		},
		onUnload(){
			this.$refs.segmented.onClick(0);
		},
		onBackPress(){
			if(this.showDetails){
				this.showDetails = false;
				return true;
			}
			if(this.showDtPicker){
				this.showDtPicker = false;
				return true;
			}
		},
		methods:{
			//点击tab
			onClickItem(index){
				this.showDetails = false;
				this.currentTab = index;
				if(index==0){
					this.activeClass = 'uni-badge-danger'
				}else if(index==1){
					this.activeClass = 'active'
				}else if(index==2){
					this.getProblemList();
				}
				// this.getLeaveStatistics(this.currentDate.year+'-'+(this.currentDate.month<10?('0'+this.currentDate.month):this.currentDate.month));
			},
// 			selectTime(){
// 				this.dtMode='month';
// 				this.showDtPicker=true;
// 			},
			//取消
			hideDtPicker(){
				this.$refs.dtPicker.closeAnimate();
				setTimeout(()=>{
					this.showDtPicker = false;
				},200)
			},
			//确定
			sureDtPicker(value){
// 				this.currentDate.year = parseInt(value.split('-')[0]);//加parseInt，否则日历上颜色标记不上
// 				this.currentDate.month = parseInt(value.split('-')[1]);

				//isAnswer
				if(this.currentTab==2){
					this.selectAnswerDate = value.split('-')[0]+'-'+value.split('-')[1]
					this.getProblemList(this.selectAnswerDate);
				}else{
					this.selectedDate = value.split('-')[0]+'-'+value.split('-')[1]
					this.getWagesInfo(this.selectedDate);
				}
				this.hideDtPicker();
				// this.$refs.vueTimes.getMonthDay();
			},
			selectYear(isAnswer){
				let _this = this;
				this.showDetails = false;
				if(this.currentTab==2){
					this.defaultTime = this.selectAnswerDate;
				}else{
					this.defaultTime = this.selectedDate;
					// console.log('wages:'+this.defaultTime)
				}
				this.showDtPicker=true;
				/* dtPicker.show(function (res) { 
					if(isAnswer=="isAnswer"){
						_this.selectAnswerDate = res.value;
						_this.getProblemList(res.value);
					}else{
						_this.selectedDate = res.value;
						_this.getWagesInfo(res.value);
					}
					
			    }) */
			},
			answerSelectYear(){
				this.showDetails = false;
				this.selectYear('isAnswer');
			},
			getWagesInfo(date){
				let currentDate = '';
				if(!date){
//					debugger
					//获取当前月份
					let d = new Date(),m='';
					currentDate = d.getFullYear();
//					d.setMonth(d.getMonth()+1);
					m = d.getMonth();
					
					currentDate += '-'+(m>9?m:'0'+m);
					this.currentDate = currentDate;
				}
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.APPWAGEINFOWAGEINFO,{
					loginName: this.userInfo.loginName,
					token: this.userInfo.token,
					yearmonth: date||currentDate,
					token:this.userInfo.token
				},(res)=>{
					if(date){
						this.dateWages = res.data;
					}else{
						this.currentWages = res.data
					}
				},(error)=> {
					
				});
			},
			getProblemList(date){
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.SALARYANSWERLIST,{
					loginName: this.userInfo.loginName,
					token: this.userInfo.token,
					yearmonth: date||this.selectAnswerDate,//2018-07
					page:this.page,
					pageSize:this.pageSize
				},(res)=>{
					this.problemList = res.data.data;
					if(res.data.data.length==0){
						uni.showToast({
							icon:"none",
							title:"暂无数据"
						})
					}
				},(error)=> {
					
				});
			},
			showBox(){
				//发起提问
				this.popTitle = '提交问题';
				this.tips = "请详细描述您对薪资的疑问，预计3个工作日内答复。";
				this.question = '';
				this.isShowBox = true;
			},
			btnEvents(index){
				if(index==1){
					if(this.question==''){
						return uni.showToast({
							icon:"none",
							title:"内容不能为空"
						})
					}else{
						//关闭
						this.submiteProblem();
						this.isShowBox = false;
					}
					
				}else{
					this.isShowBox = false;
				}
			},
			submiteProblem(){
				//提问
				let params={
					loginName: this.userInfo.loginName,
					token: this.userInfo.token,
					question:this.question.replace(/\n|\r\n/g,"<br/>"),
					yearmonth: this.currentDate,//2018-07
				},url=this.$path.SALARYSQUESTION;
				if(this.tips == "请输入回复的内容"){
					//回复
					url = this.$path.SALARYANSWERREPLY;
					params = {
						loginName: this.userInfo.loginName,
						token: this.userInfo.token,
						reply:this.question.replace(/\n|\r\n/g,"<br/>"),
						id: this.problemId,
					}
				}
				// this.$util.showWaiting();
				this.$ajax.post(url,params,(res)=>{
					this.question = '';
					if(res.data.code==1){
						//成功
//						mui.toast(res.data.message)
					}
					uni.showToast({
						icon:"none",
						title:res.data.message
					})
					if(this.tips == "请输入回复的内容"){
						this.showAnswerDetails(this.problemId);
						//回复内容滚动到底部
						setTimeout(function(){
							this.$refs.answerComponents.scrollEnd();
						}.bind(this),2000);
					}
				},(error)=> {	
				});
			},
			//显示沟通详情
			showAnswerDetails(id){
				this.problemId = id;
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.SALARYANSWERINFO,{
					loginName: this.userInfo.loginName,
					token: this.userInfo.token,
					id:id,
				},(res)=>{
					this.showDetails = true;
					this.detailsData = res.data.data;
					this.scrollIntoView = "scrollBottom";
					setTimeout(()=>{
						this.scrollIntoView = "";
					},200)
				},(error)=> {
					
				});
			},
			//按钮——返回列表
			backList(){
				this.showDetails = false;
			},
			//按钮——回复
			answerText(){
				this.popTitle = "回复";
				this.tips = "请输入回复的内容";
				this.question = '';
				this.isShowBox = true;
//				this.submiteProblem();
			}
		}
	}
</script>

<style>
.page{
	height: 100%;
}
.tabs_head{
	background: #FFFFFF;
	width: 80%;
	margin: 0upx auto;
	border-radius: 20upx;
}
.head{
    padding: 10px 15px;
    border-bottom: 1px solid #DDDDDD;
	align-items: center;
	background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
}
.uni-badge{
	line-height: 1.4;
}
.textarea{
	border:1px solid #ecebeb;
	height:100px;
	width:auto;
	padding:10rpx;
	border-radius: 4px;
}
.uni-list:before{
	height: 0px;
}


.formBox {
    padding: 0 10px;
}
.formBox .lable {
  width: 50%;
  padding: 6px 10px;
	line-height: 21px;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	background: rgba(160, 160, 160, 0.07);
	color: #333;
	border-right: 1px solid #efeff4;
}
.formBox > .uni-flex {
    border-bottom: 1px solid rgba(226, 226, 226, 0.45);
}

.inputText {
  padding: 6px 10px;
  line-height: 21px;
  width: 50%;
  background: #FFFFFF;
}
.inputText text {
  color: #0093DD;
}
.inputText .red {
  color: #ad372e;
}
</style>
