<template>
	<view class="page">
		<scroll-view scroll-x style="width: 100%; height: 40px;">
			<view class="btnList">
				<button type="primary" class="mui-btn1 primary" @click="submitForm()">
					提交
				</button>
				<!-- <button type="primary" class="mui-btn1 primary" @click="saveForm()">
				  保存草稿
				</button> -->
			</view>
		</scroll-view>
		<view style="background: #FFFFFF;">
			<segmented-control ref="segmented" :values="tabs" activeColor="#0093dd" @clickItem="onClickItem" styleType="text"></segmented-control>
		</view>
		<view class="tab_content" style="" v-if="currentTab==0">
			<scroll-view scroll-y style="height: 100%">
				<details-form ref="tableFormId" v-if="tableForm&&fromPage" :fromPageType="fromPage"  @showUserPop="showUserPop" :tableForm="tableForm"></details-form>
			</scroll-view>
		</view>
		<view class="tab_content" style="" v-if="currentTab==1">
			<view class="uni-content-padded tc">
				<image :src="images" mode="widthFix" @tap="previewImage(images)"></image>
			</view>
		</view>
		<view class="tab_content" style="" v-if="currentTab==2">
			<scroll-view scroll-y style="height: 100%">
			<details-history :taskId="taskId" :runId="runId"></details-history>
			</scroll-view>
		</view>
		<popup-alert v-if="showPopupAlert" :showPopup="showPopupAlert" @buttonEvents="alertPopupButtonEvents">
			<view class=""  style="width: 500upx;">
				<view v-html="popupAlertContent"></view>
			</view>
		</popup-alert>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import segmentedControl from "../../../components/segmented-control.vue"
	import detailsForm from "../../../components/form/details-form.vue"
	import detailsHistory from "../../../components/form/details-history.vue"
	import popupAlert from '../../../components/popup-alert.vue'
	
	export default {
		data() {
			return {
				showBtns:'',
				tableForm:'',
//				images:bpmImagepng,
				showTongyi:false,
				showSelectUser:false,
//				showDialog:false,
				showZhuanban:false,
				selectUserValue:'',
				showGoutongyijian:false,
				showFeedback:false,
				showBack:false,
				taskId:'',
				runId:'',
				processInstanceId:'',//流程图id
				mapButton:[],//操作按钮
				fromPage:'',
				isCanBack:true,
				isFirstNode:false,//true驳回到发起人
				controlType:'',//
				selectParams:'',//选择弹框的参数
				
				tabs:["流程表单","流程图","审批历史"],
				currentTab:0,
				showPopupAlert:false,//alert弹框
				popupAlertContent:'',//alert弹框内容
			};
		},
		computed:{
			...mapState([
			    'userInfo',
			]),
			images(){
				return this.$path.BPMIMAGEPROCESSINSTANCEID+'?processInstanceId='+this.processInstanceId+'&v='+(new Date().getTime());
				//processInstanceId
			}
			
		},
		components:{
			segmentedControl,
			detailsForm,
			popupAlert,
			detailsHistory
		},
		onLoad(e){
			this.currentTab = 0;
			let types = e.types,
				taskId = e.taskId||"",
				runId = e.runId||"";
			this.showBtns = types;
			this.fromPage = types;
			this.taskId = taskId?taskId.toString():'';
			this.runId = runId?runId.toString():'';
			setTimeout(function() {
				this.getDclList(types);
				// mui(this.$refs.muiSlider).slider();
			}.bind(this), 300);
			
		},
		onBackPress() {
			if(this.showPopupAlert) {
				this.showPopupAlert = false;
				return true;
			}
		},
		methods:{
			//点击tab
			onClickItem(index){
				this.currentTab = index;
			},
			alertPopupButtonEvents(){
				this.showPopupAlert = false
			},
			previewImage(url){
				uni.previewImage({
					urls: [url]
				});
			},
			showUserPop(pam){
				this.showSelectUser = true;
				if(pam&&pam.controlType){
					this.controlType = pam.controlType,
					this.selectParams = pam.params;
				}
				
			},
			closeSelectUser(){
		  		this.showSelectUser = false;
		  	},
		  	getSelectUser(data){
		  		//{"uname":"张建鸿,陈彦孜","uid":"10000004713651,10000004713649"}
		  		this.$refs.tableFormId.getSelectUser(data);
		  	},
			getDclList(types){
				let url = this.$path.LEAVEFLOWAGENDAFORMDETAIL;
				let params = {
					loginName:this.userInfo.loginName,
                    token:this.userInfo.token
				};
				
				switch(types){
					case 'myApply0'://待办
					params.taskId = this.taskId;
					break;
					case 'myApply1'://已办
					url = this.$path.LEAVEFLOWSUBMITTEDORMDETAIL;
					params.runId = this.runId;
					break;
					case 'sswdtj'://已提交
					url = this.$path.LEAVEFLOWSUBMITTEDORMDETAIL;
					params.runId = this.runId;
					break;
					case 'myApply2'://抄送我
					url = this.$path.LEAVEFLOWSUBMITTEDORMDETAIL;
					params.runId = this.runId;
					break;
				}
				// // this.$util.showWaiting();
				this.$ajax.post(url,params,(res)=>{
					console.log(res);
					this.tableForm = res.data;
					this.processInstanceId = res.data.processInstanceId;
					this.isFirstNode = res.data.isFirstNode;
					if(res.data.isTaskNotify){
						this.isCanBack = res.data.isCanBack;
						this.mapButton = [];
					}else if(res.data.mapButton){
						this.mapButton = res.data.mapButton.button;
					}
				},(error)=> {
				});
			},
			//提交
			submitForm(saveUrl){
				console.log(this.$refs.tableFormId.tableForm);
				let mainForm = this.$refs.tableFormId.tableForm.form,main={};
				let subForm = this.$refs.tableFormId.tableForm.form.subTableList,sub=[];
				main.fields={};
				main.fields.lcdh = this.$refs.tableFormId.tableForm.lcdh;
				
				//表单验证
				let arr = [];
				for(let ii=0;ii<mainForm.fields.length;ii++){
					main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value;
					if(!saveUrl&&mainForm.fields[ii].require=='true'&&mainForm.fields[ii].value==''&&mainForm.fields[ii].value!==0){
						arr.push(mainForm.fields[ii].label);
					}
				}
				
				for(let i=0;i<subForm.length;i++){
					if(subForm[i].data&&subForm[i].data.length>0){
						let le = sub.length;
						sub[le]={};
						sub[le].tableName = subForm[i].tableName;
						sub[le].fields=[];
						let data = subForm[i].data;//这个data是我加的，不是接口返回的
						if(!data){
							continue;
						}
						for(let j=0;j<data.length;j++){
							let subFields = data[j],fd={};
	//						
							for(let p=0;p<subFields.length;p++){
								fd[subFields[p].key] = subFields[p].value;
								//校验必填
								if(!saveUrl&&subFields[p].require=='true'&&subFields[p].value==''&&subFields[p].value!==0){
									arr.push(subFields[p].label);
								}
								//校验validate
								if(!saveUrl&&subFields[p].validate&&subFields[p].validate.number==true){
									let validate = subFields[p].validate;
									if(subFields[p].value<validate.minValue||subFields[p].value>validate.maxValue){
										arr.push(subFields[p].label+'(有效范围：'+validate.minValue+'~'+validate.maxValue+')');
									}
								}
							}
							sub[le].fields.push(fd)
						}
					}
					
				}
				//表单验证
				if(arr.length>0){
					this.showPopupAlert = true;
					this.popupAlertContent = '<p class="tl">验证不通过：<span style="color:#ad372e">'+arr.join('、')+'</span></p>';
					return false;
				}
				
				//发送数据
				/* uni.showLoading({
					title:"数据加载中..."
				}) */
				// this.$util.showWaiting();
				this.$ajax.post(saveUrl||this.$path.LEAVEFLOWSUBMITFLOWFORM,{
					loginName:this.userInfo.loginName,
                    defId:this.defId,
                    token:this.userInfo.token,
                    formData:{
                    	main:main,
                    	sub:sub,
                    	opinion:[]
                    },
                    runId:this.$route.query.runId||'',
                    taskId:'',
                    actDefId:this.tableForm.actDefId,
                    flowKey:'',
                    destTask:'',
                    businessKey:this.tableForm.businessKey||'',
                    lastDestTaskId:'',
                    voteContent:'',
                    back:''
				},(res)=>{
					console.log(res);
					if(saveUrl){
						uni.showToast({
							icon:"none",
							title:"表单保存成功"
						})
						setTimeout(function(){
							this.$router.goBack();
						}.bind(this),1000)
						
					}else{
						uni.showToast({
							icon:"none",
							title:"表单提交成功"
						})
						setTimeout(function(){
							this.$router.goBack();
						}.bind(this),1000)
					}
					
				},(error)=> {
				});
			},
			//同意
			agree(){
				this.showTongyi = true;
			},
			agreeCallBack(nodeUser){
				let mainForm = this.$refs.tableFormId.tableForm.form,main={};
				let subForm = this.$refs.tableFormId.tableForm.form.subTableList,sub=[];
				main.fields={};
				main.fields.lcdh = this.$refs.tableFormId.tableForm.lcdh;
//				main.fields.sqrgh = this.userInfo.loginName;
//				main.fields.sqrxm = this.userInfo.cname;
//				main.fields.sqrbm = this.userInfo.departmentName;
				//表单验证
				let arr = [];
				let isNumberArr = ['xjts','ccts'];//必须是数字的字段
				let gsbmID_v,gsbmbh_i;
				for(let ii=0;ii<mainForm.fields.length;ii++){
					//剔除附件中的￥@@￥
					if(mainForm.fields[ii].controlType==9){
						main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value.replace(/￥@@￥/g,'"');
					}else{
						main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value;
					}
					if(mainForm.fields[ii].require=='true'&&mainForm.fields[ii].isShow=='true'&&mainForm.fields[ii].value==''&&mainForm.fields[ii].value!==0&&mainForm.fields[ii].isShow=='true'){
						arr.push(mainForm.fields[ii].label);
					}else if(mainForm.fields[ii].isShow=='true'&&mainForm.fields[ii].value!==''&&isNumberArr.indexOf(mainForm.fields[ii].key)>-1&&!(/^[0-9]*[.]?[0-9]*$/.test(mainForm.fields[ii].value))){
						//数字
							arr.push(mainForm.fields[ii].label+'(数字)');
					}
					if(this.tableForm.form.tableName.indexOf('入职申请')>-1){
						if(mainForm.fields[ii].key=='gsbmID'){
							gsbmID_v = mainForm.fields[ii].value;
						}else if(mainForm.fields[ii].key=='gsbmbh'){
							gsbmbh_i = ii;
						}
					}
				}
				
				//入职流程>保存归属部门ID
				if(gsbmID_v&&gsbmbh_i){
					main.fields.gsbmbh = gsbmID_v;
				}
				

				for(let i=0;i<subForm.length;i++){
					if(subForm[i].data&&subForm[i].data.length>0){
						let le = sub.length;
						sub[le]={};
						sub[le].tableName = subForm[i].tableName;
						sub[le].fields=[];
						let data = subForm[i].data;//这个data是我加的，不是接口返回的
						if(!data){
							continue;
						}
						for(let j=0;j<data.length;j++){
							let subFields = data[j],fd={};
	//						
							for(let p=0;p<subFields.length;p++){
								fd[subFields[p].key] = subFields[p].value;
								//校验必填
								if(subFields[p].require=='true'&&subFields[p].isShow=='true'&&subFields[p].value==''&&subFields[p].value!==0&&subFields[p].isShow=='true'){
									arr.push(subFields[p].label);
								}else if(subFields[p].isShow=='true'&&subFields[p].value!==''&&isNumberArr.indexOf(subFields[p].key)>-1&&!(/^[0-9]*[.]?[0-9]*$/.test(subFields[p].value))){
									//数字
									arr.push(subFields[p].label+'(数字)');
								}else 
								//请假流程》休假天数（需大于0）
								if(subFields[p].key=='xjts'&&subFields[p].value!=''&&!(subFields[p].value>0.0001)){
									arr.push(subFields[p].label);
								}
								//校验validate
								if(subFields[p].validate&&subFields[p].validate.number==true){
									let validate = subFields[p].validate;
									if(subFields[p].value<validate.minValue||subFields[p].value>validate.maxValue){
										arr.push(subFields[p].label+'(有效范围：'+validate.minValue+'~'+validate.maxValue+')');
									}
								}
							}
							sub[le].fields.push(fd)
						}
					}
					
				}
				//表单验证  审批阶段，只有驳回的到
				if(arr.length>0&&!(nodeUser&&nodeUser.nodeId)){
					this.showPopupAlert = true;
					this.popupAlertContent = '<p class="tl">验证不通过：<span style="color:#ad372e">'+arr.join('、')+'</span></p>';
					
					return false;
				}
				
				let params = {
					loginName:this.userInfo.loginName,
                    token:this.userInfo.token,
                    actDefId:this.tableForm.actDefId||'',
                    runId:this.tableForm.runId||'',
                    isFirstNode:this.tableForm.isFirstNode||false,
                    taskId:this.taskId,
                    voteAgree:1,//1:同意
                    back:0,
					startNode:'',
					voteContent:'',
                    formData:{
                    	main:main,
                    	sub:sub,
                    	opinion:[]
                    }
				};
				if(nodeUser&&nodeUser.nodeId){//驳回操作
					params.voteAgree=3;
					params.back=1;
					params.startNode=nodeUser.nodeId;
				}
				if(nodeUser){
					params.voteContent = nodeUser.reason;
				}
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.LEAVEFLOWAGREEOPINION,params,(res)=>{
					console.log(res);
					uni.showToast({
						icon:"none",
						title:"操作成功"
					})
					setTimeout(function(){
						this.$router.goBack();
					}.bind(this),1000)
				},(error)=> {
				});
			},
			//转办
			transfer(){
				this.showZhuanban = true;
			},
			transferCallBack(users){
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.LEAVEFLOWTRUNOPINION,{
					loginName:this.userInfo.loginName,
                    taskId:this.taskId,
                    assigneeId:users.uid,
                    assigneeName:users.uname,
                    memo:users.reason
				},(res)=>{
					console.log(res);
					uni.showToast({
						icon:"none",
						title:"操作成功"
					})
					setTimeout(function(){
						this.$router.goBack();
					}.bind(this),1000)
				},(error)=> {
				});
			},
			//驳回发起人
			reject(){
				this.showBack = true;
			},
			rejectCallBack(nodeUser){
				this.agreeCallBack(nodeUser);
			},
			//沟通意见 showGoutongyijian
			communicate(){
				this.showGoutongyijian = true;
			},
			communicateCallBack(users){
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.LEAVEFLOWCOMMUNICATEOPINION,{
					loginName:this.userInfo.loginName,
                    taskId:this.taskId,
                    cmpIds:users.uid,
                    opinion:users.reason
				},(res)=>{
					uni.showToast({
						icon:"none",
						title:"操作成功"
					})
					setTimeout(function(){
						this.$router.goBack();
					}.bind(this),1000)
				},(error)=> {
				});
			},
			//反馈
			feedback(){
				this.showFeedback = true;
			},
			feedbackCallBack(content){
				// this.$util.showWaiting();
				this.$ajax.post(this.$path.LEAVEFLOWFEEDBACKOPINION,{
					loginName:this.userInfo.loginName,
                    taskId:this.taskId,
                    opinion:content
				},(res)=>{
					uni.showToast({
						icon:"none",
						title:"操作成功"
					})
					setTimeout(function(){
						this.$router.goBack();
					}.bind(this),1000)
				},(error)=> {
				});
			},
			closeDilog(){
				//关闭所有弹框
				this.showTongyi = false;
				this.showZhuanban = false;
				this.showGoutongyijian = false;
				this.showBack = false;
				this.showFeedback = false;
			},
			//获取选中的用户
			getSelectUserValue(user){
				
			},
			//保存表单
			saveForm(){
				let html = '确定保存吗？';
				/* mui.confirm(html, '保存表单', ['取消','确定'], function(es) {
					if(es.index==0){
					}else if(es.index==1){
						mui.toast("保存成功！")
					}
				},'div'); */
			},
			btnEvents(){
//				this.showDialog = false;
//				this.showSelectUser = false;
			}
		}
	}
</script>

<style>
.page{
	height: 100%;
}
.btnList {
    padding: 5px 10px;
	background: #FFFFFF;
}
.tab_content{
	height: calc(100% - 93px);
	margin-top: 10px;
	background: #FFFFFF;
}
</style>
