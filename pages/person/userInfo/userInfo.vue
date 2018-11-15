<template>
	<view class="page">
		<view class="paddingTop10">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-flex" style="justify-content: center;padding: 15px;">
						<view class="uni-flex-item">
							<text class="font6 c333">头像</text>
						</view>
						<view class="imgBox" @tap="editUserImage">
							<image class="userImg" :src="userInfo.picture||photo"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-list marginTop10">
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-flex">
					<view class="uni-flex-item">
						<text class="font6 c333">姓名</text>
					</view>
					<text class="font6 c999">{{userInfo.cname}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-flex">
					<view class="uni-flex-item">
						<text class="font6 c333">工号</text>
					</view>
					<text class="font6 c999">{{userInfo.loginName}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-flex">
					<view class="uni-flex-item">
						<text class="font6 c333">部门</text>
					</view>
					<text class="font6 c999">{{userInfo.departmentName}}</text>
				</view>
			</view>
		</view>
		
		<view class="uni-list marginTop10">
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-flex">
					<view class="uni-flex-item">
						<text class="font6 c333">邮箱</text>
					</view>
					<text class="font6 c999">{{userInfo.email}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-flex">
					<view class="uni-flex-item">
						<text class="font6 c333">手机号</text>
					</view>
					<text class="font6 c999">{{userInfo.mobile}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				photo:'../../../static/img2.jpg',
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			editUserImage(){
				var _this = this
				uni.chooseImage({
					success: function (res) {
						uni.navigateTo({
							url:'../crop/crop?imageSrc='+res.tempFilePaths[0]
						})
// 						_this.setData({
// 							imageSrc: res.tempFilePaths[0],
// 						})
// 						_this.loadImage();
					},
				})
				
			},
			getImage: function () {
				
			},
		}
	}
</script>

<style>
.imgBox{
	width: 68px;
	height: 68px;
	margin-right: 10px;
}
.userImg {
  max-width: 68px;
  height: 68px;
  border-radius: 10px;
}
.iconfont{
	  vertical-align: middle;
    margin-right: 5px;
		font-size: 22px;
    color: #666
}
.uni-list:after,
.uni-list:before{
	height: 0px;
}
</style>
