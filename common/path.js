/*
 * 接口地址
 */



const HOSTNAME = 'http://192.168.0.251:8888';//测试服务器地址

const BPMIMAGEHOST = 'http://192.168.0.112:9000'//流程图测试环境
// const HOSTNAME = 'api';//服务器地址


var Path =  {
	//版本号
	VERSIONNO:'8.8.8',
	//测试
	TEST_LIST:HOSTNAME+'/platform/mobile/mobileTask/pendingMatters.ht',
	
	//登录
	APPLOGIN: HOSTNAME+'/app/appLogin/login',
	//注册
	APPREGISTER: HOSTNAME+'/app/appRegister/register',
	//是否允许注册
	ISREGISTER: HOSTNAME+'/app/appRegister/isRegister',
	//忘记密码获取验证码
	FORGETPWDGETCODE: HOSTNAME+'/app/forgetPwd/getCode',
	//判断验证码是否正确
	FORGETPWDCHECKCODE: HOSTNAME+'/app/forgetPwd/checkCode',
	//重置密码
	FORGETPWDUPDATEPWD: HOSTNAME+'/app/forgetPwd/updatePwd',
	//修改密码
	FORGETPWDUPDATEPWDBYOLDPWD: HOSTNAME+'/app/forgetPwd/updatePwdByOldPwd',
	//上传图像
	APPLOGINPHOTO: HOSTNAME+'/app/appLogin/photo',//type='0'上传图像，type='1'上传附件
	//退出登录
	APPLOGINEXITLOGIN: HOSTNAME+'/app/appLogin/exitLogin',//no
	//工作台
	WORKBENCHLIST: HOSTNAME+'/app/workbench/list',
	//新建申请
	APPROVELIST: HOSTNAME+'/app/approve/list',
	//待处理
	APPROVEPENDING: HOSTNAME+'/app/approve/pending',
	//已处理
	APPROVEPROCESSED: HOSTNAME+'/app/approve/processed',
	//抄送我
	APPROVECOPYTO: HOSTNAME+'/app/approve/copyTo',
	//我的请求
	APPROVEMYREQUEST: HOSTNAME+'/app/approve/myRequest',
	//我的草稿
	LEAVEFLOWMYDRAFT: HOSTNAME+'/app/leaveflow/myDraft',
	
	//考勤-我的请假
	APPROVELEAVESTATISTICS: HOSTNAME+'/app/leave/leaveStatistics',
	//考勤-确认请假
	APPROVECONFIRMLEAVE: HOSTNAME+'/app/leave/confirmLeave',
	//考勤-我的考勤
	APPROVECHECKRECORDS: HOSTNAME+'/app/leave/checkRecords',
	//考勤-确认考勤
	APPROVECONFIRMATTENDANCE: HOSTNAME+'/app/leave/confirmAttendance',
	
	//获取报表账号
	REPORTACCOUNTMSG: HOSTNAME+'/app/report/accountMsg',
	//薪资查询
	APPWAGEINFOWAGEINFO: HOSTNAME+'/app/appWageInfo/wageInfo',//http://172.10.11.21:8088/app/appWageInfo/wageInfo.ht
	
	
	//表单
	LEAVECHECKFLOW: HOSTNAME+'/app/leaveflow/startLeaveFlowForm',
	//审批历史
	APPROVETASKOPINIONS: HOSTNAME+'/app/approve/taskOpinions',
	//流程图
	BPMIMAGEPROCESSINSTANCEID: BPMIMAGEHOST+'/fbpm-web/bpmImage',
	//待办表单
	LEAVEFLOWAGENDAFORMDETAIL: HOSTNAME+'/app/leaveflow/agendaFormDetail',
	//已办表单
	LEAVEFLOWSUBMITTEDORMDETAIL: HOSTNAME+'/app/leaveflow/submittedormDetail',
	//草稿表单
	LEAVEFLOWMYDRAFTDETAIL: HOSTNAME+'/app/leaveflow/myDraftDetail',
	
	//获取数据字典列表
	SELECTORSELECTITEMTYPE: HOSTNAME+'/app/selector/selectItemType',
	//获取部门弹框列表
	SELECTORDEPARTMENTLIST: HOSTNAME+'/app/selector/departmentList',
	//获取岗位弹框列表
	SELECTORPOSITIONLIST: HOSTNAME+'/app/selector/positionList',
	//获取人员弹框列表
	SELECTORSTAFFLIST: HOSTNAME+'/app/selector/stafflist',
	//提交流程表单
	LEAVEFLOWSUBMITFLOWFORM: HOSTNAME+'/app/leaveflow/submitFlowForm',
	//保存草稿
	LEAVEFLOWSAVEFLOWFORM: HOSTNAME+'/app/leaveflow/saveFlowForm',
	//表单操作:同意、驳回
	LEAVEFLOWAGREEOPINION: HOSTNAME+'/app/leaveflow/agreeOpinion',
	//表单操作:转办
	LEAVEFLOWTRUNOPINION: HOSTNAME+'/app/leaveflow/trunOpinion',
	//表单操作:沟通
	LEAVEFLOWCOMMUNICATEOPINION: HOSTNAME+'/app/leaveflow/communicateOpinion',
	//表单操作:反馈
	LEAVEFLOWFEEDBACKOPINION: HOSTNAME+'/app/leaveflow/feedBackOpinion',
	//表单操作:驳回列表
	APPROVEGETREJECTNODES: HOSTNAME+'/app/approve/getRejectNodes',
	//表单上传附件
	LEAVEFLOWPHOTO: HOSTNAME+'/app/leaveflow/photo',
	
	
	//获取工作地点
	CLOCKWORKADDRESS: HOSTNAME+'/app/clock/workAddress',
	//打卡有效范围
	CLOCKADDRESSRANGE: HOSTNAME+'/app/clock/addressRange',
	//添加打卡记录
	CLOCKRECORDADD: HOSTNAME+'/app/clock/record/add',
	//查询打卡记录
	CLOCKRECORDLIST: HOSTNAME+'/app/clock/record/list',
	
	//离职流程》获取离职原因
	SELECTLEAVEREASON: HOSTNAME+'/app/selector/selectLeaveReason',
	//删除草稿
	LEAVEFLOWDELMYDRAFT: HOSTNAME+'/app/leaveflow/delmyDraft',
	//知识库列表
	APPKNOLEDGEKNOLEDGELIST: HOSTNAME+'/app/appKnoledge/knoledgeList',
	//知识类别
	APPKNOLEDGEKNOLEDGETYPE: HOSTNAME+'/app/appKnoledge/knoledgeType',
	//知识详情
	APPKNOLEDGEKNOLEDGE: HOSTNAME+'/app/appKnoledge/knoledge',
	//入职流程》获取工作地
	SELECTCUSTOMDEPTADDRESS: HOSTNAME+'/app/selector/selectCustomDeptAddress',
	//入职流程》报价类型>结算岗位名称
	SELECTORSELECTPRICETYPE: HOSTNAME+'/app/selector/selectPriceType',
	//入职流程》客户合同弹框
	SELECTORSELECTCUSTOMCONTRACT: HOSTNAME+'/app/selector/selectCustomContract',
	//入职流程》客户弹窗
	SELECTCUSTOMERLIST: HOSTNAME+'/app/selector/selectCustomerList',
	//入职流程》客户部门弹窗
	SELECTCUSTOMERDEPTLIST: HOSTNAME+'/app/selector/selectCustomerDeptList',
	//入职流程》岗位级别
	SELECTRANKLIST: HOSTNAME+'/app/selector/selectRankList',
	//调动流程》结算级别
	SELECTSETTLERANKTRANSFER: HOSTNAME+'/app/selector/selectSettleRankTransfer',
	//费用报销》费用科目
	SELECTORBASSUBJECTLIST: HOSTNAME+'/app/selector/basSubjectlist',
	//消息推送--接口
	PUSHNOTIFICATIONMESSAGE: HOSTNAME+'/app/appLogin/pushNotificationMessage',
	//工号查询--根据身份证获取验证码
	FINDEMPNOGETCODE: HOSTNAME+'/app/findEmpNo/getCode',
	//工号查询--校验验证码返回工号
	FINDEMPNOCHECKCODE: HOSTNAME+'/app/findEmpNo/checkCode',
	
	//历史沟通--问题列表
	SALARYANSWERLIST: HOSTNAME+'/app/salary/answerList',
	//沟通答疑详情
	SALARYANSWERINFO: HOSTNAME+'/app/salary/answerInfo',
	//提交问题并发送邮件
	SALARYSQUESTION: HOSTNAME+'/app/salary/squestion',
	//沟通回复
	SALARYANSWERREPLY: HOSTNAME+'/app/salary/answerReply',
	
	//打卡是否有效
	CLOCKVALIDRECORD: HOSTNAME+'/app/clock/validRecord',
	//调级》调后结算岗位
	SELECTSETTLEJOBANDRANK: HOSTNAME+'/app/selector/selectSettleJobAndRank',
	
}


//获取版本号
//#ifdef APP-PLUS
plus.runtime.getProperty(plus.runtime.appid,function(inf){
	Path.VERSIONNO=inf.version;
});
//#endif

//test
export default Path;