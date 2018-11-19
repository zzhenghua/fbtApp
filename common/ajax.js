import $path from './path.js'

const post = function(url,params,successBack,errorBack,completeBack){
	requst('POST',url,params,successBack,errorBack,completeBack);
}
const get = function(url,params,successBack,errorBack,completeBack){
	requst('GET',url,params,successBack,errorBack,completeBack);
}

const requst = function(type,url,data,successBack,errorBack,completeBack){
	let params = data || {};
	//公用参数
	params.versionNo = $path.VERSIONNO;
	
	uni.request({
		url: url,
		method: 'POST',
		headers: {
						"Content-Type": "application/json; charset=UTF-8" 
					},
		data: {data:params},
		success: (res) => {
				if(res.data.code=='0'){
					successBack(res.data);
				}else{
					uni.showToast({
						icon:'none',
						title:res.data.message
					})
					errorBack(res.data);
				}
        //this.text = 'request success';
		},
		fail: (err)=>{
			let p = new Promise(function(resolve,reject){
				uni.getNetworkType({
					success: function (res) {
						console.log(res.networkType);
						if(res.networkType=='none'){
							//没有网络
							resolve()
						}else{
							reject()
						}
					},
					fail:function(){
						reject()
					}
				});
			})
			p.then(()=>{
				uni.showToast({
					icon:'none',
					title:'请求失败,请检查网络！'
				})
			}).catch(()=>{
				uni.showToast({
					icon:'none',
					title:'服务器异常，请联系管理员！'
				})
			})
			// console.log('err:'+JSON.stringify(err))
			
			// errorBack();
		},
		complete: (res) => {
			uni.hideLoading();
			// console.log('complete:'+JSON.stringify(res))
			completeBack?completeBack():''
		}
	});
}




// (res)=>{
// 			debugger
// 			uni.showToast({
// 				icon:'none',
// 				title:res.message
// 			})
// 			if(res.code=='0'){
// 				successBack(res.data);
// 			}else{
// 				uni.showToast({
// 					icon:'none',
// 					title:res.message
// 				})
// 				errorBack(res);
// 			}
// 		}

export default {
	post:post,
	get:get
}