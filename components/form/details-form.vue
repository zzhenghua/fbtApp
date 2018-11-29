<template>
	<view class="formBox">
		<!--新建流程表单-->
	        <!-- <block > -->
	        	 <!--主表-->
	        <view v-if="tableForm.form"  v-for="(item,$index) in tableForm.form.fields" :key="$index" :class="{'uni-flex':item.controlType!=16&&item.isShow=='true',readOnly:item.isEdit=='false'}">
	        	<!--隐藏域-->
	        	<input v-if="item.controlType==16" type="hidden"  :name="item.key" v-model.trim="item.value">
	        	<block v-else>
	        	<view v-if="item.isShow=='true'" class=" lable tr" ><text class="red" v-if="item.isEdit=='true'&&item.isShow=='true'&&item.require=='true'">*</text> {{item.label}}</view>
	        	<block v-if="item.isShow=='true'">
	        		<!--不可编辑-->
	        		<block v-if="item.isEdit=='false'">
	        			<block v-if="item.controlType==9">
	        				<view class="uni-flex-item inputSpan c999">
		        				<block v-if="item.value.indexOf('[')>-1"  v-for="(unit,$it) in jsonToObj(item.value)" :key="$it">
		        					<!-- <block v-if="unit.url">
		        						<image :src="unit.url" v-if="item.value" data-preview-src="" :data-preview-group="item.key" style="width: 0px;height: 0px;" :ref="item.key+'img'+$it"></image>
					        			<button class="mui-btn-link mui-ellipsis" style="max-width: 80%;" @click="previewImg(item.key+'img'+$it)">{{unit.url}}</button>
		        					
									</block>
				        			<text class="inputSpan c999" v-else>{{unit.name}}</text> -->
				        		</block>
				        		<!-- <text v-else >{{item.value}}</text> -->
	        				</view>
	        			</block>
	        			<view class="uni-flex-item inputSpan c999" v-else>{{item.value}}</view>
	        		</block>
	        		<block v-else>
		        	<!--单行文本框-->
		        	<view v-if="item.controlType==1||item.controlType==10" class="uni-flex-item inputText needsclick">
		        		<input v-if="item.validate&&item.validate.number" class="needsclick" type="number"  :name="item.key" v-model.trim="item.value" @input="addTotal1(item.key)" :placeholder="item.validate.maxValue?('参考范围'+item.validate.minValue+'~'+item.validate.maxValue+'之间'):''">
		        		<input v-else type="text"  :name="item.key" :readonly="item.readonly" v-model.trim="item.value" @input="addTotal1(item.key)">
		        	</view>
		        	
		        	<!--多行文本框-->
		        	<view v-else-if="item.controlType==2" class="uni-flex-item inputText">
		        		<textarea  :name="item.key" v-model.trim="item.value" rows="" cols=""></textarea>
		        	</view>
		        	
		        	<!--文件上传-->
		        	<view v-else-if="item.controlType==9" class="uni-flex-item inputText" style="font-size: 0;">
								<!-- {{item.value}} -->
		        		<!-- <block  v-for="(unit,$it) in jsonToObj(item.value)" :key="$it"> -->
									<!-- {{unit.url}} -->
								<view class="" v-for="(unit,$it) in jsonToObj(item.value)" :key="$it">
									<text v-if="unit">11111{{unit}}</text>
										<!-- <button class="mui-btn-link mui-ellipsis" style="max-width: 80%;vertical-align: middle;" @click="previewImg(item.key+'img'+$it)">{{unit.url}}</button> -->
										<!-- <text style="vertical-align: middle;" class="mui-icon mui-icon-closeempty" @click="removeFile(item,$it)"></text> -->
								</view>
			        		<!-- </block> -->
			        		<button class="mui-btn1 primary" type="primary" style="padding: 3px 8px;margin: 2px 5px;" @click="uploadFile(item)">选择</button>
			        		<!-- <input type="file" :name="item.key+'file'" multiple="multiple" style="width: 0px;height: 0px;opacity: 0;"  :id="item.key" @change="uploadFile(item)" accept="image/*"/> -->
		        	</view>
		        	
		        	<!--日期控件-->
		        	<view v-else-if="item.controlType==15" class="uni-flex-item inputText pr" @click="dateKj(item)">
		        		<input type="text" disabled="true"  :name="item.key" v-model.trim="item.value">
		        		<text class="iconfont icon-rili1">&#xe669;</text>
		        	</view>
		        	
		        	<!--数据字典-->
		        	<view v-else-if="item.controlType==3||item.controlType==11||item.controlType==13||item.controlType==14" :data-name="item.key" class="uni-flex-item inputText uni-navigate-right pr">
		        		<input type="text" :name="item.key" id="" disabled="true" :value="item.text" @click="getSelectPk(item)" />
		        	</view>
		        	
		        	<!--部门、用户弹框-->
		        	<view v-else class="uni-flex-item inputText uni-navigate-right pr" :data-name="item.key" v-model.trim="item.value" @click="showUser('this.tableForm.form.fields|'+item.key+'|'+item.controlType)">
		        		<input type="hidden" name="" id="" v-model.trim="item.value" />
		        		<text class="inputSpan" style="width: 80%;">{{item.value}}</text>
		        	</view>
		        	</block>
	        	</block>
	        	</block>
	        </view>
	        
	        <!--子表-->
	        <block v-if="tableForm.form.subTableList" v-for="(subtable,$i) in tableForm.form.subTableList" :key="$i">
	        <view v-if="subtable.data&&subtable.data.length>0" style="padding: 10px;margin-top:10px;    box-shadow: 0px 0px 10px #ddd;">
	        <h5>{{subtable.tableDesc}}</h5>
	        <view class="subItem"  v-for="(dataList,$it) in subtable.data" :key="$it">
	        <view  v-for="(item,$index) in dataList"  :class="{'uni-flex':item.controlType!=16}" :key="$index">
	        	<!--隐藏域-->
	        	<input v-if="item.controlType==16" type="hidden"  :name="item.key" :value="item.value">
	        	<block v-else>
	        	<view class=" lable tr" v-if="item.isShow=='true'"><text class="red" v-if="item.isEdit=='true'&&item.isShow=='true'&&item.require=='true'">*</text> {{item.label}}</view>
	        	<block v-if="item.isShow=='true'">
	        		<view class="uni-flex-item inputSpan c999" v-if="item.isEdit=='false'">{{item.value}}</view>
	        		<block v-else>
		        	<!--单行文本框-->
		        	<view v-if="item.controlType==1||item.controlType==10" class="uni-flex-item inputText needsclick">
		        		<input v-if="item.validate&&item.validate.number" class="needsclick" type="number"  :name="item.key" v-model.trim="item.value" @input="addTotal1(item.key)" :placeholder="item.validate.maxValue?('参考范围'+item.validate.minValue+'~'+item.validate.maxValue+'之间'):''">
		        		<input v-else type="text"  :name="item.key" v-model.trim="item.value" @input="addTotal1(item.key)">
		        	</view>
		        	
		        	<!--多行文本框-->
		        	<view v-else-if="item.controlType==2" class="uni-flex-item inputText">
		        		<textarea  :name="item.key" v-model.trim="item.value" rows="" cols=""></textarea>
		        	</view>
		        	
		        	<!--文件上传-->
		        	<view v-else-if="item.controlType==9" class="uni-flex-item inputText">
		        		<input type="file"   :name="item.key">
		        	</view>
		        	
		        	<!--日期控件-->
		        	<view v-else-if="item.controlType==15" class="uni-flex-item inputText pr" @click="dateKj(item,'_this.tableForm.form.subTableList['+$i+'].data['+$it+']')">
		        		<input type="text" disabled="true"  :name="item.key" v-model.trim="item.value">
		        		<text class="iconfont icon-rili1">&#xe669;</text>
		        	</view>
		        	
		        	<!--数据字典-->
		        	<view v-else-if="item.controlType==3||item.controlType==11||item.controlType==13||item.controlType==14" :data-name="item.key" class="uni-flex-item inputText uni-navigate-right pr">
		        		<input type="text" :name="item.key" id="" disabled="true" :value="item.text" @click="getSelectPk(item,'_this.tableForm.form.subTableList['+$i+'].data['+$it+']')" />
		        	</view>
		        	
		        	
		        	<!--部门、用户弹框-->
		        	<view v-else class="uni-flex-item inputText uni-navigate-right pr" :data-name="item.key" v-model.trim="item.value" @click="showUser('this.tableForm.form.subTableList['+$i+'].data['+$it+']|'+item.key+'|'+item.controlType)">
		        		<input type="hidden" name="" id="" v-model.trim="item.value" />
		        		<text class="inputSpan" style="width: 80%;">{{item.value}}</text>
		        	</view>
		        	
		        	</block>
	        	</block>
	        	</block>
	        </view>
	        </view>
	        <view class="mui-content-padded tr" v-if="fromPage=='newForm'||isFirstNode">
	        	<button class="mui-btn1 primary" type="primary" style="padding: 5px; margin-right: 10px;" v-if="subtable.data.length>1" @click="removeSubtableList($i)">删除</button>
	        	<button class="mui-btn1 primary" type="primary" style="padding: 5px;" @click="addSubtableList($i)">添加</button>
	        </view>
	        <view class="mui-content-padded cred font12" v-if="tableForm.form.tableName.indexOf('销假申请表')>-1&&(fromPage=='newForm'||isFirstNode)">
	        	<view>说明：请假小时折算公式：请假小时数/应出勤工作小时数。(若不清楚应出勤工作小时请联系员工关系)</view>
	        	<view>如：请假1天3小时，天数填：1.375  备注填：1天3小时;</view>
				<view>产假、婚假，天数填自然日天数，其他假，天数填工作日天数。</view>
	        </view>
	        </view>
	        </block>
	        <!-- </block> -->
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			<date-picker ref="dtPicker" :dtMode="dtMode" :showDtPicker="showDtPicker" :defaultTime="defaultTime" @hideDtPicker="hideDtPicker" @sureDtPicker="sureDtPicker"></date-picker>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	import mpvuePicker from "../mpvuePicker.vue"
	import datePicker from "../datePicker.vue"
	
	//是否为json数据
	const isJSON = (str)=>{
	    if (typeof str == 'string') {
	        try {
	            let  obj=JSON.parse(str);
	            if(typeof obj == 'object' && obj ){
	                return true;
	            }else{
	                return false;
	            }
	
	        } catch(e) {
	            return false;
	        }
	    }
	}
