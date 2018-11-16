<template>
	<view class="page">
		<div style="position: relative; height: 350px;">
				<!-- <div id="allmap" style="height: 350px;"></div> -->
				<map id="allmap" style="width: 100%; height: 350px;" :latitude="userLocation.latitude" :longitude="userLocation.longitude" :markers="covers" :circles="circles">
                </map>
		</div>
		<div class="uni-content-padded pr" style="margin-top: 15px;" >
			<div class="repr" @tap="resetDw">
				<span class="iconfont icon-msnui-position">&#xe6c0;</span>
				<span class="font12">重新定位</span>
			</div>
			<p class="c333">我的位置 
				<span v-if="clockRange.effective&&userLocation.latitude" class="uni-badge uni-badge-success">在考勤范围内</span>
				<span v-else class="uni-badge uni-badge-warning">不在考勤范围内</span>
			</p>
			<!--<p style="padding-top: 10px;"><span class="iconfont icon-008dingwei"></span> {{userLocation.addresses||'定位信息获取中...'}}</p>-->
			<p class="c999 font12" style="padding-top: 10px;">提示：打开Wi-Fi，不用连接上，就可以提高定位精准度</p>
			
		</div>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	
	let mapObj,marker2;
	export default {
		data() {
			return {
				userLocation:{},
				workInfo:{},
				scalen:plus.os.name=='iOS'?16:17,//缩放的值
				covers:[],
				circles:[]
			};
		},
		computed:{
			...mapState(['userInfo','clockRange'])
		},
		onLoad(e){
			this.workInfo = JSON.parse(e.workInfo);
			setTimeout(function(){
				// #ifdef APP-PLUS
				this.init();
				// #endif
				
			}.bind(this),300);
			
			//用户定位每5分钟刷新一次
			setTimeout(function(){
				// #ifdef APP-PLUS
					this.resetDw();
				// #endif
			}.bind(this),5*60*1000);

		},
		methods:{
			...mapMutations(['setClockRange']),
			//获取手机定位
			init(){
				let _this = this;
				// 创建地图坐标对象
				_this.getUserPisition();
				_this.DrawWorkArea();
					
			},
			//标记工作地点，圈出打卡范围
			DrawWorkArea(){
				//标点   
				let list = this.workInfo.workList;
				for(let i=0;i<list.length;i++){
					this.covers.push({
						latitude: list[i].latitude,
						longitude: list[i].longitude,
						iconPath: plus.os.name=='iOS'?"../../../static/img/03_ios.png":"../../../static/img/03.png",
						callout:{
							content:"上班地点",
							display:'BYCLICK'
						}
					})
					this.circles.push({
						latitude: list[i].latitude,
						longitude: list[i].longitude,
						color:"#0093dd",
						strokeWidth:plus.os.name=='iOS'?1:2,
						fillColor:"#0093dd0D",
						radius:this.workInfo.range
					})
				}
			},
			//获取用户当前定位
			getUserPisition(resetDw){
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function (p) {
						if(resetDw){
							_this.covers = _this.covers.slice(0,-1);//移除标记‘我’
						}
						console.log(JSON.stringify(p));
						_this.userLocation = {
							addresses:p.addresses,
							longitude:p.longitude,
							latitude:p.latitude
						};
						//标记“我”
						_this.covers.push({
							latitude: p.latitude,
							longitude: p.longitude,
							iconPath: plus.os.name=='iOS'?"../../../static/img/04_ios.png":"../../../static/img/04.png"
						})
						let point1 = new plus.maps.Point(p.longitude,p.latitude);
						
					let list = _this.workInfo.workList;
					let img = plus.os.name=='iOS'?"../../../static/img/04_ios.png":"../../../static/img/04.png";
					let ef = false,activeIndex;
					for(let i=0;i<list.length;i++){
						let pt1 = new plus.maps.Point(list[i].longitude,list[i].latitude);
						//计算距离
						plus.maps.Map.calculateDistance(pt1,point1,function(event){
							let distance = event.distance;  // 转换后的距离值
							console.log('distance:'+distance);
							console.log('range:'+_this.workInfo.range);
							if(distance>_this.workInfo.range){
								img = plus.os.name=='iOS'?"../../../static/img/06_ios.png":"../../../static/img/06.png";
							}else{
								ef = true;
								activeIndex = i;
								_this.setClockRange({clockRange:{
									effective:ef,//是否在打卡范围内
									activeIndex:activeIndex//打卡地址index
								}})
								/* _this.effective = true;
								_this.$emit('getEffective',{
									effective:_this.effective,
									activeIndex:i
								}); */
							}
							
						},function(e){
							console.log(33333);
							console.log("Failed:"+JSON.stringify(e));
						});
						if(ef){
							console.log('effective2:'+_this.effective)
							break;
						}
					}
					
					
						
					},
					fail:function(){
						uni.showToast({
							icon:'none',
							title:"请开启手机定位权限，否则无法定位"
						})
					}
				})
					
					
			},
			//重新定位
			resetDw(){
				this.getUserPisition(true);
			},
			//坐标转换
			reverseGeocode(point){
				plus.maps.Map.reverseGeocode(point,{},function(event){
					var address = event.address;  // 转换后的地理位置
					var point = event.coord;  // 转换后的坐标信息
					var coordType = event.coordType;	// 转换后的坐标系类型
					console.log(JSON.stringify(event));
				},function(e){
//					alert("Failed:"+JSON.stringify(e));
				});
			},
			//计算缩放值1-22
			getScale(d){
				if(d<150){//距离小于150m时不做处理，默认缩放值19
					return;
				}
				for(let i=19;i>1;i--){
					let getScalePerPixel  = 0.2531 * Math.pow(2, (19 - i)) * 10;
					if(d/getScalePerPixel<40){
						this.scalen = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
.page{
	background: #FFFFFF;
	height: 100%;
}
#allmap {
	width: 100%;
	/*position: fixed;
	top: 100px;
	bottom: 0px;*/
	/*line-height: 200px;*/
	/*position: absolute;
	z-index: 99;*/
	text-align: center;
	background: #FFFFFF;
}
.repr{
	position: absolute;
	top: -2px;
	right: 0px;
	border: 1px solid #DDDDDD;
	padding: 2px 6px !important;
	border-radius: 40px;
	background: #FFFFFF;
	z-index: 50;
	line-height: 1.5;
}
.repr .iconfont{
	color: #0093DD;
	vertical-align: middle;
}
.repr:active{
	background: #f5f5f5;
}
.uni-content-padded{
	margin: 0 15px;
}
</style>
