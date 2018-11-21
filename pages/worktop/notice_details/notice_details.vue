<template>
	<view class="page">
		<view class="article">
			 	<view class="head">
			 		<h2 class="font18 tc title c333">{{article.title}}</h2>
			 		<view class="font12 tc c999" v-if="article.publisher">作者：{{article.publisher}}<span class="time">{{article.publishDate}}</span></view>
			 	</view>
			 	<!-- <view class="content animated fadeInUp"  ref="conText" style="animation-delay: 1s;" v-html="article.content">
			 	</view> -->
				
				<rich-text :nodes="htmlString"></rich-text>
				
			 	<!-- <view class="animated fadeInUp" style="animation-delay: 2s;" v-if="article.attachs&&article.isDownload=='是'&&article.attachs.length>0">
			 		附件：
			 		<p v-for="item in article.attachs"><a :href="item.path" download="" class="mui-btn-link" @click="downFile(item.path)">{{item.name}}</a></p>
			 	</view> -->
			 	
			 </view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				article:{},
				htmlString: ''
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad(e) {
			if(e.type&&e.id){
				this.getDeltail(e.type,e.id)
			}
		},
		methods:{
			//获取详情
			getDeltail(type,id){
				this.$ajax.post(this.$path.APPKNOLEDGEKNOLEDGE,{
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token,
					"id":id,
					"knoType":type,
				},(res)=>{
					this.article = res.data.data
					this.htmlString = res.data.data.content.replace(/<img/g, "<img onclick=\"previewImg\" class=\"image\"").replace(/<p/g, "<p class=\"p\"");
					//this.initImage();
					if(res.data.data.title){
						uni.setNavigationBarTitle({
							title: res.data.data.title
						});
					}
				},(error)=> {
				});
			},
			previewImg(){
				uni.previewImage({
					urls: e.currentTarget.src
				});
			}
		}
	}
</script>

<style>
page,.page{
	background: #FFFFFF;
}
.article{
	padding: 15px;
}
.article .content {
    padding: 10px 0;
    line-height: 1.7;
    letter-spacing: .2px;
}
.p {
    font-size: 14px;
    /* text-indent: 2em;
    margin-bottom: 10px; */
}
.image{
	max-width: 100% !important;
    height: auto !important;
    display: inherit;
}
</style>
