<template>
	<view class="page">
		<view class="paddingTop10">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						当前版本
						<text>1.0.0</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right">
						新消息通知
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right">
						修改密码
					</view>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate" @tap="loginOut">
						退出
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				showSignout:false,
				version:''
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			let _this =this;
			// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid,function(inf){
					_this.version=inf.version;
				});
			// #endif
		},
		methods:{
			...mapMutations(['getUserInfo']),
			goOut(){
				this.showSignout = true;
			},
			loginOut(){
				uni.showLoading({
					mask:true
				})
				this.$ajax.post(this.$path.APPLOGINEXITLOGIN,{
					"userId":this.userInfo.userId,
					"token":this.userInfo.token
				},(res)=>{
					uni.removeStorage({
						key:'userInfo'
					})
					// uni.setStorageSync('userInfo','')
		    		this.getUserInfo({userInfo:{}});
					uni.reLaunch({
						url:'../login/login'
					})
				},(error)=> {
				    
				});
				
			},
			closeDialog(){
				//关闭所有弹框
				this.showSignout = false;
			},
		}
	}
</script>

<style>
.uni-list:after,
.uni-list:before{
	height: 0px;
}
</style>
