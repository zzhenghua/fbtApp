<template>
	<view class="page">
		<view class="content uni-flex-item">
		<view class="tc">
			<image class="img" src="../../../static/logo2.png" mode="widthFix"></image>
		</view>
		<form action="">
			<view class="input-group">
				<view class="input-row border">
					<text class="title">账号：</text>
					<input type="text" v-model="account" placeholder="请输入账号" placeholder-class="placeholder">
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<input type="text" password="true" v-model="password" placeholder="请输入密码" placeholder-class="placeholder">
				</view>
			</view>

			<view class="btn-row">
				<button type="primary" class="primary" @tap="bindLogin">登录</button>
			</view>
		</form>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">工号查询</navigator>
			<text>|</text>
			<navigator url="../reg/reg">马上注册</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5'
	import { mapState ,mapMutations} from 'vuex'
	
	let cid = '';//clientid
//#ifdef APP-PLUS
		let info = plus.push.getClientInfo();
		cid = info.clientid;
//#endif
	
	export default {
		data() {
			return {
				account: '',
				password: ''
			};
		},
		methods:{
			...mapMutations (['getUserInfo']),
			bindLogin(){
				if(this.account.trim()==''){
					return uni.showToast({
						icon:'none',
						title: '请输入工号'
					})
				}
				if(this.password.trim()==''){
					return uni.showToast({
						icon:'none',
						title: '请输入密码'
					})
				}
				this.$ajax.post(this.$path.APPLOGIN,{
					loginName: this.account,
					password: md5(this.password),
					cid:cid
				},function(res){
					console.log(JSON.stringify(res));
					uni.setStorageSync('userInfo',JSON.stringify(res.data))
					this.getUserInfo({userInfo:res.data});
					uni.showToast({
						title:"登录成功！"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'../../index/index'
						})
					},1500)
				},function(err){})
				
				
			}
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.img {
		max-width: 190px;
		width: 50%;
		margin: 20% 0 12%;
	}

	.page {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content{
		padding: 0 15px;
	}

	.input-group {
		background-color: #ffffff;
		position: relative;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 25px;
		min-height: 25px;
		padding: 15px 0;
		padding-left: 30px;
		line-height: 25px;
	}

	.input-row input {
		width: 80%;
		height: 25px;
		min-height: 25px;
		padding: 15px 0;
		padding-right: 30px;
		line-height: 25px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 30px;
		padding: 20px;
	}

	button.primary {
		background-color: #0faeff;
	}

	.action-row {
		width: 100%;
		text-align: center;
		padding:5px 0 20px;
	}

	.action-row text {
		color: #CCCCCC;
	}

	navigator {
		color: #0093dd;
		display: inline-block;
		padding: 0 5px;
	}
</style>
