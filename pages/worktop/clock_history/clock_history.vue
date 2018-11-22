<template>
	<view class="page">
		<view class="head uni-flex cred">
			<view class="uni-flex-item">
				<icon class="uni-icon iconfont">&#xe669;</icon>
				{{selectedDate||'请选择年月'}}
			</view>
			<button type="primary" class="primary mui-btn1" @click="selectTime">年月选择</button>
		</view>
		<scroll-view scroll-y  style="height: calc(100% - 62px);" @scrolltolower="loadMoreData" lower-threshold="0" >
		<view class="clockHistory c666">
			<view class="dkRecord" v-for="(item,index) in list" :key="index">
				<view class="">
					<icon class="iconfont">&#xe66c;</icon>{{item.clockTime}}
				</view>
				<view class="uni-flex text">
					<icon class="iconfont" style="line-height: 1;">&#xe656;</icon>
					<view>
						{{item.clockAddress}}
					</view>
				</view>
			</view>
		</view>
		<load-more :loadingType="loadingType" v-if="list.length>9"></load-more>
		</scroll-view>
		
		<date-picker ref="dtPicker" dtMode="month" v-if="showDtPicker" @hideDtPicker="hideDtPicker" @sureDtPicker="sureDtPicker"></date-picker>
	</view>
</template>

<script>
	import { mapState, mapMutations} from "vuex"
	import datePicker from "../../../components/datePicker.vue"
	import loadMore from "../../../components/load-more.vue"
	
	export default {
		data() {
			return {
				list:[],
				showDtPicker:false,
				currentDate:{
					year:'',
					month:''
				},
				page:0,
				size:10,
				loadingType:0
			};
		},
		computed:{
			...mapState(['userInfo']),
			selectedDate(){
				if(this.currentDate.year&&this.currentDate.month){
					return this.currentDate.year+'-'+(this.currentDate.month<10?('0'+this.currentDate.month):this.currentDate.month)
				}else{
					return ''
				}
			}
		},
		components:{
			datePicker,
			loadMore
		},
		onBackPress() {
			if(this.showDtPicker) {
				this.hideDtPicker();
				return true;
			}
		},
		onReachBottom(){
			/* if(this.loadingType==0){
				this.loadingType=1;
				this.searchClockHistory(this.selectedDate);
			} */
		},
		methods:{
			//选择日期
			selectTime(){
				if(!this.showDtPicker){
					this.showDtPicker=true;
				}
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
				this.init();
				uni.showLoading({
					title:"数据加载中..."
				})
				this.searchClockHistory(value);
			},
			//初始化变量
			init(){
				this.page=0;
				this.list=[];
				this.loadingType = 0;
				// this.overData = false;
			},
			searchClockHistory(time){
				this.$ajax.post(this.$path.CLOCKRECORDLIST,{
					empNo: this.userInfo.loginName,
					token: this.userInfo.token,
					page:this.page,
					clockTime:time
				},(res)=>{
					setTimeout(()=>{
						this.list = this.list.concat(res.data.content);
						this.loadingType = 0;
						if(res.data.content.length<10){
							this.loadingType = 2;
						}else{
							this.page++;
						}
						if(this.list.length==0){
							uni.showToast({
								icon:'none',
								title:"本月无打卡记录"
							})
						}
					},800)
				},(error)=> {
				});
			},
			//滚动到底部时触发
			loadMoreData(){
				if(this.loadingType==0){
					this.loadingType=1;
					this.searchClockHistory(this.selectedDate);
				}
			}
		}
	}
</script>

<style>
.page{
	height: 100%;
	flex-direction: column;
	background: #FFFFFF;
}
.head{
    padding: 18px 15px 10px;
    border-bottom: 1px solid #DDDDDD;
	align-items: center;
}
.radius {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: radial-gradient(#0093dd, #0093dd, #0971a5);
    -webkit-box-shadow: 0px 0px 3px #0092db;
    box-shadow: 0px 0px 3px #0092db;
    text-align: center;
    margin: 20px auto;
}
.radius .dk {
    padding-top: 30px;
    color: #FFFFFF;
}
.current{
	justify-content: center;
	align-items: center;
}
.clockHistory{
	padding: 10px 15px;
}
.dkRecord {
    margin-top: 10px;
    background: #f5f5f5;
    border-radius: 6px;
    padding: 5px;
	color: #888;
	line-height: 1.2;
}
.dkRecord .iconfont{
	vertical-align:middle;
	font-size:20px;
	line-height:1.2;
	margin-top:-3px;
}
.dkRecord .text{
	margin-top: -5px;
}
.green{
	color:#1AAD19;
}
.yearBtn{
	padding: 4px 8px;
	font-size: 12px;
	border-radius: 6px;
}
</style>
