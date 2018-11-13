<template>
	<section style="margin-top: 0;">
		<div class="time_head uni-flex">
			<span class="mui-icon mui-icon-back" @tap="prevMonth()"></span>
			<div class="flexItem font16 c333"><span @tap="selectTime()">{{currentText.year}}年{{currentText.month}}月</span></div>
			<span class="mui-icon mui-icon mui-icon-forward" @tap="nextMonth()"></span>
		</div>
		<ul class="time_day clearfix font12 c999">
			<li class="">日</li>
			<li class="">一</li>
			<li class="">二</li>
			<li class="">三</li>
			<li class="">四</li>
			<li class="">五</li>
			<li class="">六</li>
		</ul>
		<ul class="time_day clearfix animated" :class="time_animate">
			<li v-for="(item,$index) in daysArr" :key="$index">
				<a href="javascript:void(0)" :class="{[item.className]:true,[activeClass]:activeDateList.indexOf(item.ymd)>-1}" :data-day="item.day" :data-ymd="item.ymd">{{item.date}}</a>
			</li>
			<!--<li><a href="javascript:void(0)" class="c999">26</a></li>
			 			<li><a href="javascript:void(0)" class="c999">26</a></li>
			 			<li><a href="javascript:void(0)" class="c333">26</a></li>
			 			<li><a href="javascript:void(0)" class="c333">26</a></li>
			 			<li><a href="javascript:void(0)" class="c333 active">26</a></li>
			 			<li><a href="javascript:void(0)" class="c333 active">今</a></li>
			 			<li><a href="javascript:void(0)" class="c333">26</a></li>
			 			<li><a href="javascript:void(0)" class="c333">26</a></li>-->

		</ul>
		
	</section>
</template>

<script>
	
	// import Picker from "@/js/lib/mui.picker.min"

	/* const birthdayPker = new mui.DtPicker({
		"type": "month",
		"beginYear": 1900,
		"endYear": 2030
	}); */
	const todayMonth = new Date().getMonth()+1;
	const todayYear = new Date().getFullYear();
	export default {
		name: 'timesView',
		props:{
			activeDateList:{
				require:true,
				type:Array,
				default:function(){
					return []
				}
			},
			activeClass:{
				require:false,
				type:String,
				default:'active'
			},
			currentText:{
				require:false,
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		data() {
			return {
// 				currentText: {
// 					year: new Date().getFullYear(),
// 					month: new Date().getMonth() + 1
// 				},
				daysArr: [], //日期列表
				currentMonth: 11, //今天是几月份
				time_animate: '', //时间控件动画 zoomIn\slideInLeft\slideInRight
			}
		},
		created() {
			this.getMonthDay();
		},
		methods: {
			//上一个月
			prevMonth() {
				this.currentText.month -= 1;
				this.getMonthDay();
				//				this.time_animate = ' slideInLeft';
			},
			//下一个月
			nextMonth() {
				this.currentText.month += 1;
				this.getMonthDay();
				//				this.time_animate = ' slideInRight';
			},
			//选择时间
			selectTime() {
				this.$emit('selectTime');
				
				
// 				let _this = this,
// 					month = this.currentText.month;
// 
// 				birthdayPker.setSelectedValue(this.currentText.year + '-' + (month < 10 ? ('0' + month) : month)); //设置默认选中
// 				birthdayPker.show((rs) => {
// 					_this.currentText.year = parseInt(rs.y.value);
// 					_this.currentText.month = parseInt(rs.m.value);
// 					_this.getMonthDay();
// 				});
			},
			//点击day
			getActive($index) {
				this.daysArr[$index].className.replace('active', '');
				if(this.daysArr[$index].className.indexOf('active') == -1) {
					this.daysArr[$index].className += ' active';
				} else {
					this.daysArr[$index].className = this.daysArr[$index].className.replace('active', '');

				}
			},
			getMonthDay() {
				this.time_animate = '';
				let month = this.currentText.month,
					d = new Date(),
					currentDate = d.getDate(); //今天是几号
				if(month < 1) {
					this.currentText.year -= 1;
				} else if(month > 12) {
					this.currentText.year += 1;
				}
				d.setDate(1);
				d.setMonth(month - 1);
				d.setFullYear(this.currentText.year);
				let n = d.getDay(), //1号是周几
					className = '';
				//				this.currentText.year = d.getFullYear();
				this.currentText.month = d.getMonth() + 1;
				d.setMonth(month);
				d.setDate(0);
				let max = d.getDate(), //当月最大天数
					arr = [],
					fullYear = d.getFullYear(),
					_this = this,
					todayYmd;
//					debugger
				for(let i = (1 - n); i < 40; i++) {
					d.setFullYear(fullYear);
					d.setMonth(month - 1);
					d.setDate(i);
					todayYmd = fullYear +'-'+ (month<10?'0'+month:month) +'-'+ (i<10?'0'+i:i);//获取当天的日期 格式：2018-03-19
					if(i <= 0 || i > max) {
						className = 'c999';
					} else {
						className = 'c333';
					}
					arr.push({
						ymd:todayYmd,
						date: d.getDate(),
						day: d.getDay(),
						className: className
					});
					let day = d.getDay();
					if(i >= max && day == 6) {
						break;
					};
				}
				this.daysArr = arr;
				this.time_animate = 'zoomInDown';//zoomInDown,fadeInDown,pulse,fadeIn
				
				setTimeout(function(){
					this.time_animate = '';
				}.bind(this),1000)
				
				if(this.currentText.year==todayYear&&this.currentText.month==todayMonth){
					this.$emit('getSubmitShow',true);
				}else{
					this.$emit('getSubmitShow',false);
				}
				
				// this.$emit('getAjax',this.currentText.year+'-'+(this.currentText.month<10?'0'+this.currentText.month:this.currentText.month),true);
			}
		},
		filters:{
			//
			isActive(date){
				let f = false;
				if(this.activeDateList.indexOf(date)){
					f = true;
				}
				return f
			}
		},
		watch:{
			'currentText':function(){
				debugger
				if(this.currentText.year==todayYear&&this.currentText.month==todayMonth){
					this.showBtn = true
				}else{
					this.showBtn = false
				}
				this.getMonthDay();
			}
		}
	}
</script>

<style>
section {
  background: #FFFFFF;
}
section .time_head {
  height: 40px;
  align-items: center;
  text-align: center;
  padding: 0 15px;
}
section .time_head .mui-icon {
  color: #0093dd;
}
section .time_week, section .time_day {
  padding: 0 0 0 2%;
  text-align: center;
}
section .time_day {
  margin: 0;
  padding-bottom: 8px;
}
section .time_day > li {
  float: left;
  width: 14%;
  padding: 2px 0;
}
section .time_day > li > a {
  height: 32px;
  display: block;
  width: 32px;
  line-height: 32px;
  margin: 0 auto;
  border-radius: 16px;
  box-sizing: border-box;
  /*background: rgba(0, 147, 221, 0.42);*/
  /*background: #0093DD;
  color: #FFF;*/
}
section .time_day > li > a.active {
  background: #0093DD;
  color: #FFF;
}

.mui-badge-danger {
  border: none;
  color: #FFFFFF;
}
</style>