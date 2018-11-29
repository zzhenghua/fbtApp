<template>
	<view class="searchBox">
		<view class="pr">
			<input confirm-type="search" placeholder="搜索" placeholder-class="placeholder" v-model.trim="searchVal" @input="change"  @confirm="search"/>
			<icon class="uni-icon uni-icon-search searchIcon"></icon>
			<icon class="uni-icon uni-icon-closeempty closeIcon" v-if="showClear" @tap="clearInput"></icon>
		</view>
	</view>
	
	<!-- <form action="javascript:void(0)">
	<div class="mui-input-row mui-search mui-content-padded">
		<input type="search" v-model.trim="searchVal" @keyup.enter="search" ref="search" class="" placeholder="">
		<span class="mui-placeholder" @click="inputFocus">
			<span class="mui-icon mui-icon-search"></span>
			<span>{{searchTips}}</span>
		</span>
	</div>
	</form> -->
</template>

<script>
	export default{
		name:'searchView',
		data(){
			return{
				searchVal:'',
				showClear:false
			}
		},
		props:{
			searchTips:{
				type:String,
				default:'搜索'
			}
		},
		methods:{
			search(){
				this.$emit('searchFun',this.searchVal)
			},
			change(){
				// this.$emit('input', e.target.value);
				if(this.searchVal.length>0){
					this.showClear = true 
				}else{
					this.showClear = false 
				}
			},
			//清除
			clearInput(){
				this.searchVal = '';
				this.showClear = false;
			}
		}
	}
</script>

<style>
.searchBox{
	padding: 10px 15px;
	position: relative;
}
.searchBox input{
	padding: 0 30px;
	font-size: 14px;
	height: 34px;
	background-color: #FFFFFF;
	border-radius: 6px;
}
.searchIcon{
	position:absolute;
	top:3px;
	left:3px;
	font-weight:bold;
	color: #999;
}
.closeIcon{
	position:absolute;
	top:3px;
	right:3px;
	font-weight:bold;
	color: #999999;
}
</style>