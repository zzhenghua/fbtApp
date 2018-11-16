<template>
	<view class="page uni-flex">
		<view class="uni-flex-item content">
			<view class="head uni-flex">
				<view class="uni-flex-item">
					<icon class="uni-icon iconfont">&#xe669;</icon>
					2018-11-15
				</view>
				<navigator url="" class="link">历史查询</navigator>
			</view>
			<view class="uni-content-info">
				<view class="radius">
					<view class="dk">加班打卡</view>
					<text class="cccc">{{time1}}</text>
				</view>
				<view class="current uni-flex">
					<icon class="iconfont uni-icon font20 green" style="margin-top: -3px;color:#f0ad4e;" :style="{color: clockRange.effective?'#1AAD19':'#f0ad4e'}">&#xe656;</icon>
					<text v-if="!userLocation.longitude">定位信息获取中...</text>
					<text v-else-if="clockRange.effective">已进入考勤范围内</text>
					<text v-else>不在考勤范围内</text>
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
		<map-view v-if="this.workInfo.workList" @getEffective="getEffective" :userLocation="userLocation" :workInfo="workInfo"  :effective="clockRange.effective"></map-view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	import mapView from '../../../components/map.vue'
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
			};
		},
		computed:{
			...mapState(['userInfo','clockRange']),
			time1(){
				return this.time.split(' ')[1]
			}
		},
		onLoad(){
			this.getTime();
			setTimeout(function(){
				this.getUserLocation();
				this.searchClockHistory();
				this.getUserMacId();
				this.getWorkAddress();
				this.getAddressRange();
			}.bind(this),1100)
		},
		onNavigationBarButtonTap(e){
			uni.showModal({
				content:"<h1>1111</h1>"
			})
		},
		components:{
			mapView
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
					return mui.confirm('<span style="color:#ad372e">该员工没有维护工作地点，无法打卡</span>','提示',['确认'],function(){},'div');
				}
				for(let i=0;i<list.length;i++){
					if(list[i].longitude){
						noGps=true;
						break;
					}
				}
				if(!noGps){
					return mui.confirm('<span style="color:#ad372e">该办公地址未定位，无法打卡</span>','提示',['确认'],function(){},'div');
				}
				if(!(this.userMacId&&this.userLocation.longitude)){
					return mui.confirm('<span style="color:#ad372e">手机定位失败，无法打卡</span>','提示',['确认'],function(){},'div');
				}
				if(!this.clockRange.effective){
					return mui.confirm('<span style="color:#ad372e">不在考勤范围内，无法打卡!</span>','提示',['确认'],function(){},'div');
				}
				let _this = this;
				mui.confirm('<p class="tl">打卡时间：'+this.time+'</p><p class="tl">打卡地点：'+this.workInfo.workList[this.workInfo.activeIndex].address+'</p><p class="c999 tl font12">注：打卡时间仅作参考，以服务器时间为准</>','确定要打卡吗',['取消','确定'],function(e){
						if(e.index==1){
							_this.postClock();
						}
					},'div')
			},
			//打卡请求
			postClock(){
				this.$util.showWaiting();
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
						title:"res.message"
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
			//帮助
			helpTips(){
				mui.confirm(
				`<p class="tl">1、注意手机需要开启法本通定位权限，否则可导致不能获取位置信息</p><p class="tl">2、定位不准可重新定位，但定位地址不能修改</p><p class="tl">3、若有数据异常等问题请联系对应员工关系处理</p>`,'提示',['确定'],function(){},'div')
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
	margin-top: 10px;
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
