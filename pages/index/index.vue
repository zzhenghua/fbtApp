<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in testImgs" :key="item" >
				<image class="swiper-item" :src="item" mode="widthFix"></image>
				<!-- <view class="swiper-item"><image :src="item" mode="widthFix"></image></view> -->
			</swiper-item>
		</swiper>
		<section style="padding: 0 15px;">
				<div class="matter">
					<button type="primary" size="mini">待处理<uni-badge type="warning" text="1"></uni-badge></button>
					<uni-badge type="purple" :inverted="true" text="1"></uni-badge>
					<!-- <button class="mui-btn1 mui-btn-primary animated" style="animation-delay: 0.5s;">待处理 <span class="mui-badge mui-badge-success">1</span></button> -->
						<!-- <navigator url="" type="button" class="mui-btn1 mui-btn-primary animated"  :class="{fadeInRight:animate}" style="animation-delay: 0.5s;">待处理 <span class="mui-badge mui-badge-success">{{dclAcount}}</span></navigator> -->
						<!-- <navigator url="" type="button" class="mui-btn1 mui-btn-danger animated" :class="{fadeInRight:animate}" style="animation-delay: 0.8s;"> 考勤 </navigator> -->
				</div>
			</section>
			<view class='title'>
				<text>无底色</text>
			</view>
			<view>
				<uni-badge text="1" :inverted="true"></uni-badge>
				<uni-badge text="12" type="primary" :inverted="true"></uni-badge>
				<uni-badge text="123" type="success" :inverted="true"></uni-badge>
				<uni-badge text="3" type="warning" :inverted="true"></uni-badge>
				<uni-badge text="45" type="danger" :inverted="true"></uni-badge>
				<uni-badge text="456" type="purple" :inverted="true"></uni-badge>
			</view>
		<!-- <div class="mui-clearfix section_head" v-if="ggList.length>0">
				<h4 class="mui-pull-left section_title"><span class="iconfont icon-gonggao1-copy" style="background: #e7b55e;"></span>公告</h4>
				<router-link tag="a" to="/worktop/notice" class="mui-pull-right">更多</router-link>
			</div> -->
		<view class="section">
			<view class="section_head uni-flex">
				<view class="section_title uni-flex-item">
					<span class="iconfont icon" style="background: #e7b55e;">&#xe6bb;</span><text>1</text>公告
				</view>
				<navigator url="">更多</navigator>
			</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					Item2
					<!-- <uni-badge text="1" type="danger"></uni-badge> -->
				</view>
			</view>
			<view class="uni-list-cell" v-for="(item,index) in list" :key="index" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right">
					{{item.title}} 
					<text>{{item.publishDate}}</text>
				</view>
			</view>
		</view>
		</view>
		<navigator url="../icon/icon">
			<button type="primary">图标</button>
		</navigator>
		<!-- <button type="primary"@tap="goLogin">登录</button> -->
		<navigator url="../person/login/login">
			登录
		</navigator>
		<!-- <view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<view>1122121</view><br/><br/><br/>
		<p>1122121</p><br/><br/><br/>
		<p>1122121</p><br/><br/><br/>
		<p>1122121</p><br/><br/><br/>
		<p>1122121</p><br/><br/><br/>
		<p>1122121</p><br/><br/><br/>
		<p>1122121</p><br/><br/><br/>
		<p>1122121</p><br/><br/><br/> -->
		<view class="">
			<text class="title">{{title}}</text>
		</view>
		<!-- <section class="animated" :class="{fadeInUp:animate}" v-if="showGg">
			<div class="mui-clearfix section_head" v-if="ggList.length>0">
				<h4 class="mui-pull-left section_title"><span class="iconfont icon-gonggao1-copy" style="background: #e7b55e;"></span>公告</h4>
				<router-link tag="a" to="/worktop/notice" class="mui-pull-right">更多</router-link>
			</div>
			<ul class="mui-table-view" v-if="ggList.length>0">
				<router-link tag="li" :to="{path:'/worktop/notice/details',query:{type:'2',id:item.id}}" v-for="item in ggList"  :key="item.id" class="mui-table-view-cell flex">
					<div class="flexItem mui-ellipsis">{{item.title}}</div>
					<div class="time font12">{{item.publishDate}}</div>
				</router-link>
			</ul>
		</section> -->
	</view>
</template>

<script>
	import uniBadge from "./../../components/uni-badge.vue";
	
	export default {
		data() {
			return {
				testImgs:['./../../static/img1.png','./../../static/img1_1.png'],
				title: 'Hello',
				animate:false,
				list:[{"publishDate":"2018-08-20 11:08:27","description":"是的啊","publisher":"系统管理员","id":"10000002","title":"法本信息科技有限公司"},{"publishDate":"2018-08-01 18:25:13","description":"","publisher":"系统管理员","id":"10000001","title":"APP确认考勤操作指引"}]
			};
		},
		components: {
			uniBadge
		},
		onLoad() {
		},
		methods:{
			goLogin(){
				uni.reLaunch({
					url:'../person/login/login'
				})
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.swiper-item {
		display: block;
		width: 100%;
	}
	.container {
  height: calc(100% - 50px);
}
.mui-btn1{
	display: inline-block;
}

.section_head {
  padding: 11px 15px;
  background: #FFFFFF;
}

.section_head a {
  color: #0093DD;
}

.section_title {
  color: #454545;
  margin: 0;
  line-height: 1.2;
  font-size: 16px;
}
.section_title .iconfont {
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  margin-right: 5px;
}
</style>
