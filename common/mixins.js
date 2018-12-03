export const test = {
	data(){
		return {
			aaa:'aaaaaaaaaaaaaaaaaa'
		}
	}
	
}

/**
 * 日期选择框
 */
export const MXdatePicker = {
	data(){
		return {
			showDtPicker:false,//日期选择框
			defaultTime:'',
			dtMode:'date'
		}
	},
	methods:{
		//取消
		hideDtPicker(){
			this.showDtPicker = false;
		},
		//确定--此方法一般会重写覆盖
		sureDtPicker(value){
			this.hideDtPicker();
		}
	}
}

/**
 * 数据字典选择框
 */
export const MXmpvuePicker = {
	data(){
		return {
			pickerValueArray:[],
			mode:'',
			deepLength:'',
			pickerValueDefault:''
		}
	}
}