/**
 * @author liuyandong
 * @time 2016-08-29
 * @title 公共弹出层调用方法
 * @classDescription 由于最原始的方法showPopWin和showPopWinNoBtn传参比较多，
 * 为了减少由于js传参引起的错误，如果弹窗功能多次被调用，就可以在该文件封装js方法
 */
var Pop = {
	// action的介绍
	actIntro : function(actName) {
		showPopWinNoBtn("showActIntro?actName=" + actName, 'Action介绍', '45%', 500);
	},
	/**
	 * 发送消息
	 * 
	 * @param msg 消息类型
	 * @param title 标题
	 * @param actionStr action名字
	 */
	msgCommon : function(obj, title, actionStr) {
		if (title == null || title == '') {
			title = '在线通知';
		}
	//	showPopWin("loadCommMsg?msgConcent=" + obj, title, '80%', 550);
		showPopWin('loadCommMsg?msgConcent=' + obj +'&actionStr='+ actionStr,'sendMsgWrite()','child',title,'1200','600');
	},
	/**
	 * 查看日志
	 * 
	 * @param id 表主键
	 * @param objectName 对象名称(在action自定义的名称)
	 * @param title 标题
	 */
	logList : function(id, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogs?id=" + id + "&objectName=" + obj, title, '80%', 550);
	},

	/**
	 * 查看日志
	 * 
	 * @param code 
	 * @param objectName 对象名称(在action自定义的名称)
	 * @param title 标题
	 */
	logListCommon : function(code, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogCode?code=" + code + "&objectName=" + obj, title, '80%', 550);
	},
	
	/**
	 * 查看签证日志
	 * 
	 * @param code 表编码
	 * @param objectName 对象名称(在action自定义的名称)
	 * @param title 标题
	 */
	logCommon : function(code, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogByCode?code=" + code + "&objectName=" + obj, title, '80%', 550);
	},
	/**
	 * 查看产品日志
	 * 
	 * @param code 表编码
	 * @param objectName 对象名称(在action自定义的名称)
	 * @param title 标题
	 */
	logTeamCommon : function(code, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogTeamCommon?code=" + code + "&objectName=" + obj, title, '80%', 550);
	},
	/**
	 * 查看日志 （订单）
	 * 
	 * @param code 表编码
	 * @param objectName 对象名称(在action自定义的名称)
	 * @param title 标题
	 */
	logOrderCommon : function(code, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogOrderCommon?code=" + code + "&objectName=" + obj, title, '80%', 550);
	},
	/**
	 * 查看日志 （订单  加了条件查询）
	 * 
	 * @param code 表编码
	 * @param objectName 对象名称(在action自定义的名称)
	 * @param title 标题
	 */
	logOrderSummaryCommon : function(code, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogCustomerSummaryOrder?code=" + code + "&objectName=" + obj, title, '80%', 550);
	},
	
	
	logChannelCommon : function(code, obj, title) {
		if (title == null || title == '') {
			title = '日志列表';
		}
		showPopWinNoBtn("findLogChannelCommon?code=" + code + "&objectName=" + obj, title, '80%', 550);
	},
	// 客商查询，更新HTML页面方法
	// val 为客户编码元素名称值; name 为客商名称元素名称值
	companyHtml : function(val, name) {
		showPopWin('loadPopCompanyList', 'setPopHtml("' + val + '", "' + name + '")', 'child', '客商查询', '80%', 550);
	},
	companyHtmlVal : function(val, name) {
		showPopWin('loadPopCompanyList', 'setPopVal("' + val + '", "' + name + '")', 'child', '客商查询', '80%', 550);
	},
	// 客商查询，更新FORM页面方法
	companyForm : function(val, name) {
		showPopWin('loadPopCompanyList', 'setPopForm("' + val + '", "' + name + '")', 'child', '客商查询', '80%', 550);
	},
	
	// 查询客商总公司，更新HTML页面方法
	// val 为客户编码元素名称值; name 为客商名称元素名称值
	companyVal : function(val, name) {
		showPopWin('loadPopCompBaseList', 'setPopVal("' + val + '", "' + name + '")', 'child', '客商总公司查询', '80%', 550);
	},

	// val 为客商编码元素名称值; name 为客商名称元素名称值
	companyExtGridHtml : function(isRadio, val, name) {
		showPopWin('loadCompanyExtGrid?isRadio=' + isRadio, 'setCompanyHtml("' + val + '", "' + name + '")', 'child', '客商查询', '80%', 550);
	},

	// 弹出根据部门筛选用户页面，表单方法
	// isRadio 是否单选, 其他参数为表单元素名称；empName, deptCode, deptName 为可选值
	deptAndUserForm : function(isRadio, empCode, empName, deptCode, deptName, userId, email) {
		showPopWin('loadSelUserByDept?isRadio=' + isRadio, 'setPopForm("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '","' + userId + '","' + email + '")', 'child', '根据部门筛选用户', '80%', 500);
	},
	// 弹出根据部门筛选用户页面，页面方法
	deptAndUserHtml : function(isRadio, empCode, empName, deptCode, deptName, userId, email) {
		showPopWin('loadSelUserByDept?isRadio=' + isRadio, 'setPopHtml("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '","' + userId + '","' + email + '")', 'child', '根据部门筛选用户', '80%', 500);
	},

	// 搜索选择用户（返四个值）
	userHtml : function(isRadio, empCode, empName, deptCode, deptName) {
		showPopWin('loadSelUser?isRadio=' + isRadio, 'setPopHtml("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '")', 'child', '用户列表', '75%', 600);
	},

	// 搜索选择用户（返四个值）
	userHtml : function(isRadio, empCode, empName, deptCode, deptName, schDeptName, schRoleName) {
		var urlStr = 'loadSelUser?isRadio=' + isRadio;
		if (schDeptName != null && schDeptName != 'undefined') {
			urlStr = urlStr + '&schDeptName=' + schDeptName;
		}
		if (schRoleName != null && schRoleName != 'undefined') {
			urlStr = urlStr + '&schRoleName=' + schRoleName;
		}
		showPopWin(urlStr, 'setPopHtml("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '")', 'child', '用户列表', '75%', 600);
	},

	// 搜索选择用户（返四个值）
	userForm : function(isRadio, empCode, empName, deptCode, deptName, objHeight, objWidth) {
		showPopWin('loadSelUser?isRadio=' + isRadio, 'setPopForm("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '")', 'child', '用户列表', objHeight, objWidth);
	},

	// 搜索选择用户,包括启用和禁用用户（返四个值）
	userAllHtml : function(isRadio, empCode, empName, deptCode, deptName) {
		showPopWin('loadSelAllUser?isRadio=' + isRadio, 'setPopHtml("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '")', 'child', '用户列表', '75%', 600);
	},

	// 搜索选择用户，包括启用和禁用用户（返四个值）
	userAllForm : function(isRadio, empCode, empName, deptCode, deptName, objHeight, objWidth) {
		showPopWin('loadSelAllUser?isRadio=' + isRadio, 'setPopForm("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '")', 'child', '用户列表', objHeight, objWidth);
	},

	// 弹出加载部门页面，表单方法
	departmentForm : function(isRadio, deptCode, deptName) {
		showPopWin('loadSelDept?isRadio=' + isRadio, 'setDeptForm("' + deptCode + '", "' + deptName + '")', 'child', '部门结构', 500, 600);
	},

	// 弹出加载部门页面，页面方法
	departmentHtml : function(isRadio, deptCode, deptName) {
		showPopWin('loadSelDept?isRadio=' + isRadio, 'setDeptHtml("' + deptCode + '", "' + deptName + '")', 'child', '部门结构', 500, 500);
	},

	// 弹出选择部门页面，普通表格，页面方法
	departmentTableHtml : function(isRadio, deptCode, deptName) {
		showPopWin('loadSelDeptTable?isRadio=' + isRadio, 'setDeptHtml("' + deptCode + '", "' + deptName + '")', 'child', '部门列表', '80%', 500);
	},

	// 弹出选择部门页面，普通表格，表单方法
	departmentTableForm : function(isRadio, deptCode, deptName) {
		showPopWin('loadSelDeptTable?isRadio=' + isRadio, 'setDeptForm("' + deptCode + '", "' + deptName + '")', 'child', '部门列表', '80%', 500);
	},

	// 弹出选择6级部门页面，普通表格，页面方法
	deptTableLevel6Html : function(isRadio, deptCode, deptName, categoryWork, struCode) {
		var urlStr = 'loadSelDeptTableLevel6?isRadio=' + isRadio;
		if (categoryWork != null && categoryWork != 'undefined') {
			urlStr = urlStr + '&schCategoryWork=' + categoryWork;
		}
		if (struCode != null && struCode != 'undefined') {
			urlStr = urlStr + '&schStruCode=' + struCode;
		}
		showPopWin(urlStr, 'setDeptHtml("' + deptCode + '", "' + deptName + '")', 'child', '6级部门列表', '80%', 500);
	},

	// 弹出选择6级部门页面，普通表格，表单方法
	deptTableLevel6Form : function(isRadio, deptCode, deptName, categoryWork, struCode) {
		var urlStr = 'loadSelDeptTableLevel6?isRadio=' + isRadio;
		if (categoryWork != null && categoryWork != 'undefined') {
			urlStr = urlStr + '&schCategoryWork=' + categoryWork;
		}
		if (struCode != null && struCode != 'undefined') {
			urlStr = urlStr + '&schStruCode=' + struCode;
		}
		showPopWin(urlStr, 'setDeptForm("' + deptCode + '", "' + deptName + '")', 'child', '6级部门列表', '80%', 500);
	},
	
	//弹出选择6级部门页面，普通表格，页面方法 (选择6级部门包括enable的 TODO:zzl)
	deptTableLevel6HtmlAll : function(isRadio, deptCode, deptName, categoryWork, struCode) {
		var urlStr = 'loadSelDeptTableLevel6All?isRadio=' + isRadio;
		if (categoryWork != null && categoryWork != 'undefined') {
			urlStr = urlStr + '&schCategoryWork=' + categoryWork;
		}
		if (struCode != null && struCode != 'undefined') {
			urlStr = urlStr + '&schStruCode=' + struCode;
		}
		showPopWin(urlStr, 'setDeptHtmlAll("' + deptCode + '", "' + deptName + '")', 'child', '6级部门列表', '80%', 500);
	},
	
	// 弹出选择6级部门页面，普通表格，表单方法 (选择6级部门包括enable的 TODO:zzl)
	deptTableLevel6FormAll : function(isRadio, deptCode, deptName, categoryWork, struCode) {
		var urlStr = 'loadSelDeptTableLevel6All?isRadio=' + isRadio;
		if (categoryWork != null && categoryWork != 'undefined') {
			urlStr = urlStr + '&schCategoryWork=' + categoryWork;
		}
		if (struCode != null && struCode != 'undefined') {
			urlStr = urlStr + '&schStruCode=' + struCode;
		}
		showPopWin(urlStr, 'setDeptFormAll("' + deptCode + '", "' + deptName + '")', 'child', '6级部门列表', '80%', 500);
	},
	
	fastGroup :  function() {
		var url='loadFastGroup';
		showPopWin(url, 'checkForm()', 'child', '快速开团', '80%', 500);
	},
	// 弹出加载科目页面，表单方法
	sysItemForm : function(isRadio, itemCode, itemName) {
		showPopWin('loadSelItem?isRadio=' + isRadio, 'setItemForm("' + itemCode + '", "' + itemName + '")', 'child', '科目结构', '28%', 500);
	},

	// 弹出加载科目页面，页面方法
	sysItemHtml : function(isRadio, itemCode, itemName) {
		showPopWin('loadSelItem?isRadio=' + isRadio, 'setItemHtml("' + itemCode + '", "' + itemName + '")', 'child', '科目结构', '28%', 500);
	},

	// 弹出加载系统页面，表单方法
	sysTraForm : function(isRadio, sysCode, sysName) {
		showPopWin('loadSysTraListPop?isRadio=' + isRadio, 'sysTraForm("' + sysCode + '", "' + sysName + '")', 'child', '系统列表', '80%', 500);
	},

	// 弹出加载系统页面，页面方法
	sysTraHtml : function(isRadio, sysCode, sysName) {
		showPopWin('loadSysTraListPop?isRadio=' + isRadio, 'sysTraHtml("' + sysCode + '", "' + sysName + '")', 'child', '系统列表', '80%', 500);
	},

	// 商品下订单游客信息
	showSameProductOrderCustomerHtml : function(produceCode) {
		showPopWin('showSameProductOrderCustomerList?productCode=' + produceCode, 'checkCustMessage();', 'child', '查询游客', '80%', 550);
	},
	//点击分摊按钮后，客人列表
	showSameProductOrderCustomersHtml : function(produceCode,schSignupStatus,detailCode) {
		showPopWin('showSameProductOrderCustomerLists?productCode='+produceCode+'&schSignupStatus='+schSignupStatus+'&detailCode='+detailCode, 'checkCustMessage();', 'child', '查询游客', '100%', 550);
	},
	//点击修改按钮后，客人列表
	showSameProductOrderCustomersHtmlUpdate : function(produceCode,schSignupStatus,detailCode) {
		showPopWin('showSameProductOrderCustomerLists?productCode='+produceCode+'&schSignupStatus='+schSignupStatus+'&detailCode='+detailCode, 'checkCustMessage();', 'child', '查询游客', '75%', 550);
	},
	// 国家城市查询，更新HTML页面方法
	countryAndCityHtml : function(cityCode, cityName, countryCode, countryName, continentCode, continentName) {
		showPopWin('loadPopCountryCityList', 'setPopHtml("' + cityCode + '", "' + cityName + '", "' + countryCode + '", "' + countryName + '", "' + continentCode + '", "' + continentName + '")', 'child', '国家城市查询', '75%', 600);
	},

	// 国家城市查询，更新FORM页面方法
	countryAndCityForm : function(cityCode, cityName, countryCode, countryName, continentCode, continentName) {
		showPopWin('loadPopCountryCityList', 'setPopForm("' + cityCode + '", "' + cityName + '", "' + countryCode + '", "' + countryName + '", "' + continentCode + '", "' + continentName + '")', 'child', '国家城市查询', '75%', 600);
	},

	// 弹出加载售卖渠道页面，页面方法
	channelForm : function(isRadio, category, channelCode, title) {
		showPopWin('loadPopCommChannel?isRadio=' + isRadio, 'setChannelForm("' + category + '","' + channelCode + '","' + title + '")', 'child', '渠道管理', '75%', 500);
	},

	// 弹出加载售卖渠道页面，页面方法
	channelHtml : function(isRadio, category, channelCode, title) {
		showPopWin('loadPopCommChannel?isRadio=' + isRadio, 'setChannelHtml("' + category + '","' + channelCode + '","' + title + '")', 'child', '渠道管理', '75%', 500);
	},

	// 优惠券批次查询，更新HTML页面方法
	couponHtml : function(couBatchCode, title, disRate) {
		showPopWin('loadPopCouponList', 'setPopHtml("' + couBatchCode + '", "' + title + '", "' + disRate + '")', 'child', '优惠券批次查询', '80%', 500);
	},

	// 优惠券批次查询，更新FORM页面方法
	couponForm : function(couBatchCode, title, disRate) {
		showPopWin('loadPopCouponList', 'setPopForm("' + couBatchCode + '", "' + title + '", "' + disRate + '")', 'child', '优惠券批次查询', '80%', 500);
	},
	// 商品列表查询，更新FORM页面方法
	teamForm : function(teamId,productCode, title) {
		showPopWin('loadCommonTeamManageList', 'setTeamForm("' + teamId + '", "' + productCode + '", "' + title + '")', 'child', '团队商品查询', '80%', 600);
	},
	shopForm : function(shopId,shopCode, title,shopEnName,cnTitle) {
		showPopWin('loadSightShopListCommon', 'setShopForm("' + shopId + '", "' + shopCode + '", "' + title + '","' + shopEnName + '","' + cnTitle + '")', 'child', '城市商店查询', '80%', 600);
	},
	/**
	 * 附件列表示例 acCode决定是哪种类型的附件，对应方案表的编码 pkValue决定是哪条数据
	 */
	attachmentHtml : function(acCode, pkValue) {
		var urlStr = 'loadAttList?acCode=' + acCode + '&pkValue=' + pkValue;
		showPopWinNoBtn(urlStr, '', '80%', 500);
	},
	/**
	 * 查看附件示例 acCode决定是哪种类型的附件，对应方案表的编码
	 */
	attachmentSearch : function(acCode, pkValue) {
		var urlStr = 'loadAttListSearch?acCode=' + acCode;
		if (pkValue != null && pkValue != 'undefined') {
			urlStr = urlStr + '&pkValue=' + pkValue;
		}

		showPopWinNoBtn(urlStr, '', '80%', 500);
	},
	/**
	 * 附件列表示例 acCode决定是哪种类型的附件，对应方案表的编码 pkValue决定是哪条数据
	 */
	attachmentListHtml : function(acCode, pkValue) {
		var urlStr = 'loadAttListPop?acCode=' + acCode + '&pkValue=' + pkValue;
		showPopWinNoBtn(urlStr, '附件列表', '80%', 500);
	},
	/**
	 * 业务类别列表
	 * @param extendService 服务类别
	 * @param extendCategory 业务细类
	 */
	modelExtendHtml : function(isRadio, extendService, extendCategory, extendCode, title, modelType) {
		var urlStr = 'loadModelExtListPop?isRadio=' + isRadio;
		if (extendService != null && extendService != 'undefined') {
			urlStr = urlStr + '&extendService=' + extendService;
		}
		if (extendCategory != null && extendCategory != 'undefined') {
			urlStr = urlStr + '&extendCategory=' + extendCategory;
		}
		if (modelType != null && modelType != 'undefined') {
			urlStr = urlStr + '&modelType=' + modelType;
		}

		showPopWin(urlStr, 'setModelExtendHtml("' + extendCode + '", "' + title + '")', 'child', '业务类别列表', '75%', 500);
	},
	
	//公司列表
	// val 为公司编码值; name 为公司名称值; licenseCode 为经营许可证号
	structureSearchExt : function(isRadio, val, name, licenseCode, city, tel, fax) {
		showPopWin('loadStructureListExt?isRadio=' + isRadio,
				'setStructureHtml("' + val + '", "' + name + '", "' + licenseCode + '", "' 
				+ city + '", "' + tel + '", "' + fax + '")', 'child', '公司查询', '80%', 550);
	},
	structureAllowExt : function(isRadio, val, name, licenseCode, city, tel, fax) {
		showPopWin('loadStructureAllowListExt?isRadio=' + isRadio,
				'setStructureHtml("' + val + '", "' + name + '", "' + licenseCode + '", "' 
				+ city + '", "' + tel + '", "' + fax + '")', 'child', '允许生成合同的公司列表', '80%', 550);
	},
	
	// 弹出加载标签页面，页面方法
	teamTagForm : function(isRadio,tagName) {
		showPopWin('loadTeamTagCountObj?isRadio=' + isRadio, 'tagTraForm("' + tagName + '")', 'child', '标签管理', '75%', 500);
	},

	// 弹出加载标签页面，页面方法
	teamTagHtml : function(isRadio,tagName) {
		showPopWin('loadTeamTagCountObj?isRadio=' + isRadio, 'tagTraHtml("'+ tagName +'")', 'child', '标签管理', '75%', 500);
	},

	// extjs列状态记忆功能Demo
	extClientStateDemo : function(stateId, empCode, empName, deptCode, deptName) {
		showPopWin('getExtClientStateDemo?key=' + stateId, 'setPopHtml("' + empCode + '", "' + empName + '", "' + deptCode + '", "' + deptName + '")', 'child', '用户列表', '75%', 600);
	},
	// extjs列状态记忆功能普通表格Demo
	extClientStateTableDemo : function(stateId, deptCode, deptName) {
		showPopWin('getExtClientStateTableDemo?key=' + stateId, 'setDeptHtml("' + deptCode + '", "' + deptName + '")', 'child', '部门列表', '80%', 500);
	},

	init : function() {
		return true;
	}
	
	
	
}