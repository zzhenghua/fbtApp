<template>
	<view >
	<view class="mask" @click="cancel" catchtouchmove="true"></view>
    <view class="popup popup-bottom" :class="{animate:animate}">
        <!-- <view class="title">日期：{{year}}年{{month}}月{{day}}日</view> -->
		<!-- <view class="mask" v-show="showMask" @click="hide"></view> -->
		<view class="uni-flex picker_head" catchtouchmove="true">
			<view class="uni-flex-item tl"><text class="text" @tap="cancel">取消</text></view>
			<button type="primary" @tap="sureCallback" class="mui-btn1 primary" style="margin:0;border-radius:4px;">确定</button>
		</view>
        <picker-view v-if="visible" indicator-style="height: 40px;" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-if="dtMode" v-for="(item,index) in years" :key="index">{{item}}年</view>
            </picker-view-column>
            <picker-view-column v-if="dtMode=='month'||dtMode=='date'||dtMode=='hour'||dtMode=='minute'||dtMode=='second'">
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
            </picker-view-column>
            <picker-view-column v-if="dtMode=='date'||dtMode=='hour'||dtMode=='minute'||dtMode=='second'">
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
            </picker-view-column>
			<picker-view-column v-if="dtMode=='hour'||dtMode=='minute'||dtMode=='second'">
				<view class="item" v-for="(item,index) in hours" :key="index">{{item}}时</view>
			</picker-view-column>
			<picker-view-column v-if="dtMode=='minute'||dtMode=='second'">
				<view class="item" v-for="(item,index) in minutes" :key="index">{{item}}分</view>
			</picker-view-column>
			<picker-view-column v-if="dtMode=='second'">
				<view class="item" v-for="(item,index) in seconds" :key="index">{{item}}秒</view>
			</picker-view-column>
        </picker-view>
    </view>
	</view>
</template>

<script>
	
    export default {
		props:{
			dtMode:{
				type:String,
				default:'date'
			},
			defaultTime:{//默认日期  2018-11-22 15:50:30
				type:String,
				default:''
			}
		},
        data: function () {
            const date = new Date()
			if(this.defaultTime){
				console.log(this.defaultTime);
				console.log(this.defaultTime);
				let ymd = this.defaultTime.split(' ')[0];
				let hms = this.defaultTime.split(' ')[1];
				if(ymd.split('-')[0]){
					date.setFullYear(ymd.split('-')[0]);
				}
				if(ymd.split('-')[1]){
					date.setMonth(ymd.split('-')[1]+1);
				}
				if(ymd.split('-')[2]){
					date.setDate(ymd.split('-')[2]);
				}
				if(hms){
					if(hms.split(':')[0]){
						date.setHours(ymd.split('-')[0]);
					}
					if(hms.split(':')[1]){
						date.setMinutes(ymd.split('-')[1]);
					}
					if(hms.split(':')[2]){
						date.setSeconds(ymd.split('-')[2]);
					}
				}
			}
			
            const years = []
            const year = date.getFullYear()
            const months = []
            const month = date.getMonth() + 1
            const days = []
            const day = date.getDate()
						
			const hours = []
			const hour = date.getHours()
			const minutes = []
			const minute = date.getMinutes()
			const seconds = []
			const second = date.getSeconds()
				
            for (let i = 1990; i <= 2030; i++) {
                years.push(i)
            }

            for (let i = 1; i <= 12; i++) {
                months.push(i)
            }

//             for (let i = 1; i <= 31; i++) {
//                 days.push(i)
//             }
			
			for (let i = 0; i <= 23; i++) {
				hours.push(i)
			}
			
			for (let i = 0; i <= 59; i++) {
				minutes.push(i)
			}
			
			for (let i = 0; i <= 59; i++) {
				seconds.push(i)
			}
            return {
                years,
                year,
                months,
                month,
                // days,
                day,
				hours,
				hour,
				minutes,
				minute,
				seconds,
				second,
				animate:false,
                // value: [ year, month - 1, day - 1, hour, minute, second],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
                visible: true,
                // indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
            }
        },
		computed:{
			days(){
				let d = new Date(),days=[];
				d.setFullYear(this.year);
				d.setMonth(this.month);
				d.setDate(1);
				d.setDate(0);
				for (let i = 1; i <= d.getDate(); i++) {
					days.push(i)
				}
				return days;
			},
			value(){
				return [ this.year-1990, this.month-1, this.day-1, this.hour, this.minute, this.second]
			}
		},
		onLoad() {
			setTimeout(()=>{
				this.animate = true;
			},100)
		},
        methods: {
            bindChange: function (e) {
                const val = e.detail.value
				console.log('val:'+val);
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
                this.hour = this.hours[val[3]]
                this.minute = this.minutes[val[4]]
                this.second = this.seconds[val[5]]
            },
			//关闭
			cancel(){
				this.animate = false;
				this.$emit('hideDtPicker');
				
			},
			closeAnimate(){
				this.animate = false;
			},
			//确定
			sureCallback(){
				let dateStr = '',
					y = this.value[0]+1990,
					m = this.value[1]+1,
					d = this.value[2]+1,
					H = this.value[3],
					M = this.value[4],
					S = this.value[5];
					
					m = m<10?('0'+m):m;
					d = d<10?('0'+d):d;
					H = H<10?('0'+H):H;
					M = M<10?('0'+M):M;
					S = S<10?('0'+S):S;
				switch(this.dtMode){
					case "year":
					dateStr = y;
					break;
					case "month":
					dateStr = y+'-'+m;
					break;
					case "date":
					dateStr = y+'-'+m+'-'+d;
					break;
					case "hour":
					dateStr = y+'-'+m+'-'+d
								+' '+H;
					break;
					case "minute":
					dateStr = y+'-'+m+'-'+d
								+' '+H+':'+M;
					break;
					case "second":
					dateStr = y+'-'+m+'-'+d
								+' '+H+':'+M+':'+S;
					break;
				}
				this.$emit('sureDtPicker',dateStr);
			}
        }
    }
</script>

<style scoped>
    picker-view {
        width: 100%;
        height: 500upx;
    }

    .item {
        line-height: 40px;
        text-align: center;
    }
	
	.picker_head{
		padding: 12upx 20upx;
		height: 60upx;
		border-bottom: 1px solid #DDDDDD;
	}
	.picker_head .text{
		line-height:60rpx;
		font-size:32rpx;
	}
	.picker_head .mui-btn1{
		line-height:60rpx;
	}
	.popup {
			position: fixed;
			z-index: 999;
			background-color: #ffffff;
			-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
			box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
			transition:  all ease 0.3s;
		}
	
		.popup-bottom {
			bottom: 0;
			width: 100%;
			height: 600upx;
			text-align: center;
			transform: translateY(100%);
		}
		
		.popup-bottom.animate{
			transform: translateY(0);
		}
	
		.popup-bottom text {
			line-height: 80upx;
			font-size: 32upx;
			color: #888888;
		}
	
		.popup .list-view {
			height: 600upx;
		}
	
		.list-view-item {
			position: relative;
			padding: 22upx 30upx;
			overflow: hidden;
			font-size: 28upx;
		}
	
		.list-view-item::after {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 30upx;
			height: 2upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #c8c7cc;
		}
	
		.btn-row .btn {
			margin: 20upx;
		}
	
		.desc {
			padding: 10upx 20upx;
			font-size: 30upx;
			line-height: 30upx;
			margin-top: 150upx;
			text-align: center;
		}
		
</style>