// 	const datePk = '';
// 	const selectPk = ''; 
	
	 //金额转换成中文大写金额
	const  digitUppercase = function(n){
		    let  fraction = ['角', '分'];
		    let  digit = [
		        '零', '壹', '贰', '叁', '肆',
		        '伍', '陆', '柒', '捌', '玖'
		    ];
		    let  unit = [
		        ['元', '万', '亿'],
		        ['', '拾', '佰', '仟']
		    ];
		    let  head = n < 0 ? '欠' : '';
		    n = Math.abs(n);
		    let  s = '';
		    for (let  i = 0; i < fraction.length; i++) {
		        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		    }
		    s = s || '整';
		    n = Math.floor(n);
		    for (let  i = 0; i < unit[0].length && n > 0; i++) {
		        let  p = '';
		        for (let  j = 0; j < unit[1].length && n > 0; j++) {
		            p = digit[n % 10] + unit[1][j] + p;
		            n = Math.floor(n / 10);
		        }
		        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		    }
		    return head + s.replace(/(零.)*零元/, '元')
		        .replace(/(零.)+/g, '零')
		        .replace(/^整$/, '零元整');
		}
	//计算日期差date1-date2  日期格式2018-08-07
	const dateDifference = (date1,date2)=>{
		let d = new Date(),t1,t2;
		date1 = date1.substring(0,10);
		date2 = date2.substring(0,10);
		d.setFullYear(date1.split('-')[0]);
		d.setMonth(date1.split('-')[1]-1);
		d.setDate(date1.split('-')[2]);
		t1 = d.getTime();
		d.setFullYear(date2.split('-')[0]);
		d.setMonth(date2.split('-')[1]-1);
		d.setDate(date2.split('-')[2]);
		t2 = d.getTime();
		return (t1-t2)/(1000*60*60*24)
	}
	
	let sskhbm;//入职后流程》所属客户部门
	let khbm;//入职后流程》客户编码
	let rybjlx;//入职后流程/调动流程》人员报价类型    
	let index5;//入职后流程》工作地
	
	let khbmdc;//调动流程》客户调出编码
	let khbmdr;//调动流程》客户调入编码
	let jsgwbmdr;//调动流程》结算岗位编码  、入职流程》结算岗位编码
	let jsgwbmdr_i;//调动流程》结算岗位编码序号 、入职流程》结算岗位编码序号
	let jsgwbmdrgr;//调动流程》结算岗位编码个人
	let jsgwbmdrgr_i;//调动流程》结算岗位编码个人序号
	
	let maxFileLen;//附件最大数量
	
	let fybxlx;//费用报销》报销类型
	export default{
		name: 'detailsForm',
		props:{
			fromPageType:{
				type:String,
				default:'newForm'
			},
			tableForm:{
//				required:true,
				type: Object,
			    default: function () {
//			    	return [{"key":"gh","label":"工号","value":"admin","controlType":1},{"key":"xjqjlxdh","label":"休假期间联系电话","value":"","controlType":1},{"key":"xtzxgbmhry","label":"需通知相关部门人员","value":"","controlType":8},{"key":"khsppz","label":"客户审批凭证","value":"","controlType":9},{"key":"hjts","label":"合计（天数）","value":"","controlType":1},{"key":"hjxss","label":"合计（小时数）","value":"","controlType":1},{"key":"djlx","label":"单据类型","value":"","controlType":11},{"key":"sy","label":"事由","value":"","controlType":1}]
			        return {}
			    }
			},
			isFirstNode:{
				type:Boolean,
				default:false
			},
			
		},
		data(){
			return {
				currentSelectPop:'',
				fromPage:'',
				
				pickerValueArray:[],//选择框
				mode:'',
				deepLength:'',
				pickerValueDefault:'',
				pickerItem:'',
				showDtPicker:false,//日期选择框
				defaultTime:'',
				dtPickerItem:'',
				dtMode:'minute'
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		components:{
			mpvuePicker,
			datePicker
		},
		created(){
			this.fromPage="newForm";
			
			let isDraft = false;//是否为草稿
			this.fromPage=this.fromPageType;
			if(this.fromPageType=='myDraft'){
				this.fromPage="newForm";//为了沿用newForm的数据绑定
				isDraft = true;
			}
			//初始化主表下拉字典
			this.mainSelector();
			//子表默认有一条数据
			if(this.fromPage=='newForm'&&isDraft==false){
				
					let subTableList = this.tableForm.form.subTableList,fields;
					for(let i=0;i<subTableList.length;i++){
						fields = subTableList[i].fields;
						subTableList[i].data=[];
						//初始化子表下拉框 this.tableForm.form.subTableList[i].fields[k]
						for (let k=0;k<fields.length;k++) {
							this.getSelectItemType(subTableList[i].tableId,fields[k].key,fields[k]);
							this.concatID(fields,k);
						}
						//费用报销表  先不显示子表
						if(this.tableForm.form.tableName.indexOf('费用报销表')==-1){
							// console.log('subTableListfields:'+JSON.stringify(fields);
							subTableList[i].data.push(this.$util.copyArr(fields));
						}else{
							subTableList[i].data = [];
						}
					}
					
					setTimeout(()=>{
						for(let i=0;i<subTableList.length;i++){
							fields = subTableList[i].fields;
							subTableList[i].data=[];
							//初始化子表下拉框 this.tableForm.form.subTableList[i].fields[k]
							/* for (let k=0;k<fields.length;k++) {
								this.getSelectItemType(subTableList[i].tableId,fields[k].key,fields[k]);
								this.concatID(fields,k);
							} */
							//费用报销表  先不显示子表
							if(this.tableForm.form.tableName.indexOf('费用报销表')==-1){
								// console.log('subTableListfields:'+JSON.stringify(fields);
								subTableList[i].data.push(this.$util.copyArr(fields));
							}else{
								subTableList[i].data = [];
							}
						}
						this.tableForm.form.subTableList=this.$util.copyArr(subTableList);//这里不加的话，data下面的数据绑定会失效
						
					},1000)
						
				
			}else{
				let subTableList = this.tableForm.form.subTableList,fields,dataList;
				for(let i=0;i<subTableList.length;i++){
					fields = subTableList[i].fields;
					dataList = subTableList[i].dataList;
					if(dataList.length==0){
						continue;
					}
					subTableList[i].data=[];
					subTableList[i].data.push(fields);
					//初始化子表下拉框
					for(let u=0;u<dataList.length;u++){
						for (let k=0;k<fields.length;k++) {
							if(this.tableForm.form.tableName.indexOf('客户调级')>-1){
								if(fields[k].key=='dhjsgw'){
									fields[k].controlType = 18;
								}
							}
							this.getSelectItemType(subTableList[i].tableId,fields[k].key,fields[k]);
							this.concatID(fields,k);
						}
						subTableList[i].data[u] = this.$util.copyArr(fields);
						for (let k=0;k<fields.length;k++) {
							subTableList[i].data[u][k].value = dataList[u][fields[k].key];
//							console.log(dataList[u][fields[k].key])
//							
//							if(fields[k].controlType=='11'&&fields[i].isEdit){
//								this.getSelectItemType(subTableList[i].tableId,fields[k].key,subTableList[i].data[u][k]);
//							}
//							this.concatID(subTableList[i].data[u],k,dataList[u][fields[k].key+'ID']);
						}
					}
				}
				this.tableForm.form.subTableList=this.$util.copyArr(subTableList);//这里不加的话，草稿页面的子表里日期绑定会失效
			}
			//console.log(this.tableForm.form.subTableList)
		},
	  	methods:{
			dateKj(item,fileData){
				// debugger
				let _this = this;
				//费用报销流程》发生日期（格式）
				// let  item = eval(key);
				if((this.tableForm.form.tableName.indexOf('费用报销')>-1&&item.key=='sjfsrq')||
					(this.tableForm.form.tableName.indexOf('调动审批')>-1&&item.key=='khjsqsrq')
				){
					this.dtMode = 'date';
				}
				this.defaultTime = item.value;
				// console.log(this.defaultTime);
				this.dtPickerItem = item;
				this.showDtPicker=true;
				
				/* datePk.show(function(re){
					eval(key+'.value="'+re.value+'"');
					if(_this.tableForm.form.tableName.indexOf('调动审批')>-1&&item.key=='khjsqsrq'){
						_this.addTotal_ddsp(item.key);
					}else if(fybxlx=='jbfybx'&&item.key=='sjfsrq'){
						//校验打卡记录
						_this.checkClock(fileData);
					}
				}) */
			},
			//取消
			hideDtPicker(){
				// this.$refs.dtPicker.closeAnimate();
				this.showDtPicker = false;
			},
			//确定
			sureDtPicker(value){
// 				this.currentDate.year = parseInt(value.split('-')[0]);//加parseInt，否则日历上颜色标记不上
// 				this.currentDate.month = parseInt(value.split('-')[1]);
				this.dtPickerItem.value = value;
				//isAnswer
				
				this.hideDtPicker();
				// this.$refs.vueTimes.getMonthDay();
			},
			onConfirm(e) {
				
				this.pickerItem.text = e.label;
				this.pickerItem.value = e.value;
				
				if(this.tableForm.form.tableName.indexOf('费用报销表')>-1){
					//报销类型
					if(this.pickerItem.key=='bxlx'){
						this.renderThisSubTable(this.pickerItem);
						fybxlx = this.pickerItem.value;
					}
					//加班明细&&费用名称
					if(fybxlx=='jbfybx'&&this.pickerItem.key=='fymc'){
						//校验
						//this.checkClock(fileData);
					}
					//是否客户承担费用
					if(this.pickerItem.key=='sfkhcdfy'){
						this.isHideKhcdje(this.pickerItem);
					}
				}else if(this.tableForm.form.tableName.indexOf('离职')>-1){
					if(this.pickerItem.key=='lzlxyggx'){
						this.LzGetReasons(SelectedItem[0].value);
					}
				}else if(this.tableForm.form.tableName.indexOf('入职申请')>-1){
					if(this.pickerItem.key=='sskhbm'){
						sskhbm = SelectedItem[0].value;
						this.getGzdsLczx(this.tableForm.form.fields[index5]);
					}else{
						if(this.pickerItem.key=='rybjlx'){
							rybjlx = SelectedItem[0].value;
						}
						this.isHideRzlc(this.pickerItem,val);
					}
				}else if(this.tableForm.form.tableName.indexOf('出差申请')>-1){
					this.isHideCcsq(this.pickerItem);
				}else if(this.tableForm.form.tableName.indexOf('调动审批')>-1){
					if(this.pickerItem.key=='dhrybjlx'){
							rybjlx = SelectedItem[0].value;
					}
					this.isHideDdlc(this.pickerItem,val);
				}
			},
			getSelectPk(item,fileData){
				//隐藏报销类型的两项
				if(item.key=='bxlx'){
					let ar=[];
					for(let i=0;i<item.options.length;i++){
						if(item.options[i].value!='flfybx'){
							ar.push(item.options[i]);
						}
					}
					item.options = ar;
				}
				
				this.pickerItem = item;
				
				this.pickerValueArray = item.options||[];
				this.mode = 'selector';
				this.deepLength = 1;
				this.pickerValueDefault = [item.value];
				this.$refs.mpvuePicker.show();
				
			},
//			主表下拉框
			mainSelector(){
				let _this = this;
				let fields = this.tableForm.form.fields;
				let tableId = this.tableForm.form.tableId;
				for(let i=0;i<fields.length;i++){
					_this.getSelectItemType(tableId,fields[i].key,fields[i]);
					//如果是部门、用户选择器，则拼接~ID字段
					_this.concatID(fields,i);
					/*if([4,8,17,5,18,6,19,7].indexOf(fields[i].controlType)>-1){
						fields.push({
							key:fields[i].key+'IDE',
							label:fields[i].label+'IDE',
							controlType:16,
							value:''
						})
					}*/
					//特殊处理：离职流程>离职原因
					if(fields[i].key=="lzlxyggx"){
						_this.LzGetReasons(fields[i].value);
					}	
					//特殊处理：入职申请流程>所属客户部门、工作地
					if(this.tableForm.form.tableName.indexOf('入职申请')>-1){
						if(fields[i].key=="sskhbm"){
							sskhbm = fields[i].value;
						}else if(fields[i].key=="khbm"){
							khbm = fields[i].value;
						}else if(fields[i].key=="rybjlx"){
							rybjlx = fields[i].value;
						}else if(fields[i].key=="jsgwmc"||fields[i].key=="jsgwmcgr"||fields[i].key=='jsgwjb'||fields[i].key=='jsgwjbgr'||fields[i].key=="sskh"||fields[i].key=="htbh"){
							fields[i].controlType = 18;
						}else if(fields[i].key=="jsgwbm"){
							jsgwbmdr = fields[i].value;
							jsgwbmdr_i=i;
						}else if(fields[i].key=="jsgwbmgr"){
							jsgwbmdrgr = fields[i].value;
							jsgwbmdrgr_i=i;
						}
					}
					//特殊处理：调动流程
					if(this.tableForm.form.tableName.indexOf('调动审批')>-1){
						if(fields[i].key=="khdr"||fields[i].key=="jsjbdr"||fields[i].key=="jsgwdr"||fields[i].key=="jsgwdrgr"||fields[i].key=="jsjbdrgr"||fields[i].key=="dhhtbh"||fields[i].key=="sskhbmdr"){
							fields[i].controlType = 18;
						}else if(fields[i].key=="khbmdr"){
							khbmdr = fields[i].value;
						}else if(fields[i].key=="khbmdc"){
							khbmdc = fields[i].value;
						}else if(fields[i].key=="jsgwbmdr"){
							jsgwbmdr = fields[i].value;
							jsgwbmdr_i=i;
						}else if(fields[i].key=="jsgwbmdrgr"){
							jsgwbmdrgr = fields[i].value;
							jsgwbmdrgr_i=i;
						}else if(fields[i].key=="dhrybjlx"){
							rybjlx = fields[i].value;
						}else if(fields[i].key=="sskhbmdr"){
							sskhbm = fields[i].value;
						}
						
					}
					//特殊处理：费用报销
					if(this.tableForm.form.tableName.indexOf('费用报销')>-1){
						if(fields[i].key=="fykm"){
							fields[i].controlType = 18;
						}
					}
					
					//调动流程  只读
					if(this.tableForm.form.tableName.indexOf('调动审批表')>-1){
						if(fields[i].key=="jsbjdr"||fields[i].key=="jsjbjdr"||fields[i].key=="xzjsbdr"||
						fields[i].key=="jsbjdc"||fields[i].key=="jsjbjdc"||fields[i].key=="xzjsb"){
							fields[i].readonly = true;
						}
					}
				}
			},
			//入职流程》获取工作地
			/*getGzdsRzlc(deptId){
				mui.ajax(this.$path.SELECTCUSTOMDEPTADDRESS,{
						data:{
							data:{
								deptId:deptId,
								loginName:this.userInfo.loginName,
								token:this.userInfo.token,
								versionNo:this.$path.VERSIONNO
							}
						},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},
						async:false,
						success:function(res){
							
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							console.log(type);
						}
					});
			},*/
			getSelectItemType(tableId,fieldName,item,index){
				let _this = this;
//				if(item.controlType=='11'||item.controlType=='14'){
//					//显示、隐藏的字段
//					if(this.tableForm.form.tableName.indexOf('入职申请')>-1&&item.key=='rybjlx'){
//						this.isHideRzlc(item);
//					}
//				}
				//特殊处理：入职申请流程>工作地
				if(this.tableForm.form.tableName.indexOf('入职申请')>-1){
					if(item.key=="sskhbmdr"&&khbmdr&&item.isEdit){
						//特殊处理：入职申请流程>岗位级别
						item.controlType = '14';
						this.getSsgsbmLczx(item,function(){},khbmdr);
					}else if(item.key=="sskhbmdc"&&khbmdr&&item.isEdit){
						//特殊处理：入职申请流程>岗位级别
						item.controlType = '14';
						this.getSsgsbmLczx(item,function(){},khbmdc);
					}
				}
				if(item.key=="gzds"&&sskhbm&&item.isEdit){
					item.controlType = '14';
					this.getGzdsLczx(item);
				}else if(item.key=="sskhbm"&&khbm&&item.isEdit){
					//特殊处理：入职申请流程>所属客户部门
					item.controlType = '14';
					this.getSsgsbmLczx(item);
				}else if(item.key=="gwjb"&&khbm&&item.isEdit){
					//特殊处理：入职申请流程>岗位级别
					item.controlType = '14';
					this.getGwjbLczx(item);
				}else if((item.controlType=='11'||item.controlType=='14')&&item.isEdit){
				
					//因为这里需要同步请求，所以改用mui.ajax 。异步请求给item赋值后界面不生效
					
					uni.request({
					url:this.$path.SELECTORSELECTITEMTYPE,
					data:{
						data:{
								tableId:tableId,
								fieldName:fieldName,
								loginName:this.userInfo.loginName,
								token:this.userInfo.token,
								versionNo:this.$path.VERSIONNO
						}},
						dataType:'json',//服务器返回json格式数据
						method:'POST',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						header:{'Content-Type':'application/json'},
						async:false,
						success:function(res){
							console.log(11);
							//服务器返回响应，根据响应结果，分析是否登录成功；
							if(res.data.code=='0'){
								let ar = JSON.parse(res.data.data.options),ar2=[],text='';
									for(let i=0;i<ar.length;i++){
										ar2.push({
											value:ar[i].key,
											label:ar[i].value
										})
										if(item.value&&item.value==ar[i].key){
											text = ar[i].value
										}
									}
// 								_this.$set(_this.tableForm.form.fields[index],'text',text);	
// 								_this.$set(_this.tableForm.form.fields[index],'options',ar2);	
								item.text = text;
								item.options = ar2;
								// this.tableForm.form.subTableList[i].fields[k]
								
								/* setTimeout(function(){
									_this.tableForm.form.subTableList[0].fields = [];
									// _this.$set(_this.tableForm.form.fields[index],'text',text);
								},3000) */
								
								console.log(JSON.stringify(item.options))
							}
						}
					},false);
				}
				
			},
			//如果是部门、用户选择器，则拼接~ID字段
			concatID(fields,i,value){
				if([4,8,17,5,18,6,19,7].indexOf(fields[i].controlType)>-1){
					fields.push({
						key:fields[i].key+'ID',
						label:fields[i].label+'ID',
						controlType:16,
						value:''||value
					})
				}
			},
			//特殊处理：入职申请流程>工作地
			getGzdsLczx(item){
				uni.request({
						url:this.$path.SELECTCUSTOMDEPTADDRESS,
						data:{
							data:{
									deptId:sskhbm,
									loginName:this.userInfo.loginName,
									token:this.userInfo.token,
									versionNo:this.$path.VERSIONNO
							}},
							dataType:'json',//服务器返回json格式数据
							method:'POST',//HTTP请求类型
							timeout:10000,//超时时间设置为10秒；
							header:{'Content-Type':'application/json'},
							async:false,
							success:function(res){
								//服务器返回响应，根据响应结果，分析是否登录成功；
								let resdata = res.data;
								if(resdata.code=='0'){
									let ar = resdata.data.data,ar2=[],text='';
										for(let i=0;i<ar.length;i++){
											ar2.push({
												value:ar[i].id,
												label:ar[i].address
											})
											if(item.value&&item.value==ar[i].id){
												text = ar[i].address
											}
										}
									item.text = text;
									item.options = ar2;
								}
							},
							fail:function(xhr,type,errorThrown){
								//异常处理；
								// console.log(type);
							}
						},false);
			},
			//入职流程》获取所属归属部门
			getSsgsbmLczx(item,callback,bm){
				//因为这里需要同步请求，所以改用mui.ajax 。异步请求给item赋值后界面不生效
				uni.request({
						url:this.$path.SELECTCUSTOMERDEPTLIST,
						data:{
							data:{
									customerDeptName:'',
									customerCode:bm?bm:khbm,
									loginName:this.userInfo.loginName,
									token:this.userInfo.token,
									versionNo:this.$path.VERSIONNO
							}},
							dataType:'json',//服务器返回json格式数据
							method:'POST',//HTTP请求类型
							timeout:10000,//超时时间设置为10秒；
							header:{'Content-Type':'application/json'},
							async:false,
							success:function(res){
								//服务器返回响应，根据响应结果，分析是否登录成功；
								let resdata = res.data;
								if(resdata.code=='0'){
									let ar = resdata.data.data,ar2=[],text='';
										for(let i=0;i<ar.length;i++){
											ar2.push({
												value:ar[i].id,
												label:ar[i].name
											})
											if(item.value&&item.value==ar[i].id){
												text = ar[i].name
											}
										}
									item.text = text;
									item.options = ar2;
									if(callback){
										callback();
									}
								}
							},
							fail:function(xhr,type,errorThrown){
								//异常处理；
								// console.log(type);
							}
						},false);
			},
			//入职流程》岗位级别
			getGwjbLczx(item){
				//因为这里需要同步请求，所以改用mui.ajax 。异步请求给item赋值后界面不生效
				uni.request({
						url:this.$path.SELECTRANKLIST,
						data:{
							data:{
									rankCode:'',
									rankName:'',
									loginName:this.userInfo.loginName,
									token:this.userInfo.token,
									versionNo:this.$path.VERSIONNO
							}},
							dataType:'json',//服务器返回json格式数据
							method:'POST',//HTTP请求类型
							timeout:10000,//超时时间设置为10秒；
							header:{'Content-Type':'application/json'},
							async:false,
							success:function(res){
								//服务器返回响应，根据响应结果，分析是否登录成功；
								let resdata = res.data;
								if(resdata.code=='0'){
									let ar = resdata.data.data,ar2=[],text='';
										for(let i=0;i<ar.length;i++){
											ar2.push({
												value:ar[i].name,
												label:ar[i].name
											})
											if(item.value&&item.value==ar[i].name){
												text = ar[i].name
											}
										}
									item.text = text;
									item.options = ar2;
								}
							},
							fail:function(xhr,type,errorThrown){
								//异常处理；
								// console.log(type);
							}
						},false);
			},
			//校验打卡记录是否有效
			checkClock(fileData){
				let _this = this;
				let files = eval(fileData),jbfymc,jbsjfsrq,dkjl_i;
				for(let i in files){
					if(files[i].key=='fymc'){
						jbfymc = files[i].value
					}else if(files[i].key=='sjfsrq'){
						jbsjfsrq = files[i].value
					}else if(files[i].key=='dkjl'){
						dkjl_i = i;
					}
				}
				if(jbsjfsrq&&jbfymc){
					this.$ajax.post(this.$path.CLOCKVALIDRECORD,{
			  			empNo:this.userInfo.loginName,
						clockTime:jbsjfsrq ,
						type:jbfymc
					},(res)=>{
						if(res.data.isValid=='false'){
							files[dkjl_i].value = "无效";
						}else if(res.data.isValid=='true'){
							files[dkjl_i].value = "有效";
						}else{
							mui.toast('打卡记录验证出错，请联系管理员！')
						}
					},(error)=> {
					});
				}
			},
			showUser(key){
				let params={};
				let k = key.split('|')[1];
				if(this.tableForm.form.tableName.indexOf('入职申请')>-1){
					if(k=='jsgwmc'||k=='jsgwmcgr'){
						params = {
							priceType:rybjlx?rybjlx:'zzbj',
							customerCode:khbm,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='jsgwjb'){
						params = {
							customerCode:khbm,
							jobCode:jsgwbmdr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='jsgwjbgr'){
						params = {
							customerCode:khbm,
							jobCode:jsgwbmdrgr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='sskh'){
						params = {
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='htbh'){
						params = {
							customerCode:khbm,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}
				}else if(this.tableForm.form.tableName.indexOf('调动审批')>-1){
					if(k=='khdr'){
						params = {
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='jsjbdr'){
						params = {
							customerCode:khbmdr,
							jobCode:jsgwbmdr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}if(k=='jsgwdr'||k=='jsgwdrgr'){
						params = {
							priceType:rybjlx?rybjlx:'zzbj',
							customerCode:khbmdr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='jsjbdrgr'){
						params = {
							customerCode:khbmdr,
							jobCode:jsgwbmdrgr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='dhhtbh'){
						params = {
							customerCode:khbmdr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}else if(k=='sskhbmdr'){
						params = {
							customerCode:khbmdr,
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}
				}else if(this.tableForm.form.tableName.indexOf('费用报销')>-1){
					if(k=='fykm'){
						params = {
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}
				}else if(this.tableForm.form.tableName.indexOf('客户调级')>-1){
					let files = eval(key.split('|')[0]),khbm_tj='';
					for(let i in files){
						if(files[i].key=='khbm'){
							khbm_tj = files[i].value
						}
					}
					if(k=='dhjsgw'){
						params = {
							customerCode:khbm_tj,
							jobCode:"",
							key:k,
							tableName:this.tableForm.form.tableName
						}
					}
				}
				this.$emit('showUserPop',{controlType:key.split('|')[2],params:params});
				this.currentSelectPop = key;
			},
			getSelectUser(data){
				//获取传过来的用户名、用户id
				let fileds = eval(this.currentSelectPop.split('|')[0]);
				let key = this.currentSelectPop.split('|')[1];
				let index,index2;//保存归属部门ID
				let index3;//客户编号
				let index4;//所属客户部门
				index5;//工作地
				let index6;//结算岗位级别
				let index6_bm;
				let index6_jb;
				let index6_jbbm;
				let index6_khjsje;
				let index6_jsbjdr;
				let index6_khjsjbj;
				let index6_xzjsb;
				let index6_htbh;
				let index6_htxtbh;
				let index6_sqxzze;
				let index7;//结算岗位
				let index8;//结算级别
				let index8_jsbjdr;
				let index8_jsjbjdr;
				let index9;
				let index10;
				for(let i=0;i<fileds.length;i++){
					if(fileds[i].key==key){
						index = i;
						fileds[i].value = data.uname;
					}else if(fileds[i].key==(key+'ID')){
						fileds[i].value = data.uid;
					}else if(fileds[i].key==(key+'bm')){
//						this.$set(fileds[i],'value',data.uid)
						fileds[i].value = data.uid;
					}else if(data.popupType==2&&fileds[i].key=='gwbm'){
						//岗位编码
						fileds[i].value = data.uid;
					}
					//保存归属部门ID
					if(fileds[i].key=='gsbmbh'&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						index2 = i;
					}
					//保存客户编号
					if(fileds[i].key=='khbm'&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						index3 = i;
					}
					//所属客户部门
					if(fileds[i].key=='sskhbm'&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						index4 = i;
					}else if(fileds[i].key=='sskhbmdr'&&this.tableForm.form.tableName.indexOf('调动审批')>-1){
						index4 = i;
					}
					//工作地
					if(fileds[i].key=='gzds'&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						index5 = i;
					}
					//结算岗位级别
					if((rybjlx=='zzbj'||rybjlx=='xcbj')&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						if(fileds[i].key=='jsgwmc'){
							index6 = i;
						}else if(fileds[i].key=='jsgwbm'){
							index6_bm = i;
						}else if(fileds[i].key=='jsgwjb'){
							index6_jb = i;
						}else if(fileds[i].key=='jsgwjbbm'){
							index6_jbbm = i;
						}else if(fileds[i].key=='khjsje'){
							index6_khjsje = i;
						}else if(fileds[i].key=='khjsjbj'){
							index6_khjsjbj = i;
						}else if(fileds[i].key=='xzjsb'){
							index6_xzjsb = i;
						}else if(fileds[i].key=='htbh'){
							index6_htbh = i;
						}else if(fileds[i].key=='htxtbm'){
							index6_htxtbh = i;
						}else if(fileds[i].key=='sqxzze'){
							index6_sqxzze = i;
						}
					}else if((rybjlx=='zzbj'||rybjlx=='xcbj')&&this.tableForm.form.tableName.indexOf('调动审批')>-1){
						if(fileds[i].key=='jsgwdr'){
							index6 = i;
						}else if(fileds[i].key=='jsgwbmdr'){
							index6_bm = i;
						}else if(fileds[i].key=='jsjbdr'){
							index6_jb = i;
						}else if(fileds[i].key=='jsjbbmdr'){
							index6_jbbm = i;
						}else if(fileds[i].key=='jsbjdr'){
							index6_khjsje = i;
						}else if(fileds[i].key=='jsjbjdr'){
							index6_khjsjbj = i;
						}else if(fileds[i].key=='xzjsbdr'){
							index6_xzjsb = i;
						}else if(fileds[i].key=='dhhtbh'){
							index6_htbh = i;
						}else if(fileds[i].key=='dhhtxtbm'){
							index6_htxtbh = i;
						}else if(fileds[i].key=='xzbzdc'){
							index6_sqxzze = i;
						}
					}
					if(rybjlx=='grbj'&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						if(fileds[i].key=='jsgwmcgr'){
							index6 = i;
						}else if(fileds[i].key=='jsgwmcgrbm'){
							index6_bm = i;
						}else if(fileds[i].key=='jsgwjbgr'){
							index6_jb = i;
						}else if(fileds[i].key=='jsgwjbgrbm'){
							index6_jbbm = i;
						}else if(fileds[i].key=='khjsje'){
							index6_khjsje = i;
						}else if(fileds[i].key=='khjsjbj'){
							index6_khjsjbj = i;
						}else if(fileds[i].key=='xzjsb'){
							index6_xzjsb = i;
						}else if(fileds[i].key=='htbh'){
							index6_htbh = i;
						}else if(fileds[i].key=='htxtbm'){
							index6_htxtbh = i;
						}else if(fileds[i].key=='sqxzze'){
							index6_sqxzze = i;
						}
					}else if(rybjlx=='grbj'&&this.tableForm.form.tableName.indexOf('调动审批')>-1){
						if(fileds[i].key=='jsgwdrgr'){
							index6 = i;
						}else if(fileds[i].key=='jsgwbmdrgr'){
							index6_bm = i;
						}else if(fileds[i].key=='jsjbdrgr'){
							index6_jb = i;
						}else if(fileds[i].key=='jsjbbmdrgr'){
							index6_jbbm = i;
						}else if(fileds[i].key=='dhhtbh'){
							index6_htbh = i;
						}else if(fileds[i].key=='dhhtxtbm'){
							index6_htxtbh = i;
						}
					}
					if(rybjlx=='grbj'&&fileds[i].key=='jsgwjbgr'&&this.tableForm.form.tableName.indexOf('入职申请')>-1){
						index6 = i;
					}
					if(this.tableForm.form.tableName.indexOf('调动审批')>-1){
						if(fileds[i].key=='khbmdr'){
							index3 = i;
						}else if(fileds[i].key=='sskhbmIDdr'){
							index7 = i;
						}
						
						/*if(fileds[i].key=='jsgwdr'){
							index7 = i;
						}
						if(fileds[i].key=='jsjbdr'){
							index8 = i;
						}else if(fileds[i].key=='jsbjdr'){
							index8_jsbjdr = i;
						}else if(fileds[i].key=='jsjbjdr'){
							index8_jsjbjdr = i;
						}
						if(fileds[i].key=='jsjbbmdr'){
							index9 = i;
						}*/
					}
					
					if(fileds[i].key=='fykmbm'&&this.tableForm.form.tableName.indexOf('费用报销')>-1){
						index10 = i;
					}
				}
				if(data.key=='sskh'){
					//保存归属部门ID
					if(index2){
						fileds[index2].value = data.uid;
					}
					//保存客户编号
					if(index3){
						fileds[index3].value = data.uid;
						khbm = data.uid;
					}
					//所属客户部门
					if(index4){
						let _this = this;
						this.getSsgsbmLczx(fileds[index4],function(){
							sskhbm='000000';//清空工作地
							_this.getGzdsLczx(fileds[index5]);
						});
					}
				}else if(data.key=='jsgwmc'||data.key=='jsgwmcgr'||data.key=='jsgwjb'||data.key=='jsgwjbgr'||data.key=='jsgwdr'||data.key=='jsgwdrgr'||data.key=='jsjbdrgr'){
					let item = JSON.parse(data.uid);
					//保存客户编号
					if(rybjlx=='grbj'){
						jsgwbmdrgr = item.jobCode;
					}else{
						jsgwbmdr = item.jobCode;
					}
					if(index6){
						fileds[index6].value = item.jobName;
						fileds[index6_bm].value = item.jobCode;
						fileds[index6_jb].value = item.rankName;
						fileds[index6_jbbm].value = item.rankCode;
						if(item['含税报价']&&index6_khjsje){
							fileds[index6_khjsje].value = item['含税报价']
						}
						if(item['净报价']&&index6_khjsjbj){
							fileds[index6_khjsjbj].value = item['净报价'];
							fileds[index6_xzjsb].value = (fileds[index6_sqxzze].value/item['净报价']).toFixed(2);
						}
					}
					if(index6_htbh){
						fileds[index6_htbh].value = item.contractCode?item.contractCode:item.code;
					}
					if(index6_htxtbh){
						fileds[index6_htxtbh].value = item.contractSysCode?item.contractSysCode:item.sys_code;
					}
				}else if(data.key=='dhhtbh'||data.key=='htbh'){
					let item = JSON.parse(data.uid);
					if(index6_htbh){
						fileds[index6_htbh].value = item.contractCode?item.contractCode:item.code;
					}
					if(index6_htxtbh){
						fileds[index6_htxtbh].value = item.contractSysCode?item.contractSysCode:item.sys_code;
					}
				}
				
				if(data.key=='khdr'){
					if(index3){
						fileds[index3].value = data.uid;
						khbmdr = data.uid;
					}
					if(index8){
						fileds[index8].value = '';
					}
				}
				if(data.key=='sskhbmdr'){
					if(index7){
						/*fileds[index7].value = data.uname;
						fileds[jsgwbmdr_i].value = data.uid;
						jsgwbmdr = data.uid;*/
						fileds[index7].value = data.uid
					}
				}
				if(data.key=='jsjbdr'){
					let item = JSON.parse(data.uid);
					/*if(index8){
						fileds[index8].value = data.uname;
						fileds[index9].value = item.rankCode;
					}
					if(index8_jsbjdr){
						fileds[index8_jsbjdr].value = item['含税报价'];
					}
					if(index8_jsjbjdr){
						fileds[index8_jsjbjdr].value = item['净报价'];
						this.addTotal_ddsp('jsjbjdr');
					}*/
				}
				if(data.key=='fykm'){
					if(index10){
						fileds[index10].value = data.uid;
					}
				}
			},
			//子表新增一行
			addSubtableList($i){
				let item = this.tableForm.form.subTableList[$i].fields;
				let subTableList = this.tableForm.form.subTableList;
				subTableList[$i].data.push(this.$util.copyArr(item));
				this.tableForm.form.subTableList=this.$util.copyArr(subTableList);
			},
			//删除一行
			removeSubtableList($i){
				let subTableList = this.tableForm.form.subTableList;
				if(subTableList[$i].data.length>1){
					subTableList[$i].data.pop();
					if(this.tableForm.form.tableName.indexOf('销假申请表')>-1){
						this.addTotal1('xjts');
					}else if(this.tableForm.form.tableName.indexOf('费用报销')>-1){
			     		this.addTotal1('bxje');
			     	}else if(this.tableForm.form.tableName.indexOf('出差申请单')>-1){
			     		this.addTotal1('jtf');
			     	}

				}else{
					mui.toast("不能再删了!!!");
				}
			},
	  		//选择附件
	  		selectFile(key){
					
				window[key].click();
				if(mui.os.ios){
					document.getElementById(key).click();
				}
	  		},
	  		//删除附件
	  		removeFile(item,$index){
	  			let tm = JSON.parse(item.value.replace(/￥@@￥/g,'"'));
	  			tm.splice($index,1);
	  			if(tm.length==0){
	  				item.value = '';
	  			}else{
	  				item.value = JSON.stringify(tm);
	  			}
	  		},
	  		//上传附件
	  		uploadFile(item){
	  			let _this = this;
					uni.chooseImage({
						success(res) {
							let tempFilePaths = res.tempFilePaths;
							let files = res.tempFiles;
								let AllowImgFileSize = 10485760; //上传图片最大值(单位字节)（ 10 M = 10485760 B ）超过10M上传失败
								let imgUrlBase64;
								let ar = item.value?JSON.parse(item.value):[];
								// let  formdata=new FormData();
								
								for(let i=0;i<files.length;i++){
									if(AllowImgFileSize < files[i].size){
										uni.showToast({
											icon:"none",
											title:'上传失败，请上传不大于10M的图片！'
										});
										return;
									}
									// formdata.append('photo',files[i]);
								}
								if(_this.tableForm.fileLimit&&(ar.length+files.length)>_this.tableForm.fileLimit){
									return uni.showToast({
											icon:"none",
											title:'附件数最大不能超过'+this.tableForm.fileLimit
										});
								}
								if (files) {
									//执行上传操作
										uni.showLoading({
											title:"附件上传中..."
										})		
							/* formdata.append("versionNo",_this.$path.VERSIONNO);
							formdata.append ("loginName",_this.userInfo.loginName);
							formdata.append ("fileId",'0'); */
							
							uni.uploadFile({
									url: _this.$path.LEAVEFLOWPHOTO,
									filePath: tempFilePaths[0],
									name: 'photo',
									header:{'Content-Type':'application/json'},
									formData: {
											versionNo:_this.$path.VERSIONNO,
											loginName:_this.userInfo.loginName,
											token:_this.userInfo.token,
											fileId:'0'
									},
									success:function(res){
										uni.hideLoading();
										let resdata = JSON.parse(res.data);
										console.log(JSON.stringify(resdata));
										
										item.value = resdata;
										if(resdata.code==0){
											let data = resdata.data;
											for(let i=0;i<data.length;i++){
												ar.push({
													url:data[i].filename,
													id:data[i].id,
													name:data[i].name,
												})
											}
											console.log(JSON.stringify(item))
											item.value = JSON.stringify(ar);
										}else{
											uni.showToast({
												icon:"none",
												title:resdata.message
											})
										}
									},
									fail:function(xhr,type,errorThrown){
										uni.showToast({
											icon:"none",
											title:"附件上传失败"
										})
									}
							});
							
						/* uni.request({
								url: _this.$path.LEAVEFLOWPHOTO,
								data: {
										data:{
											versionNo:_this.$path.VERSIONNO,
											loginName:_this.userInfo.loginName,
											token:_this.userInfo.token,
											fileId:'0',
											photo:files
										}
								},
								dataType:'json',//服务器返回json格式数据
								method:'POST',//HTTP请求类型
								timeout:10000,//超时时间设置为10秒；
								header:{'Content-Type':'application/json'},
								async:false,
								success: (res) => {
										console.log(res.data);
										this.text = 'request success';
								}
						}); */
							
							/* uni.request({
								url:_this.$path.LEAVEFLOWPHOTO,
								data:formdata,
								method:'POST',//HTTP请求类型
								timeout:20000,//超时时间设置为15秒；
								processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
								contentType : false, // 不设置Content-type请求头
								success:function(res){
									uni.hideLoading();
									if(res.data.code==0){
										let data = res.data.data;
										for(let i=0;i<data.length;i++){
											ar.push({
												url:data[i].filename,
												id:data[i].id,
												name:data[i].name,
											})
										}
										item.value = JSON.stringify(ar);
									}else{
										uni.showToast({
											icon:"none",
											title:res.data.message
										})
									}
								},
								fail:function(xhr,type,errorThrown){
									uni.showToast({
										icon:"none",
										title:"附件上传失败"
									})
								}
							}); */
							
							
							
							
						}
						}
					})
	  			// let  currentTarget = event.currentTarget;
	  			
					
					
		        
	  		},
	  		previewImg(imgDom){
	  			let img = this.$refs[imgDom][0];
	  			mui.trigger(img,'tap');
	  		},
	  		 //合计
	     addTotal1(keyName){
	     	let total;//合计
	     	let	x=[];//变量
	     	if(this.tableForm.form.tableName.indexOf('销假申请表')>-1){
	     		if(keyName=='xjts'){
	     			total = 'hjts';
	     			x = ['xjts'];
	     		}else{
	     			return false;
	     		}
	     	}else if(this.tableForm.form.tableName.indexOf('费用报销')>-1){
	     		this.addTotal_fybx(keyName);
	     	}else if(this.tableForm.form.tableName.indexOf('出差申请单')>-1){
	     		this.addTotal_ccfysq(keyName);
	     	}else if(this.tableForm.form.tableName.indexOf('调动审批表')>-1){
	     		this.addTotal_ddsp(keyName);
	     	}else if(this.tableForm.form.tableName.indexOf('入职申请')>-1){
	     		this.addTotal_rzsq(keyName);
	     	}else{
	     		return false;
	     	}
	     	
//	     	if(this.tableForm.form.tableName.indexOf('销假申请表')>-1){
	     		let mainFormFields = this.tableForm.form.fields;
	     		let subTableList = this.tableForm.form.subTableList;
	     		let total_i,x_i;
	     		for(let it=0;it<mainFormFields.length;it++){
	     			if(mainFormFields[it].key==total){
	     				total_i = it;
	     			}
	     		}
	     		if(!total_i){
	     			return false;
	     		}
	     		mainFormFields[total_i].value=0;
	     		for(let i=0;i<subTableList.length;i++){
	     			let data = subTableList[i].data;
	     			
	     			if(!data){
	     				continue;
	     			}
	     			for(let k=0;k<data.length;k++){
	     				let item = data[k];let itemTotalIndex,itemTotal=0;
	     				for(let j=0;j<item.length;j++){
	     					if(x.indexOf(item[j].key)>-1){
	     						itemTotal += (parseFloat(item[j].value)||0);
	     					}
	     				}
	     				if(itemTotalIndex&&subTableList[i].data.length>0){
		     				subTableList[i].data[k][itemTotalIndex].value = itemTotal;
		     			}
	     				mainFormFields[total_i].value = (parseFloat(mainFormFields[total_i].value)||0) + itemTotal;
	     			}
	     		};
	     },
	     //合计》费用报销流程
	     addTotal_fybx(keyName){
			//bxzjeyggx bxzjers
	     	let total;//合计
	     	let	x=[];//变量
	     	if(keyName=='bxje'||keyName=='sqzje'||keyName=='bxzjeyggx'||keyName=='bxzjers'){
     			total = 'bxzjesqr';
     			x = ['bxje'];
     		}else{
     			return false;
     		}
	     	let mainFormFields = this.tableForm.form.fields;
     		let subTableList = this.tableForm.form.subTableList;
     		let total_i,x_i,dxje_i;
     		let ce_i,sqzje_i;//报销流程》计算'差额'
     		let bxzjeyggx_i,bxzjers_i,bxzje_i;//报销总金额(员工关系)
     		for(let it=0;it<mainFormFields.length;it++){
     			if(mainFormFields[it].key==total){
     				total_i = it;
     			}
     			else if(mainFormFields[it].key=='ce'){
     				ce_i = it;
     			}
     			else if(mainFormFields[it].key=='sqzje'){
     				sqzje_i = it;
     			}else if(mainFormFields[it].key=='dxje'){
     				dxje_i = it;
     			}else if(mainFormFields[it].key=='bxzjeyggx'){
     				bxzjeyggx_i = it;
     			}else if(mainFormFields[it].key=='bxzjers'){
     				bxzjers_i = it;
     			}else if(mainFormFields[it].key=='bxzje'){
     				bxzje_i = it;
     			}
     		}
     		//报销总金额(员工关系)赋值 
     		if(keyName=='bxzjeyggx'||keyName=='bxzjers'){
     			if(keyName=='bxzjeyggx'){
     				mainFormFields[bxzjers_i].value = mainFormFields[bxzjeyggx_i].value;
     				mainFormFields[bxzje_i].value = mainFormFields[bxzjeyggx_i].value;
     			}else{
     				mainFormFields[bxzje_i].value = mainFormFields[bxzjers_i].value;
     			}
     			return false
     		}
     		if(!total_i){
     			return false;
     		}
     		mainFormFields[total_i].value=0;
     		for(let i=0;i<subTableList.length;i++){
     			let data = subTableList[i].data;
     			
     			if(!data){
     				continue;
     			}
     			for(let k=0;k<data.length;k++){
     				let item = data[k];let itemTotalIndex,itemTotal=0;
     				for(let j=0;j<item.length;j++){
     					if(x.indexOf(item[j].key)>-1){
     						itemTotal += (parseFloat(item[j].value)||0);
     					}
     				}
     				if(itemTotalIndex&&subTableList[i].data.length>0){
	     				subTableList[i].data[k][itemTotalIndex].value = itemTotal;
	     			}
     				mainFormFields[total_i].value = (parseFloat(mainFormFields[total_i].value)||0) + itemTotal;
     			}
     		};
     		if(dxje_i){
     			mainFormFields[dxje_i].value = digitUppercase(mainFormFields[total_i].value);
     		}
     		
     		if(bxzjeyggx_i){
     			mainFormFields[bxzjeyggx_i].value = mainFormFields[total_i].value;
     		}
     		if(bxzjers_i){
     			mainFormFields[bxzjers_i].value = mainFormFields[total_i].value;
     		}
     		if(bxzje_i){
     			mainFormFields[bxzje_i].value = mainFormFields[total_i].value;
     		}
     		
     		//报销流程》计算'差额'
 			let sqzje_value = mainFormFields[sqzje_i].value;
 			mainFormFields[ce_i].value = mainFormFields[total_i].value - parseFloat(mainFormFields[sqzje_i].value);
//   		if(mainFormFields[sqzje_i].value>0){
//   		}else{
//   			mainFormFields[ce_i].value='0';
//   		}
     		
	     },
	     //合计》出差费用申请单
	     addTotal_ccfysq(keyName){
	     	let total;//合计
	     	let	x=[];//变量
	     	if(keyName=='jtf'||keyName=='zsf'||keyName=='qtfy'){
     			total = 'yjclfyszje';
     			x = ['jtf','zsf','qtfy'];
     		}else{
     			return false;
     		}
	     	let mainFormFields = this.tableForm.form.fields;
     		let subTableList = this.tableForm.form.subTableList;
     		let total_i,x_i;
     		let dxjeyjzje_i;
     		for(let it=0;it<mainFormFields.length;it++){
     			if(mainFormFields[it].key==total){
     				total_i = it;
     			}
     			else if(mainFormFields[it].key=='dxjeyjzje'){
     				dxjeyjzje_i = it;
     			}
     		}
     		if(!total_i){
     			return false;
     		}
     		mainFormFields[total_i].value=0;
     		for(let i=0;i<subTableList.length;i++){
     			let data = subTableList[i].data;
     			
     			if(!data){
     				continue;
     			}
     			for(let k=0;k<data.length;k++){
     				let item = data[k];let itemTotalIndex,itemTotal=0;
     				for(let j=0;j<item.length;j++){
     					if(x.indexOf(item[j].key)>-1){
     						itemTotal += (parseFloat(item[j].value)||0);
     					}
     					if(item[j].key=='hj'){
     						itemTotalIndex = j
     					}
     				}
     				if(itemTotalIndex&&subTableList[i].data.length>0){
	     				subTableList[i].data[k][itemTotalIndex].value = itemTotal;
	     			}
     				mainFormFields[total_i].value = (parseFloat(mainFormFields[total_i].value)||0) + itemTotal;
     				mainFormFields[dxjeyjzje_i].value = digitUppercase(mainFormFields[total_i].value);
     			}
     		};
	     },
	     //计算》调动流程
	     addTotal_ddsp(keyName){
	     	let total;//合计
	     	let	x=[];//变量
     		if(keyName=='jsjbjdc'||keyName=='xzbzdc'){
     			total = '';
     			x = ['jsjbjdc','xzbzdc'];
     		}else if(keyName=='jsjbjdr'||keyName=='khjsqsrq'){
     			total = '';
     			x = [];
     		}else{
     			return false;
     		}

     		let mainFormFields = this.tableForm.form.fields;
     		let subTableList = this.tableForm.form.subTableList;
     		let total_i,x_i;
     		let xzjsb_i,jsjbjdc_i,xzbzdc_i;
     		let jsjbjdr_i,jsbjdc_i,xzjsbdr_i;
     		let khjsqsrq_i,khjsjzrq_i,xzts_i;//计算闲置天数
     		for(let it=0;it<mainFormFields.length;it++){
     			if(mainFormFields[it].key==total){
     				total_i = it;
     			}
     			if(mainFormFields[it].key=='xzjsb'){
     				xzjsb_i = it;
     			}else if(mainFormFields[it].key=='jsjbjdc'){
     				jsjbjdc_i = it;
     			}else if(mainFormFields[it].key=='xzbzdc'){
     				xzbzdc_i = it;
     			}
     			if(mainFormFields[it].key=='jsjbjdr'){
     				jsjbjdr_i = it;
     			}else if(mainFormFields[it].key=='jsbjdc'){
     				jsbjdc_i = it;
     			}else if(mainFormFields[it].key=='xzjsbdr'){
     				xzjsbdr_i = it;
     			}
     			
     			if(mainFormFields[it].key=='xzts'){
     				xzts_i = it;
     			}else if(mainFormFields[it].key=='khjsqsrq'){
     				khjsqsrq_i = it;
     			}else if(mainFormFields[it].key=='khjsjzrq'){
     				khjsjzrq_i = it;
     			}
     		}
     		if(keyName=='jsjbjdr'){
     			let jsjbjdcVal2 = parseFloat(mainFormFields[jsjbjdr_i].value);
	     		if(jsjbjdcVal2){
	     			mainFormFields[xzjsbdr_i].value = ((parseFloat(mainFormFields[xzbzdc_i].value.replace(/,/g,''))||0)/jsjbjdcVal2).toFixed(2);
	     		}
     		}else if(keyName=='khjsqsrq'){
     			mainFormFields[xzts_i].value = dateDifference(mainFormFields[khjsqsrq_i].value,mainFormFields[khjsjzrq_i].value)-1;
     			if(mainFormFields[xzts_i].value<1){
     				mainFormFields[xzts_i].value = 0
     			}
     		}else{
     			let jsjbjdcVal = parseFloat(mainFormFields[jsjbjdc_i].value);
	     		if(jsjbjdcVal){
	     			mainFormFields[xzjsb_i].value = ((parseFloat(mainFormFields[xzbzdc_i].value)||0)/jsjbjdcVal).toFixed(2);
	     		}
     		}
     		
     		/*if(!total_i){
     			return false;
     		}
     		mainFormFields[total_i].value=0;
     		for(let i=0;i<subTableList.length;i++){
     			let data = subTableList[i].data;
     			
     			if(!data){
     				continue;
     			}
     			for(let k=0;k<data.length;k++){
     				let item = data[k];let itemTotalIndex,itemTotal=0;
     				for(let j=0;j<item.length;j++){
     					if(x.indexOf(item[j].key)>-1){
     						itemTotal += (parseFloat(item[j].value)||0);
     					}
     				}
     				if(itemTotalIndex&&subTableList[i].data.length>0){
	     				subTableList[i].data[k][itemTotalIndex].value = itemTotal;
	     			}
     				mainFormFields[total_i].value = (parseFloat(mainFormFields[total_i].value)||0) + itemTotal;
     			}
     		};*/
     		
	     },
	     //计算》入职申请
	     addTotal_rzsq(keyName){
	     	let total;//合计
	     	let	x=[];//变量
     		if(keyName=='khjsjbj'){
     			total = '';
     			x = ['jsjbjdc','xzbzdc'];
     		}else{
     			return false;
     		}

     		let mainFormFields = this.tableForm.form.fields;
     		let subTableList = this.tableForm.form.subTableList;
     		let total_i,x_i;
     		let sqxzze_i,khjsjbj_i,xzjsb_i;
     		for(let it=0;it<mainFormFields.length;it++){
     			if(mainFormFields[it].key==total){
     				total_i = it;
     			}
     			if(mainFormFields[it].key=='sqxzze'){
     				sqxzze_i = it;
     			}else if(mainFormFields[it].key=='khjsjbj'){
     				khjsjbj_i = it;
     			}else if(mainFormFields[it].key=='xzjsb'){
     				xzjsb_i = it;
     			}
     		}
     		let jsjbjdcVal = parseFloat(mainFormFields[khjsjbj_i].value);
     		if(jsjbjdcVal){
     			mainFormFields[xzjsb_i].value = ((parseFloat(mainFormFields[sqxzze_i].value)||0)/jsjbjdcVal).toFixed(2);
     		}
     		/*if(!total_i){
     			return false;
     		}
     		mainFormFields[total_i].value=0;
     		for(let i=0;i<subTableList.length;i++){
     			let data = subTableList[i].data;
     			
     			if(!data){
     				continue;
     			}
     			for(let k=0;k<data.length;k++){
     				let item = data[k];let itemTotalIndex,itemTotal=0;
     				for(let j=0;j<item.length;j++){
     					if(x.indexOf(item[j].key)>-1){
     						itemTotal += (parseFloat(item[j].value)||0);
     					}
     				}
     				if(itemTotalIndex&&subTableList[i].data.length>0){
	     				subTableList[i].data[k][itemTotalIndex].value = itemTotal;
	     			}
     				mainFormFields[total_i].value = (parseFloat(mainFormFields[total_i].value)||0) + itemTotal;
     			}
     		};*/
     		
	     },
	     //下拉框change
	     selectChange(item){
	     	let selectDom;//select节点
	     	let	x;//
	     	if(this.tableForm.form.tableName.indexOf('销假申请表')>-1){
	     		if(keyName=='xjts'){
	     			total = 'hjts';
	     			x = 'xjts';
	     		}
	     	}else if(this.tableForm.form.tableName.indexOf('费用报销')>-1){
	     		if(keyName=='bxje'||keyName=='sqzje'){
	     			total = 'bxzjesqr';
	     			x = 'bxje';
	     		}
	     	}else{
	     		return false;
	     	}
	     },
	     //渲染指定的子表
	     renderThisSubTable(item){
	     	
	     		//控制显示：出差开始/结束时间    差额
	     		let mainFields = this.tableForm.form.fields;
     			for(let i=0;i<mainFields.length;i++){
	     			if(mainFields[i].key=='ccksrq'||mainFields[i].key=='ccjsrq'||mainFields[i].key=='sqzje'||mainFields[i].key=='ce'||mainFields[i].key=='ysqdh'||mainFields[i].key=='yjkje'){
	     				mainFields[i].isShow = (item.value=='ccfybx'?"true":"false");
	     			}
	     			if(mainFields[i].key=='bxzjesqr'){
	     				mainFields[i].value = '';
	     			}
	     			if(mainFields[i].key=='sqzje'){
	     				mainFields[i].value = 0;
	     			}
	     			if(mainFields[i].key=='fykm'){
	     				if(item.value=='ccfybx'){
	     					mainFields[i].value = "差旅费";
	     				}else if(item.value=='jbfybx'){
	     					mainFields[i].value = "市内交通费";
	     				}else if(item.value=='qtfybx'){
	     					mainFields[i].value = "福利费--公司级";
	     				}
	     			}
	     			if(mainFields[i].key=='fykmbm'){
	     				if(item.value=='ccfybx'){
	     					mainFields[i].value = "6401.08";
	     				}else if(item.value=='jbfybx'){
	     					mainFields[i].value = "6401.09";
	     				}else if(item.value=='qtfybx'){
	     					mainFields[i].value = "6401.23";
	     				}
	     			}
	     		}
	     		
		     	let subTableList = this.tableForm.form.subTableList,fields;
		     	let toValue = item.text.slice(0,2);
		     	console.log(toValue);
				for(let i=0;i<subTableList.length;i++){
					if(subTableList[i].tableDesc.indexOf(toValue)>-1){
						fields = subTableList[i].fields;
						subTableList[i].data=[];
						//初始化子表下拉框
						for (let k=0;k<fields.length;k++) {
							this.getSelectItemType(subTableList[i].tableId,fields[k].key,fields[k]);
							this.concatID(fields,k);
						}
						subTableList[i].data.push(this.$util.copyArr(fields));
					}else{
						subTableList[i].data = [];
					}
					this.tableForm.form.fields=this.$util.copyArr(mainFields);//这里不加的话，data下面的数据绑定会失效
					this.tableForm.form.subTableList=this.$util.copyArr(subTableList);//这里不加的话，data下面的数据绑定会失效
				}
			
	     },
	     //费用报销
	     isHideKhcdje(item){
	     	//控制显示：客户承担金额
	     		let mainFields = this.tableForm.form.fields;
     			for(let i=0;i<mainFields.length;i++){
	     			if(mainFields[i].key=='khcdje'){
	     				mainFields[i].isShow = (item.value=='1'?"true":"false");
	     			}
	     		}
				this.tableForm.form.fields=this.$util.copyArr(mainFields);//这里不加的话，data下面的数据绑定会失效
	     },
	     //入职流程 》控制显示与隐藏
	     isHideRzlc(item,val){
	     	let hideItem = [];
	     	let clearItem = [];
	     	
	     	if(item.key=='sftqjx'){
	     		hideItem = ['tqjxts'];
	     	}else if(item.key=='rybjlx'){
	     		hideItem = ['jsgwmcgr','jsgwjbgr','jsgwmc','jsgwjb'];
	     		clearItem = ['jsgwmc','jsgwmcbm','jsgwjb','jsgwjbbm','khjsje','khjsjbj','xzjsb','htbh','htxtbh','jsgwmcgr','jsgwmcgrbm','jsgwjbgr','jsgwjbgrbm'];
	     		
	     	}else if(item.key=='yggxqrrz'){
	     		hideItem = ['jxqsrq','xmzbdsj','gsbm'];
	     	}else{
	     		return false;
	     	}
	     	
     		let mainFields = this.tableForm.form.fields;
 			for(let i=0;i<mainFields.length;i++){
     			if(hideItem.indexOf(mainFields[i].key)>-1){
     				if(item.key=='sftqjx'||item.key=='yggxqrrz'){
     					mainFields[i].isShow = (item.value=='1'?"true":"false");
     				}else if(item.key=='rybjlx'){
     					if(mainFields[i].key=='jsgwmcgr'||mainFields[i].key=='jsgwjbgr'){
     						mainFields[i].isShow = (item.value=='grbj'?"true":"false");
     					}else if(mainFields[i].key=='jsgwmc'||mainFields[i].key=='jsgwjb'){
     						mainFields[i].isShow = (item.value=='grbj'?"false":"true");
     					}
     				}
     			}
     			if(item.value!=val&&clearItem.indexOf(mainFields[i].key)>-1){
     				mainFields[i].value = '';
     			}
     		}
			this.tableForm.form.fields=this.$util.copyArr(mainFields);//这里不加的话，data下面的数据绑定会失效
	     },
	     //调动审批流程 》控制显示与隐藏
	     isHideDdlc(item,val){
	     	
	     	let hideItem = [];
	     	let clearItem = [];
	     	
	     	if(item.key=='dhrybjlx'){
	     		hideItem = ['jsgwdrgr','jsjbdrgr','jsgwdr','jsjbdr'];
	     		clearItem = ['jsgwdr','jsgwbmdr','jsjbdr','jsjbbmdr','jsgwdrgr','jsgwbmdrgr','jsjbdrgr','jsjbbmdrgr','jsbjdr','jsjbjdr','xzjsbdr','dhhtbh'];
	     	}else{
	     		return false;
	     	}
	     	
     		let mainFields = this.tableForm.form.fields;
 			for(let i=0;i<mainFields.length;i++){
     			if(hideItem.indexOf(mainFields[i].key)>-1){
     				if(item.key=='dhrybjlx'){
     					if(mainFields[i].key=='jsgwdrgr'||mainFields[i].key=='jsjbdrgr'){
     						mainFields[i].isShow = (item.value=='grbj'?"true":"false");
     					}else if(mainFields[i].key=='jsgwdr'||mainFields[i].key=='jsjbdr'){
     						mainFields[i].isShow = (item.value=='grbj'?"false":"true");
     					}
     				}
     			}
     			if(item.value!=val&&clearItem.indexOf(mainFields[i].key)>-1){
     				mainFields[i].value = '';
     			}
     			//只读
     			if(mainFields[i].key=="jsbjdr"||mainFields[i].key=="jsjbjdr"||mainFields[i].key=="xzjsbdr"||
					mainFields[i].key=="jsbjdc"||mainFields[i].key=="jsjbjdc"||mainFields[i].key=="xzjsb"){
					mainFields[i].readonly = (item.value=='grbj'?false:true);
				}
     		}
			this.tableForm.form.fields=this.$util.copyArr(mainFields);//这里不加的话，data下面的数据绑定会失效
	     },
	     //出差申请 》控制显示与隐藏
	     isHideCcsq(item){
	     	let hideItem = [];
	     	
	     	if(item.key=='sfjk'){
	     		hideItem = ['skfs','jkje','yjhkrqcxrq','skr'];
	     	}else{
	     		return false;
	     	}
	     	
     		let mainFields = this.tableForm.form.fields;
 			for(let i=0;i<mainFields.length;i++){
     			if(hideItem.indexOf(mainFields[i].key)>-1){
     				if(item.key=='sfjk'){
     					mainFields[i].isShow = (item.value=='1'?"true":"false");
     				}
     			}
     		}
			this.tableForm.form.fields=this.$util.copyArr(mainFields);//这里不加的话，data下面的数据绑定会失效
	     },
	     //离职流程-离职类型
	     LzGetReasons(key){
	     	let _this = this;
	     	this.$ajax.post(this.$path.SELECTLEAVEREASON,{
	     		loginName:this.userInfo.loginName,
	     		code:key
	     	},(res)=>{
				let data = res.data.sysLeaveReasonList,op=[],mainFileds=_this.tableForm.form.fields;
				for(let i=0;i<data.length;i++){
					op.push({
						label:data[i].name,
						value:data[i].code
					})
				}
				for(let i=0;i<mainFileds.length;i++){
					if(mainFileds[i].key=='lzyyyggx'){
						this.tableForm.form.fields[i].options=op;
						this.tableForm.form.fields[i].text='';
						break;
					}
				}
				this.tableForm.form.fields=this.$util.copyArr(mainFileds);//这里不加的话，data下面的数据绑定会失效
			},(error)=> {
			
			});
	     },
	     //json转obj
	     jsonToObj(value){
	     	let va = value.replace(/￥@@￥/g,'"');
	     	if(isJSON(va)){
	     		return JSON.parse(va)
	     	}else{
	     	return []
	     	}
	     }
	  },
	  filters:{
	  	//凭证json过滤
	     getPzImage(value){
	     	let va = value.replace(/￥@@￥/g,'"');
	     	if(isJSON(va)){
	     		let d = JSON.parse(va);
	     		return d[0].url
	     	}else{
	     		return value;
	     	}
	     },
	     //凭证json过滤
	     getPzImageName(value){
	     	if(!value){
	     		return ''
	     	}
	     	let va = value.replace(/￥@@￥/g,'"');
	     	if(isJSON(va)){
	     		let d = JSON.parse(va);
	     		return d[0].url?d[0].url.split('/')[(d[0].url.split('/').length-1)]:d[0].name
	     	}else{
	     		return value.split('/')[4];
	     	}
	     },
	     //获取select的text值
	     getText(item){
  			let text='';
  			if((item.controlType==3||item.controlType==11||item.controlType==13||item.controlType==14)&&item.options){
  				//根据select的value值，获取它的文本值
  				let options = item.options;
  				for(let i=0;i<options.length;i++){
	  				if(options[i].value==item.value){
	  					text = options[i].text;
	  				}
	  			}
  			}else{
  				text = item.value;
  			}
  			return text
  		},
	  }
	}
	
	
	
</script>

<style>
.formBox {
  padding: 0 10px 10px;
  background: #ffffff;
}
.formBox > .uni-row,
.formBox .uni-flex {
  border-bottom: 1px solid rgba(226, 226, 226, 0.45);
}
.formBox .formTitle {
  margin: 0;
  /*text-align: center;*/
  background: white;
  /* box-shadow: 0px -1px 0px #999; */
  border-bottom: 1px solid #f5f5f6;
  font-size: 16px;
  border-radius: 40px;
  display: inline-block;
  margin: 0 auto;
  background: #f0ad4e;
  color: #fff;
  padding: 5px 10px;
}
.formBox .lable {
  padding: 6px 10px;
  line-height: 21px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: rgba(160, 160, 160, 0.07);
  color: #333;
  border-right: 1px solid #efeff4;
  width: 35%;
}
.formBox .inputText {
  width: 65%;
  background: #FFFFFF;
}
.formBox .inputText input, .formBox .inputText select, .formBox .inputText textarea {
  margin-bottom: 0;
  border: none;
  padding: 6px 15px 6px 5px;
  height: auto;
  width: auto;
}
.formBox .inputText textarea{
	min-height: 54px;
}
.formBox .uni-navigate-right:after {
  right: 8px;
}
.formBox .iconfont {
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -12px;
}
.formBox .subItem {
  border: 5px solid #f8f8f8;
  margin-bottom: 10px;
  border-radius: 6px;
}


.inputSpan{
	padding: 6px;
	line-height: 21px;
	display: inline-block;
	width:62%;
	word-wrap: break-word;
	word-break: break-all;
}
.red{
	color: red;
}
.readOnly{
	background: #f8f8f8;
}
.readOnly .lable{
	background: none;
}
</style>
