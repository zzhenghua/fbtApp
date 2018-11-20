<template>
	<view>
		<view class="mask" v-show="showPopup"></view>
		<view class="popup popup-middle" v-if="showPopup">
			<view class="popup-head" v-if="titile">{{titile}}</view>
			<view class="popup-content">
				<slot></slot>
			</view>
			<view class="popup-foot uni-flex">
				<view class="popup-button uni-flex-item tc c0093dd" hover-class="popup-button-hover" @tap="buttonEvents(index)">确定</view>
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
			}
		},
		data() {
			return {
			}
		},
		methods: {
			buttonEvents(index){
				this.$emit('buttonEvents');
			}
		}
	}
</script>
<style>
	@import "../common/popup.css"
</style>
