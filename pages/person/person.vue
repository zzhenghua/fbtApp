<template>
	<view class="page">
	<view class="uni-list">
		<view class="uni-list-cell" v-for="(item,index) in list" :key="index">
			<view class="uni-list-cell-navigate uni-navigate-right">
				{{item.value}}
			</view>
		</view>
	</view>
	
	<view class="uni-list">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
			<view class="uni-media-list">
				<image class="uni-media-list-logo userImg" :src="item.img"></image>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{item.title}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
	
	<section>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<navigator url="/person/userInfo">
					<div class="mui-media-object mui-pull-left"><image class="userImg" :src="photo"></image></div>
					<div class="mui-media-body">
						<div class="font16 userName">{{userInfo.cname}}</div>
						<p class="mui-ellipsis"><span class="c999">工号：</span>{{userInfo.loginName}}</p>
					</div>
				</navigator>
			</li>
		</ul>
	</section>
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
	export default {
		data() {
			return {
				userInfo:{
					cname:'张三',
					loginName:'0001'
					
				},
				photo:'./../../static/img2.jpg',
				list:[{
					title:'1212',
					img:'./../../static/img2.jpg',
					content:'contentcontentcontentcontent'
				}]
			};
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

.mui-table-view .userImg {
  max-width: 68px;
  height: 68px;
  border-radius: 10px;
}
</style>
