<template>
	<view class="">
		<view class="mask" v-show="showPopup" @click="hide"></view>
		<view class="popup" v-if="showPopup" :class="{'popup-top':showState=='top','popup-middle':showState=='middle','popup-bottom':showState=='bottom'}">
			<view class="popup-head" v-if="titile">{{titile}}</view>
			<view class="popup-content">
				<slot></slot>
			</view>
			<view class="popup-foot uni-flex" v-if="buttons.length>0">
					<view class="popup-button uni-flex-item tc" hover-class="popup-button-hover" v-for="(item,index) in buttons" :key="index" :class="item.tclass" @tap="buttonEvents(index)">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props:{
			showPopup:{
				type:Boolean,
				default:false
			},
			titile:{
				type:String,
				default:''
			},
			showState:{
				type:String,
				default:'middle'  //top、middle、bottom
			},
			buttons:{
				type:Array,
				default:function(){
					return [{
						text:'取消',
						tclass:''//绑定class
					},{
						text:'确定',
						tclass:''//绑定class
					}]
				}
			}			
		},
		data() {
			return {
				// showMask: false,
				activePop: 'middle'
			}
		},
		methods: {
			show(evt) {
				this.showPopup = true
			},
			hide() {
				this.showPopup = false
			},
			buttonEvents(index){
					this.$emit('buttonEvents',index);
			}
		}
	}
</script>
<style>


	.popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		/* width: 400upx;
		height: 400upx; */
		border-radius: 24upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}

	.popup-top {
		top: 0;
		width: 100%;
		height: 100upx;
		text-align: center;
	}

	.popup-top text {
		line-height: 100upx;
		margin-left: 20upx;
		font-size: 32upx;
	}

	.popup-bottom {
		bottom: 0;
		width: 100%;
		height: 100upx;
		text-align: center;
	}

	.popup-content {
		padding: 10upx 30upx;
		min-height: 200upx;
		/* font-size: 30upx;
		line-height: 30upx;
		margin-top: 150upx;
		text-align: center; */
	}
	
	.popup-head{
		height: 80upx;
		line-height: 80upx;
		padding: 0 30upx;
		font-weight: bold;
		font-size: 32upx;
		position: relative;
	}
	.popup-foot{
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		position: relative;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.popup-foot:before{
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background-color: #DDDDDD;
		transform: scaleY(0.5);
	}
	.popup-foot .popup-button{
		position: relative;
		height: 100%;
	}
	.popup-button-hover{
		background: #EEEEEE;
	}
	.popup-foot .popup-button:before{
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: #DDDDDD;
			transform: scaleX(0.5);
	}
	.popup-foot .popup-button:first-child:before{
		width: 0px;
	}
</style>
