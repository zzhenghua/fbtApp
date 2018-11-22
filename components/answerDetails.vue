<template>
	<view class="page">
		<view class="uni-content-padded">
			<text class="bold">问题：{{detailsData.question.description}}</text>
		</view>
		<scroll-view scroll-y style="height: calc(100% - 123px);">
			<view class="newsList">
				<view class="li" v-for="(item,index) in detailsData.answer" :key="index">
					<view class="content" v-if="item.emp_no==userInfo.loginName">
						<text class="bold">我：</text><text v-html="item.reply"></text><text class="tr c999 font12"> {{item.create_time}}</text>
					</view>
					<view class="content" v-else>
						<text class="bold">回复：</text><text v-html="item.reply"></text><text class="tr c999 font12"> {{item.create_time}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="ftBtns uni-flex" ref="ftBtns">
			<button type="primary" class="primary mui-btn1" @click="backList">返回列表</button>
			<view class="uni-flex-item tr">
				<button type="primary" class="primary mui-btn1" @click="answerText">回复</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		props:{
			detailsData:{
				type:Object,
				default:function () {
					return {};	
				}
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		created(){
			// console.log(JSON.stringify(this.detailsData))
		},
		methods:{
			backList(){
				this.$emit('backList');
			},
			answerText(){
				this.$emit('answerText');
			},
			scrollEnd(){
				// scrollDiv.scrollToElement(this.$refs.ftBtns)
			}
		}
	}
</script>

<style scoped>
.page{
	position:absolute;
	top:54px;
	left:0;
	right:0;
	bottom:0;
	height: calc(100% - 54px);
	overflow: hidden;
	z-index:100;
	background:#fff;

}
.newsList{
	padding: 0 10px 10px;
    margin: 0 0 10px;
}
.newsList .li {
margin-bottom: 7px;
border-radius: 6px;
background: #f5f5f5;
padding: 6px 10px;
}
.ftBtns{
	position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    padding: 10px;
	font-size: 0;
	z-index: 101;
}
</style>
