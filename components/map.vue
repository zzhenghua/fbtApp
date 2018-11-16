<template>
	<view class="hide">
		<div id="allmap1" style="height: 350px;"></div>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	let mapObj,marker2;
	export default {
		data() {
			return {
				// scalen:mui.os.ios?16:17//缩放的值
				scalen:17//缩放的值
			};
		},
		props:{
			userLocation:{
				type:Object,
				default:function(){
					return {}
				}
			},
			workInfo:{
				type:Object,
				default:function(){
					return {}
				}
			},
			effective:{
				type:Boolean,
				default:true
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		components: {
			// headerBar,
			// Scroll,
		},
		created(){
			setTimeout(function(){
				this.init();
			}.bind(this),300)

		},
		methods:{
			
			//获取手机定位
			init(){
				let _this = this;
				mapObj= new plus.maps.Map('allmap1',{
//						center:pt1,
						zoom:_this.scalen,
					});
					
					// 创建地图坐标对象
				_this.getUserPisition();
			
			},
			//获取用户当前定位
			getUserPisition(){
				let _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function (p) {
						if(marker2){
							_this.removeMarker();
						}
						
						_this.userLocation.addresses = p.addresses;
						_this.userLocation.longitude = p.longitude;
						_this.userLocation.latitude = p.latitude;
						
						let point1 = new plus.maps.Point(p.longitude,p.latitude);
						//计算距离
						let list = _this.workInfo.workList;
						// let img = mui.os.ios?"../static/img/04_ios.png":"../static/img/04.png";
						for(let i=0;i<list.length;i++){
							let pt1 = new plus.maps.Point(list[i].longitude,list[i].latitude);
							//计算距离
							plus.maps.Map.calculateDistance(pt1,point1,function(event){
								let distance = event.distance;  // 转换后的距离值
								
								if(distance>_this.workInfo.range){
									// img = mui.os.ios?"../static/img/06_ios.png":"../static/img/06_ios.png";
									_this.effective = false;
		//							_this.getScale(distance);
									console.log(_this.scalen);
									mapObj.setZoom(_this.scalen);
								}else{
									_this.effective = true;
									_this.$emit('getEffective',{
										effective:_this.effective,
										activeIndex:i
									});
								}
								
							},function(e){
							});
							console.log('effective_map:'+_this.effective)
							if(_this.effective == true){
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
				});
					
					
			},
			// 删除标点
			removeMarker(){
//				mapObj.removeOverlay(marker2);
//				//delete marker2;
//				marker2=null;
			},
			//重新定位
			resetDw(){
				if(mapObj){
					this.getUserPisition();
//					mapObj.centerAndZoom( pt1, this.scalen );
				}
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
			},
			closeRepostion(){
				if(window.mapObj){
					window.mapObj.hide();
				}
				this.$emit('closeReposition');
			},
			showMap(){
				setTimeout(function(){
					if(window.mapObj){
						window.mapObj.show();
					}
				},300)
			}
			
		}
	}
</script>

<style>

</style>
