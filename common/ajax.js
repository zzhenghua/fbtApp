

const post = function(url,params,successBack,errorBack,completeBack){
// 	uni.request({
// 		url: '',
// 		method: 'GET',
// 		data: {},
// 		success: res => {},
// 		fail: () => {},
// 		complete: () => {}
// 	});
	uni.request({
		url: url,
		method: 'POST',
		headers: {
            "Content-Type": "application/json; charset=UTF-8" 
          },
		data: {data:params},
		success: successBack,
		fail: errorBack,
		complete: () => {
			completeBack();
		}
	});
}
const get = function(url,params,successBack,errorBack,completeBack){

	uni.request({
		url: url,
		method: 'GET',
		headers: {
            "Content-Type": "application/json; charset=UTF-8" 
          },
		data: {data:params},
		success: successBack,
		fail: errorBack,
		complete: () => {
			completeBack?completeBack():'';
		}
	});
}



export default {
	post:post,
	get:get
}