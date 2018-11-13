<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in testImgs" :key="item" >
				<image class="swiper-item" :src="item" mode="widthFix"></image>
				<!-- <view class="swiper-item"><image :src="item" mode="widthFix"></image></view> -->
			</swiper-item>
		</swiper>
		<view style="padding: 0 15px;">
				<view class="matter font0">
						<button type="primary" size="mini" class="mui-btn1 primary animated" :class="{fadeInRight:animate}" style="animation-delay: 0.5s;">待处理<uni-badge type="default" :text="dclAcount"></uni-badge></button>
						<navigator url="../worktop/attendance/attendance">
						<button type="danger"  size="mini" class="mui-btn1 danger animated" :class="{fadeInRight:animate}" style="animation-delay: 0.8s;"> 考勤</button>
						</navigator>
				</view>
			</view>
			
		<view class="">
			<view class="section_head uni-flex">
				<view class="section_title uni-flex-item">
					<span class="iconfont icon-gonggao1-copy" style="background: #e7b55e;">&#xe600;</span>
					<text class="bold">公告</text>
				</view>
				<navigator url="">更多</navigator>
			</view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in ggList" :key="index" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-flex" @tap="toDetails(2,item.id)">
					<view class="uni-flex-item uni-ellipsis">{{item.title}}</view> 
					<text class="font12 c999">{{item.publishDate}}</text>
				</view>
			</view>
		</view>
		</view>
		
		<!-- <navigator url="../icon/icon">
			<button type="primary" class="primary" size="mini">图标</button>
		</navigator> -->
		<!-- <button type="primary"@tap="goLogin">登录</button> -->
			<button type="primary" class="primary" size="mini" @tap="clearUserInfo">清除缓存</button>
	</view>
</template>

<script>
	import uniBadge from "./../../components/uni-badge.vue";
	import { mapState ,mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				testImgs:['./../../static/img1.png','./../../static/img1_1.png'],
				list:[{"publishDate":"2018-08-20 11:08:27","description":"是的啊","publisher":"系统管理员","id":"10000002","title":"法本信息科技有限公司"},{"publishDate":"2018-08-01 18:25:13","description":"","publisher":"系统管理员","id":"10000001","title":"APP确认考勤操作指引"}],
				dclAcount:0,//待处理数量
				hasKq:false,//是否有考勤需确认
				menuList:[],//菜单列表
				ggList:[],//公告列表
				ygList:[],//员工风采列表
				showGg:false,
				showYg:false,
				animate:true
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		components: {
			uniBadge
		},
		onLoad() {
			console.log('onLoad')
			this.getDclAcount();
			this.getMenu();
			this.getGgList();
			this.getYgList();
		},
		methods:{
			...mapMutations(['getUserInfo']),
			goLogin(){
				uni.reLaunch({
					url:'../person/login/login'
				})
			},
			clearUserInfo(){
				uni.removeStorageSync('userInfo');
			},
			getDclAcount(){
				//获取待处理列表
				this.$ajax.post(this.$path.APPROVEPENDING,{
					loginName:this.userInfo.loginName,
					token:this.userInfo.token,
					subject:'',
					page:0,
					pageSize:10
				},(res)=>{
					this.dclAcount = res.data.count;
//					this[list] = res.data.adList;

				},(error)=> {
				});
			},
			getMenu(){
				this.$ajax.post(this.$path.WORKBENCHLIST,{
					"userId":this.userInfo.userId,
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token,
				},(res)=>{
					//if(res.code=='0'){
						let list = res.data.resourceList,hasGg=false,hasYg=false;
						this.menuList = list.reverse();
						for(let i=0;i<list.length;i++){
							if(list[i].id==157){//公告
								hasGg = true;
								
							}else if(list[i].id==158){//员工风采
								hasYg = true;
								
							}
						}
						this.showGg=hasGg?true:false;
						this.showYg=hasYg?true:false;
					//}
				},(error)=> {
//					this.requestStatus = 2;
				    //mui.toast(error);
				});
			},
			//获取公告列表
			getGgList(){
				this.$ajax.post(this.$path.APPKNOLEDGEKNOLEDGELIST,{
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token,
					"keyword":'',
					"knoType":"2",
					"page":1,
					"pageSize":5
				},(res)=>{
					this.ggList = res.data.data;
				},(error)=> {
				});
			},
			//获取公告列表
			getYgList(){
				this.$ajax.post(this.$path.APPKNOLEDGEKNOLEDGELIST,{
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token,
					"keyword":'',
					"knoType":"3",
					"page":1,
					"pageSize":5
				},(res)=>{
					this.ygList = res.data.data;
				},(error)=> {
				});
			},
			//跳转详情
			toDetails(type,id){
				uni.navigateTo({
					url : '../worktop/notice_details/notice_details?type='+type+'&id='+id,
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
.uni-list{
	  padding-bottom: 8px;
    padding-top: 5px;
}
.uni-list .uni-list-cell-navigate{
	padding: 6px 15px;
}
.uni-list .uni-list-cell:after {
    background-color: #e1e0e2;
    height: 0;
}
.mui-btn1{
	min-width: 50px;
}
.uni-list:after{
	height: 0px;
}
</style>
