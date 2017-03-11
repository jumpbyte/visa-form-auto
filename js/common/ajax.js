// 定义XMLHttpRequest对象
//var xmlHttp;

// 创建XMLHttpRequest对象
/*function createXMLHttpRequest(){
 var ajax = {
 getTransport: function() {
 return Try.these(
 function() { return new XMLHttpRequest() },
 function() { return new ActiveXObject('Msxml2.XMLHTTP') },
 function() { return new ActiveXObject('Microsoft.XMLHTTP') }
 ) || false;
 }
 }
 //this.xmlHttp = ajax.getTransport();
 return ajax.getTransport();
 }*/

//load data method
function loadData(url, objName, userMethod, type, msg, fun, postBodyText) {
	var obj = $(objName);
	// if(!userMethod) userMethod = 'get';
	if (msg == undefined || msg == null)
		msg = '加载数据...';
	new Ajax.Request(url, {
		// method: userMethod,
		onCreate : function(t) {
			parseResult(obj, msg, type);
		},
		onComplete : function(t) {
			parseResult(obj, t.responseText, type);
			fun(t.responseText);
		},
		onFailure : function(t) {
			parseResult(obj, '加载失败!', type);
		},
		postBody : postBodyText
	});
}

// parseResult
function parseResult(obj, text, type) {
	var setType;
	if (obj.hasChildNodes()) {
		obj.removeChild(obj.firstChild)
	}
	if (type == 0 || type == 'text')
		setType = 'innerHTML';
	if (type == 1 || type == 'value')
		setType = 'value';
	if (!type)
		setType = 'innerHTML';
	switch (setType) {
	case 'innerHTML':
		obj.innerHTML = text;
		break;
	case 'value':
		obj.setAttribute('value', text);
		break;
	}
}

