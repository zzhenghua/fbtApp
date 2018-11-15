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
					<icon class="iconfont uni-icon font20" style="color: #f0ad4e;">&#xe656;</icon>
					<text>定位信息获取中...</text>
					<navigator url="" class="link">去重新定位</navigator>
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
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				userLocation:{},//定位
				userMacId:'',//mac
				time:'00:00:00',//倒计时
				list:[],
				overData:false,
				page:0,
				effective1:false,//是否在考勤范围内
				showReposition:false,
				mapStutas:true,
				workInfo:{range:80},
			};
		},
		computed:{
			...mapState(['userInfo']),
			time1(){
				return this.time.split(' ')[1]
			}
		},
		onLoad(){
			this.getTime();
			setTimeout(function(){
				this.searchClockHistory();
// 				this.getUserMacId();
// 				this.getWorkAddress();
// 				this.getAddressRange();
			}.bind(this),1100)
		},
		onNavigationBarButtonTap(e){
			uni.showModal({
				content:"<h1>1111</h1>"
			})
		},
		methods:{
			//获取手机定位
			getUserLocation(){
				let _this = this;
				mui.plusReady(function(){
					plus.geolocation.getCurrentPosition(function(p){
						_this.userLocation = p;
//						alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
					}, function(e){
//						_this.errorInfo = e.message;
//						alert('Geolocation error: ' + e.message);
						mui.toast(e.message);
					} );
				})
			},
			//获取手机mac地址
			getUserMacId(){
				let uuid,_this = this;
				mui.plusReady(function(){
//					uuid=plus.device.imei;
//					if(uuid.length<5){
//						uuid = plus.device.uuid;
//					}
//					uuid = plus.device.uuid;
					_this.userMacId = plus.device.uuid;
				});
				
			},
			//获取上班地址
			getWorkAddress(){
//				this.$util.showWaiting();
				this.$ajax.post(this.$path.CLOCKWORKADDRESS,{
					empNo: this.userInfo.loginName,
				}).then((res)=>{
					this.workInfo = mui.extend(this.workInfo,{workList:res.data});
				}).catch((error)=> {
				});
			},
			//获取打卡有效范围
			getAddressRange(){
//				this.$util.showWaiting();
				this.$ajax.post(this.$path.CLOCKADDRESSRANGE,{
					
				}).then((res)=>{
					this.workInfo.range = res.data.value;
				}).catch((error)=> {
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
				console.log('addresses:'+this.userLocation.addresses);
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
				if(!(this.userMacId&&this.userLocation.addresses)){
					return mui.confirm('<span style="color:#ad372e">手机定位失败，无法打卡</span>','提示',['确认'],function(){},'div');
				}
				if(!this.effective1){
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
					employeeName:this.userInfo.cname,
					imei:this.userMacId,
					clockTime:this.time,
					clockAddress:this.workInfo.workList[this.workInfo.activeIndex].address,
					clockLongitude:this.userLocation.longitude.toString(),
					clockLatitude:this.userLocation.latitude.toString()
				}).then((res)=>{
					mui.toast(res.message);
					this.initVar();
					this.searchClockHistory();
				}).catch((error)=> {
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
				console.log(666666666666)
				this.effective1 = ob.effective;
				this.workInfo.activeIndex = ob.activeIndex;
				
			},
			openRepostion(){
				let list = this.workInfo.workList,noGps=false;
				if(!list){
					return mui.toast('该员工没有维护工作地点');
				}
				for(let i=0;i<list.length;i++){
					if(list[i].longitude){
						noGps=true;
						break;
					}
				}
				if(!noGps){
					return mui.toast('该办公地址未定位');
				}else{
					this.showReposition = true;
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
	padding: 10px;
}
.dkRecord {
    margin-top: 10px;
    background: #f5f5f5;
    border-radius: 6px;
    padding: 5px;
	color: #999999;
}
.dkRecord .iconfont{
	vertical-align: middle;
	font-size: 22px;
	padding-bottom: 5px;
}
.dkRecord .text{
	margin-top: -10px;
}
</style>
