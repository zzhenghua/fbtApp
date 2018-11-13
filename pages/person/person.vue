<template>
	<view class="page">
	
	<view class="uni-list ">
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate uni-flex" style="justify-content: center;padding: 15px;">
				<view class="imgBox">
					 <image class="userImg" :src="userInfo.picture||photo"></image>
				</view>
				<view class="uni-flex-item">
					<view>{{userInfo.cname}}</view>
					<text>{{userInfo.loginName}}</text>
				</view>
			</view>
		</view>
	</view>
	
	<view class="uni-list section">
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate c333" hover-class="uni-list-cell-hover">
				<view class="">
					<icon class="iconfont icon-shezhi">&#xe7a0;</icon>
					设置
				</view>
			</view>
		</view>
	</view>
	
	<!-- <section>
		<ul class="mui-table-view setList">
				<router-link to="/person/setting" tag="li" class="mui-table-view-cell font16 c333">
					<span class="iconfont icon-shezhi font22 c666"></span>设置
				</router-link>
			</ul>
	</section> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
// 				userInfo:{
// 					cname:'张三',
// 					loginName:'0001'
// 					
// 				},
				photo:'./../../static/img2.jpg',
				list:[{
					title:'1212',
					img:'./../../static/img2.jpg',
					content:'contentcontentcontentcontent'
				}]
			};
		},
		computed:{
			...mapState(['userInfo'])
		}
	}
</script>

<style>
.mui-table-view:after, .mui-table-view:before {
  height: 0;
}

.userName {
  margin: 10px 0 10px;
  color: #333333;
}

.setList .iconfont {
  vertical-align: middle;
  margin-right: 5px;
}

.mui-table-view .mui-media-object {
  width: 68px;
  height: 68px;
  border-radius: 10px;
  max-width: inherit;
  background-size: cover;
}
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
