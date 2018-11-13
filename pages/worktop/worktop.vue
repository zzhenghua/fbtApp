<template>
	<view class="page">
		<view class="uni-grid-9" v-if="menuList.length>0">
			<!-- <view class="uni-grid-9-item tc" hover-class="uni-grid-9-item-hover">
				<view class="iconBox" style="background: #e7b55e;">
					<icon class="iconfont icon-gonggao1-copy">&#xe600;</icon>
				</view>
				<text class="text">公告</text>
			</view> -->
			
			<view v-for="(item,$index) in menuList" :key="item.seq" class="uni-grid-9-item tc" hover-class="uni-grid-9-item-hover">
				<view class="iconBox" :style="{background:item.background}">
					<icon v-if="item.id==155" class="iconfont" :class="item.icon">&#xe6ae;</icon>
					<icon v-else-if="item.id==156" class="iconfont" :class="item.icon">&#xe670;</icon>
					<icon v-else-if="item.id==157" class="iconfont" :class="item.icon">&#xe600;</icon>
					<icon v-else-if="item.id==158" class="iconfont" :class="item.icon">&#xe608;</icon>
					<icon v-else-if="item.id==159" class="iconfont" :class="item.icon">&#xe61d;</icon>
					<icon v-else-if="item.id==160" class="iconfont" :class="item.icon">&#xe61a;</icon>
					<icon v-else-if="item.id==161" class="iconfont" :class="item.icon">&#xe606;</icon>
					<icon v-else-if="item.id==162" class="iconfont" :class="item.icon">&#xe62d;</icon>
					<icon v-else-if="item.id==163" class="iconfont" :class="item.icon">&#xe647;</icon>
				</view>
				<text class="text">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	
	const MENU = [{
		id: 155,
		name: "考勤",
		background:"#f2725e",
		icon:"icon-kaoqintongji",
		iconCode:"&#xe6ae;",
		to:"attendance",
		seq: "1"
	},{
		id: 156,
		name: "申请审批",
		background:"#0093DD",
		icon:"icon-shenqingxiugaishenpi",
		iconCode:"&#xe670;",
		to:"apply",
		seq: "2"
	},{
		id: 157,
		name: "公告",
		background:"#e7b55e",
		icon:"icon-gonggao1-copy",
		iconCode:"&#xe600;",
		to:"notice",
		seq: "3"
	},{
		id: 158,
		name: "员工风采",
		background:"#b481c1",
		icon:"icon-yuangongfengcai",
		iconCode:"&#xe608;",
		to:"employeeStyle",
		seq: "4"
	},{
		id: 159,
		name: "报表管理",
		background:"#3aacff",
		icon:"icon-baobiaoguanli",
		iconCode:"&#xe61d;",
		to:"reportForm",
		seq: "5"
	},{
		id: 160,
		name: "邮件管理",
		background:"#fba32d",
		icon:"icon-youjian1",
		iconCode:"&#xe61a;",
		to:"txqymail",
		seq: "6"
	},{
		id: 161,
		name: "薪资查询",
		background:"#00d4a5",
		icon:"icon-gerenduiwaitouzixinxichaxun",
		iconCode:"&#xe606;",
		to:"wages",
		seq: "7"
	},{
		id: 162,
		name: "加班打卡",
		background:"#00BCD4",
		icon:"icon-kaoqindaqia",
		iconCode:"&#xe62d;",
		to:"clock",
		seq: "8"
	},{
		id: 163,
		name: "知识库",
		background:"#00ddd4",
		icon:"icon-zhishiku",
		iconCode:"&#xe647;",
		to:"knowledge",
		seq: "9"
	}];
	
	export default {
		data() {
			return {
				menuList:[]
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad() {
			this.getMenu();
		},
		methods:{
			getMenu(){
				this.$ajax.post(this.$path.WORKBENCHLIST,{
					"userId":this.userInfo.userId,
					"loginName":this.userInfo.loginName,
					"token":this.userInfo.token
				},(res)=>{
					//if(res.code=='0'){
						let list = res.data.resourceList;
						if(list.length==0){
							this.requestStatus = 1;
						}
						//排序
						for(let i=0;i<list.length;i++){
							for(let k=0;k<MENU.length;k++){
								if(list[i].id==MENU[k].id){
									list[i]= MENU[k]
								}
							}
						}
						this.menuList = list;
					//}
				},(error)=> {
					this.requestStatus = 2;
				});
			}
		}
	}
</script>

<style>
.uni-grid-9{
	background: #FFFFFF;
	padding-top:8px;
}
.uni-grid-9-item{
	width: 25%;
	height: 160upx;
	border: none;
	padding-top:5px;
}
.iconBox{
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: #0093DD;
    border-radius: 10px;
    display: inline-block;
    -webkit-transition: -webkit-transform .2s linear;
    transition: -webkit-transform .2s linear;
    transition: transform .2s linear;
    transition: transform .2s linear, -webkit-transform .2s linear;
}
.iconfont{
	font-size: 26px;
	color: #FFFFFF;
}
.text{
	font-size: 12px;
    line-height: 2;
    color: #666666;
}
</style>