// Nodes Class
var Nodes = Class.create();
Nodes.prototype = {

	// objTag : "",

	initialize : function() {
		this.objTag = "";
		this.msgLayerID = "_msgLayer";
	},

	// 方法removeAllChilds：删除所有子节点
	// 参数：tag：标签id 或 标签对象
	removeAllChilds : function(tag) {
		if (typeof (tag) == "string") {
			this.objTag = $(tag);
		} else if (typeof (tag) == "object") {
			this.objTag = tag;
		}

		if (this.objTag.hasChildNodes()) {
			while (this.objTag.childNodes.length != 0) {
				this.objTag.removeChild(this.objTag.childNodes[0]);
			}
		}
	},

	// 方法clearAllNotes()：清空所有提示信息
	// 参数arrNotesId：需要被清空的标签ID集合(数组类型)
	clearAllNotes : function(arrNotesId) {
		for ( var i = 0; i < arrNotesId.length; i++) {
			this.removeAllChilds($(arrNotesId[i]));
			$(arrNotesId[i]).style.cssText = "";
		}
	},

	// 方法createInputTag：创建<input>标签
	// 参数：tagType：标签类型；tagId：标签id；tagName：标签name；tagValue：标签value
	createInputTag : function(tagType, tagId, tagName, tagValue) {
		var objTag = document.createElement("input");
		objTag.setAttribute("type", tagType);
		objTag.setAttribute("id", tagId);
		objTag.setAttribute("name", tagName);
		arguments[3] == undefined ? objTag.setAttribute("value", "") : objTag.setAttribute("value", tagValue);
		return objTag;
	},

	// 方法createDropdownList：创建下拉列表框
	// 参数：tagId：标签id；tagName：标签name；collections：JSON字符串
	createDropdownList : function(tagId, tagName, collections) {
		var objSelect = document.createElement("select");
		objSelect.setAttribute("id", tagId);
		objSelect.setAttribute("name", tagName);

		var objJSON = collections.evalJSON();

		for ( var i = 0; i < objJSON.length; i++) {
			var objOption = document.createElement("option");
			objOption.setAttribute("value", objJSON[i].value);
			objOption.appendChild(document.createTextNode(objJSON[i].name));
			objSelect.appendChild(objOption);
		}
		return objSelect;
	},

	// 方法initDropdownList()：初始化下拉列表框
	// 参数：objTag：需要被修改的对象；strFirstText：首选项文本；strFirstVal：首选项值
	initDropdownList : function(objTag, strFirstText, strFirstVal) {
		new Nodes().removeAllChilds(objTag);
		objTag.options.add(new Option(strFirstText, strFirstVal));
	},

	// 方法: updateSelectOptions：只创建下拉列表框OPTION, 替换select内容
	// 参数: splitSign 为分隔子项符号; firstItemMessage 为首项内容, 不写则不创建该项
	updateSelectOptions : function(collections, firstItemMessage, splitSign) {
		var objSubItemValues, objSubItemNames;
		var oFragment = document.createDocumentFragment();
		var objJSON;

		// 加入默认项
		if (firstItemMessage != null) {
			var objDefault = document.createElement('option');
			objDefault.setAttribute('value', 0);
			objDefault.appendChild(document.createTextNode(firstItemMessage));
			oFragment.appendChild(objDefault);
		}

		if (collections != '')
			objJSON = collections.evalJSON();
		else
			return oFragment;

		// 是否遍历子项
		// if(isTraversing == null || isTraversing == '') isTraversing = 0;
		if (splitSign == null || splitSign == '')
			splitSign = ',';

		for ( var i = 0; i < objJSON.length; i++) {
			var objJSON_values = $H(objJSON[i]).values();

			// 是否遍历子项序列
			// if(isTraversing){
			objSubItemValues = objJSON_values[0].split(splitSign);
			objSubItemNames = objJSON_values[1].split(splitSign);
			// alert(objSubItemValues)
			/*
			 * }else{ objSubItemValues = objJSON_values[0]; objSubItemNames =
			 * objJSON_values[1]; }
			 */

			for ( var j = 0; j < objSubItemNames.length; j++) {
				var objOption = document.createElement('option');
				objOption.setAttribute('value', objSubItemValues[j]);
				objOption.appendChild(document.createTextNode(objSubItemNames[j]));
				// objOption.onmouseover = function(){alert(123)}

				// 添加 title 属性(用于显示备注信息)
				if (objJSON_values[2] != null)
					objOption.setAttribute('tipText', escape(objJSON_values[2]));

				// 加载
				oFragment.appendChild(objOption);
			}
		}
		return oFragment;
	},

	/*
	 * 方法: createDefaultOption() /* 参数: strDescription 为默认项描述; value 为默认项值 /*
	 * 返回: Object 默认项 option 对象
	 */
	createDefaultOption : function(strDescription, value) {
		var objDefault = document.createElement('option');
		if (strDescription == '' || strDescription == null)
			strDescription = '请选择';
		if (value == '' || value == null)
			value = 0;
		objDefault.setAttribute('value', value);
		objDefault.appendChild(document.createTextNode(strDescription));
		return objDefault;
	},

	// 方法createSelectList：创建下拉列表框, 可创建有序的数字列表
	// 参数：para 为{ 参数 }, content 为{ requires:{ start,end,step }, options:{ 数据 } }
	/*
	 * for example: var para = { name:'example', id:'example',
	 * onchange:function(){ //event body } }; var content = { //requires:{
	 * start:1, end:10, step:0.5, selectedValue: 2 }, requires:false, options :{
	 * contentBody:['body1', 'body2'], value:[100,200], selectedValue: 100 } };
	 * document.body.appendChild(new Nodes().createSelectList(para, content));
	 */
	createSelectList : function(para, content, firstItemMessage) {
		try {
			var objSelect = document.createElement('select');
			for ( var i = 0; i < $H(para).keys().length; i++) {
				objSelect.setAttribute($H(para).keys()[i], $H(para).values()[i]);
			}

			// add default option
			if (firstItemMessage != null)
				objSelect.appendChild(this.createDefaultOption(firstItemMessage, 0));

			if (!content.requires) {
				for ( var i = 0; i < content.options.contentBody.length; i++) {
					var objOption = document.createElement('option');
					objOption.appendChild(document.createTextNode(content.options.contentBody[i]));
					objOption.setAttribute('value', content.options.value[i]);
					if (content.options.selectedValue == content.options.value[i]) {
						objOption.setAttribute('selected', true);
					}
					objSelect.appendChild(objOption);
				}
			} else {
				for ( var i = content.requires.start; i <= content.requires.end; i += content.requires.step) {
					var objOption = document.createElement('option');
					objOption.appendChild(document.createTextNode(i));
					objOption.setAttribute('value', i);
					if (content.requires.selectedValue == i) {
						objOption.setAttribute('selected', true);
					}
					objSelect.appendChild(objOption);
				}
			}
			return objSelect;
		} catch (e) {
		}
	},

	// updateoption
	updateSelectListOptions : function(content, firstItemMessage) {
		try {
			var oFragment = document.createDocumentFragment();
			/*
			 * for(var i = 0; i < $H(para).keys().length; i++) {
			 * objSelect.setAttribute($H(para).keys()[i],$H(para).values()[i]); }
			 */

			// add default option
			if (firstItemMessage != null)
				oFragment.appendChild(this.createDefaultOption(firstItemMessage, 0));

			if (!content.requires) {
				for ( var i = 0; i < content.options.contentBody.length; i++) {
					var objOption = document.createElement('option');
					objOption.appendChild(document.createTextNode(content.options.contentBody[i]));
					objOption.setAttribute('value', content.options.value[i]);
					if (content.options.selectedValue == content.options.value[i]) {
						objOption.setAttribute('selected', true);
					}
					oFragment.appendChild(objOption);
				}
			} else {
				for ( var i = content.requires.start; i <= content.requires.end; i += content.requires.step) {
					var objOption = document.createElement('option');
					objOption.appendChild(document.createTextNode(i));
					objOption.setAttribute('value', i);
					if (content.requires.selectedValue == i) {
						objOption.setAttribute('selected', true);
					}
					oFragment.appendChild(objOption);
				}
			}
			return oFragment;
		} catch (e) {
		}
	},

	// 方法createImgTag：创建图片标签
	// 参数：imgUrl：图片所在路径；iHight：图片高度；iWeight：图片宽度
	createImgTag : function(imgUrl, iHight, iWeight, strTitle) {
		var objImg = document.createElement("img");
		objImg.setAttribute("src", imgUrl);
		if (iHight)
			objImg.setAttribute("hight", iHight);
		if (iWeight)
			objImg.setAttribute("weight", iWeight);
		if (strTitle)
			objImg.setAttribute("alt", strTitle);
		return objImg;
	},

	// 方法setAllChkBoxCheckedByName():通过名称索引的方式，设置所有的checkBox的checked属性
	// 参数：tagName：标签name
	setAllChkBoxCheckedByName : function(tagName, bool) {
		var objTags = document.getElementsByName(tagName);
		for ( var i = 0; i < objTags.length; i++) {
			objTags[i].setAttribute("checked", bool);
		}
	},

	// 设置条件框
	// 参数：objSltId：下拉列表框ID；strValue：被匹配值
	setSelectedOption : function(objSltId, strValue) {
		var objOpts = $(objSltId).getElementsByTagName("option");
		for ( var i = 0; i < objOpts.length; i++) {
			if (objOpts[i].getAttribute("value") == strValue)
				objOpts[i].setAttribute("selected", true);
		}
	},
	// //////////////////////////////////////////////////////////////////////////////////////////////////////////
	// 可多项选中CheckBox List值
	// 参数：objChkName：复选框Name；strValues：CheckBox被匹配值
	setCheckBoxValues : function(objChkName, strValues) {

		var objChks = document.getElementsByName(objChkName);
		alert(objChks[0].getAttribute("value"));

		var arrValues = strValues.split(',');
		alert(arrValues[0])
		for ( var i = 0; i < objChks.length; i++) {
			for ( var j = 0; j < arrValues.length; j++) {

				if (objChks[i].getAttribute("value") == arrValues[j])
					objChks[i].setAttribute("checked", true);
			}
		}
	},

	/*
	 * 功能: 显示提示信息, 浮动层. /* 调用: object.showMessageLayer(txtMessage, waitClearSec) /*
	 * 参数: txtMessage 为提示信息; waitClearSec 为等待时间(秒) /* 返回: 无
	 */
	showMessageLayer : function(txtMessage, waitClearSec) {
		if (waitClearSec == null || waitClearSec == undefined)
			waitClearSec = 5;
		this.createMsgLayer(txtMessage);
		this.msgLayerObj = setTimeout(function() {
			new Nodes().clearMsgLayer();
		}, waitClearSec * 1000);
	},

	createMsgLayer : function(txtMessage) {
		var msgLayer = document.createElement("div");
		var element = document.getElementById(this.msgLayerID);
		if (element != undefined) {
			clearTimeout(this.msgLayerObj);
			this.clearMsgLayer();
		}
		msgLayer.setAttribute("id", this.msgLayerID);
		msgLayer.style.width = "auto";
		msgLayer.style.height = "auto";
		msgLayer.style.position = "absolute";
		msgLayer.style.padding = 3;
		msgLayer.style.right = 10;
		msgLayer.style.top = document.documentElement.scrollTop + 10;
		msgLayer.style.background = "#CC3333";
		msgLayer.style.filter = "Alpha(Opacity=90)";
		msgLayer.style.color = "#FFFFFF";
		msgLayer.innerHTML = txtMessage;
		document.body.appendChild(msgLayer);
	},

	clearMsgLayer : function() {
		var msgObj = $(this.msgLayerID);
		if (msgObj != undefined)
			document.body.removeChild(msgObj);
	}
};
