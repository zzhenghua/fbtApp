<template>
	<view class="page uni-flex">
		<view class="uni-flex-item content">
			<view class="head uni-flex">
				<view class="uni-flex-item">
					<icon class="uni-icon iconfont">&#xe669;</icon>
					{{time0}}
				</view>
				<navigator url="./../clock_history/clock_history" class="link">历史查询</navigator>
			</view>
			<view class="uni-content-info">
				<view class="radius" @tap="punchClock">
					<view class="dk">加班打卡</view>
					<text class="cccc">{{time1}}</text>
				</view>
				<view class="current uni-flex">
					<icon class="iconfont uni-icon font20 green" style="margin-top: -3px;color:#f0ad4e;" :style="{color: (workInfo.workList&&workInfo.workList[0]&&workInfo.workList[0].longitude&&clockRange.effective)?'#1AAD19':'#f0ad4e'}">&#xe656;</icon>
					<text v-if="!userLocation.longitude||!workInfo.workList">定位信息获取中...</text>
					<text v-else-if="!workInfo.workList[0]||!workInfo.workList[0].longitude">没有维护工作地点</text>
					<text v-else-if="clockRange.effective">已进入考勤范围内</text>
					<text v-else-if="clockRange.effective!=null">不在考勤范围内</text>
					<text v-else>定位信息获取中...</text>
					<text class="link"  @tap="openRepostion">去重新定位</text>
				</view>
			</view>
			
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
		</view>
		
		<map-view v-if="this.workInfo.workList" @getEffective="getEffective" :userLocation="userLocation" :workInfo="workInfo" ></map-view>
		
		<popup-alert v-if="showPopupAlert" :showPopup="showPopupAlert" @buttonEvents="alertPopupButtonEvents">
			<view class=""  style="width: 500upx;">
				<view v-html="popupAlertContent"></view>
			</view>
		</popup-alert>
		
		<popup-confirm v-if="showPopupConfirm" :showPopup="showPopupConfirm" @buttonEvents="confirmPopupButtonEvents">
			<view class=""  style="width: 500upx;">
				<view v-html="popupConfirmContent"></view>
			</view>
		</popup-confirm>
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	import mapView from '../../../components/map.vue'
	import popupConfirm from '../../../components/popup-confirm.vue'
	import popupAlert from '../../../components/popup-alert.vue'
	export default {
		data() {
			return {
				userLocation:{},//定位
				userMacId:'',//mac
				time:'00:00:00',//倒计时
				list:[],
				overData:false,
				page:0,
				// effective1:false,//是否在考勤范围内
				showReposition:false,
				mapStutas:true,
				workInfo:{range:80},
				showPopupAlert:false,//alert弹框
				popupAlertContent:'',//alert弹框内容
				showPopupConfirm:false,//Confirm弹框
				popupConfirmContent:''//Confirm弹框内容
			};
		},
		computed:{
			...mapState(['userInfo','clockRange']),
			time1(){
				return this.time.split(' ')[1]
			},
			time0(){
				return this.time.split(' ')[0]
			}
		},
		onLoad(){
			this.getTime();
			this.getUserLocation();
			setTimeout(function(){
				this.searchClockHistory();
				this.getUserMacId();
				this.getWorkAddress();
				this.getAddressRange();
			}.bind(this),1100)
		},
		onNavigationBarButtonTap(e){
			if(this.showPopupAlert||this.showPopupConfirm){
				return;
			}
			
			this.popupAlertContent = `
			<div style="line-height: 2; font-size: 16px;text-align: center;font-weight: bold;">
				提示
			</div>
			<p style="padding-bottom: 5px;">1、注意手机需要开启法本通定位权限，否则可导致不能获取位置信息</p>
			<p style="padding-bottom: 5px;">2、定位不准可重新定位，但定位地址不能修改</p>
			<p style="padding-bottom: 5px;">3、若有数据异常等问题请联系对应员工关系处理</p>
			`;
			this.showPopupAlert = true;
		},
		onBackPress() {
			if(this.showPopupAlert) {
				this.showPopupAlert = false;
				return true;
			}else if(this.showPopupConfirm) {
				this.showPopupConfirm = false;
				return true;
			}
		},
		components:{
			mapView,
			popupConfirm,
			popupAlert
		},
		methods:{
			...mapMutations(['setClockRange']),
			//获取手机定位
			getUserLocation(){
				let _this = this;
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						_this.userLocation = res;
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			//获取手机mac地址
			getUserMacId(){
				let uuid,_this = this;
				// #ifdef APP-PLUS
				_this.userMacId = plus.device.uuid;
				// #endif
			},
			//获取上班地址
			getWorkAddress(){
//				this.$util.showWaiting();
				this.$ajax.post(this.$path.CLOCKWORKADDRESS,{
					empNo: this.userInfo.loginName,
					token: this.userInfo.token,
				},(res)=>{
					Object.assign(this.workInfo, {workList:res.data});
					// this.workInfo = uni.extend(this.workInfo,{workList:res.data});
				},(error)=> {
				});
			},
			//获取打卡有效范围
			getAddressRange(){
//				this.$util.showWaiting();
				this.$ajax.post(this.$path.CLOCKADDRESSRANGE,{
					
				},(res)=>{
					this.workInfo.range = res.data.value;
				},(error)=> {
				});
			},
			//倒计时
			getTime(){
				setInterval(()=>{
					let d = new Date();
					let y = d.getFullYear(),
						m = d.getMonth()+1,
						D = d.getDate(),
						h = d.getHours(),
						M = d.getMinutes(),
						s = d.getSeconds();
					this.time = y+'-'+(m>9?m:'0'+m)+'-'+(D>9?D:'0'+D)+' '+(h>9?h:'0'+h) +':'+ (M>9?M:'0'+M) +':'+ (s>9?s:'0'+s);
				},1000);
			},
			//打卡
			punchClock(){
				console.log('userMacId:'+this.userMacId);
//				this.userMacId='0123456789';
//				this.userLocation.addresses='深圳市卫星大厦';
				let list = this.workInfo.workList,noGps=false;
				if(!list){
					this.showPopupAlert = true;
					this.popupAlertContent = "该员工没有维护工作地点，无法打卡"
					return false;
				}
				for(let i=0;i<list.length;i++){
					if(list[i].longitude){
						noGps=true;
						break;
					}
				}
				if(!noGps){
					this.showPopupAlert = true;
					this.popupAlertContent = "该办公地址未定位，无法打卡"
					return false;
				}
				if(!(this.userMacId&&this.userLocation.longitude)){
					this.showPopupAlert = true;
					this.popupAlertContent = "手机定位失败，无法打卡"
					return false;
				}
				if(!this.clockRange.effective){
					this.showPopupAlert = true;
					this.popupAlertContent = "不在考勤范围内，无法打卡!"
					return false;
				}
				let _this = this;
				this.showPopupConfirm = true;
				this.popupConfirmContent = '<p class="tl">打卡时间：'+this.time+'</p><p class="tl">打卡地点：'+this.workInfo.workList[this.workInfo.activeIndex].address+'</p><p class="c999 tl font12">注：打卡时间仅作参考，以服务器时间为准</p>';
				
				/* uni.showModal({
					title: '提示',
					content: ,
					success: function (res) {
						if (res.confirm) {
							_this.postClock();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				}) */
// 				uni.confirm('<p class="tl">打卡时间：'+this.time+'</p><p class="tl">打卡地点：'+this.workInfo.workList[this.workInfo.activeIndex].address+'</p><p class="c999 tl font12">注：打卡时间仅作参考，以服务器时间为准</p>','确定要打卡吗',['取消','确定'],function(e){
// 						if(e.index==1){
// 							_this.postClock();
// 						}
// 					},'div')
			},
			//打卡请求
			postClock(){
				uni.showLoading({
					mask:true,
					title:'正在打卡..'
				})
				this.$ajax.post(this.$path.CLOCKRECORDADD,{
					empNo: this.userInfo.loginName,
					token: this.userInfo.token,
					employeeName:this.userInfo.cname,
					imei:this.userMacId,
					clockTime:this.time,
					clockAddress:this.workInfo.workList[this.workInfo.activeIndex].address,
					clockLongitude:this.userLocation.longitude.toString(),
					clockLatitude:this.userLocation.latitude.toString()
				},(res)=>{
					uni.showToast({
						icon:"none",
						title:res.message
					})
					this.initVar();
					this.searchClockHistory();
				},(error)=> {
				});
			},
			initVar(){
				this.list=[];
				this.page=0;
				this.overData = false;
			},
			//打卡记录
			searchClockHistory(){
				this.$ajax.post(this.$path.CLOCKRECORDLIST,{
					empNo: this.userInfo.loginName,
					token: this.userInfo.token,
					page:this.page,
					clockTime:this.time.split(' ')[0]
				},(res)=>{
					this.list = this.list.concat(res.data.content);
					if(res.data.content.length<10){
						this.overData = true;
					}else{
						this.page++;
					}
				},(error)=> {
				});
			},
			loadMoreList(){
				this.searchClockHistory();
			},
			getEffective(ob){
				console.log(666666666666+JSON.stringify(ob))
				this.setClockRange({clockRange:{
					effective:ob.effective,
					activeIndex:ob.activeIndex
				}})
				// this.effective1 = ob.effective;
				this.workInfo.activeIndex = ob.activeIndex;
				
			},
			openRepostion(){
				let list = this.workInfo.workList,noGps=false;
				if(!list){
					return uni.showToast({
						icon:"none",
						title:"该员工没有维护工作地点"
					})
				}
				for(let i=0;i<list.length;i++){
					if(list[i].longitude){
						noGps=true;
						break;
					}
				}
				if(!noGps){
					return uni.showToast({
						icon:"none",
						title:"该办公地址未定位"
					})
				}else{
					uni.navigateTo({
						url:"../clock_reposition/clock_reposition?workInfo="+JSON.stringify(this.workInfo)
					})
				}
				
//				this.$refs.reposition.showMap();
			},
			closeReposition(){
				this.showReposition = false;
			},
			//关闭alert弹框
			alertPopupButtonEvents(){
				this.showPopupAlert = false
			},
			//关闭confirm弹框
			confirmPopupButtonEvents(index){
				if(index==1){
					//确定
					this.postClock()
				}
				this.showPopupConfirm = false
			}
			
		}
	}
</script>

<style>
.page{
	height:100%;
	flex-direction: column;
}
.content{
	/* margin-top: 10px; */
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

</style>
