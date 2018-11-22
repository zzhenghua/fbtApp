<template>
	<view class="">
		<view class="mask" v-show="showPopup"></view>
		<view v-show="showPopup" class="popup popup-middle" >
			<view class="popup-head tc" v-if="title">{{title}}</view>
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
			title:{
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
						tclass:'c0093dd'//绑定class
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
				this.showHelpPopup = true
			},
			hide() {
				this.showHelpPopup = false
			},
			buttonEvents(index){
					this.$emit('buttonEvents',index);
			}
		}
	}
</script>
<style>
	@import "../common/popup.css"
</style>
