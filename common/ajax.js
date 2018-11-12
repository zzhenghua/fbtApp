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
		fail: ()=>{
			// errorBack();
		},
		complete: (res) => {
			uni.hideLoading();
			// console.log(JSON.stringify(res))
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