<template>
<view class="uni-list">
	<view class="uni-list-cell uni-collapse">
		<view class="uni-list-cell-navigate uni-navigate-bottom" :class="show ? 'uni-active' : ''" @click="trigerCollapse">
			<view class="">
				<icon class="uni-icon iconfont" v-show="isTjLj=='tj'">&#xe611;</icon>
				<icon class="uni-icon iconfont" v-show="isTjLj=='jl'">&#xe86b;</icon>
				<text class="c333 font16">{{title}}</text>
			</view>
		</view>
		<view class="uni-collapse-content" :class="show ? 'uni-active' : ''">
			<slot></slot>
		</view>
	</view>
</view>
</template>

<script>
    export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:''
			}
		},
        data() {
            return {
            }
        },
		computed:{
			isTjLj(){
				if(this.title.indexOf('统计')>-1){
					return 'tj'
				}
				if(this.title.indexOf('记录')>-1){
					return 'jl'
				}
			}
		},
        methods: {
            trigerCollapse(e) {
                this.show = !this.show;
            }
        }
    }
</script>

<style>
.uni-list-cell-navigate.uni-active{
	background: #FFFFFF;
}
.uni-collapse .iconfont{
	font-size: 20px;
}
.uni-list:after{
	height: 0px;
}
</style>
