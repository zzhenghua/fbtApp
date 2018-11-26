<template>
	<view class="page">
		<scroll-view scroll-x style="width: 100%; height: 40px;">
			<view class="btnList">
				<button type="primary" class="mui-btn1 primary" @click="submitForm()">
					提交
				</button>
				<button type="primary" class="mui-btn1 primary" @click="saveForm()">
				  保存草稿
				</button>
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
			
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import segmentedControl from "../../../components/segmented-control.vue"
	import detailsForm from "../../../components/form/details-form.vue"
	
	export default {
		data() {
			return {
				tableForm:"",
//				images:'http://192.168.0.111:8080/bpmImage?processInstanceId=10000000758791',
				showSelectUser:false,
				showBack:false,
				definitionId:'',
				defId:"",
				fromPage:'',
				controlType:'',//
				tabs:["流程表单","流程图"],
				currentTab:0
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
			detailsForm
		},
		onLoad(e){
			this.defId = e.defId;
			this.fromPage = e.fromPage||'newForm';
			this.getList();
		},
		methods:{
			//点击tab
			onClickItem(index){
				this.currentTab = index;
			},
			showUserPop(pam){
				this.showSelectUser = true;
				if(pam&&pam.controlType){
					this.controlType = pam.controlType
				}
				
			},
			closeSelectUser(){
		  		this.showSelectUser = false;
		  	},
		  	getSelectUser(data){
		  		//{"uname":"张建鸿,陈彦孜","uid":"10000004713651,10000004713649"}
		  		this.$refs.tableFormId.getSelectUser(data);
		  	},
			getList(){
				let url = this.$path.LEAVECHECKFLOW;
				let params = {
					loginName:this.userInfo.loginName,
                    defId:this.defId,
                    token:this.userInfo.token
				};
				if(this.fromPage=="myDraft"){
					//我的草稿
					url = this.$path.LEAVEFLOWMYDRAFTDETAIL;
					params.runId = this.$route.query.runId;
					params.businessKey=this.$route.query.businessKey||"";
					params.copyKey = "";
					params.defId = "";
				}
				
					
				// this.$util.showWaiting();
				this.$ajax.post(url,params,(res)=>{
					console.log(res);
					this.tableForm = res.data;
					this.definitionId = res.data.actDefId;
				},(error)=> {
				});
			},
			checkForm(main,mainForm,saveUrl){
				let arr = [];
				for(let ii=0;ii<mainForm.fields.length;ii++){
					main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value;
					if(!saveUrl&&mainForm.fields[ii].require=='true'&&mainForm.fields[ii].value==''){
						arr.push(mainForm.fields[ii].label);
					}
				}
				if(arr.length>0){
					mui.toast('验证不通过：'+arr.join('、'));
					return false;
				}else{
					return true;
				}
				
			},
			submitForm(saveUrl){
				console.log(this.$refs.tableFormId.tableForm);
				let mainForm = this.$refs.tableFormId.tableForm.form,main={};
				let subForm = this.$refs.tableFormId.tableForm.form.subTableList,sub=[];
				main.fields={};
				main.fields.lcdh = this.$refs.tableFormId.tableForm.lcdh;
//				main.fields.sqrgh = this.userInfo.loginName;
//				main.fields.sqrxm = this.userInfo.cname;
//				main.fields.sqrbm = this.userInfo.departmentName;

				/*for(let ii=0;ii<mainForm.fields.length;ii++){
					main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value;
					if(!saveUrl&&mainForm.fields[ii].require=='true'&&mainForm.fields[ii].value==''){
						mui.toast('请完善：'+mainForm.fields[ii].label);
						return ;
					}
				}*/
				
				//表单验证
				let arr = [],isEquallyMonth=true,isNormalDate=true,isLessCurrentDate=true,djlx_value,isValidClock=true;
				let isNumberArr = ['xjts','ccts','sqzje','bxje','jkje','jtf','zsf','qtfy','hj'];//必须是数字的字段
				for(let ii=0;ii<mainForm.fields.length;ii++){
					//剔除附件中的￥@@￥
					if(mainForm.fields[ii].controlType==9){
						main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value.replace(/￥@@￥/g,'"');
					}else{
						main.fields[mainForm.fields[ii].key] = mainForm.fields[ii].value;
					}
					if(!saveUrl){
						if(mainForm.fields[ii].require=='true'&&mainForm.fields[ii].isShow=='true'&&mainForm.fields[ii].value==''&&mainForm.fields[ii].value!==0){
							//非空、必填
								arr.push(mainForm.fields[ii].label);
						}else if(mainForm.fields[ii].isShow=='true'&&mainForm.fields[ii].value!==''&&isNumberArr.indexOf(mainForm.fields[ii].key)>-1&&!(/^[0-9]*[.]?[0-9]*$/.test(mainForm.fields[ii].value))){
							//数字
								arr.push(mainForm.fields[ii].label+'(数字)');
						}
						if(this.tableForm.form.tableName.indexOf('请假&销假')>-1&&mainForm.fields[ii].key=='djlx'){
							djlx_value = mainForm.fields[ii].value;
						}
					}
				}
//				if(!this.checkForm(main,mainForm,saveUrl)){
//					return false;;
//				}
				
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
						//请假流程>选择开始日期时，结束日期需与开始日期同月，不能跨月，若一个流程需提多个月份，必须分多个明细来提
						let startDate,endDate,qjlx;
						for(let j=0;j<data.length;j++){
							let subFields = data[j],fd={};
							for(let p=0;p<subFields.length;p++){
								fd[subFields[p].key] = subFields[p].value;
								if(!saveUrl){
									//校验必填
									if(subFields[p].require=='true'&&subFields[p].isShow=='true'&&subFields[p].value==''&&subFields[p].value!==0){
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
									//开始日期
									if(this.tableForm.form.tableName.indexOf('请假&销假')>-1){
										if(subFields[p].key=='qjlx'){
											qjlx = subFields[p].value;
										}else if(subFields[p].key=='qssj'){
											startDate = subFields[p].value;
											if(startDate.replace(/[-: ]/g,'')<this.getNowFormatDate()&&(qjlx=='qjhj'||qjlx=='qjnj')&&djlx_value=='djqj'){
												isLessCurrentDate = false;
											}
										}else if(subFields[p].key=='jssj'){
											endDate = subFields[p].value;
											if(startDate.split('-')[1]!=endDate.split('-')[1]){
												isEquallyMonth = false;
											}else if(startDate.replace('-','')>=endDate.replace('-','')){
												isNormalDate = false;
											}
										}
									}
									//费用报销
									if(this.tableForm.form.tableName.indexOf('费用报销表')>-1){
										if(subFields[p].key=='dkjl'&&subFields[p].value=="无效"){
											isValidClock = false;
										}
									}
								}
							}
							sub[le].fields.push(fd)
						}
					}
					
				}
				//表单验证
				if(arr.length>0){
					mui.confirm('<p class="tl">验证不通过：<span style="color:#ad372e">'+arr.join('、')+'</span></p>','提示',['确认'],function(){},'div');
					return false;
				}else if(!isEquallyMonth){
					mui.confirm('<p class="tl">验证不通过：<span style="color:#ad372e">明细不允许跨月提交，请修改结束时间</span></p>','提示',['确认'],function(){},'div');
					return false;
				}else if(!isNormalDate){
					mui.confirm('<p class="tl">验证不通过：<span style="color:#ad372e">明细开始时间必须小于结束时间</span></p>','提示',['确认'],function(){},'div');
					return false;
				}else if(!isLessCurrentDate){
					mui.confirm('<p class="tl">验证不通过：<span style="color:#ad372e">请假类型为婚假、年假时，请假开始日期不能小于申请日期</span></p>','提示',['确认'],function(){},'div');
					return false;
				}
				/*else if(!isValidClock){
					mui.confirm('<p class="tl">验证不通过：<span style="color:#ad372e">打卡记录无效，无法提交</span></p>','提示',['确认'],function(){},'div');
					return false;
				}*/
				console.log(JSON.stringify(main))
				console.log(JSON.stringify(sub))
				//发送数据
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
                    businessKey:this.$route.query.businessKey||'',
                    lastDestTaskId:'',
                    voteContent:'',
                    back:''
				},(res)=>{
					console.log(res);
					if(saveUrl){
						mui.toast("表单保存成功");
						setTimeout(function(){
							this.$router.goBack();
						}.bind(this),1000)
						
					}else{
						mui.toast("表单提交成功");
						setTimeout(function(){
							this.$router.goBack();
						}.bind(this),1000)
					}
					
				},(error)=> {
				});
			},
			closeDilog(){
				//关闭所有弹框
				this.showBack = false;
			},
			//保存表单
			saveForm(){
				let _this = this;
				let html = '确定保存吗？';
				mui.confirm(html, '保存表单', ['取消','确定'], function(es) {
					if(es.index==0){
//						mui.toast("你点击的是取消")
					}else if(es.index==1){
						_this.submitForm(_this.$path.LEAVEFLOWSAVEFLOWFORM);
//						mui.toast("保存成功！")
					}
				},'div');
			},
			btnEvents(){
//				this.showDialog = false;
//				this.showSelectUser = false;
			},
			getNowFormatDate() {
			    let d = new Date();
			    let seperator1 = "-";
			    let seperator2 = ":";
			    let month = d.getMonth() + 1;
			    let strDate = d.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    let currentdate = d.getFullYear() + seperator1 + month + seperator1 + strDate
			            + " " + d.getHours() + seperator2 + d.getMinutes();
			    return currentdate.replace(/[-: ]/g,'');
			}
		}
	}
</script>

<style>
.page{
	height: 100%;
}
.btnList {
    padding: 3px 10px;
	background: #FFFFFF;
}
.tab_content{
	height: calc(100% - 93px);
	margin-top: 10px;
	background: #FFFFFF;
}
</style>
